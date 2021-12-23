
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
  const [checkRegEmail, setCheckRegEmail] = useState(true);
  const [checkRegUsername, setCheckRegUsername] = useState(true);
  const [checkRegPassword, setCheckRegPassword] = useState(true);
  const reg = /^([a-zA-Z0-9_\\.]+)@([a-zA-Z]+).([a-zA-Z_.]+)$/;
  const reg2 = /^([a-zA-Z0-9_.]+)$/;
  const reg3 = /^([a-zA-Z0-9_\\.-]+)$/;

  const account = { email, username, password };


  const handleEmail = (e) => {
    setEmail(e.target.value);
    setRequiredField1(true);
    setCheckRegEmail(true);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
    setRequiredField2(true);
    setCheckRegUsername(true);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setRequiredField3(true);
    setRequiredField4(true);
    setCheckRegPassword(true);
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
    if (!reg.test(email)) {
      setCheckRegEmail(false);
    }
    if (username === "") {
      setRequiredField2(false);
    }
     if (!reg3.test(username)) {
       setCheckRegUsername(false);
     }
    if (password === "") {
      setRequiredField3(false);
    }
    if (!reg3.test(password)) {
      setCheckRegPassword(false);
    }
    if (confirmPassword === "") {
      setRequiredField4(false);
    }
    if (requiredField1 || requiredField2 || requiredField3 || requiredField4) {
      return;  
    }
    if (checkRegEmail || checkRegUsername || checkRegPassword) {
      return;
    }
    if (password != confirmPassword) {
      return;
    }



  };


  return (
    <div className="Signup">
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
                error={!requiredField1 || !checkRegEmail}
                helperText={
                  (requiredField1 ? "" : "This field cannot be empty.") ||
                  (checkRegEmail
                    ? ""
                    : "Email is not correct")
                }
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
                error={!requiredField2 || !checkRegUsername}
                required
                fullWidth
                margin="normal"
                id="Username"
                label="Username"
                variant="outlined"
                value={username}
                onChange={handleUsername}
                helperText={
                  (requiredField2 ? "" : "This field cannot be empty.") ||
                  (checkRegUsername
                    ? ""
                    : "Username must include onle letters, numbers, ., _, -")
                }
              />
              <TextField
                error={!requiredField3 || !checkRegPassword}
                helperText={
                  (requiredField3 ? "" : "This field cannot be empty.") ||
                  (checkRegPassword
                    ? ""
                    : "Password must include onle letters, numbers, ., _, -")
                }
                required
                fullWidth
                margin="normal"
                id="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={handlePassword}
              />
              <TextField
                error={!requiredField4 || password != confirmPassword}
                helperText={
                  (requiredField4 ? "" : "This field cannot be empty.") ||
                  (password === confirmPassword ? "" : "passords do not match")
                }
                required
                fullWidth
                margin="normal"
                id="confirm password"
                label="Confirm Password"
                variant="outlined"
                value={confirmPassword}
                onChange={handleConfirmPassword}
              />
              <Button
                onClick={handleSignup}
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