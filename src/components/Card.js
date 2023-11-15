import React, { useEffect, useState, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let dispatch = useDispatchCart();
  let data = useCart();
  let foodItem = props.foodItem;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const handleAddToCart = async () => {
    let food = [];
    for (const item of data){
      if(item.id === foodItem._id){
        food = item;
        break;
      }

    }
    if(food !== []){
      if(food.size === size){
        await dispatch({type : "UPDATE",qty : qty,price : finalPrice,id : props.foodItem._id})
        return;
      }
      else if(food.size !== size){
        await dispatch({type : "ADD",id : props.foodItem._id,name : props.foodItem.name, price : finalPrice, qty : qty,size : size});
        return;
      }
      return;
    }
    await dispatch({type : "ADD",id : props.foodItem._id,name : props.foodItem.name, price : finalPrice, qty : qty,size : size});
    
  };
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          className="card-img-top"
          src={props.foodItem.img}
          alt="Card"
          style={{ height: "160px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          {/* <p className="card-text">Something</p> */}
          {/* <a href="/" className="btn btn-primary">Go somewhere</a> */}
          <div className="conatiner w-100">
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline fs-5">Rs. {finalPrice}/-</div>
            <hr />
            <button
              className="btn btn-success justify-center ms-2"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
