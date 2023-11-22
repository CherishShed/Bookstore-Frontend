import { Button, TextField } from "@mui/material";
import {
  bookStore,
  modalData,
  modalStore,
  toastStore,
} from "../contexts/states";
import { useEffect, useState } from "react";
import { bookController } from "../services/book.service";

function Modal() {
  const showModal = modalStore((store) => store.show);
  const hideModal = modalStore((store) => store.hideModal);
  const modalData = modalStore((store) => store.status);
  const setToastText = toastStore((store) => store.setToastText);
  const addBooks = bookStore((store) => store.addBook);
  const editBook = bookStore((store) => store.editBook);
  const modalAction = modalStore((store) => store.action);
  const setModalAction = modalStore((store) => store.setAction);
  const [modalState, setModalState] = useState({
    title: modalData.title,
    author: modalData.author,
    publishYear: modalData.publishYear,
  });
  useEffect(() => {
    setModalState(modalData);
  }, [modalData]);
  return (
    <div
      className={`${
        showModal ? "" : "hidden"
      } absolute z-10 top-0 w-screen h-screen bg-gray-400/50`}
    >
      <div className="absolute top-1/3 left-1/4 w-1/2 h-fit gap-4 border border-slate-400 rounded-md bg-white text-black flex flex-col justify-between p-4">
        <h2 className="font-bold">Book Details</h2>
        <TextField
          variant="outlined"
          label="Title"
          name="title"
          value={modalState.title}
          onChange={(e) =>
            setModalState({ ...modalState, title: e.target.value })
          }
          fullWidth
          disabled={modalAction === "View" ? true : false}
        />
        <TextField
          variant="outlined"
          label="Author"
          name="author"
          value={modalState.author}
          fullWidth
          onChange={(e) =>
            setModalState({ ...modalState, author: e.target.value })
          }
          disabled={modalAction === "View" ? true : false}
        />
        <TextField
          variant="outlined"
          name="yearPublished"
          label="Year Published"
          value={modalState.publishYear}
          fullWidth
          onChange={(e) =>
            setModalState({
              ...modalState,
              publishYear: e.target.value,
            })
          }
          disabled={modalAction === "View" ? true : false}
        />
        <div className="border-t-2 border-slate-500 pt-2 flex justify-between">
          <Button
            onClick={() => {
              hideModal();
              setModalState({ title: "", author: "", publishYear: "" });
            }}
            className="w-fit"
            variant="contained"
            color="error"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              if (modalAction === "Add") {
                if (
                  modalState.author === "" ||
                  modalState.author === "" ||
                  modalState.publishYear === ""
                ) {
                  setToastText("error", "Please Fill all details");
                } else {
                  bookController
                    .addBook(modalState)
                    .then((book: modalData) => {
                      addBooks(
                        book._id!,
                        book.title!,
                        book.author!,
                        book.publishYear!
                      );
                      setToastText("success", "Book Added Successfully");
                      hideModal();
                    })
                    .catch((error) => {
                      setToastText("error", error.message);
                    });
                }
              } else if (modalAction === "Edit") {
                bookController
                  .editBook(modalData._id!, modalState)
                  .then(() => {
                    editBook(modalData!._id!, modalState);
                    setToastText("success", "Book Edited Successfully");
                    hideModal();
                  })
                  .catch((error) => {
                    setToastText("error", error.message);
                  });
              } else {
                setModalAction("Edit");
              }
            }}
            className={`w-fit`}
            variant="contained"
            color="success"
          >
            {modalAction !== "View" ? "Done" : "Edit"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
