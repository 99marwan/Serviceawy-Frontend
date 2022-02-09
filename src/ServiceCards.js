import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,

  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NewService from "./NewService";
import Bids from "./Bids";

const ServiceCards = (props) => {
  const services = props.services;
  const title = props.title;
  const pageNum = props.pageNum;
  const tab = props.tab;
  const page = props.page;


  const handleClick = (value) => (event) => {
    console.log(value);
    ReactSession.set("service", value);
  };

  const handleAccept = (service) => {
    console.log(service);
    service.accepted = true;
    const url =
      page === "Home"
        ? "http://localhost:8085/manager/acceptRejectNormalService"
        : "http://localhost:8085/manager/acceptRejectCustomService";
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(service),
    }).then(() => {
      console.log("service Accepted");
      window.location.reload();
    });
  };
  const handleDecline = (service) => {
    const url =
      page === "Home"
        ? "http://localhost:8085/manager/acceptRejectNormalService"
        : "http://localhost:8085/manager/acceptRejectCustomService";
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(service),
    }).then(() => {
      console.log("service Rejected");
      window.location.reload();
    });
  };

   const theme = createTheme({
     palette: {
       primary: {
         main: "#bd814b",
       },
     },
   });

  return (
    <div className="servcie-card">
      <Container sx={{ py: 2, maxHeight: "100%" }}>
        <h2 style={{ color: "#678983" }}>{title}</h2>
        {/* End hero unit */}
        <Grid container spacing={2}>
          {services.map((service) => (
            <Grid
              item
              key={
                page === "Home" ? service.serviceid : service.customserviceid
              }
              xs={6}
              sm={4}
              md={4}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  background: "#E6DDC4",
                  color: "#535049",
                }}
              >
                <Link
                  to={
                    page === "Home"
                      ? `/services/${service.serviceid}`
                      : tab === 5
                      ? `/account_custom_services/${service.customserviceid}`
                      : `/custom_services/${service.customserviceid}`
                  }
                  style={{ textDecoration: "none", color: "#535049" }}
                  onClick={handleClick(service)}
                >
                  {tab != 0 && tab != 5 && (
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{ width: 24, height: 24 }}
                          aria-label="recipe"
                        ></Avatar>
                      }
                      title={
                        page === "Home"
                          ? service.providername
                          : service.requestername
                      }
                    />
                  )}
                  {(tab === 0 || tab === 5) && (
                    <CardHeader
                      titleTypographyProps={{ variant: "body2" }}
                      title={
                        "Status : " + (service.accepted ? "done" : "pending")
                      }
                    />
                  )}
                  {page == "Home" && (
                    <CardMedia
                      component="img"
                      height={180}
                      image="https://picsum.photos/400/300"
                      alt="random"
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                      sx={{ fontSize: 16, fontWeight: "bold" }}
                    >
                      {service.serviceDescription}
                    </Typography>
                  </CardContent>

                  <hr
                    style={{
                      width: "100%",
                    }}
                  />
                  <Container
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                      sx={{ fontFamily: "Monospace", fontSize: 16 }}
                    >
                      {service.serviceCategory}
                    </Typography>

                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "Monospace",
                        fontSize: 16,
                      }}
                    >
                      {(page === "Home" ? service.price : service.maxprice) +
                        "$"}
                    </Typography>
                  </Container>
                </Link>

                {ReactSession.get("type") != "Manager" &&
                  page === "Custom" &&
                  tab != 5 &&
                  ReactSession.get("username") != service.requestername && (
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <NewService bid={1} id={service.customserviceid} />
                    </CardActions>
                  )}

                {ReactSession.get("type") != "Manager" &&
                  page === "Custom" &&
                  tab === 5 && (
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                    <Bids id={service.customserviceid}/>
                    </CardActions>
                  )}

                {ReactSession.get("type") === "Manager" && (
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDecline(service)}
                    >
                      Decline
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleAccept(service)}
                    >
                      Accept
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ServiceCards;
