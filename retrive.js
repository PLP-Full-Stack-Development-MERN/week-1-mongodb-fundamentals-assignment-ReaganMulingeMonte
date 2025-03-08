
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('library');
        const books = database.collection('books');

        const allBooks = await books.find().toArray();
        console.log('All books:', allBooks);

        const douglasBooks = await books.find({ author: "Douglas Adams" }).toArray();
        console.log('Douglas Adams books:', douglasBooks);

        const after2000 = await books.find({ publishedYear: { $gt: 2000 } }).toArray();
        console.log('Books after 2000:', after2000);

    } finally {
        await client.close();
    }
}
run().catch(console.dir);