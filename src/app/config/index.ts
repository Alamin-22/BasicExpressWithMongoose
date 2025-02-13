import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  dataBaseUrl: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,
  access_secret: process.env.JWT_ACCESS_SECRET,
  refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expire_In: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expire_In: process.env.JWT_REFRESH_EXPIRES_IN,

  reset_pass_ui_Link: process.env.RESET_UI_Link,

  smtp_pass: process.env.SMTP_APP_PASSWORD,
  smtp_user: process.env.SMTP_USER_EMAIL,
  email_sender_address: process.env.SMTP_EMAIL_SENDER,

  cloudinary_name: process.env.CLOUDINARY_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_access_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_upload_url: process.env.CLODUINARY_UPLOAD_URL,
};
