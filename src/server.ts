import mongoose from 'mongoose';
import 'dotenv/config';
import app from './app';
import config from './app/config';

async function main() {
  await mongoose.connect(config.dataBaseUrl as string);

  try {
    app.listen(config.port, () => {
      console.log(
        `First Professional Backend is running on port =>  ${config.port}`,
      );
    });
  } catch (error) {
    console.log(error);
  }
}

main();
