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
  IconButton,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";


const TransactionCards = (props) => {
  const transactions = props.transactions;
  const title = props.title;
  const pageNum = props.pageNum;
    const tab = props.tab;


  const handleAccept = (transaction) => {
    console.log(transaction);
    transaction.status = "DONE";
    fetch("http://localhost:8085/user/acceptRejectTrans", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    }).then(() => {
      console.log("service Accepted");
      window.location.reload();
    });
  };
    const handleDecline = (transaction) => {
    transaction.status = "REJECTED";
    fetch("http://localhost:8085/user/acceptRejectTrans", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    }).then(() => {
      console.log("service Rejected");
      window.location.reload();
    });
  };

  return (
    <div className="transaction-card">
      <Container sx={{ py: 2, maxHeight: "100%" }}>
        <h2 style={{ color: "#678983" }}>{title}</h2>
        {/* End hero unit */}
        <Grid container spacing={2}>
          {transactions.map((transaction) => (
            <Grid item key={transaction.transactionid} xs={6} sm={4} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  background: "#E6DDC4",
                  color: "#535049",
                }}
              >
                {tab < 3 && tab > 5 && (
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ width: 24, height: 24 }}
                        aria-label="recipe"
                      ></Avatar>
                    }
                    title={transaction.service.providername}
                  />
                )}

                <CardMedia
                  component="img"
                  height={180}
                  image="https://picsum.photos/400/300"
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    component="div"
                    sx={{ fontSize: 16, fontWeight: "bold" }}
                  >
                    {transaction.service.serviceDescription}
                  </Typography>

                  {(tab < 3 || tab == 6) && (
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                      sx={{ fontSize: 16, color: "#bd814b" }}
                    >
                      {tab === 6
                        ? transaction.service.requestername
                        : "customer"}
                    </Typography>
                  )}
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
                    {transaction.service.serviceCategory}
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
                    {tab < 6
                      ? transaction.service.price + "$"
                      : transaction.service.maxprice + "$"}
                  </Typography>
                </Container>

                {tab == 2 && (
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDecline(transaction)}
                    >
                      Decline
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleAccept(transaction)}
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

export default TransactionCards;
