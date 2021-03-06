import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import Launch from "../components/Launches/Launch";
import logo from "./download (1).png"
const URL = "https://api.spacexdata.com/v3/launches";


const gradient = {
    padding: "20px",
    width: "100%",
    height: "1300px",
    background: "linear-gradient(to bottom, #ffffff 29%, #ccffff 98%)"
}
const LaunchDetail = () => {
  const { flightNumber } = useParams();

  const [launch, setLaunch] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLaunch = async () => {
      try {
        const response = await fetch(`${URL}/${flightNumber}`);
        const data = await response.json();
        setLaunch(data);
        setIsLoading(false);
      } catch (error) {
        console.log(`Can't fetch launch from ${URL}/${flightNumber}`);
      }
    };
    fetchLaunch();
  }, [flightNumber]);

  return (
    <div style={gradient} class="jumbotron d-flex align-items-center">
   <div class ="container text-center">
        <br/>
      <img src={logo} alt="SpaceX" class="navbar-brand"></img>
      <br/>
       <h2 class ="text-xl bg-primary p-3 mb-2 bg-secondary navbar">Space Exploration Technologies Corp. is an American aerospace manufacturer and space transportation services company incorporated in Delaware and headquartered in Hawthorne, California. It was founded in 2002 by Elon Musk with the goal of reducing space transportation costs to enable the colonization of Mars</h2>
      </div>
      <Launch launch={launch} isLoading={isLoading} />
    </div>
  );
};

export default LaunchDetail;
