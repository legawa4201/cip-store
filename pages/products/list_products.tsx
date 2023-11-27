import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import PaginationButton from "../components/PaginationButton";
import TableRow from "../components/TableRow";

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
  const [totalPage, settotalPage] = useState<number | null>(null);


  useEffect(function () {
    fetch(`http://localhost:3000/api/products`)
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
  }, []);

  console.log(totalPage)
  return (
    <>
      <div className="flex">
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
                  return <TableRow key={i} product={prod} />
                })
              }
            </tbody>
          </table>
          <div className="flex justify-center join">
            <div className="join">
              <PaginationButton pageState={"<<"} />
              <PaginationButton pageState={"Page 1"} />
              <PaginationButton pageState={">>"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
