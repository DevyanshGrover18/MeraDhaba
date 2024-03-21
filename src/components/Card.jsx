import React from "react";

const Card = (props) => {
  return (
    <div>
      <div className="card w-64 h-[23rem] bg-[#0f2b42] m-4 p-2 rounded-2xl">
        <div className="imgDiv">
          <img
            className="rounded-xl"
            src={props.img}
            alt=""
          />
        </div>
        <ul>
          <li className="text-[#81FFD9]">{props.name}</li>
          <li className="text-[#81FFD9]">{props.half}</li>
          <div className="select flex gap-3 ">
            <div className="flex gap-2">
              <p className="text-[#81FFD9]">Qty:</p>
              <select className="bg-[#58ffcd]" name="quantity" id="">
                {Array.from(Array(5), (e, i) => {
                  return <option key={i} value={i + 1}>{i + 1}</option>;
                })}
              </select>
            </div>
            <div className="flex gap-2">
              <p className="text-[#81FFD9]">Size:</p>
              <select className="bg-[#58ffcd]" name="size" id="">
                <option value="half">Half</option>
                <option value="full">Full</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-[#58ffcd] my-3 px-2 font-bold rounded-lg w-full">Add To Cart</button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Card;
