import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { InputAdornment } from "@mui/material";
import { useState } from "react";

export default function NewService() {
  const [open, setOpen] = useState(false);
  
  const [provider, setProvider] = useState("");
  const [title, setTitle] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    const service = { provider, title };

    fetch("http://localhost:8000/Services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(service),
    }).then(() => {
      console.log("new service added");
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ mt: 3, mr: 4, background: "#430f58" }}
          onClick={handleClickOpen}
        >
          Add Service
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Service</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 500,
            height: 300,
          }}
        >
          <DialogContentText>Add your service data</DialogContentText>
          <TextField
            fullWidth
            margin="normal"
            id="Provider"
            label="Provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          />
          <TextField
            margin="normal"
            id="title"
            label="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
