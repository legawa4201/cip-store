import type { NextApiRequest, NextApiResponse } from 'next';

import mime from "mime";

import Connection from '@/database/connection';

type Data = any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  try {

    const supliers = await getSupliers()
    res.json(supliers)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Internal Server Error` });
  }
}

async function getSupliers() {
    try {
     const db = await Connection.connect()   
     const query = `
     SELECT id_suplier, nama_suplier FROM suplier;
     `
     return db.all(query)
    } catch (error) {
        throw error
    }
}