import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { ReactSession } from "react-client-session";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import useFetch from "./useFetch";

export default function Bids(props) {
  const id = props.id;

  const { data: bids } = useFetch(`http://localhost:8085/user/loadBids/${id}`);

  const [open, setOpen] = useState(false);
  const [dense, setDense] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const handleAccept = (bid) => {
      fetch("http://localhost:8085/user/acceptRejectBid/true", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bid),
      }).then(() => {
        console.log("bid Accepted");
        window.location.reload();
      });
    };
    const handleDecline = (bid) => {
      fetch("http://localhost:8085/user/acceptRejectBid/false", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bid),
      }).then(() => {
        console.log("bid Rejected");
        window.location.reload();
      });
    };

  return (
    <div>
      {console.log(bids)}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Button
          variant="contained"
          startIcon={<ListRoundedIcon />}
          sx={{ mt: 3, mr: 4, background: "#bd814b" }}
          onClick={handleClickOpen}
        >
          List
        </Button>
      </div>
      {open && (
        <Dialog fullScreen open={open} onClose={handleClose}>
          <DialogTitle>Bids</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <DialogContentText>List Of Bids</DialogContentText>

            <Grid item>
              <List dense={dense}>
                {bids.map((bid) => (
                  <ListItem key={bid.bidid}>
                    <ListItemAvatar>
                      <Avatar
                        alt={ReactSession.get("username")}
                        src="/broken-image.jpg"
                        sx={{ bgcolor: "#678983" }}
                      ></Avatar>
                    </ListItemAvatar>
                    <ListItemText width={100} primary={bid.providername} />
                    <ListItemText width={100} primary={bid.bidDescription} />
                    <ListItemText width={100} primary={bid.daystocomplete} />
                    <ListItemText width={100} primary={bid.price} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="accept"
                        color="success"
                        onClick={() => handleAccept(bid)}
                      >
                        <DoneIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="decline"
                        color="error"
                        onClick={() => handleDecline(bid)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
