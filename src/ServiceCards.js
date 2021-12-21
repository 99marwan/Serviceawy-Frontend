import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Pagination, Typography } from "@mui/material";
import NewService from "./NewService";
import { Link } from "react-router-dom";

const ServiceCards = (props) => {
    const services = props.services;
    const title = props.title;
  
    

    return (
      <div className="servcie-card">
        <Container sx={{ py: 2 }}>
          <NewService />
          <h2 style={{ color: "#ecffa3" }}>{title}</h2>
          {/* End hero unit */}
          <Grid container spacing={2}>
            {services.map((service) => (
              <Grid item key={service.id} xs={6} sm={4} md={3}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background: "#9ba6a5",
                  }}
                >
                  <CardMedia
                    component="img"
                    height={150}
                    image={service.photo}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom component="div">
                      {service.provider}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                      sx={{ fontWeight: "bold" }}
                    >
                      {service.title}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link
                      to={`/services/${service.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button size="small">View</Button>{" "}
                    </Link>
                  </CardActions>
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