import { create } from "zustand";
import { produce } from "immer";
type bookType = {
  _id: {
    title: string | null;
    author: string | null;
    publishYear: number | null;
  };
};
type modalType = {
  show: boolean;
  status: bookType;
  showModal: (status: string) => void;
  hideModal: () => void;
};
export const modalStore = create<modalType>()((set) => ({
  show: false,
  status: { _id: { title: null, author: null, publishYear: null } },
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

type bookStoreType = {
  books: bookType[];
  addBook: (dataObj: bookType) => void;
  removeBook: (id: string) => void;
};
export const myStore = create<bookStoreType>()((set) => ({
  books: [{ _id: { title: null, author: null, publishYear: null } }],
  addBook: (dataObj: bookType) =>
    set((store: bookStoreType) => ({
      books: [...store.books, dataObj],
    })),
  removeBook: (id: string) => {
    set((store: bookStoreType) => ({
      books: store.books.filter((Book) => id !== Object.keys(Book)[0]),
    }));
  },
}));
