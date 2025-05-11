import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  databaseUrl: process.env.DB_URL,
  bcrypt_salt_rounds: process.env.Bcrypt_salt_rounds,
  default_password: process.env.Default_password,
  Node_env: process.env.NODE_ENV,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expire_in:process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expire_in:process.env.JWT_REFRESH_EXPIRES_IN,
  rest_password_ui_link:process.env.RESET_PASSWORD_UI_LINK
};
