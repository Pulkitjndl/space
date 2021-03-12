import { createContext, useState, useEffect, Component } from "react";
import axios from 'axios'
const RocketsContext = createContext();

class RocketsContextProvider extends Component{
   state = {
   rockets, 
   setRockets
  }

   componentDidMount() {
    setInterval(() => {
      this.setState({
      rockets, 
      setRockets
      });
    }, 5000);
  }
    fetchRockets = async (e) => {
    const url =axios.get("https://api.spacexdata.com/v3/rockets")
    .then ({response = await fetch(url),
      data = await response.json(),
      setRockets(data);})
    fetchRockets();
     }
     render(){
       return(
         <div>
          <RocketsContext.Provider
          value={{
          rockets: rockets,
          getRocket: getRocket,
      }}
          >
        {props.children}
    </RocketsContext.Provider>

         </div>
       )
     }
}

export default RocketsContext;