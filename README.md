# 📚 MongoDB Fundamentals Assignment - Bookstore Database

## 🏗️ Setup Instructions

### **1️⃣ Install MongoDB**
- Download and install MongoDB from [MongoDB's official website](https://www.mongodb.com/try/download/community).
- Ensure MongoDB is accessible in your terminal:
  ```powershell
  mongod --version
  mongosh --version
  ```

### **2️⃣ Create Database & Collection**
- Open **mongosh** and run:
  ```javascript
  use plp_bookstore
  db.createCollection("books")
  ```
- This sets up the required database and collection.

### **3️⃣ Insert Books Data**
- Navigate to the project folder in **PowerShell** or **Terminal**:
  ```powershell
  cd path/to/your/project
  ```
- Run the script to populate your collection:
  ```powershell
  node insert_books.js
  ```
- Verify successful insertion:
  ```javascript
  db.books.find().pretty()
  ```

## 🔍 Query Execution Guide
Below are key queries showcasing **CRUD operations, advanced queries, aggregation pipelines, and indexing**.

### **📌 Basic Queries**
#### Find all books by a specific author:
```javascript
db.books.find({ author: "Paulo Coelho" })
```
#### Find books published after 2005:
```javascript
db.books.find({ published_year: { $gt: 2005 } })
```
#### Update a book's price:
```javascript
db.books.updateOne(
  { title: "The Alchemist" },
  { $set: { price: 12.99 } }
)
```
#### Delete a book by title:
```javascript
db.books.deleteOne({ title: "Old Man and the Sea" })
```

### **🧠 Advanced Queries**
#### Find books in stock and published after 2010:
```javascript
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })
```
#### Display only `title`, `author`, and `price`:
```javascript
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })
```

### **📊 Aggregation Pipelines**
#### Find average book price per genre:
```javascript
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])
```
#### Identify the author with the most books:
```javascript
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])
```

### **⚡ Indexing**
#### Create an index on book titles:
```javascript
db.books.createIndex({ title: 1 })
```
#### Test performance using `explain()`:
```javascript
db.books.find({ title: "The Alchemist" }).explain("executionStats")
```

## ✅ Submission Checklist
- [ ] Ensure all queries run successfully in `mongosh`.
- [ ] Take a **screenshot** of the inserted book collection.
- [ ] Update your `queries.js` file with all required queries.
- [ ] Push the completed assignment to **GitHub Classroom**:
  ```powershell
  git add .
  git commit -m "Completed MongoDB Assignment"
  git push origin main
  ```