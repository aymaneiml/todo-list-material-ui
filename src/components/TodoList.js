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

export default function TodoList() {
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
          <Todo />
        </CardContent>
      </Card>
    </Container>
  );
}
