import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../App.css";
import { useState } from "react";
import { useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ToastContext } from "../contexts/ToastContext";

export default function Todo({ todo, handleCheck }) {
  
  const { todos, setTodos } = useContext(TodosContext);
  const {showHideToast} = useContext(ToastContext);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title:todo.title, details:todo.details
  });

  /// EVENT HANDLERS
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
    showHideToast("the task is updated");
  }

  function handleDeleteClick() {
    setShowDeleteDialog(true);
   
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    // la liste va contenir just les task qui on pas le meme id de la tache selectionner
    // les tash dans les quelles cette condition est appliquer
    const updatedTodos = todos.filter((t) => {
      return todo.id != t.id;
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
     showHideToast("the task is deleted");
  }

  //====UPDATE FUNCTIONS

  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
  }

  function handleUpdateClick(){
     setShowUpdateDialog(true);
  }

  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t)=>{
      if(t.id == todo.id){
        return {...t, title:updatedTodo.title, details:updatedTodo.details}
      } else{
        return t;
      }
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
    setShowUpdateDialog(false)
     showHideToast("the task is updated");
  }

  ///======EVENT HANDLERS ===========
  return (
    <>
      {/* DELETE MODAL */}

      <Dialog
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">{"DELETE TASK"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You're going to delete this task. Are you sure ?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDeleteDialogClose} autoFocus>
            No, keep it
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            sx={{
              background: "red",
              color: "white",
            }}
          >
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* ====DELETE MODAL==== */}

      {/* UPDATE MODAL */}

      <Dialog
        onClose={handleUpdateDialogClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">{"EDIT TASK"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(event)=>{
              setUpdatedTodo({...updatedTodo, title: event.target.value})
            }}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="details"
            label="Details"
            type="details"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(event)=>{
              setUpdatedTodo({...updatedTodo, details: event.target.value})
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleUpdateDialogClose} autoFocus>
            No, keep it
          </Button>
          <Button
            onClick={handleUpdateConfirm}
            sx={{
              background: "red",
              color: "white",
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* ====UPDATE MODAL==== */}

      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: "35px",
        }}
      >
        <CardContent>
          {/* ========================= */}
          <Grid container spacing={2}>
            <Grid size={8} style={{}}>
              <Typography variant="h5" gutterBottom sx={{ textAlign: "left" , textDecoration: todo.isCompleted ? "line-through" : "none"}}>
                {todo.title}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ textAlign: "left" }}>
                {todo.details}
              </Typography>
            </Grid>

            {/* =========== ICONS BUTTON ============== */}
            <Grid
              size={4}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <IconButton
                aria-label="checked"
                className="iconButton"
                style={{
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  border: "solid 3px #8bc34a",
                }}
                onClick={() => {
                  handleCheckClick();
                }}
              >
                <CheckIcon />
              </IconButton>

              <IconButton
                aria-label="edit"
                className="iconButton"
                style={{
                  background: "white",
                  color: "#1769aa",
                  border: "solid 3px #1769aa",
                }}
                onClick={() => {
                  handleUpdateClick();
                }}
              >
                <EditIcon />
              </IconButton>

              {/* Delete Button */}
              <IconButton
                aria-label="delete"
                className="iconButton"
                style={{
                  background: "white",
                  color: "#b23c17",
                  border: "solid 3px #b23c17",
                }}
                onClick={() => {
                  handleDeleteClick();
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
