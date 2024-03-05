import mongoose from 'mongoose'
import app from './app.js'
// import { keepAlive } from './helpers/keepAlive.js';

const {DB_HOST, PORT=3000} = process.env;

mongoose.connect(DB_HOST)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running. Use our API on port: ${PORT}`);
			// setInterval(keepAlive, 60000)
		})
	})
	.catch(error => {
		console.log(error.message);
		process.exit(1);
	})