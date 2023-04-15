const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DB_QUERYSTRING = process.env.DB_QUERYSTRING;

exports.dbInit = () => {
    // mongoose.connection.on('open', () => console.log('DB is connected!'));
    mongoose.set('strictQuery', false);
    return mongoose.connect(DB_QUERYSTRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log("Mongo connected"))
        .catch((error) => console.log(error));
}


