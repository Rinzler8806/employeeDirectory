import React from "react";
import CardBtn from "../CardBtn";
import "./style.css";

function Card(props) {
  return (


    <div className="card" style={{width: "18rem"}}>
    <img src={props.image} className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title">{props.first} {props.last}</h5>
      <p className="card-text">{props.location}</p>
    </div>
  </div>
  );
}

export default Card;