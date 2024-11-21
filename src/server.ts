import mongoose from 'mongoose';
import app from './app';
// import config from './app/config';
const port = 5000;

async function main() {
  // await mongoose.connect(config.dataBaseUrl as string);
  await mongoose.connect(
    'mongodb+srv://Level2-p1-basicExpressServerMongoose:1K2Nm15d6v5thxkO@cluster0.4hda1bm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' as string,
  );

  try {
    app.listen(port, () => {
      console.log(`First Professional Backend is running on port =>  ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
