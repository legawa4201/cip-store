import Link from "next/link";

interface Product {
  id: string
  nama: string
  nama_suplier: string
  deskripsi: string
  stok?: number
  harga?: number
  foto?: string
}

export default function TableRow({ product}: { product: Product }, reFetch) {

  async function onDelete(id: number) {
    try {
      const response = await fetch(`/api/products/` + id, {
        method: `DELETE`
      })
      const data = await response.json()
      console.log(data)
      const responseRefetch = await fetch(`/api/products`)
      const dataReFetch = await response.json()
      reFetch(data)
    } catch (error) {
      console.error(error)
    }
  } return (
    <tr>
      <td>{product.nama}</td>
      <td>{product.stok}</td>
      <td>{product.nama_suplier}</td>
      <td>
        <button className="btn" onClick={() => document.getElementById('my_modal').showModal()}>Detail</button>
      </td>
      <td>
        <button className="btn" onClick={() => document.getElementById('my_modal').showModal()}>Edit</button>
      </td>
      <td>
        <button className="btn" onClick={() => onDelete(+product.id)}>Delete</button>
      </td>
    </tr>
  )
}