import axios from "axios";
import React, { useEffect, useState, KeyboardEvent } from "react";
import { IoFastFoodSharp, IoCloseCircle } from "react-icons/io5";
import { FoodsProps } from "./Type";
import { CiSearch } from "react-icons/ci";

const App = () => {
  const [foods, setFoods] = useState<FoodsProps[]>([]);
  const [selectFood, setSelectFood] = useState<FoodsProps | undefined>();
  const [showSelectedFood, setShowSelectedFood] = useState<boolean>(false);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [searchArea, setSearchArea] = useState<string>("");

  const titleFood = (text: string) => {
    if (!text.trim()) {
      return;
    }
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`)
      .then((data) => {
        if (data.data.meals) {
          setFoods(data.data.meals);
          setSelectFood(data.data.meals[0]);
        } else {
          setFoods([]);
          setSelectFood(undefined);
        }
        setSearchTitle("");
      })
      .catch((err) => console.log(err.message));
  };

  const areaFood = (text: string) => {
    if (!text.trim()) {
      return;
    }
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${text}`)
      .then((data) => {
        if (data.data.meals) {
          setFoods(data.data.meals);
          setSelectFood(data.data.meals[0]);
        } else {
          setFoods([]);
          setSelectFood(undefined);
        }
        setSearchArea("");
      })
      .catch((err) => console.log(err.message));
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
  };

  const handleArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchArea(e.target.value);
  };

  const handleKeyPress = (
    e: KeyboardEvent<HTMLInputElement>,
    searchFunction: (text: string) => void,
    searchText: string
  ) => {
    if (e.key === "Enter") {
      searchFunction(searchText);
    }
  };

  useEffect(() => {
    titleFood("beef");
  }, []);

  const selectedMeal = (num: number) => {
    setSelectFood(foods[num]);
    setShowSelectedFood(true);
  };

  const handleBackButtonClick = () => {
    titleFood("beef");
  };

  return (
    <div>
      <nav className="h-[10vh] bg-purple-800 text-white flex justify-between items-center px-10">
        <IoFastFoodSharp className="text-4xl cursor-pointer" />
        <div className="flex gap-10">
          <div className="relative">
            <input
              type="search"
              className="bg-transparent border-2 p-2 rounded-sm placeholder:text-white text-white border-white"
              placeholder="Enter title"
              value={searchTitle}
              onChange={handleTitle}
              onKeyDown={(e) => e.key === "Enter" && titleFood(searchTitle)}
            />
            <CiSearch
              onClick={() => titleFood(searchTitle)}
              className="absolute right-2 top-2 text-2xl cursor-pointer"
            />
          </div>
          <div className="relative">
            <input
              type="search"
              className="bg-transparent border-2 p-2 rounded-sm placeholder:text-white text-white border-white"
              placeholder="Enter Region"
              value={searchArea}
              onChange={handleArea}
              onKeyDown={(e) => e.key === "Enter" && areaFood(searchArea)}
            />
            <CiSearch
              onClick={() => areaFood(searchArea)}
              className="absolute right-2 top-2 text-2xl cursor-pointer"
            />
          </div>
        </div>
      </nav>

      {foods.length === 0 && (
        <div className="text-center my-5 items-center">
          <h1 className="text-8xl font-bold text-red-500">404 Not Found</h1>
          <button
            onClick={handleBackButtonClick}
            className="mt-4 px-4 py-2 bg-purple-800 text-white rounded-md"
          >
            Back
          </button>
        </div>
      )}
      <div className="w-11/12 my-5 mx-auto grid grid-cols-3 gap-4">
        {foods?.map((item, index) => (
          <div
            key={index}
            className="shadow-md cursor-pointer duration-300 hover:shadow-slate-800 rounded-md shadow-slate-500 p-5"
            onClick={() => selectedMeal(index)}
          >
            <img
              src={item.strMealThumb}
              alt={item.strMeal}
              className="rounded-md"
            />
            <h3 className="text-xl mt-2">
              <b>Title: </b> {item.strMeal}
            </h3>
            <div className="my-2 flex justify-between">
              {item.strCategory !== undefined ? (
                <p>
                  <b>Category: </b>
                  {item.strCategory}
                </p>
              ) : (
                ""
              )}
              {item.strArea !== undefined ? (
                <p>
                  <b>Area: </b>
                  {item.strArea}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>

      {showSelectedFood && selectFood && (
        <div className="h-full w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white shadow-md shadow-orange-700 p-5 rounded-md w-[80vw] h-[80vh] overflow-auto relative">
            <IoCloseCircle
              className="absolute top-2 right-2 text-3xl text-purple-800 cursor-pointer"
              onClick={() => setShowSelectedFood(false)}
            />
            <h4 className="text-2xl font-bold mb-4">{selectFood.strMeal}</h4>
            <p className="mb-4">{selectFood.strInstructions}</p>
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${selectFood.strYoutube?.slice(
                32
              )}`}
              title={selectFood.strMeal}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;