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

  const page = props.page;
  const bid = props.bid;
  const customserviceid = props.id;

  const providername = ReactSession.get("username");

  const [open, setOpen] = useState(false);
  const [serviceDescription, setDescription] = useState("");
  const [serviceCategory, setCategory] = useState("Graphics & Design");
  const [price, setPrice] = useState("");
  const [days, setDays] = useState("");
  const [serviceDescriptionReq, setDescriptionReq] = useState(true);
  const [priceReq, setPriceReq] = useState(true);
  const [daysReq, setDaysReq] = useState(true);
  const accepted = 0;

  const history = useHistory();
  

  const handleAdd = (e) => {
    e.preventDefault();
    let service;
    let url;


    if (page === "Home") {
      service = {
        providername,
        serviceDescription,
        serviceCategory,
        price,
        accepted
      };
      url = "http://localhost:8085/user/addNormalService"
      ReactSession.set("added", true);
    }
    else if (page === "Custom") {
        service = {
          serviceDescription,
          serviceCategory,
          requestername : providername,
          maxprice : price,
          accepted,
          bidaccepted : 0
        };
      url = "http://localhost:8085/user/addCustomService";
      ReactSession.set("added", true);
    
  }
  else if(bid === 1){
      service = {
          customserviceid,
          bidDescription: serviceDescription,
          providername,
          price,
          daystocomplete: days,
        };
      url = "http://localhost:8085/user/addBid";
      ReactSession.set("bid", true);
  }
    

    if (serviceDescription != "" && price != "") {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      }).then(() => {
        console.log("new service added");
        setDescription("");
        setCategory("Graphics & Design");
        setPrice("");
        setDays("");
        setOpen(false);
        if (bid === 1)
          history.push("/custom_services");
        window.location.reload();
        
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
    setDays("");
    setOpen(false);
  };

  useEffect(() => {
    if (serviceDescription === "") {
      setDescriptionReq(false);
    }
    if (price === "") {
      setPriceReq(false);
    }
    if (bid === 1) {
      if (days === "")
        setDaysReq(false);
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
          {bid === 1 ? "Add Bid" :
            page === "Home" ? "Add Service" :
            "Add Custom Service"}
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
            label={
              page == "Home"
                ? "Service Description"
                : "Custom Service Description"
            }
            value={serviceDescription}
            onChange={(e) => {
              setDescription(e.target.value);
              setDescriptionReq(true);
            }}
            autoComplete="off"
          />
          {bid != 1 && (
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
                  <MenuItem value={"Video & Animation"}>
                    {"Video & Animation"}
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
          )}
          <TextField
            error={!priceReq}
            helperText={priceReq ? "" : "This field cannot be empty."}
            required
            margin="normal"
            id="price"
            label={page == "Home" ? "price" : "Upper price"}
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              setPriceReq(true);
            }}
            autoComplete="off"
          />
          {bid === 1 && (
            <TextField
              error={!daysReq}
              helperText={daysReq ? "" : "This field cannot be empty."}
              required
              margin="normal"
              id="Deadline_Days"
              label="Deadline Days"
              type="number"
              value={days}
              onChange={(e) => {
                setDays(e.target.value);
                setDaysReq(true);
              }}
              autoComplete="off"
            />
          )}
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
