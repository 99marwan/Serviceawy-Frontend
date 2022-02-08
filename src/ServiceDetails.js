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
  Alert,
  Box,
} from "@mui/material";
import { ReactSession } from "react-client-session";
import { display } from "@mui/system";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { useHistory } from "react-router-dom";

const ServiceDetails = () => {
  const history = useHistory();
  const service = ReactSession.get("service");

    const handleAccept = () => {
      console.log(service);
      service.accepted = true;
      fetch("http://localhost:8085/manager/acceptRejectNormalService", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      }).then(() => {
        console.log("service Accepted");
        history.push("/");
        window.location.reload();
      });
    };
    const handleDecline = () => {
      fetch("http://localhost:8085/manager/acceptRejectNormalService", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      }).then(() => {
        console.log("service Rejected");
        history.push("/");
        window.location.reload();
      });
    };


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
        ReactSession.set("bought",true)
        history.push("/");
      });
    }
  };
  return (
    <div className="service-details">
      <Container
        component="main"
        maxWidth="md"
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
              <Box
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h4">
                  {service.serviceDescription}
                </Typography>
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
              </Box>

              <Typography
                gutterBottom
                variant="h6"
                sx={{ flexGrow: 1, color: "#bd814b" }}
              >
                {service.serviceCategory}
              </Typography>
              <CardMedia
                component="img"
                height={180}
                width={180}
                image="https://picsum.photos/1024/10243"
                alt="random"
              />

              <Typography
                gutterBottom
                variant="h5"
                marginTop={2}
                sx={{ flexGrow: 1, color: "#678983" }}
              >
                Details:
              </Typography>
              <Typography gutterBottom variant="body2">
                "Why do we use it?\nIt is a long established fact that a reader
                will be distracted by the readable content of a page when
                looking at its layout. The point of using Lorem Ipsum is that it
                has a more-or-less normal distribution of letters, as opposed to
                using 'Content here, content here', making it look like readable
                English. Many desktop publishing packages and web page editors
                now use Lorem Ipsum as their default model text, and a search
                for 'lorem ipsum' will uncover many web sites still in their
                infancy. Various versions have evolved over the years, sometimes
                by accident, sometimes on purpose (injected humour and the
                like).\n\n\nWhere does it come from?\nContrary to popular
                belief, Lorem Ipsum is not simply random text. It has roots in a
                piece of classical Latin literature from 45 BC, making it over
                2000 years old. Richard McClintock, a Latin professor at
                Hampden-Sydney College in Virginia, looked up one of the more
                obscure Latin words, consectetur, from a Lorem Ipsum passage,
                and going through the cites of the word in classical literature,
                discovered the undoubtable source. Lorem Ipsum comes from
                sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et
                Malorum\" (The Extremes of Good and Evil) by Cicero, written in
                45 BC. This book is a treatise on the theory of ethics, very
                popular during the Renaissance. The first line of Lorem Ipsum,
                \"Lorem ipsum dolor sit amet..\", comes from a line in section
                1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the
                1500s is reproduced below for those interested. Sections 1.10.32
                and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are
                also reproduced in their exact original form, accompanied by
                English versions from the 1914 translation by H.
                Rackham.\n\nWhere can I get some?\nThere are many variations of
                passages of Lorem Ipsum available, but the majority have
                suffered alteration in some form, by injected humour, or
                randomised words which don't look even slightly believable. If
                you are going to use a passage of Lorem Ipsum, you need to be
                sure there isn't anything embarrassing hidden in the middle of
                text. All the Lorem Ipsum generators on the Internet tend to
                repeat predefined chunks as necessary, making this the first
                true generator on the Internet. It uses a dictionary of over 200
                Latin words, combined with a handful of model sentence
                structures, to generate Lorem Ipsum which looks reasonable. The
                generated Lorem Ipsum is therefore always free from repetition,
                injected humour, or non-characteristic words etc."
              </Typography>
            </CardContent>
            <CardActions
              sx={{ justifyContent: "space-around", alignItems: "baseline" }}
            >
              <Typography gutterBottom variant="h6">
                {"Price:   " + service.price + "$"}
              </Typography>
              {ReactSession.get("username") !== service.providername &&
                ReactSession.get("type") != "Manager" && (
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

            {ReactSession.get("type") === "Manager" && (
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
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
        </Grid>
      </Container>
    </div>
  );
};

export default ServiceDetails;
