import { useEffect, useState } from "react"

export default function ModalForm({ id, reFetch }: { id: number }) {
    const [input, setInput] = useState({ nama: ``, deskripsi: ``, harga: 0, stok: 0 });
    const [image, setImage] = useState(null);


    function onChangeInput({ target }) {
        const { name, value } = target
        setInput({ ...input, [name]: value })
    }

    function onChangeFile({ target }) {
        const { files } = target
        setImage(files[0])
    }

    useEffect(function() {
        if(id) {
            fetch(`/api/products/` + id)
            .then(function(response) {
                return response.json()
            })
            .then(function(data) {
                setInput({...data})
            })
            .catch(function(err) {
                console.error(err)
            })
        }
    }, [id])

    function onSubmitForm(e) {
        e.preventDefault()
        if(id) {
            fetch(`/api/products/` + id, {
                method: `PUT`,
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(input)
            })
            .then(function(response) {
                return response.json()
            })
            .then(function(res) {
                return fetch(`/api/products`)
            })
            .then(function(reFetchRes) {
                return reFetchRes.json()
            })
            .then(function(data) {
                reFetch(data)
                document.getElementById('my_modal').close()
            })
            .catch(function(err) {
                console.error(err);
            })
        } else {
            const form = new FormData()
            form.append(`file`, image)
            for(const key in input) {
                form.append(key, input[key])
            }
            fetch(`/api/products`, {
                method: `POST`,
                body: form
            })
            .then(function(response) {
                document.getElementById('my_modal').close()
            })
            .catch(function(err) {  
                console.error(err)
            })
        }
    }
    return (
        <dialog id="my_modal" className="modal">
            <div className="modal-box h-5/6 w-full">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
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
                        <input onChange={onChangeInput} value={input.harga} type="number" name="harga" className="input input-bordered"/>
                    </div>

                    <div className="flex flex-col">
                        <label>Stok</label>
                        <input onChange={onChangeInput} value={input.stok} type="number" name="stok" className="input input-bordered"/>
                    </div>

                    <div className="flex flex-col">
                        <label>Foto</label>
                        <input onChange={onChangeFile} type="file" name="foto" className="file-input file-input-bordered"/>
                    </div>

                    <button type="submit" className="btn btn-neutral">Add Product</button>
                </form>
            </div>
        </dialog>
    )
}