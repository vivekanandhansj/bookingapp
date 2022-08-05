import { useState,useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import axios from "axios";
// import { Link } from "react-router-dom";

const FeaturedProperties = () => {
  const { data,loading} = useFetch("https://bookingapp-server.herokuapp.com/api/hotels?featured=true&limit=4");

  
  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => {
            return(
              <div className="fpItem" key={item._id}>
              <img
                src={item.photos}
                alt=""
                className="fpImg"
              />  
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from Rs.{item.cheapestPrice}</span>
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>}
            </div>
            )
            
            })}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;