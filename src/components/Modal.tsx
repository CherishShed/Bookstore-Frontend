import { Button, TextField } from "@mui/material";
import { modalStore } from "../contexts/states";

function Modal() {
  const showModal = modalStore((store) => store.show);
  const hideModal = modalStore((store) => store.hideModal);

  return (
    <div
      className={`${
        showModal ? "" : "hidden"
      } absolute z-10 top-0 w-screen h-screen bg-gray-400/50`}
    >
      <div className="absolute top-1/3 left-1/4 w-1/2 h-fit gap-4 border border-slate-400 rounded-md bg-white text-black flex flex-col justify-between p-4">
        <h2 className="font-bold">Book Details</h2>
        <TextField variant="outlined" label="Title" fullWidth />
        <TextField variant="outlined" label="Author" fullWidth />
        <TextField
          variant="outlined"
          type="number"
          label="Year Published"
          fullWidth
        />
        <div className="border-t-2 border-slate-500 pt-2 flex justify-between">
          <Button
            onClick={hideModal}
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
