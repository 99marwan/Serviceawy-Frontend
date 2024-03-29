import useFetch from "./useFetch";
import ServiceCards from "./ServiceCards";
import { Pagination } from "@mui/material";
import NewService from "./NewService";
import { ReactSession } from "react-client-session";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CategoryBar from "./CategoryBar";
import AlertsBar from "./AlertsBar";

const CustomServices = () => {
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
    setPage(value);
  };

  useEffect(() => {
    fetch(
      `http://localhost:8085/CustomService/getPagesNum/${
        ReactSession.get("type") === "Manager" ? "false" : "true"
      }/${category}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPageNum(data);
        setPage(1);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category]);

  const {
    data: services,
    isPending,
    error,
  } = useFetch(
    `http://localhost:8085/CustomService/loadCustomServices/${currentPage}/${category}/${
      ReactSession.get("type") === "Manager" ? "false" : "true"
    }/false`,
    currentPage,
    category
  );

    
  return (
    <div className="custom_services">
      <ThemeProvider theme={theme}>
        <CategoryBar setCategory={setCategory} />
        <AlertsBar page={"Custom"}/>

        {isPending && <div>Loading....</div>}
    
        {ReactSession.get("username") &&
          ReactSession.get("type") === "User" && <NewService page={"Custom"} />}
        {services && (
          <ServiceCards
            services={services}
            title="All Services!"
            pageNum={pageNum}
            tab={-1}
            page={"Custom"}
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
};

export default CustomServices;
