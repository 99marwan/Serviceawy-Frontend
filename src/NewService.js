import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { Box, InputAdornment } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function NewService() {
  const [open, setOpen] = useState(false);
  
  const [serviceProviderUserName, setProvider] = useState("");
  const [serviceDescription, setDescription] = useState("");
  const [serviceCategory, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [serviceID, setID] = useState(0);
  const history = useHistory();

  const handleAdd = (e) => {
    e.preventDefault();
    setID(serviceID + 1);
    const service = {
      serviceProviderUserName,
      serviceDescription,
      serviceCategory,
      price,
      serviceID,
    };

    if (
      serviceProviderUserName === "" ||
      serviceDescription === "" ||
      serviceCategory === "" ||
      price === ""
    ) {
      return;
    }
    
      fetch("http://localhost:8080/service/addNormalService", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      }).then(() => {
        console.log("new service added");
        setProvider("")
        setCategory("")
        setCategory("")
        setPrice("")
        history.push("/");
        setOpen(false);
      });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setProvider("");
    setCategory("");
    setCategory("");
    setPrice("");
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
            required
            fullWidth
            margin="normal"
            id="Provider"
            label="Provider"
            value={serviceProviderUserName}
            onChange={(e) => setProvider(e.target.value)}
          />
          <TextField
            required
            margin="normal"
            id="ServiceDescription"
            label="ServiceDescription"
            value={serviceDescription}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            required
            margin="normal"
            id="ServiceCategory"
            label="ServiceCategory"
            value={serviceCategory}
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextField
            required
            margin="normal"
            id="price"
            label="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleAdd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
