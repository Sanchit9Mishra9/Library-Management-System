import { Book } from "../../models/Book.js";

async function CreateBooks(req, res) {
  try {
    const { name, author, imageUrl } = req.body;
    const student = await Book.findOne({ name });
    if (student) {
      return res.json({ message: "book is already registered" });
    }
    const newBook = new Book({
      name,
      author,
      imageUrl,
    });

    await newBook.save();
    return res.json({ added: true });
  } catch (e) {
    return res.json({ message: "Error in adding book" });
  }
}

async function AllBooks(req, res) {
  try {
    const books = await Book.find();
    return res.json({ books });
  } catch (err) {
    res.json(err);
  }
}

async function GetParticularBook(req, res) {
  const id = req.params.id;
  try {
    const book = await Book.findById({ _id: id });
    return res.json(book);
  } catch (err) {
    return res.json({ Error: true });
  }
}

async function UpdateBook(req, res) {
  const id = req.params.id;
  const { name, author, imageUrl } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(
      { _id: id },
      { name, author, imageUrl }
    );
    return res.json({ updated: true, book });
  } catch (err) {
    res.json(err);
  }
}

async function DeleteBook(req, res) {
  const id = req.params.id;
  try {
    const book = await Book.findByIdAndDelete({ _id: id });
    return res.json({ deleted: true, book });
  } catch (err) {
    res.json(err);
  }
}
export { CreateBooks, AllBooks, GetParticularBook, UpdateBook, DeleteBook };
