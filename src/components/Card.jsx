import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatchContext,useStateContext } from "./ContextReducer";
import { Link,useNavigate } from "react-router-dom";

const Card = (props) => {
  const priceRef = useRef()
  const dispatch = useDispatchContext()
  const statedata = useStateContext()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState('half')
  const token = localStorage.getItem('authToken')
  let navigate = useNavigate()

    const handleCart = async ()=>{
      if(token){
        await dispatch({type:"ADD", id: props.food._id, img: props.food.image, name: props.food.name, qty: qty, size: size, price: finalPrice})
      }
      else{
        navigate('/login')
        alert("Please login to add items to your cart")
      }
    }
    // useEffect(() => {
    //   console.log(statedata)
    // }, [statedata])
    

    useEffect(() => {
      setSize(priceRef.current.value)
    }, [])
    
    let finalPrice = qty * parseInt(props.price[size])
  return (
      <div>
        <div className="card w-64 h-[23rem] bg-[#0f2b42] m-4 p-2 rounded-2xl">
          <div className="imgDiv">
            <img className="rounded-xl" src={props.food.image} alt="" />
          </div>
          <ul>
            <li className="text-[#81FFD9]">{props.food.name}</li>
            <div className="select flex gap-3 ">
              <div className="flex gap-2">
                <p className="text-[#81FFD9]">Qty:</p>
                <select className="bg-[#58ffcd]" name="quantity" id="" onChange={(e)=>setQty(e.target.value)}>
                  {Array.from(Array(5), (e, i) => {
                    return (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex gap-2">
                <p className="text-[#81FFD9]">Size:</p>
                <select className="bg-[#58ffcd]" ref={priceRef} name="size" id="" onChange={(e)=>setSize(e.target.value)}>
                  <option value="half">Half</option>
                  <option value="full">Full</option>
                </select>
              </div>
            </div>
            <div className="text-[#81FFD9]">
            Total Price: ₹{finalPrice}/-
            </div>
            <div className="flex justify-center">
              <button
                className="bg-[#58ffcd] my-3 px-2 font-bold rounded-lg w-full"
                onClick={() => handleCart()}
              >
                Add To Cart
              </button>
            </div>
          </ul>
        </div>
      </div>
  );
};

export default Card;
