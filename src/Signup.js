
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";


const Signup = () => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [DOB, setDOB] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [requiredField1, setRequiredField1] = useState(true);
  const [requiredField2, setRequiredField2] = useState(true);
  const [requiredField3, setRequiredField3] = useState(true);
  const [requiredField4, setRequiredField4] = useState(true);
  const reg = /^([a-zA-Z0-9_\\.]+)@([a-zA-Z]+).([a-zA-Z_.]+)$/;
  const reg2 = /^([a-zA-Z0-9_.]+)$/;
  const reg3 = /^([a-zA-Z0-9_\\.-]+)$/;


  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (email === "")
      setRequiredField1(false);
    else
      setRequiredField1(true);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
    setRequiredField2(true);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setRequiredField3(true);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setRequiredField4(true);
  };
  const handleDOB = (e) => {
    setDOB(e.target.value);
  };
  const handleSignup = (e) => {
    if (email === "") {
      setRequiredField1(false);
    }
    if (username === "") {
      setRequiredField2(false);
    }
    if (password === "") {
      setRequiredField3(false);
    }
    if (confirmPassword === "") {
      setRequiredField4(false);
    }
  };


  return (
    <div className="Signup">
      <h1>  {console.log(reg2.test(username))} </h1>
      <h1> {username} </h1>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          marginTop: 10,
        }}
      >
        <Grid item>
          <Card
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              height={150}
              image="https://picsum.photos/400/300"
              alt="random"
            />
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                error={!requiredField1 || !reg.test(email)}
                helperText={ requiredField1 ? "" : "This field cannot be empty."}
                required
                fullWidth
                margin="normal"
                id="E-mail"
                label="E-mail"
                variant="outlined"
                value={email}
                onChange={handleEmail}
              />
              <TextField
                error={!requiredField2}
                required
                fullWidth
                margin="normal"
                id="Username"
                label="Username"
                variant="outlined"
                value={username}
                onChange={handleUsername}
                helperText={requiredField2 ? "" : "This field cannot be empty."}
              />
              <TextField
                error={!requiredField3}
                helperText={requiredField3 ? "" : "This field cannot be empty."}
                required
                fullWidth
                margin="normal"
                id="password"
                label="password"
                variant="outlined"
                value={password}
                onChange={handlePassword}
              />
              <TextField
                error={!requiredField4}
                helperText={requiredField4 ? "" : "This field cannot be empty."}
                required
                fullWidth
                margin="normal"
                id="confirm password"
                label="confirm password"
                variant="outlined"
                value={confirmPassword}
                onChange={handleConfirmPassword}
              />

              <Button onClick={handleSignup}
                variant="contained"
                sx={{
                  marginTop: 5,
                  background: "#c3195d",
                  backgroundColor: "#c3195d",
                }}
              >
                Signup
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}

export default Signup;