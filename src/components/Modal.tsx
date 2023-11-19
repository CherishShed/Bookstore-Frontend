import { Button, TextField } from "@mui/material";
import { modalStore } from "../contexts/states";
import { useEffect, useState } from "react";

function Modal() {
  const showModal = modalStore((store) => store.show);
  const hideModal = modalStore((store) => store.hideModal);
  const modalData = modalStore((store) => store.status);
  const modalAction = modalStore((store) => store.action);
  const [modalState, setModalState] = useState(modalData);
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
          value={modalState.author}
          fullWidth
          onChange={(e) =>
            setModalState({ ...modalState, author: e.target.value })
          }
          disabled={modalAction === "View" ? true : false}
        />
        <TextField
          variant="outlined"
          type="number"
          label="Year Published"
          value={modalState.publishYear}
          fullWidth
          onChange={(e) =>
            setModalState({
              ...modalState,
              publishYear: parseInt(e.target.value),
            })
          }
          disabled={modalAction === "View" ? true : false}
        />
        <div className="border-t-2 border-slate-500 pt-2 flex justify-between">
          <Button
            onClick={() => {
              hideModal();
              setModalState({ _id: "", title: "", author: "", publishYear: 0 });
            }}
            className="w-fit"
            variant="contained"
            color="error"
          >
            Close
          </Button>
          <Button
            onClick={hideModal}
            className="w-fit"
            variant="contained"
            color="success"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
