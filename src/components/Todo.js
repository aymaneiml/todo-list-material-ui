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

export default function Todo({todo, handleCheck}) {

  

  function handleCheckClick(){
    handleCheck(todo.id);
  }
  return (
    <>
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
              <Typography variant="h5" gutterBottom sx={{ textAlign: "left" }}>
                {todo.title}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ textAlign: "left" }}>
                {todo.details}
              </Typography>
            </Grid>

            {/* =========== ICONS BUTTON ============== */}
            <Grid
              size={4}
              style={{ display: "flex", justifyContent: "space-around",alignItems: "center" }}
            >
              <IconButton
                aria-label="checked"
                className="iconButton"
                style={{
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  color: todo.isCompleted ? "white":"#8bc34a",
                  border: "solid 3px #8bc34a",
                }}
                onClick={()=>{
                  handleCheckClick()
                }}
                
              >
                <CheckIcon/>
              </IconButton>

              <IconButton
                aria-label="edit"
                className="iconButton"
                style={{
                  background: "white",
                  color: "#1769aa",
                  border: "solid 3px #1769aa",
                }} 
              >
                <EditIcon />
              </IconButton>

              <IconButton
                aria-label="delete"
                className="iconButton"
                style={{
                  background: "white",
                  color: "#b23c17",
                  border: "solid 3px #b23c17",
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
