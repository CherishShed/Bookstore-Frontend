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
  action: "Add" | "Edit" | "View";
  showModal: (status: modalData, action: string) => void;
  hideModal: () => void;
};
type toastType = {
  toastText: string | null;
  status: "success" | "error";
  setToastText: (status: "success" | "error", text: string) => void;
};

export const toastStore = create<toastType>()((set) => ({
  toastText: null,
  status: "success",
  setToastText: (status: string, text: string) =>
    set(
      produce((store) => {
        store.toastText = text;
        store.status = status;
      })
    ),
}));
export const modalStore = create<modalType>()((set) => ({
  show: false,
  action: "Add",
  status: { _id: null, title: null, author: null, publishYear: null },
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
    publishYear: number
  ) => void;
  removeBook: (id: string) => void;
  setBooks: (books: modalData[]) => void;
};
export const bookStore = create<storetype>()((set) => ({
  books: [],
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
