import useFetch from "./useFetch";
import ServiceCards from "./ServiceCards";
import { Button } from "@mui/material";

const Home = () => {

    const {
      data: services,
      isPending,
      error,
    } = useFetch("http://localhost:8000/services");

    return (
      <div className="home">
        {error && <div>{error}</div>}
        {isPending && <div>Loading....</div>}
        {/*as blogs it null until fetch finished
         *and in js check left side first
         */}

        {services && <ServiceCards services={services} title="All Services!" />}
      </div>
    );
}
 
export default Home;