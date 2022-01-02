import { Avatar, Box, Button, Card, Container, Grid, Tab, Tabs } from "@mui/material";
import DryCleaningOutlinedIcon from "@mui/icons-material/DryCleaningOutlined";
import DryCleaningIcon from "@mui/icons-material/DryCleaning";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useState } from "react";
import { ReactSession } from "react-client-session";
import ServiceCards from "./ServiceCards";
import useFetch from "./useFetch";

const AccountPage = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  const {
    data: services,
    isPending,
    error,
  } = useFetch(`http://localhost:8085/service/loadServices/${1}/${"random"}`);

  return (
    <div className="account-page">
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
            sx={{ width: 100, height: 100 }}
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
                indicatorColor="secondary"
                textColor="inherit"
                
                sx={{ background: "1A5F7A" }}
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
              </Tabs>
            </Container>
            {services && (
              <ServiceCards
                services={services}
                title="All Services!"
                pageNum={1}
              />
            )}
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default AccountPage;
