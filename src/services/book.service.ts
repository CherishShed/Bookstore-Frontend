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
  deleteBook: async (id: string) => {
    try {
      const deleted = axios
        .delete(`http://localhost:8081/api/books/${id}`)
        .then((response) => {
          return response.data.data;
        });
      return deleted;
    } catch (error) {
      console.log(error);
    }
  },
  getSingleBook: async (id: string) => {
    try {
      const book = axios
        .get(`http://localhost:8081/api/books/${id}`)
        .then((response) => {
          return response.data.data;
        });
      return book;
    } catch (error) {
      console.log(error);
    }
  },
  addBook: async (data: {
    title: string | null;
    author: string | null;
    publishYear: string | null;
  }) => {
    try {
      const book = axios
        .post(`http://localhost:8081/api/books`, data)
        .then((response) => {
          return response.data.data;
        });
      return book;
    } catch (error) {
      console.log(error);
    }
  },
  editBook: async (
    id: string,
    data: {
      title: string | null;
      author: string | null;
      publishYear: string | null;
    }
  ) => {
    try {
      const book = axios
        .put(`http://localhost:8081/api/books/${id}`, data)
        .then((response) => {
          return response.data.data;
        });
      return book;
    } catch (error) {
      console.log(error);
    }
  },
};
