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
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ReactSession } from "react-client-session";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const [accountType, setAccountType] = useState("User");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notExist, setNotExist] = useState(true);
  const history = useHistory();
  

  const handleChange = (e) => {
    setAccountType(e.target.value)
  };
  
  const handleuserName = (e) => {
    setuserName(e.target.value)
  }
    const handlePassword = (e) => {
      setPassword(e.target.value);
    };
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
  const handleLogin = (e) => {
    if (userName != "" && password != "") {
      console.log(accountType);
      if (accountType == "User") {
        fetch(`http://localhost:8085/user/signIn/${userName}/${password}`)
          .then((res) => {
            
            return res.json();
          })
          .then((data) => {
            console.log(data);

            ReactSession.set("username", data.username);
            ReactSession.set("userid", data.userid);
            ReactSession.set("type", "User");

            history.push("/");
          })
          .catch((err) => {
            console.log(err);
            setNotExist(false)
          });
      } else {
        fetch(`http://localhost:8085/manager/signIn/${userName}/${password}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            ReactSession.set("username", data.username);
            ReactSession.set("userid", data.userid);
            ReactSession.set("type", "Manager");

            history.push("/");
          })
          .catch((err) => {
            console.log(err);
            setNotExist(false);
          });
      }
    }
  }

    return (
      <div className="Login">
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
                  error={userName === "" || !notExist}
                  helperText={(userName === "" ? "required" : "") || (notExist ? "" : "Email or password are incorrect")}
                  required
                  fullWidth
                  margin="normal"
                  id="E-mail"
                  label="username"
                  variant="outlined"
                  value={userName}
                  onChange={handleuserName}
                />
                <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    error={password === "" || !notExist}
                    required
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          //onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <FormControl
                  component="fieldset"
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginTop: 2,
                  }}
                >
                  <RadioGroup
                    row
                    aria-label="account"
                    name="controlled-radio-buttons-group"
                    value={accountType}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="User"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": {
                              color: "#bd814b",
                            },
                          }}
                        />
                      }
                      label="User"
                    />
                    <FormControlLabel
                      value="Manager"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": {
                              color: "#bd814b",
                            },
                          }}
                        />
                      }
                      label="Manager"
                    />
                  </RadioGroup>
                </FormControl>

                <Button
                  variant="contained"
                  sx={{
                    marginTop: 5,
                    background: "#c3195d",
                    backgroundColor: "#bd814b",
                  }}
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 2,
                  }}
                >
                  <Link to={"/Signup"} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </div>
    );
  };

  export default Login;
