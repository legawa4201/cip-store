import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import PaginationButton from "../components/PaginationButton";
import TableRow from "../components/TableRow";
import ModalForm from "../components/ModalForm";
import CardDetail from "../components/CardDetail";

interface Product {
  id: string
  nama: string
  nama_suplier: string
  deskripsi: string
  stok?: number
  harga?: number
  foto?: string
}

export default function ListProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, settotalPage] = useState<number | null>(null);
  const [id, setId] = useState<number | null>(null)

  useEffect(function () {
    fetch(`http://localhost:3000/api/products/pages/` + currentPage)
      .then(function (response) {
        return response.json()
      })
      .then(function ({ products: prod, totalProduct }) {
        setProducts(prod)
        let pages = Math.ceil((totalProduct[`COUNT(*)`] / 7))
        settotalPage(pages)
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [currentPage]);

  function reFetch(data) {
    const { products: prods, totalProduct } = data
    setProducts(prods);
    settotalPage(Math.ceil((totalProduct[`COUNT(*)`] / 7)));
  }

  function clearId(wantClear) {
    if(wantClear) setId(null)
  }

  function nextPage(wantNext) {
    if((currentPage == 1 && !wantNext) || (currentPage == totalPage && wantNext)) return
    console.log(currentPage, `1`)
    if(wantNext) {
      setCurrentPage(currentPage + 1)
      console.log(currentPage, `2`)
    } else {
      console.log(currentPage, `3`)
      setCurrentPage(currentPage - 1)
    }
      
  }

  function sendId(id: number, isEdit, isAdd ) {
    setId(id)
    if(isEdit) {
      document.getElementById('my_modal').showModal()
    }
  }

  return (
    <>
      <div className="flex">
        <CardDetail id={id} clearId={clearId}/>
        <ModalForm id={id} reFetch={reFetch} clearId={clearId} />
        <div className="w-full">
          <SearchBar />
          <table className="table table-zebra text-center w-full">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Stok</th>
                <th>Suplier</th>
                <th colSpan={3} className="w-1/4">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                products.map(function (prod: Product, i) {
                  return <TableRow key={i} product={prod} reFetch={reFetch} sendId={sendId}/>
                })
              }
            </tbody>
          </table>
          <div className="flex justify-center join">
            <div className="join">
              <PaginationButton nextPage={nextPage} pageState={"<<"} />
              <PaginationButton pageState={currentPage + " of " + totalPage} />
              <PaginationButton nextPage={nextPage} pageState={">>"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
