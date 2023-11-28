import type { NextApiRequest, NextApiResponse } from 'next';

import mime from "mime";

import { IncomingForm } from "formidable"
import mv from "mv"

import path, { join } from 'path';
import { unlink } from 'fs/promises';
import * as dateFn from "date-fn";

import Connection from '@/database/connection';

type Data = any

export const config = {
  api: {
    bodyParser: false
  }
}

interface Product {
  id: string
  nama: string
  nama_suplier: string
  deskripsi: string
  stok: number
  harga: number
  foto: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  try {
    switch (req.method) {
      case `POST`:
        const form = new IncomingForm({ maxFileSize: 2 * 1024 * 1024 })
        form.parse(req, function(err, fields, files) {
          let file = files.file[0]

          const fileExts = [`.png`, `.jpg`, `.jpeg`];

          const isAllowedExt = fileExts.includes(
              path.extname(file.originalFilename.toLowerCase())
          );
          const isAllowedMimeType = file.mimetype.startsWith("image/");

          if(!isAllowedExt || !isAllowedMimeType) return res.status(400).json({ message: `Only accept .jpeg, .png, and .jpg files` })

          const newName = `${+(new Date())}` + path.extname(file.originalFilename)
          const initialPath = file.filepath
          const newPath = `./public/uploads/products/${newName}` 
          mv(initialPath, newPath, function(err) {
            if(err) return res.status(500).json({ message: `Internal Server Error` })
          })

          addProduct({ ...fields, foto: newName })
          .then(function(response) {
            res.json({ message: `File Uploaded...` })
          })
          .catch(function(err) {
            unlink(newPath)
            .then(function(response) {
              return res.status(500).json({ message: `Internal Server Error` });
            })
            .catch(function(err) {
              return res.status(500).json({ message: `Internal Server Error` });
            })
          })
        })
        break;
    }
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error` });
  }
}

async function addProduct({ nama, deskripsi, harga, stok, foto, suplier_id })  {
  try {
    const db = await Connection.connect()
    let query = `
    INSERT INTO produk(nama, deskripsi, harga, stok, foto, suplier_id)
    VALUES(?, ?, ?, ?, ?, ?)
    `
    const response = await db.run(query, [nama[0], deskripsi[0], harga[0], stok[0], foto, suplier_id[0]])
    return response
  } catch (error) {
    throw error
  }
}
