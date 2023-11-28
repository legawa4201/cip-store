import type { NextApiRequest, NextApiResponse } from 'next';

import Connection from '@/database/connection';
import fs from "fs/promises";

type Data = {
    message: string
}

type RawData = {
    nama: string
    deskripsi: string
    harga: number
    stok: number
    suplier_id: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    try {
        const data = await fs.readFile(`database/mock_data.json`, `utf-8`);
        const values = JSON.parse(data).map(function(prod: RawData) {
            return `('${prod.nama}', '${prod.deskripsi}', '${prod.harga * 100}', '${prod.stok}', 'stock_photo.png', '${prod.suplier_id}')`
        }).join()
        const db = await Connection.connect(); 
        db.exec(`
        INSERT INTO produk(nama, deskripsi, harga, stok, foto, suplier_id)
        VALUES 
        ` + values)
        res.json({ message: `Successfuly seeding into database!` });   
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: `Internal Server Error` });
    }
}
