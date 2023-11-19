import { Button } from "@mui/material";
import Modal from "./components/Modal";
import MyTable from "./components/Table";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { modalStore, toastStore } from "./contexts/states";

function App() {
  const notify = (toastText: string | null, toastStatus: string) => {
    if (toastStatus === "success") {
      toast.success(toastText, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 800,
      });
    } else {
      toast.error(toastText, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 800,
      });
    }
  };
  const toastText = toastStore((store) => store.toastText);
  const toastStatus = toastStore((store) => store.status);
  const showModal = modalStore((store) => store.showModal);
  useEffect(() => {
    notify(toastText, toastStatus);
  }, [toastText]);
  return (
    <div>
      <MyTable></MyTable>
      <Modal></Modal>
      <Button
        variant="outlined"
        color="success"
        onClick={() => {
          showModal({ _id: "", title: "", author: "", publishYear: 0 }, "Add");
        }}
      >
        Add
      </Button>
      <ToastContainer />
    </div>
  );
}

export default App;
