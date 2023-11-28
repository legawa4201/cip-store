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
      case `GET`:
        const data = await getProducts()
        res.json(data)
        break;
      case `POST`:
        const form = new IncomingForm()
        form.parse(req, function(err, fields, files) {
          // console.error(err)
          console.log(fields)
          let file = files.file[0]

          const fileExts = [`.png`, `.jpg`, `.jpeg`];

          const isAllowedExt = fileExts.includes(
              path.extname(file.originalFilename.toLowerCase())
          );
          const isAllowedMimeType = file.mimetype.startsWith("image/");

          if(!isAllowedExt || !isAllowedMimeType) return res.status(400).json({ message: `Only accept .jpeg, .png, and .jpg files` })

          const initialPath = file.filepath
          const newPath = `./public/uploads/products/${+(new Date())}` + path.extname(file.originalFilename)
          console.log(initialPath, newPath)
          mv(initialPath, newPath, function(err) {
            if(err) return res.status(500).json({ message: `Internal Server Error` })
          })

          const newProduct: Product = {
            ...fields,
            foto: newPath
          }
          addProduct({ ...fields, foto: newPath })
          .then(function(response) {
            console.log(response, `++++++++++++++++++++++++++++++++++++++`)
            res.json({ message: `File Uploaded...` })
          })
          .catch(function(err) {
            console.error(err, `======================================`)
            unlink(newPath)
            .then(function(response) {
              console.log(response);
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
    console.error(error);
    res.status(500).json({ message: `Internal Server Error` });
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

async function addProduct({ nama, deskripsi, harga, stok, foto })  {
  console.log(nama, deskripsi, harga, stok, foto)
  try {
    const db = await Connection.connect()
    let query = `
    INSERT INTO produk(nama, deskripsi, harga, stok, foto, suplier_id)
    VALUES(?, ?, ?, ?, ?, ?)
    `
    const response = await db.run(query, [nama[0], deskripsi[0], harga[0], stok[0], foto, 1])
    return response
  } catch (error) {
    throw error
  }
}
