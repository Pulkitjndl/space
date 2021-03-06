import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";



import LaunchList from "../components/Launches/LaunchList";
import Filter from "../components/Launches/Filter";
import Pagination from "../components/Launches/Pagination.js";


import { useQuery } from "../hook/query";
import heroAnimation from "../assets/animations/launches.json";
import GoogleLogout from 'react-google-login';
import { Button } from "reactstrap";
import download from "./download (1).png"

const URL = "https://api.spacexdata.com/v3/launches";
const LIMIT = 12;
const FIRST_PAGE = 1; 

const gradient = {
    padding: "20px",
    width: "100%",
    height: "2800px",
    background: "linear-gradient(to bottom, #ffff 29%, #C9D6FF 98%)"
}

const Launches = () => {
  const history = useHistory();
  const query = useQuery();

  const [launches, setLaunches] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    query.has("page") ? +query.get("page") : FIRST_PAGE
  );
  const [lastPage, setLastPage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [rocketName, setRocketName] = useState(
    query.has("rocketName") ? query.get("rocketName") : ""
  );
  const [launchYear, setLaunchYear] = useState(
    query.has("launchYear") ? query.get("launchYear") : ""
  );
  const [launchSuccess, setLaunchSuccess] = useState(
    query.has("launchSuccess") ? query.get("launchSuccess") : ""
  );
  
  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        setIsLoading(true);
        const offset = (currentPage - 1) * LIMIT;
        const response = await fetch(
          `${URL}?id=true&limit=${LIMIT}&offset=${offset}&rocket_name=${rocketName}&launch_year=${launchYear}&launch_success=${launchSuccess}`
        );
        const data = await response.json();
        setLaunches(data);
        setLastPage(
          Math.ceil(response.headers.get("Spacex-Api-Count") / LIMIT)
        );
        setIsLoading(false);
      } catch (error) {
        console.log(`Can't fetch launches from ${URL}`);
      }
    };
    fetchLaunches();
  }, [currentPage, rocketName, launchYear, launchSuccess]);

  const pageChangeHandler = (page) => {
    if (page >= 1 && page <= lastPage) {
      setCurrentPage(page);
      query.set("page", page);
      history.replace({
        search: query.toString(),
      });
    }
  };

  const filterChangeHandler = (type, event) => {
    setCurrentPage(1);
    if (type === "rocketName") {
      setRocketName(event.target.value);
    } else if (type === "launchYear") {
      setLaunchYear(event.target.value);
    } else if (type === "launchSuccess") {
      setLaunchSuccess(event.target.value);
    }
    query.set(type, event.target.value);
    query.set("page", 1);
    history.replace({
      search: query.toString(),
    });
  };
   const logout = () => {
    let auth2 = window.gapi && window.gapi.auth2.getAuthInstance();
    if (auth2) {
      auth2
        .signOut()
        .then(() => {
          this.toggleLoggedIn();
          console.log('Logged out successfully');
        })
        .catch(err => {
          console.log('Error while logging out', err);
        });
    } else {
      console.log('error while logging out');
    }
  };


  return (
    <div style={gradient} class="jumbotron d-flex align-items-center">
      <div class ="container text-center">
        <br/>
      <img src={download} alt="SpaceX"class="navbar-brand"></img>
      <br/>
       <h2 class ="text-xl bg-primary p-3 mb-2 bg-secondary navbar">Space Exploration Technologies Corp. is an American aerospace manufacturer and space transportation services company incorporated in Delaware and headquartered in Hawthorne, California. It was founded in 2002 by Elon Musk with the goal of reducing space transportation costs to enable the colonization of Mars</h2>
      </div>
      <Filter
        filterChangeHandler={filterChangeHandler}
        rocketName={rocketName}
        launchYear={launchYear}
        launchSuccess={launchSuccess}
      />
      <LaunchList launches={launches} isLoading={isLoading} />
</div>
  );
};

export default Launches;
