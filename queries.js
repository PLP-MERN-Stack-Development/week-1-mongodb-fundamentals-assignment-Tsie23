// Task 1: MongoDB Setup
// To create a new database called `plp_bookstore` 
// use plp_bookstore
// To create a collection called `books`
// db.createCollection("books")

// Task 2: Basic CRUD Operations

// 1. Find all books in the "Fiction" genre
db.books.find({ genre: "Fiction" })

// 2. Find books published after the year 1982
db.books.find({ published_year: { $gt: 1982 } })

// 3. Find books by author "Harper Lee"
db.books.find({ author: "Harper Lee" })

// 4. Update the price of "Animal Farm" to 12.99
db.books.updateOne(
  { title: "Animal Farm" },
  { $set: { price: 12.99 } }
)

// 5. Delete a book with the title "Old Man and the Sea"
db.books.deleteOne({ title: "Old Man and the Sea" })


// Task 3: Advanced Queries
// 1. Find books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// 2. Return only title, author, and price fields for all books
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// 3. Sort books by price in ascending order
db.books.find().sort({ price: 1 })

// 4. Sort books by price in descending order
db.books.find().sort({ price: -1 })

// 5. Pagination: Get page 1 (first 5 books)
db.books.find().limit(5)

// 6. Pagination: Get page 2 (next 5 books)
db.books.find().skip(5).limit(5)


// Task 4: Aggregation Pipeline

// 1. Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// 2. Find the author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// 3. Group books by publication decade and count them
db.books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } },
          "s"
        ]
      },
      totalBooks: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])


// Task 5: Indexing
// 1. Create index on title for faster searches
db.books.createIndex({ title: 1 })

// 2. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 })

// 3. Use explain() to see performance
db.books.find({ title: "The Alchemist" }).explain("executionStats")


