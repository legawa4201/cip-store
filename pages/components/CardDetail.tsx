import Image from "next/image"
import { useEffect, useState } from "react"

export default function CardDetail({ id, clearId }: { id: number | null, clearId: (wantClear: boolean) => void }) {
    const [product, setProduct] = useState(null)

    useEffect(function () {
        fetch(`/api/products/` + id)
        .then(function(response) {
            if(!response.ok) throw { error: `SomethingWentWrong` }
            return response.json()
        })
        .then(function(data) {
            setProduct(data)
        })
        .catch(function(error) {
            console.error(error)
        })
    }, [id])
    return (
        <>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box card w-full h-full bg-base-100 shadow-xl">
                    <figure className="">
                        <Image src={`/uploads/products/` + product?.foto} width={200} height={60} alt="Shoes" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{product?.nama}</h2>
                        <p>Deskripsi : {product?.deskripsi}</p>
                        <p>Harga : {product?.harga}</p>
                        <p>stock : {product?.stok}</p>
                    </div>
                </div>
                <label onClick={() => clearId(true)} className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </>
    )
}