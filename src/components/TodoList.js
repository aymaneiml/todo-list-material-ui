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
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

const initialTodos =[
  {id:uuidv4(), title:"Task 1", details:"task 1 details", isCompleted:false},
  {id:uuidv4(), title:"Task 2", details:"task 2 details", isCompleted:false},
  {id:uuidv4(), title:"Task 3", details:"task 3 details", isCompleted:false},
]

export default function TodoList() {



  const [todos, setTodos] = useState(initialTodos);
  const [titleInput, setTitleInput]=useState('');

  function handleCheckClick(todoId){
    const updatedTodos = todos.map((t)=>{
      if(t.id==todoId){
        t.isCompleted=!t.isCompleted
      }
      return t;
    });
    setTodos(updatedTodos)
  }

  function handlAddClick(){
    const newTodo={
      id: uuidv4(),
      title: titleInput,
      details:'',
      isCompleted:false
    }

    // const newTodos=[...todos];
    // newTodos.push(newTodo);
    // setTodos(newTodos)
    setTodos([...todos, newTodo])
    //vider l'input
    setTitleInput('')
  }

  const todosJsx = todos.map((t) => {
    return <Todo key={t.id} todo={t} handleCheck={handleCheckClick}/>
  })
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
          >
            <ToggleButton value="left">All</ToggleButton>

            <ToggleButton value="center">Done</ToggleButton>

            <ToggleButton value="right">New</ToggleButton>
          </ToggleButtonGroup>

          {/* ============Todo Component============ */}
          {todosJsx}

          {/* ====== Input to add new ==========*/}

          <Grid container spacing={2} style={{marginTop:"10px"}}>
            <Grid size={8} style={{ display: "flex", justifyContent: "space-around",alignItems: "center"}}>
              <TextField value={titleInput} onChange={(e) => {
                setTitleInput(e.target.value)
              }} style={{width:"100%"}} id="outlined-basic" label="Task Title" variant="outlined" />
            </Grid>

            <Grid size={4} style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
              <Button onClick={()=>{
                handlAddClick()
              }} style={{width:"100%", height:"100%"}} variant="contained">Add</Button>
            </Grid>
          </Grid>

        </CardContent>
      </Card>
    </Container>
  );
}
