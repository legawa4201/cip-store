import type { NextApiRequest, NextApiResponse } from 'next';

import Connection from '@/database/connection'

type Data = any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case `GET`:
      const data = await getProducts()
      res.json(data)
      break;
    case `POST`:
      break;
  }
}

async function getProducts() {
  try {
    const db = await Connection.connect();
    const products = await db.all(`
    SELECT p.id, p.nama, p.stok, s.nama_suplier 
    FROM produk AS p 
    JOIN suplier AS s
    ON p.suplier_id = s.id_suplier
    LIMIT 7
    OFFSET 0;
    `)

    const totalProduct = await db.get(`
    SELECT COUNT(*)
    FROM produk;
    `)
    return { products, totalProduct }
  } catch (error) {
    console.error(error)
  }
}
