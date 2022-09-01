import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return uploadFile(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function uploadFile(req: NextApiRequest, res: NextApiResponse<Data>) {
  const url = await parseFiles(req);
  console.log(url);
  res.status(200).json({ message: url });
}

const saveFile = async (file: formidable.File): Promise<string> => {
  const data = await cloudinary.uploader.upload(file.filepath);
  return data.secure_url;
};

async function parseFiles(req: NextApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log(err);

        reject(err);
        return;
      }
      const url = await saveFile(files.file as formidable.File);
      resolve(url);
    });
  });
}
