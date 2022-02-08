import useFetch from "./useFetch";
import ServiceCards from "./ServiceCards";
import { Button, Pagination } from "@mui/material";
import NewService from "./NewService";
import { ReactSession } from "react-client-session";
import { useEffect, useState } from "react";
import { orange } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import CategoryBar from "./CategoryBar";
import AlertsBar from "./AlertsBar";

const Home = () => {

  const [pageNum, setPageNum] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [category, setCategory] = useState("random");

  const theme = createTheme({
    palette: {
      primary: {
        main: "#bd814b",
      },
    },
  });
  
  const handleChange = (event, value) => {
    setPage(value)
  };
 
  useEffect(() => {
     fetch(
       `http://localhost:8085/service/getPagesNum/${
         ReactSession.get("type") === "Manager" ? "false" : "true"
       }/${category}`
     )
       .then((res) => {
         return res.json();
       })
       .then((data) => {
         console.log(data);
         setPageNum(data);
         setPage(1)
       })
       .catch((err) => {
         console.log(err);
       })
  },[category])
    
  const {
    data: services,
    isPending,
    error,
  } = useFetch(
    `http://localhost:8085/service/loadServices/${currentPage}/${category}/${
      ReactSession.get("type") === "Manager" ? "false" : "true"
    }`,currentPage,category
  );
  

    return (
      <div className="home">
        <ThemeProvider theme={theme}>
          <CategoryBar setCategory={setCategory} />
          <AlertsBar />
          {/*error && <div>{error}</div>*/}
          {isPending && <div>Loading....</div>}
          {/*as blogs it null until fetch finished
           *and in js check left side first
           */}

          {ReactSession.get("username") &&
            ReactSession.get("type") === "User" && (
              <NewService page={"Home"} />
            )}
         
         
          {services && (
            <ServiceCards
              services={services}
              title="All Services!"
              pageNum={pageNum}
              tab={-1}
              page={"home"}
            />
          )}


          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 20,
            }}
          >
            <Pagination
              count={pageNum}
              color="primary"
              page={currentPage}
              onChange={handleChange}
            />
          </div>
        </ThemeProvider>
      </div>
    );
}
 
export default Home;