import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: 'dxnidmdum',
  api_key: '963488326137261',
  api_secret: 'eHgJopyqdZfy51lMahtGyTdX1Qo',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bazaarhub-images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

export { cloudinary, storage };
