
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
  import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
  
  
  const Signup = () => {

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
                  variant="standard"
                  value={email}
                />
                <TextField
                  required
                  fullWidth
                  id="Password"
                  label="Password"
                  variant="standard"
                />
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePassword("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
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
                              color: "#c3195d",
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
                              color: "#c3195d",
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
                    backgroundColor: "#c3195d",
                  }}
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
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Container>
        </div>

     );
}
 
export default Signup;