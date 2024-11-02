import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
  const handleImageClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img src={props.image} alt="" onClick={handleImageClick} />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">&#8377;{props.newPrice}</div>
        <div className="item-price-old">&#8377;{props.oldPrice}</div>
      </div>
    </div>
  );
};

export default Item;
