import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import FolderIcon from "@mui/icons-material/Folder";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";


function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}


export default function Bids() {
 
  const providername = ReactSession.get("username");

    const [open, setOpen] = useState(false);
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    

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
          startIcon={<ListRoundedIcon />}
          sx={{ mt: 3, mr: 4, background: "#bd814b" }}
          onClick={handleClickOpen}
        >
          List
        </Button>
      </div>
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
              <ListItem>
                <ListItemText primary="Service Provider" />
                <ListItemText primary="Service Description" />

                <ListItemText primary="Days To Done" />

                <ListItemText primary="Price" />
              </ListItem>
              {generate(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? "Secondary text" : null}
                  />
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? "Secondary text" : null}
                  />

                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? "Secondary text" : null}
                  />

                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? "Secondary text" : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="accept" color="success">
                      <DoneIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="decline" color="error">
                      <CloseIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </Grid>
        </DialogContent>
    

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
