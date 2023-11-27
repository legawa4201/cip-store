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
            <Link href={`/`} className="btn">Detail</Link>
            </td>
            <td>
            <Link href={`/`} className="btn">Edit</Link>
            </td>
            <td>
            <Link href={`/`} className="btn">Delete</Link>
            </td>
      </tr>
    )
}