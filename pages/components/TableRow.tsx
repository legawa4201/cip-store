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

export default function TableRow({ product }: { product: Product }) {
    return(
        <tr>
            <td>{product.nama}</td>
            <td>{product.stok}</td>
            <td>{product.nama_suplier}</td>
            <td>
            <button  className="btn" onClick={() => document.getElementById('my_modal').showModal()}>Detail</button>
            </td>
            <td>
            <button  className="btn" onClick={() => document.getElementById('my_modal').showModal()}>Edit</button>
            </td>
            <td>
            <button  className="btn" onClick={() => document.getElementById('my_modal').showModal()}>Delete</button>
            </td>
      </tr>
    )
}