import React, { useEffect, useState } from "react";
import Carousal from "./Carousal";
import Card from "./Card";
import { Link } from "react-router-dom";

const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [foodItem, setFoodItem] = useState(null);
  const [search, setSearch] = useState("");
  const [all, setAll] = useState(false);
  const [veg, setVeg] = useState(false);
  const [nonVeg, setNonVeg] = useState(false);

  const handleFilter = (type) => {
    setAll(type === "all");
    setVeg(type === "veg");
    setNonVeg(type === "nonVeg");
  };

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/foodData", {
          method: "POST",
        });
        const data = await response.json();
        setFoodItems(data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };
    fetchFoodData();
  }, []);

  useEffect(() => {
    if (foodItems.length > 0) {
      setFoodItem(foodItems[0]);
    }
  }, [foodItems]);

  return (
    <div>
      <div>
        <nav>
          <div className="flex justify-between bg-[#051726] p-4 items-center px-8">
            <img className="w-36" src="logo-no-background.png" alt="" />
            <div className="flex items-center gap-2 bg-[#81FFD9] p-0 rounded-full w-[50vw]">
              <input
                className="w-full h-full rounded-full bg-[#81FFD9] text-center p-2"
                type="text"
                name="searchBar"
                id="search"
                placeholder="Search in our Menu"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <ul className="flex text-white gap-8 text-lg">
              <li className="navLi login border rounded-full px-2 w-24 text-center font-bold hover:cursor-pointer">
                <Link to="/login">Log In</Link>
              </li>
              <li className=" navLi signup border rounded-full px-2 w-24 text-center font-bold hover:cursor-pointer">
                <Link to="/signup">Sign In</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Carousal />
        <div className="main flex">
          <div className="right bg-[#051726] h-auto w-full  m-1 rounded-xl">
            <div className="flex gap-3 justify-end text-white mt-2 mx-3">
              <div
                className={`flex items-center text-center border px-3 rounded-xl hover:cursor-pointer hover:bg-[rgb(255,255,255,0.1)] ${
                  all ? "bg-[rgb(255,255,255,0.1)]" : ""
                }`}
                onClick={() => handleFilter("all")}
              >
                All{" "}
                
              </div>
              <div
                className={`flex items-center text-center border px-3 rounded-xl hover:cursor-pointer hover:bg-[rgb(255,255,255,0.1)] ${
                  veg ? "bg-[rgb(255,255,255,0.1)]" : ""
                }`}
                onClick={() => handleFilter("veg")}
              >
                Veg
                
              </div>
              <div
                className={`flex items-center text-center border px-3 rounded-xl hover:cursor-pointer hover:bg-[rgb(255,255,255,0.1)] ${
                  nonVeg ? "bg-[rgb(255,255,255,0.1)]" : ""
                }`}
                onClick={() => handleFilter("nonVeg")}
              >
                Non-Veg{" "}
                
              </div>
            </div>
            <div className="flex gap-[40px] flex-wrap">
              {foodItem &&
                foodItem
                  .filter((item) => {
                    if (all) return true;
                    if (veg) return item.veg === true;
                    if (nonVeg) return item.veg === false;
                    return true;
                  })
                  .filter((i) =>
                    i.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item) => (
                    <Card
                      key={item.id}
                      name={item.name}
                      img={item.image}
                      half={item.price.half}
                      full={item.price.full}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
