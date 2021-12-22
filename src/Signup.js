
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
  import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
  
  
  const Signup = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [DOB, setDOB] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

  
      const handleEmail = (e) => {
        setEmail(e.target.value);
      };
      const handlePassword = (e) => {
        setPassword(e.target.value);
      };
      const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
      };
      const handleUsername = (e) => {
        setUsername(e.target.value);
      };
      const handleDOB = (e) => {
        setDOB(e.target.value);
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
                  required
                  fullWidth
                  
                  id="Username"
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={handleUsername}
                />
                <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="MM/dd/yyyy"
                  value={DOB}
                  onChange={handleDOB}
                  renderInput={(params) => <TextField {...params} />}
                />
                <TextField
                  required
                  fullWidth
                  
                  id="password"
                  label="password"
                  variant="outlined"
                  value={password}
                  onChange={handlePassword}
                />
                <TextField
                  required
                  fullWidth
                  
                  id="confirm password"
                  label="confirm password"
                  variant="outlined"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                />

                <Button
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