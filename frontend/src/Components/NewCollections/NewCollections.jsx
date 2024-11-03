import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import Item from "../Items/Item";

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4040/newCollection")
      .then((response) => response.json())
      .then((data) => setNewCollection(data));
  }, []);
  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {newCollection.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              newPrice={item.newPrice}
              oldPrice={item.oldPrice}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections;
