import { useEffect } from "react";
import { bookStore, modalStore, toastStore } from "../contexts/states";
import { bookController } from "../services/book.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit, Visibility } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyTable() {
  const setToastText = toastStore((store) => store.setToastText);
  const books = bookStore((store) => store.books);
  const setBooks = bookStore((store) => store.setBooks);
  const removeBook = bookStore((store) => store.removeBook);
  const showModal = modalStore((store) => store.showModal);
  useEffect(() => {
    bookController
      .getAllBooks()
      .then((books) => {
        setBooks(books);
      })
      .catch((err) => {
        setToastText("error", err.message);
      });
    console.log(books);
  }, [setBooks]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, border: 1 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="left">Author</TableCell>
            <TableCell align="left">Publish Year</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.length < 1 && (
            <>
              <TableCell>
                <Skeleton animation="wave" height={100} width={100} />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" height={100} width={100} />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" height={100} width={100} />
              </TableCell>
            </>
          )}
          {books.length > 0 && (
            <>
              {books.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="left">{row.author}</TableCell>
                  <TableCell align="left">{row.publishYear}</TableCell>
                  <TableCell
                    className="gap-4 items-left justify-center h-full p-2 pt-4"
                    style={{ display: "flex" }}
                  >
                    <Edit
                      className="text-blue-500 hover:text-black"
                      fontSize="small"
                      onClick={() => {
                        bookController.getSingleBook(row._id!).then((book) => {
                          showModal(book, "Edit");
                        });
                      }}
                    />
                    <Visibility
                      className="text-green-500 hover:text-black"
                      fontSize="small"
                      onClick={() => {
                        bookController.getSingleBook(row._id!).then((book) => {
                          showModal(book, "View");
                        });
                      }}
                    />
                    <DeleteIcon
                      className="text-red-500 hover:text-black"
                      fontSize="small"
                      onClick={() => {
                        bookController
                          .deleteBook(row._id!)
                          .then(() => {
                            removeBook(row._id!);
                            setToastText("success", "Book Deleted");
                          })
                          .catch((err) => {
                            setToastText("error", err.message);
                          });
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MyTable;
