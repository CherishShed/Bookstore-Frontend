import { create } from "zustand";
import { produce } from "immer";
type modalData = {
  _id: string | null;
  title: string | null;
  author: string | null;
  publishYear: number | null;
};
type modalType = {
  show: boolean;
  status: modalData;
  showModal: (status: string) => void;
  hideModal: () => void;
};
export const modalStore = create<modalType>()((set) => ({
  show: false,
  status: { _id: null, title: null, author: null, publishYear: null },
  showModal: (status) =>
    set(
      produce((store) => {
        store.show = true;
        store.status = status;
      })
    ),
  hideModal: () =>
    set(
      produce((store) => {
        store.show = false;
      })
    ),
}));

type storetype = {
  books: modalData[];
  addBook: (
    _id: string,
    title: string,
    author: string,
    publishYear: number
  ) => void;
  removeBook: (id: string) => void;
  setBooks: (books: modalData[]) => void;
};
export const bookStore = create<storetype>()((set) => ({
  books: [{ _id: null, title: null, author: null, publishYear: null }],
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
