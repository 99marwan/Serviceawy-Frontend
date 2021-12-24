import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ReactSession } from "react-client-session";

export default function NewService(props) {
  const providerid = ReactSession.get("userid");

  const [open, setOpen] = useState(false);
  const [serviceDescription, setDescription] = useState("");
  const [serviceCategory, setCategory] = useState("Graphics & Design");
  const [price, setPrice] = useState("");


  const [serviceDescriptionReq, setDescriptionReq] = useState(true);
 
  const [priceReq, setPriceReq] = useState(true);
  const history = useHistory();
  

  const handleAdd = (e) => {
    e.preventDefault();
    const service = {
      providerid,
      serviceDescription,
      serviceCategory,
      price,
    };
    
    if (serviceDescription != "" && price != "") {
      fetch("http://localhost:8085/service/addNormalService", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      }).then(() => {
        console.log("new service added");
        setDescription("");
        setCategory("Graphics & Design");
        setPrice("");
        window.location.reload();
        setOpen(false);
      });
    }    
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    
    setDescription("");
    setCategory("Graphics & Design");
    setPrice("");
    setOpen(false);
  };

  useEffect(() => {
    if (serviceDescription === "") {
      setDescriptionReq(false);
    }
    if (price === "") {
      setPriceReq(false);
    }
  });

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
          sx={{ mt: 3, mr: 4, background: "#bd814b" }}
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
            error={!serviceDescriptionReq}
            helperText={
              serviceDescriptionReq ? "" : "This field cannot be empty."
            }
            required
            margin="normal"
            id="ServiceDescription"
            label="ServiceDescription"
            value={serviceDescription}
            onChange={(e) => {
              setDescription(e.target.value);
              setDescriptionReq(true);
            }}
          />
          <Box sx={{ minWidth: 120, marginTop: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="ServiceCategory"
                id="ServiceCategory"
                value={serviceCategory}
                label="ServiceCategory"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value={"Graphics & Design"}>
                  {"Graphics & Design"}
                </MenuItem>
                <MenuItem value={"Digital Marketing"}>
                  {"Digital Marketing"}
                </MenuItem>
                <MenuItem value={"Writing & Translation"}>
                  {"Writing & Translation"}
                </MenuItem>
                <MenuItem value={"Video & Animation "}>
                  {"Video & Animation "}
                </MenuItem>
                <MenuItem value={"Music & Audio"}>{"Music & Audio"}</MenuItem>
                <MenuItem value={"Programming & Tech"}>
                  {"Programming & Tech"}
                </MenuItem>
                <MenuItem value={"Business"}>{"Business"}</MenuItem>
                <MenuItem value={"Lifestyle"}>{"Lifestyle"}</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TextField
            error={!priceReq}
            helperText={priceReq ? "" : "This field cannot be empty."}
            required
            margin="normal"
            id="price"
            label="price"
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              setPriceReq(true);
            }}
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
