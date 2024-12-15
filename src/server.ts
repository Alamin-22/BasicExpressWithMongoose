import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;

// Register `uncaughtException` before other code execution
process.on('uncaughtException', (err) => {
  console.error(`😈 Uncaught Exception: ${err.message}`);
  process.exit(1); // Exit immediately as the app is in an unstable state
});

async function main() {
  try {
    // Connect to the database
    await mongoose.connect(config.dataBaseUrl as string);
    console.log('✅ Connected to the database successfully');

    // Start the server and assign it to `server`
    server = app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error(`❌ Failed to start the application: ${error}`);
    process.exit(1); // Exit if the server or DB connection fails
  }
}

// Call the main function to initialize the app
main();

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  console.error(`😈 Unhandled Rejection: ${reason}`);
  if (server) {
    server.close(() => {
      console.log('🛑 Server closed due to unhandled rejection');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
