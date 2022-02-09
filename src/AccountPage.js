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
import DryCleaningOutlinedIcon from "@mui/icons-material/DryCleaningOutlined";
import DryCleaningIcon from "@mui/icons-material/DryCleaning";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useState } from "react";
import { ReactSession } from "react-client-session";
import ServiceCards from "./ServiceCards";
import useFetch from "./useFetch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TransactionCards from "./TransactionCards";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const AccountPage = () => {
  const [value, setValue] = useState(0);
  const [url, setUrl] = useState(
    `http://localhost:8085/trans/providedTrans/${ReactSession.get(
      "username"
    )}/DONE`
  );
   const [urlService, setUrlService] = useState(
     `http://localhost:8085/user/loadServices/${ReactSession.get("username")}`
   );

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
   if (newValue === 0) {
      setUrlService(
        `http://localhost:8085/user/loadServices/${ReactSession.get(
          "username"
        )}`
      );
    }
    else if (newValue === 1) {
      setUrl(
        `http://localhost:8085/trans/providedTrans/${ReactSession.get(
          "username"
        )}/DONE`
      );
    } else if (newValue === 2) {
      setUrl(
        `http://localhost:8085/trans/providedTrans/${ReactSession.get(
          "username"
        )}/PENDING`
      );
    } else if (newValue === 3) {
      setUrl(
        `http://localhost:8085/trans/requestedTrans/${ReactSession.get(
          "userid"
        )}/DONE`
      );
    } else if (newValue === 4) {
      setUrl(
        `http://localhost:8085/trans/requestedTrans/${ReactSession.get(
          "userid"
        )}/PENDING`
      );
    } else if (newValue === 5) {
      setUrlService(`http://localhost:8085/user/loadCustomServices/${ReactSession.get(
          "username"
        )}`);
    } else if (newValue === 7) {
      setUrl(
        `http://localhost:8085/CustomTrans/providedCustomTrans/${ReactSession.get(
          "userid"
        )}/DONE`
      );
    } else if (newValue === 6) {
      setUrl(
        `http://localhost:8085/CustomTrans/requestedCustomTrans/${ReactSession.get(
          "username"
        )}/DONE`
      );
    }
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
  
  const { data: services } = useFetch(
    urlService,
    1,
    "random"
  ); 
  const { data: transactions} = useFetch(url, 1, "random"); 
  console.log(transactions);

  return (
    <div className="account-page">
      <ThemeProvider theme={theme}>
        <Container sx={{ py: 2, maxHeight: "100%" }}>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt={ReactSession.get("username")}
              src="/broken-image.jpg"
              sx={{
                width: 100,
                height: 100,
                bgcolor: "#678983",
                fontSize: "50px",
              }}
            />
            <h2>{ReactSession.get("username")}</h2>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
              }}
            >
              <Container
                sx={{
                  marginTop: 3,
                  marginBottom: 3,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="icon label tabs example"
                  indicatorColor="primary"
                  textColor="secondary"
                  sx={{ background: "1A5F7A" }}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab icon={<AssignmentIndIcon />} label="My Services" />
                  <Tab icon={<CheckCircleIcon />} label="Services Done" />
                  <Tab icon={<DryCleaningIcon />} label="Services Pending" />
                  <Tab
                    icon={<CheckCircleOutlineOutlinedIcon />}
                    label="Orders Done"
                  />
                  <Tab
                    icon={<DryCleaningOutlinedIcon />}
                    label="Orders Pending"
                  />
                  <Tab
                    icon={<DashboardCustomizeIcon />}
                    label="Custom Services"
                  />
                  <Tab
                    icon={<ArrowBackIcon />}
                    label="C.Transactions requestd"
                  />
                  <Tab icon={<ArrowForwardIcon />} label="C.Transactions provided" />
                </Tabs>
              </Container>
              {(value === 0 || value == 5) && services && (
                <ServiceCards
                  services={services}
                  title="All Services!"
                  pageNum={1}
                  tab={value}
                  page={value === 0 ? "Home" : "Custom"}
                />
              )}
              {value != 0 && value != 5 && services && (
                <TransactionCards
                  transactions={transactions}
                  title="All Services!"
                  pageNum={1}
                  tab={value}
                />
              )}
            </Card>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default AccountPage;
