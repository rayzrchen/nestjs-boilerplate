import { registerAs } from '@nestjs/config';

export default registerAs('file', () => ({
  driver: process.env.FILE_DRIVER,
  maxFileSize: 5242880, // 5mb
}));
