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
  try {
    const { id }: { id: string } = req.query
    switch (req.method) {
      case `GET`:
        const responseGET = await getProductDetail(+id)
        res.json(responseGET)
        break;
      case `DELETE`:
        const responseDEL = await deleteProduk(+id)
        res.json({ message: `Products deleted...` })
        break;
      case `PUT`:
        const responsePut  = await editProduct(req.body, id)
        res.json(responsePut)
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
    SELECT p.*, s.nama_suplier FROM produk AS p
    JOIN suplier AS s ON p.suplier_id = s.id_suplier
    WHERE id = ?;
    `;

    return db.get(query, [id]);
  } catch (error) {
    throw error
  }
}

async function editProduct({nama, deskripsi, harga, stok, suplier_id}, id: number) {
  try {
    let db = await Connection.connect()

    let query = `
    UPDATE produk
    SET 
    nama = ?,
    deskripsi = ?,
    harga = ?,
    stok = ?,
    suplier_id = ?
    WHERE id = ?
    `

    return db.run(query, [nama, deskripsi, harga, stok, suplier_id, id])
  } catch (error) {
    throw error
  }
}
