import { create } from "zustand";
import { produce } from "immer";
export type modalData = {
  _id: string | null;
  title: string | null;
  author: string | null;
  publishYear: string | null;
};
type modalType = {
  show: boolean;
  status: modalData;
  action: "Add" | "Edit" | "View";
  setAction: (action: string) => void;
  showModal: (status: modalData, action: string) => void;
  hideModal: () => void;
};
type toastType = {
  toastText: string | null;
  status: "success" | "error";
  show: boolean;
  setToastText: (status: "success" | "error", text: string) => void;
  closeToast: () => void;
};

export const toastStore = create<toastType>()((set) => ({
  toastText: null,
  status: "success",
  show: true,
  setToastText: (status: string, text: string) =>
    set(
      produce((store) => {
        store.toastText = text;
        store.status = status;
        store.show = true;
      })
    ),
  closeToast: () =>
    set(
      produce((store) => {
        store.show = false;
      })
    ),
}));
export const modalStore = create<modalType>()((set) => ({
  show: false,
  action: "Add",
  status: { _id: null, title: null, author: null, publishYear: null },
  setAction: (action: string) => {
    set(
      produce((store) => {
        store.action = action;
      })
    );
  },
  showModal: (status, action) =>
    set(
      produce((store) => {
        store.show = true;
        store.status = status;
        store.action = action;
      })
    ),
  hideModal: () =>
    set(
      produce((store) => {
        store.show = false;
        store.status = {
          _id: null,
          title: null,
          author: null,
          publishYear: null,
        };
      })
    ),
}));

type storetype = {
  books: modalData[];
  addBook: (
    _id: string,
    title: string,
    author: string,
    publishYear: string
  ) => void;
  removeBook: (id: string) => void;
  editBook: (
    id: string,
    data: {
      title: string | null;
      author: string | null;
      publishYear: string | null;
    }
  ) => void;
  setBooks: (books: modalData[]) => void;
};
export const bookStore = create<storetype>()((set) => ({
  books: [],
  editBook: (id, data) =>
    set(
      produce((store: storetype) => {
        store.books = store.books.map((book) => {
          if (id === book._id) {
            book.title = data.title;
            book.author = data.author;
            book.publishYear = data.publishYear;
          }
          return book;
        });
      })
    ),
  addBook: (_id, title, author, publishYear) =>
    set((store: storetype) => ({
      books: [...store.books, { _id, author, title, publishYear }],
    })),
  removeBook: (id) =>
    set((store: storetype) => ({
      books: store.books.filter((Book) => id !== Book._id),
    })),

  setBooks: (books) => {
    set(
      produce((store) => {
        store.books = books;
      })
    );
  },
}));
