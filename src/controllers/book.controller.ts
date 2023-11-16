import axios from "axios";
export const bookController = {
  getAllBooks: async () => {
    try {
      const allBooks = axios
        .get("http://localhost:8081/api/books")
        .then((bookData) => {
          return bookData.data.data.books;
        });
      return allBooks;
    } catch (error) {
      console.log(error);
    }
  },
};
