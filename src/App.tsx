import { Button } from "@mui/material";
import Modal from "./components/Modal";
import MyTable from "./components/Table";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { modalStore, toastStore } from "./contexts/states";

function App() {
  const toastText = toastStore((store) => store.toastText);
  const toastStatus = toastStore((store) => store.status);
  const showModal = modalStore((store) => store.showModal);
  const showToast = toastStore((store) => store.show);
  const closeToast = toastStore((store) => store.closeToast);

  useEffect(() => {
    if (showToast) {
      notify(toastText, toastStatus);
    }
  }, [toastText, showToast]);
  const notify = (toastText: string | null, toastStatus: string) => {
    if (toastStatus === "success") {
      toast.onChange(closeToast);
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
  return (
    <div>
      <MyTable></MyTable>
      <Modal></Modal>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          showModal({ _id: "", title: "", author: "", publishYear: "" }, "Add");
        }}
        fullWidth={true}
      >
        Add
      </Button>
      <ToastContainer />
    </div>
  );
}

export default App;
