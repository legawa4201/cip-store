import Connection from '@/database/connection'
import type { NextApiRequest, NextApiResponse } from 'next'

interface ResponseMessage {
  message: string
}

interface ResponseData {
  data: object[]
}

type Data = ResponseMessage | ResponseData

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const db = await Connection.connect();
  try {
    const { id } = req.query
    console.log(id)
    switch (req.method) {
      case `GET`:
        break;
      case `DELETE`:
        const response = await deleteProduk(id)
        console.log(response)
        res.json({ message: `Products deleted...` })
        break;
      case `PUT`:
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Internal Server Error` })
  }
}

async function deleteProduk(id: number) {
  try {
    let db = await Connection.connect()

    let query = `
    DELETE FROM produk
    WHERE id = ?;
    `
    return db.run(query, [id])
  } catch (error) {
    throw error
  }
}

async function getProductDetail(id: number) {
  try {
    let db = await Connection.connect()

    let query = `
    SELECT * FROM produk
    WHERE id = ?;
    `;

    return db.run(query, [id]);
  } catch (error) {
    throw error
  }
}

async function editProduct({nama, deskripsi, harga, stok}, id: number) {
  try {
    let db = await Connection.connect()

    let query = `
    UPDATE produk
    SET 
    nama = ?,
    deskripsi = ?,
    harga = ?,
    stok = ?
    WHERE id = ?
    `

    return db.run(query, [nama, deskripsi, harga, stok, id])
  } catch (error) {
    throw error
  }
}
