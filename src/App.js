import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./contexts/TodosContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const initialTodos = [
  {
    id: uuidv4(),
    title: "Task 1",
    details: "task 1 details",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Task 2",
    details: "task 2 details",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Task 3",
    details: "task 3 details",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#191b1f",
        height: "100vh",
      }}
    >
      <TodosContext.Provider value={{todos, setTodos}}>
        <TodoList />
      </TodosContext.Provider>
    </div>
  );
}

export default App;
