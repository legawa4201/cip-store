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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Internal Server Error` })
  }
}
