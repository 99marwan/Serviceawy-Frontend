import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Pagination, Typography } from "@mui/material";
import NewService from "./NewService";
import { Link } from "react-router-dom";


const ServiceCards = (props) => {
    const services = props.services;
    const title = props.title;
  
    return (
      <div className="servcie-card">
        <Container sx={{ py: 2, maxHeight: "100%" }}>
          <h2 style={{ color: "#678983" }}>{title}</h2>
          {/* End hero unit */}
          <Grid container spacing={2}>
            {services.map((service) => (
              <Grid item key={service.serviceID} xs={6} sm={4} md={3}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background: "#E6DDC4",
                    color: "#535049",
                  }}
                >
                  <CardMedia
                    component="img"
                    height={150}
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
                      sx={{ fontWeight: "bold" }}
                    >
                      {service.serviceDescription}
                    </Typography>
                  </CardContent>
                  {/*<Link
                      to={`/services/${service.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button size="small">View</Button>
                    </Link>*/}

                  <hr
                    style={{
                      color: "#535049",
                      backgroundColor: "#535049",
                      borderColor: "#535049",
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
                      sx={{ fontWeight: "bold" }}
                    >
                      {service.serviceCategory}
                    </Typography>

                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {service.price + "$"}
                    </Typography>
                  </Container>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 20,
            }}
          >
            <Pagination
              count={10}
              color="secondary"
              sx={{ color: "#ffffff" }}
            />
          </div>
        </Container>
      </div>
    );
}
 
export default ServiceCards;