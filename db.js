const mongoose = require('mongoose');


const db = async () => {
    try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	} catch (err) { 
		console.error(err);
		// Exit process with failure
		process.exit(1);
	}

};

module.exports = db;