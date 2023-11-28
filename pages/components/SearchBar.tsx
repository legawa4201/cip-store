export default function () {
    return (
        <>
            <div className="flex w-full gap-x-2">
                <button className="btn w-1/12" onClick={() => document.getElementById('my_modal').showModal()}>New Product</button>
                <form className="w-11/12 gap-x-3">
                    <input type="search" name="search" className="input input-bordered w-11/12" />
                    <button type="submit" className="w-1/12 btn">Cari</button>
                </form>
            </div>
        </>
    )
}