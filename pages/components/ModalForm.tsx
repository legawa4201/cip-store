import { useEffect, useState } from "react"

export default function ModalForm({ id, reFetch, clearId }: { id: number | null }) {
    const [input, setInput] = useState({ nama: ``, deskripsi: ``, harga: 0, stok: 0, suplier_id: 0 });
    const [image, setImage] = useState(null);
    const [suplier, setSuplier] = useState([])


    function onChangeInput({ target }) {
        const { name, value } = target
        console.log(name, value)
        setInput({ ...input, [name]: value })
    }

    function onChangeFile({ target }) {
        const { files } = target
        setImage(files[0])
    }

    useEffect(function () {
        fetch(`/api/supliers`)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                setSuplier(data)
            })
            .catch(function (err) {
                console.error
            })
    }, [])

    useEffect(function () {
        if (id) {
            fetch(`/api/products/` + id)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    setInput({ ...data })
                })
                .catch(function (err) {
                    console.error(err)
                })
        } else {
            setInput({
                nama: ``,
                deskripsi: ``,
                harga: 0,
                stok: 0
            })
        }
    }, [id])

    function onSubmitForm(e) {
        e.preventDefault()
        if (id) {
            fetch(`/api/products/` + id, {
                method: `PUT`,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input)
            })
                .then(function(response) {
                    return response.json()
                })
                .then(function(res) {
                    return fetch(`/api/products/pages/1`)
                })
                .then(function(reFetchRes) {
                    return reFetchRes.json()
                })
                .then(function(data) {
                    console.log(data)
                    reFetch(data)
                    document.getElementById('my_modal').close()
                })
                .catch(function (err) {
                    console.error(err);
                })
        } else {
            const form = new FormData()
            form.append(`file`, image)
            for (const key in input) {
                form.append(key, input[key])
            }
            console.log(form)
            fetch(`/api/products`, {
                method: `POST`,
                body: form
            })
                .then(function(response) {
                    return fetch(`/api/products/pages/1`)
                })
                .then(function(response) {
                    return response.json()
                })
                .then(function(data) {
                    reFetch(data)
                    document.getElementById('my_modal').close()
                })
                .catch(function (err) {
                    console.error(err)
                })
        }
    }
    return (
        <dialog id="my_modal" className="modal">
            <div className="modal-box h-5/6 w-full">
                <form method="dialog">
                    <button onClick={() => clearId(true)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    {/* if there is a button in form, it will close the modal */}
                </form>
                <h3 className="font-bold text-lg">Produk Baru</h3>
                <form onSubmit={onSubmitForm} className="flex flex-col gap-y-3">
                    <div className="flex flex-col">
                        <label>Nama</label>
                        <input onChange={onChangeInput} value={input.nama} type="text" name="nama" className="input input-bordered" />
                    </div>

                    <div className="flex flex-col">
                        <label>Deskripsi</label>
                        <textarea onChange={onChangeInput} value={input.deskripsi} name="deskripsi" cols={8} rows={5} className="textarea textarea-bordered"></textarea>
                    </div>

                    <div className="flex flex-col">
                        <label>Harga</label>
                        <input onChange={onChangeInput} value={input.harga} type="number" name="harga" className="input input-bordered" />
                    </div>

                    <div className="flex flex-col">
                        <label>Stok</label>
                        <input onChange={onChangeInput} value={input.stok} type="number" name="stok" className="input input-bordered" />
                    </div>

                    <div>
                        <label>Suplier</label>
                        <select name="suplier_id" onChange={onChangeInput} className="select select-bordered w-full">
                            {
                                suplier.map(function (splr, i) {
                                    return (
                                        !id ?
                                            <option value={splr.id_suplier} key={i}>{splr.nama_suplier}</option>
                                            :
                                            input.suplier_id == splr.id_suplier ?
                                                <option value={splr.id_suplier} key={i} selected>{splr.nama_suplier}</option>
                                                :
                                                <option value={splr.id_suplier} key={i}>{splr.nama_suplier}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label>Foto</label>
                        <input onChange={onChangeFile} type="file" name="foto" className="file-input file-input-bordered" />
                    </div>
                    {
                        !id ?
                            <button type="submit" className="btn btn-neutral">Add Product</button>
                            :
                            <button type="submit" className="btn btn-neutral">Edit Product</button>
                    }
                </form>
            </div>
        </dialog>
    )
}