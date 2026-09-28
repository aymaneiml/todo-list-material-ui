import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({

})
function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:"#191b1f",
        height:"100vh",
        
      }}
    >
      <TodoList />
    </div>
  );
}

export default App;
