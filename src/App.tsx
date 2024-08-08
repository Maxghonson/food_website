import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoFastFoodSharp } from "react-icons/io5";
import { FoodsProps } from "./Type";

const App = () => {
  let [foods, setFoods] = useState<FoodsProps[]>([]);
  let [selectFood, setSelectFood] = useState<FoodsProps>();

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?s=beef")
      .then((data) => setFoods(data.data.meals))
      .catch((err) => console.log(err.message));
    setSelectFood(foods[0]);
  }, []);

  return (
    <div>
      <nav className="h-[10vh] bg-purple-800 text-white flex justify-between items-center px-10">
        <IoFastFoodSharp className="text-4xl cursor-pointer" />
        <div className="flex gap-10">
          <input
            type="search"
            className="bg-transparent border-2 p-2 rounded-sm placeholder:text-white text-white border-white"
            placeholder="Enter title"
            id=""
          />
          <input
            type="search"
            className="bg-transparent border-2 p-2 rounded-sm placeholder:text-white text-white border-white"
            placeholder="Enter Region"
            id=""
          />
        </div>
      </nav>
      <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-slate-200">
        <div className="shadow-md shadow-orange-700 p-5 rounded-md w-[60vw] h-[60vh]">
          <h4>{selectFood?.strMeal}</h4>
          <p>{selectFood?.strInstructions}</p>
          <iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${selectFood?.strYoutube.slice(
              32
            )}`}
            title={selectFood?.strMeal}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="w-11/12 my-0 py-5 mx-auto grid grid-cols-3 gap-2">
        {foods?.map((item, index) => (
          <div
            key={index}
            className="shadow-md cursor-pointer duration-300 hover:shadow-slate-800 rounded-md shadow-slate-500 p-5"
          >
            <img src={item.strMealThumb} alt={item.strMeal} />
            <h3 className="text-xl mt-2">
              <b>Title: </b> {item.strMeal}
            </h3>
            <div className="my-2 flex justify-between">
              <p>
                <b>Category: </b>
                {item.strCategory}
              </p>
              <p>
                <b>Area: </b> {item.strArea}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;