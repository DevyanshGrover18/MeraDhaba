import React, { useState, useEffect, useRef } from "react";
import { useDispatchContext } from "./ContextReducer";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const priceRef = useRef();
  const dispatch = useDispatchContext();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("half");
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { setSize(priceRef.current.value); }, []);

  const finalPrice = qty * parseInt(props.price[size]);

  const handleCart = async () => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
      return;
    }
    await dispatch({ type: "ADD", id: props.food._id, img: props.food.image,
      name: props.food.name, qty, size, price: finalPrice });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="group w-[210px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#0d2236] to-[#071520] border border-white/[0.07] hover:border-[#58ffcd]/30 shadow-[0_2px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_40px_rgba(88,255,205,0.12)] hover:-translate-y-1.5 transition-all duration-300 ease-out flex-shrink-0">

      {/* ── Image ── */}
      <div className="relative h-[150px] overflow-hidden">
        <img
          src={props.food.image}
          alt={props.food.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071520] via-transparent to-transparent" />

        {/* Veg / Non-veg indicator */}
        <div className={`absolute top-2.5 right-2.5 w-[22px] h-[22px] rounded-[4px] border-2 flex items-center justify-center bg-black/40 backdrop-blur-sm ${props.food.veg ? "border-green-500" : "border-red-500"}`}>
          <div className={`w-2.5 h-2.5 rounded-full ${props.food.veg ? "bg-green-500" : "bg-red-500"}`} />
        </div>

        {/* Category badge */}
        <span className="absolute top-2.5 left-2.5 bg-[#58ffcd]/15 backdrop-blur-sm border border-[#58ffcd]/25 text-[#81FFD9] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
          {props.food.category || "Food"}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="p-3.5 flex flex-col gap-3">
        <h3 className="text-[#e0fff8] font-bold text-[15px] leading-tight tracking-[0.01em] truncate">
          {props.food.name}
        </h3>

        {/* Selectors */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "QTY", node: (
              <select className="w-full bg-white/[0.05] border border-white/10 text-[#e0fff8] text-xs rounded-lg py-1.5 text-center focus:outline-none focus:border-[#58ffcd]/40 cursor-pointer" onChange={e => setQty(e.target.value)}>
                {[1,2,3,4,5].map(n => <option key={n} value={n} className="bg-[#0d2236]">{n}</option>)}
              </select>
            )},
            { label: "SIZE", node: (
              <select ref={priceRef} className="w-full bg-white/[0.05] border border-white/10 text-[#e0fff8] text-xs rounded-lg py-1.5 text-center focus:outline-none focus:border-[#58ffcd]/40 cursor-pointer" onChange={e => setSize(e.target.value)}>
                <option value="half" className="bg-[#0d2236]">Half</option>
                <option value="full" className="bg-[#0d2236]">Full</option>
              </select>
            )},
          ].map(({ label, node }) => (
            <div key={label}>
              <p className="text-[9px] text-[#81FFD9]/50 font-bold tracking-[0.14em] uppercase mb-1">{label}</p>
              {node}
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-2.5">
          <span className="text-[10px] text-[#81FFD9]/50 font-bold tracking-[0.1em] uppercase">Total</span>
          <span className="text-[#58ffcd] font-extrabold text-xl tracking-tight leading-none">₹{finalPrice}</span>
        </div>

        {/* Button */}
        <button
          onClick={handleCart}
          className={`w-full py-2.5 rounded-xl text-[13px] font-bold tracking-[0.03em] transition-all duration-250 ${
            added
              ? "bg-green-400/[0.12] border border-green-400/40 text-green-400 scale-[0.97]"
              : "bg-[#58ffcd] text-[#071520] shadow-[0_0_18px_rgba(88,255,205,0.35)] hover:bg-[#7bffd9] hover:shadow-[0_0_28px_rgba(88,255,205,0.5)] active:scale-[0.97]"
          }`}
        >
          {added ? "✓  Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default Card