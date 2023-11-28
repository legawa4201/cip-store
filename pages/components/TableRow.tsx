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

export default function TableRow({ product, reFetch, sendId }: { product: Product }) {

  async function onDelete(id: number) {
    try {
      const response = await fetch(`/api/products/` + id, {
        method: `DELETE`
      })
      const data = await response.json()
      const responseRefetch = await fetch(`/api/products`)
      const dataReFetch = await responseRefetch.json()
      reFetch(dataReFetch)
    } catch (error) {
      console.error(error)
    }
  }
  function onSendId(id: number, isEdit) {
    sendId(id, isEdit)
  }

  return (
    <tr>
      <td>{product.nama}</td>
      <td>{product.stok}</td>
      <td>{product.nama_suplier}</td>
      <td>
        <label htmlFor="my_modal_7" className="btn" onClick={() => onSendId(+product.id)}>Detail</label>
      </td>
      <td>
        <button className="btn" onClick={() => onSendId(+product.id, true)}>Edit</button>
      </td>
      <td>
        <button className="btn" onClick={() => onDelete(+product.id)}>Delete</button>
      </td>
    </tr>
  )
}