import useFetch from "./useFetch";
import ServiceCards from "./ServiceCards";
import { Button } from "@mui/material";
import NewService from "./NewService";

const Home = () => {

    const {
      data: services,
      isPending,
      error,
    } = useFetch(`http://localhost:8080/service/loadServices/${1}/${"random"}`);

    return (
      <div className="home">
        {/*error && <div>{error}</div>*/}
        {isPending && <div>Loading....</div>}
        {/*as blogs it null until fetch finished
         *and in js check left side first
         */}
        <NewService />
        {services && <ServiceCards services={services} title="All Services!" />}
      </div>
    );
}
 
export default Home;