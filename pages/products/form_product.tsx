export default function Form() {
    return (
        <>
        <div className="flex justify-center align-middle h-full">
            <div className="flex flex-col">
                <h1>Produk Baru</h1>
                <form className="flex flex-col">
                    <label>Nama</label>
                    <input type="text" name="nama" className="border border-black"/>

                    <label>Deskripsi</label>
                    <textarea name="deskripsi" cols={15} rows={5} className="border border-black"></textarea>

                    <label>Harga</label>
                    <input type="number" name="" id="" className="border border-black"/>

                    <label>Stok</label>
                    <input type="text" name="" id="" className="border border-black"/>

                    <label>Foto</label>
                    <input type="file" name="" id="" className="border border-black"/>

                    <button type="submit" className="w-1/2 bg-slate-600 text-white">Tambah Produk</button>
                </form>
            </div>
        </div>
        </>
    )
}