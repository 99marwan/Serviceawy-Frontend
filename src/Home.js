import useFetch from "./useFetch";
import ServiceCards from "./ServiceCards";
import { Button, Pagination } from "@mui/material";
import NewService from "./NewService";
import { ReactSession } from "react-client-session";
import { useEffect, useState } from "react";

const Home = () => {

  const [pageNum, setPageNum] = useState(0);
  const [currentPage, setPage] = useState(1);

  
  const handleChange = (event, value) => {
    setPage(value)
  };
 
  fetch(
    `http://localhost:8085/service/getPagesNum/${
      ReactSession.get("type") === "Manager" ? "false" : "true"
    }`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      setPageNum(data);
    })
    .catch((err) => {
      console.log(err);
    });

    

    
  const {
    data: services,
    isPending,
    error,
  } = useFetch(
    `http://localhost:8085/service/loadServices/${currentPage}/${"random"}/${
      ReactSession.get("type") === "Manager" ? "false" : "true"
    }`,currentPage
  );
  

    return (
      <div className="home">
       
        {/*error && <div>{error}</div>*/}
        {isPending && <div>Loading....</div>}
        {/*as blogs it null until fetch finished
         *and in js check left side first
         */}

        {ReactSession.get("username") &&
          ReactSession.get("type") === "User" && <NewService />}
        {services && (
          <ServiceCards
            services={services}
            title="All Services!"
            pageNum={pageNum}
            tab={6}
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
            color="secondary"
            page={currentPage}
            onChange={handleChange}
          />
        </div>
      </div>
    );
}
 
export default Home;