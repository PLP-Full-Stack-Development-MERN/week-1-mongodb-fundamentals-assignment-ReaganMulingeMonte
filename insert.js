
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('library');
        const books = database.collection('books');

        const bookData = [
            { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", publishedYear: 2004, genre: "Science Fiction", ISBN: "978-0345391803" },
            { title: "1984", author: "George Orwell", publishedYear: 1949, genre: "Dystopian", ISBN: "978-0451524935" },
            { title: "The Lord of the Rings", author: "J.R.R. Tolkien", publishedYear: 1954, genre: "Fantasy", ISBN: "978-0618002257" },
            { title: "The Da Vinci Code", author: "Dan Brown", publishedYear: 2003, genre: "Thriller", ISBN: "978-0385504201" },
            { title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", publishedYear: 2014, genre: "History", ISBN: "978-0062316255" }
        ];

        const result = await books.insertMany(bookData);
        console.log(`${result.insertedCount} documents inserted.`);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);