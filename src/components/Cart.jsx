import React, { useContext } from "react";
import { useStateContext, useDispatchContext } from "./ContextReducer";
import { useNavigate } from "react-router-dom";

const handleDelete = () => {};

const Cart = () => {
  const state = useStateContext();
  const dispatch = useDispatchContext();
  let navigate = useNavigate()

  if (state.length === 0) {

    const handleMore = ()=>{
      navigate('/')
    }

    return (
      <>
        <div className="text-center text-[#81FFD9] text-6xl my-48 opacity-20 ">
          This cart is empty
        </div>
      </>
    );
  }
  let totalPrice = state.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <table className="mx-auto text-[#81FFD9]">
        <thead>
          <tr className=" text-center text-3xl mt-5 mb-2 px-5">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Size</th>
            <th scope="col">Amount</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <br />
        <tbody>
          {state.map((food, index) => (
            <>
              <tr key={index}>
                <td className="max-w-xs">{index + 1}</td>
                <td className="max-w-xs">{food.name}</td>
                <td className="max-w-xs">{food.qty}</td>
                <td className="max-w-xs">{food.size}</td>
                <td className="max-w-xs">{food.price}</td>
                <td className="max-w-xs">
                  <button onClick={() => dispatch({type: "REMOVE", index: index})}>
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </td>
              </tr>
              <br />
            </>
          ))}
        </tbody>
      </table>
      <hr color="#81FFD9" className="my-3 w-[80vw] mx-auto" />
      <div className="flex justify-around">
        <div className="text-[#81FFD9] font-bold">
          Total Price:- {totalPrice}/-
        </div>
        <div>
          <button className="bg-[#81FFD9] font-bold p-1 px-2 rounded" onClick={()=>dispatch({type:"CLEAR"})}>
            Check Out!!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
