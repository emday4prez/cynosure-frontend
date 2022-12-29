import cloudinary from 'cloudinary';
import { IncomingForm } from 'formidable';
import { resolve } from 'path';
import { getTokenFromServerCookie } from '../../utils/auth';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const config = {
  api: {
    bodyParse: false,
  },
};

export default async function upload(req, res) {
  if (req.method === 'POST') {
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });
    const file = data?.files?.inputFile.filepath;
    const { user_id } = data.fields;

    try {
      const response = await cloudinary.v2.uploader.upload(file, {
        public_id: user_id,
      });
      const { public_id } = response;
      const jwt = getTokenFromServerCookie(req);
      const updateResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${user_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            avatar: public_id,
          }),
        }
      );
      const data = await updateResponse.json();
      return res.status(200).json({ message: 'success' });
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  } else {
    return res.status(405).send('Method not allowed');
  }
}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }
