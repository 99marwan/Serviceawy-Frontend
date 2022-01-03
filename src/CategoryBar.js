import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Tab,
  Tabs,
} from "@mui/material";
import { useState } from "react";
import { ReactSession } from "react-client-session";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const CategoryBar = (props) => {

    const [value, setValue] = useState(0);
    const setCategory = props.setCategory;

    const handleChange = (event, newValue) => {
        
        setValue(newValue);
        setCategory(event.target.id)
        
        
    };

    const theme = createTheme({
      palette: {
        primary: {
          main: "#bd814b",
        },
        secondary: {
          main: "#535049",
        },
      },
    });

    return (
      <div className="category-bar">
        <ThemeProvider theme={theme}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            indicatorColor="primary"
            textColor="secondary"
            sx={{ background: "1A5F7A", fontSize: 10 }}
          >
            <Tab id="random" label="Random" />
            <Tab id="Graphics & Design" label="Graphics & Design" />
            <Tab id="Digital Marketing" label="Digital Marketing" />
            <Tab id="Writing & Translation" label="Writing & Translation" />
            <Tab id="Video & Animation" label="Video & Animation" />
            <Tab id="Music & Audio" label="Music & Audio" />
            <Tab id="Programming & Tech" label="Programming & Tech" />
            <Tab id="Business" label="Business" />
            <Tab id="Lifestyle" label="Lifestyle" />
          </Tabs>
        </ThemeProvider>
      </div>
    );
}
 
export default CategoryBar;