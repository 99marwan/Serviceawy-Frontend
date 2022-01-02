import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, IconButton, Pagination, Stack, Typography } from "@mui/material";
import NewService from "./NewService";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactSession } from "react-client-session";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ServiceCards = (props) => {
    const services = props.services;
    const title = props.title;
    const pageNum = props.pageNum;
    
    const handleAccept = () => {
       return
    }
    const handleDecline = () => {
      return;
    };
  
    return (
      <div className="servcie-card">
       
        <Container sx={{ py: 2, maxHeight: "100%" }}>
          <h2 style={{ color: "#678983" }}>{title}</h2>
          {/* End hero unit */}
          <Grid container spacing={2}>
            {services.map((service) => (
              <Grid item key={service.serviceid} xs={6} sm={4} md={4}>
                 <Link
                    to={`/services/${service.serviceid}`}
                    style={{ textDecoration: "none" }}
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
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ width: 24, height: 24 }}
                        aria-label="recipe"
                      ></Avatar>
                    }
                    title="Username"
                  />
                  <CardMedia
                    component="img"
                    height={180}
                    image="https://picsum.photos/400/300"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom component="div">
                      {service.serviceProviderUserName}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                      sx={{ fontSize: 16 }}
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
                      {service.price + "$"}
                    </Typography>
                  </Container>
                  {ReactSession.get("type") === "Manager" && (
                    <CardActions
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleDecline}
                      >
                        Decline
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleAccept}
                      >
                        Accept
                      </Button>
                    </CardActions>
                  )}
                </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
        
      </div>
    );
}
 
export default ServiceCards;