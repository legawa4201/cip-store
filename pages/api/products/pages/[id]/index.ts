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
    const { id } = req.query
    const data = await getProducts(id)
    res.json(data)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Internal Server Error` })
  }
}

async function getProducts(page) {
    try {
      const db = await Connection.connect();
      let query = `
      SELECT p.id, p.nama, p.stok, s.nama_suplier 
      FROM produk AS p 
      JOIN suplier AS s
      ON p.suplier_id = s.id_suplier
      `
      let pagination = `
      LIMIT 7
      OFFSET 
      ` + (page - 1) * 7
      const products = await db.all(query + pagination)
  
      const totalProduct = await db.get(`
      SELECT COUNT(*)
      FROM produk;
      `)
      return { products, totalProduct }
    } catch (error) {
      console.error(error)
    }
  }