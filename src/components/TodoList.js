import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { TodosContext } from "../contexts/TodosContext";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  function handleCheckClick(todoId) {}

  function handlAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };

    // const newTodos=[...todos];
    // newTodos.push(newTodo);
    // setTodos(newTodos)
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    //vider l'input
    setTitleInput("");
  }



  //Filteration
  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });

  const notCompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosToBeRendered = todos;

  if (displayedTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType == "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  const todosJsx = todosToBeRendered.map((t) => {
    return <Todo key={t.id} todo={t} handleCheck={handleCheckClick} />;
  });


  function changeDisplayedType(event) {
    setDisplayedTodosType(event.target.value);
  }

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storageTodos);
  }, []);

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          {/* ========================= */}
          <Typography
            variant="h2"
            gutterBottom
            sx={{ color: "text.secondary" }}
          >
            My Tasks
          </Typography>
          <Divider />

          {/* ========== FILTER BUTTONS ============ */}
          <ToggleButtonGroup
            exclusive
            aria-label="text alignment"
            style={{ marginTop: "30px" }}
            value={displayedTodosType}
            onChange={changeDisplayedType}
          >
            <ToggleButton value="all">All</ToggleButton>

            <ToggleButton value="completed">Completed</ToggleButton>

            <ToggleButton value="non-completed">Not Completed</ToggleButton>
          </ToggleButtonGroup>

          {/* ============Todo Component============ */}
          {todosJsx}

          {/* ====== Input to add new ==========*/}

          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid
              size={8}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <TextField
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Task Title"
                variant="outlined"
              />
            </Grid>

            <Grid
              size={4}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => {
                  handlAddClick();
                }}
                style={{ width: "100%", height: "100%" }}
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
