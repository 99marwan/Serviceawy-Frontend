import { useParams } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Button,
  Typography,
  Container,
  Grid,
  Avatar,
} from "@mui/material";
import { ReactSession } from "react-client-session";
import { display } from "@mui/system";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { useHistory } from "react-router-dom";

const ServiceDetails = () => {
  const history = useHistory();
  const service = ReactSession.get("service");
  const handleBuy = (e) => {
    if (!ReactSession.get("username")) history.push("/Login");
    else {
      fetch(
        `http://localhost:8085/trans/buyService/${ReactSession.get("userid")}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(service),
        }
      ).then(() => {
        console.log("new service purchased");
        window.location.reload();
      });
    }
  };
  return (
    <div className="service-details">
      <Container
        component="main"
        maxWidth="s"
        sx={{
          marginTop: 5,
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
            <CardContent>
              <Typography variant="h4">{service.serviceDescription}</Typography>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    alt={service.providername}
                    src="/broken-image.jpg"
                  ></Avatar>
                }
                titleTypographyProps={{ variant: "h5" }}
                title={service.providername}
              />
              <Typography gutterBottom variant="h6">
                {service.serviceCategory}
              </Typography>
              <CardMedia
                component="img"
                height={180}
                image="https://picsum.photos/400/300"
                alt="Service Image"
              />
              <Typography gutterBottom variant="h7">
                Service Detailed Description
              </Typography>
            </CardContent>
            <CardActions
              sx={{ justifyContent: "space-around", alignItems: "baseline" }}
            >
              <Typography gutterBottom variant="h6">
                {"Price:   " + service.price + "$"}
              </Typography>
              {ReactSession.get("username") !== service.providername && (
                <Button
                  variant="contained"
                  sx={{
                    marginTop: 5,

                    background: "#c3195d",
                    backgroundColor: "#bd814b",
                  }}
                  onClick={handleBuy}
                >
                  buy
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      </Container>
    </div>
  );
};

export default ServiceDetails;
