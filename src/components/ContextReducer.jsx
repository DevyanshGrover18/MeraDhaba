import React,{ createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch(action.type){
    case "ADD":
      return[...state, {id:action.id, name: action.name, img:action.img, qty:action.qty, size:action.size , price: action.price}]
    case "REMOVE":
      return state.filter((item, index) => index !== action.index);
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer,[]);
  return (
    <CartDispatchContext.Provider value={dispatch}>
        <CartStateContext.Provider value={state}>
            {children}
        </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useStateContext =()=> useContext(CartStateContext);
export const useDispatchContext =()=> useContext(CartDispatchContext);
