
import {
  Avatar,
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
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ReactSession } from "react-client-session";

const Signup = () => {

  const [emailAddress, setEmail] = useState("");
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
  const [emailAlreadyExist, setEmailAlreadyExist] = useState(true);
  const [usernameAlreadyExist, setUsernameAlreadyExist] = useState(true);
  const reg = /^([a-zA-Z0-9_\\.]+)@([a-zA-Z]+).([a-zA-Z_.]+)$/;
  const reg2 = /^([a-zA-Z0-9_.]+)$/;
  const reg3 = /^([a-zA-Z0-9_\\.-]+)$/;
  
  const history = useHistory();

  const account = { emailAddress, username, password };


  const handleEmail = (e) => {
    setEmail(e.target.value);
    setRequiredField1(true);
    setCheckRegEmail(true);
    setEmailAlreadyExist(true);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
    setRequiredField2(true);
    setCheckRegUsername(true);
    setUsernameAlreadyExist(true);
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
  const handleTest = (e) => {
      if (emailAddress === "") {
        setRequiredField1(false);
      }
      if (!reg.test(emailAddress)) {
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
      if (!reg3.test(password) || password.length < 8) {
        setCheckRegPassword(false);
      }
      if (confirmPassword === "") {
        setRequiredField4(false);
      }
  };
  const handleSignup = (e) => {  
    if (!(requiredField1 && requiredField2 && requiredField3 && requiredField4)) {
      console.log("if1");
    }
    else if (!(checkRegEmail && checkRegUsername && checkRegPassword)) {
      console.log("if2");
    }
    else if (password != confirmPassword) {
      console.log("if3");
    }
    else {
      console.log("here");
      fetch("http://localhost:8085/user/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(account),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          if (data === "Email Address Already Exists") {
            setEmailAlreadyExist(false);
            if (data === "Username Already Exists") {
              setUsernameAlreadyExist(false);
            }
          }
          else if (data === "Username Already Exists") {
            setUsernameAlreadyExist(false);
            if (data === "Email Address Already Exists") {
              setEmailAlreadyExist(false);
            }
          }
          
          else {
            console.log("new user added")
            ReactSession.set("username", data.username);
            ReactSession.set("userid", data.userid);
            ReactSession.set("type", "User");
            history.push("/");
          }
          
        })
        .catch((err) => {
          console.log(err);
          setEmailAlreadyExist(false);
        });
    } 
  };

  useEffect(() => {
    handleTest();
  })


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
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="logo"
                src={require("./serviceawy2.png")}
                sx={{ width: 150, height: 150 }}
              />
              <TextField
                error={!requiredField1 || !checkRegEmail || !emailAlreadyExist}
                helperText={
                  (requiredField1 ? "" : "This field cannot be empty.") ||
                  (checkRegEmail ? "" : "Email is not correct") ||
                  (emailAlreadyExist ? "" : "Email Already exists.")
                }
                required
                fullWidth
                margin="normal"
                id="E-mail"
                label="E-mail"
                variant="outlined"
                value={emailAddress}
                onChange={handleEmail}
                autoComplete="off"
              />
              <TextField
                error={
                  !requiredField2 || !checkRegUsername || !usernameAlreadyExist
                }
                required
                fullWidth
                margin="normal"
                id="Username"
                label="Username"
                variant="outlined"
                value={username}
                onChange={handleUsername}
                autoComplete="off"
                helperText={
                  (requiredField2 ? "" : "This field cannot be empty.") ||
                  (checkRegUsername
                    ? ""
                    : "Username must include only letters, numbers, ., _, -") ||
                  (usernameAlreadyExist ? "" : "Username Already exists.")
                }
              />
              <TextField
                error={!requiredField3 || !checkRegPassword}
                helperText={
                  (requiredField3 ? "" : "This field cannot be empty.") ||
                  (checkRegPassword
                    ? ""
                    : "Password must be more than 8 chars, include only letters, numbers, ., _, -")
                }
                required
                fullWidth
                margin="normal"
                id="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={handlePassword}
                autoComplete="off"
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
                autoComplete="off"
              />
              <Button
                onClick={handleSignup}
                variant="contained"
                sx={{
                  marginTop: 5,
                  background: "#bd814b",
                  backgroundColor: "#bd814b",
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