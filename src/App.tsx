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
  const [notFound, setNotFound] = useState<boolean>(false);

  const titleFood = (text: string) => {
    if (!text.trim()) {
      alert("Please enter a title");
      return;
    }
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`)
      .then((data) => {
        if (data.data.meals) {
          setFoods(data.data.meals);
          setSelectFood(data.data.meals[0]);
          setNotFound(false);
        } else {
          setNotFound(true);
          setFoods([]);
          setSelectFood(undefined);
        }
        setSearchTitle("");
      })
      .catch((err) => console.log(err.message));
  };

  const areaFood = (text: string) => {
    if (!text.trim()) {
      alert("Please enter a region");
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

  const fetchFoodDetails = (id: number) => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => {
        if (response.data.meals) {
          setSelectFood(response.data.meals[0]);
          setShowSelectedFood(true);
        }
      })
      .catch((error) => console.log(error.message));
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

  const handleBackButtonClick = () => {
    titleFood("beef");
  };

  useEffect(() => {
    titleFood("beef");
  }, []);
  const selectedMeal = (num: number) => {
    fetchFoodDetails(foods[num].idMeal);
    setSelectFood(foods[num]);
    setShowSelectedFood(true);
  };

  return (
    <div>

      <nav className="h-[10vh] bg-purple-800 sticky text-white flex justify-between max-md:sticky top-0 max-md:top-0 items-center px-10 max-md:relative">
        <IoFastFoodSharp size={40} color="red" className="max-md:absolute max-md:left-[44vw]" />
        <div className="flex gap-10 max-md:justify-between max-md:w-full">
          <div>
            <input
              type="search"
              className=" max-md:w-32 bg-transparent border-2 p-2 rounded-sm placeholder:text-white text-white border-white"
              placeholder="Enter title"
              value={searchTitle}
              onChange={handleTitle}
              onKeyDown={(e) => e.key === "Enter" && titleFood(searchTitle)}
            />

          </div>
          <div>
            <input
              type="search"
              className=" max-md:w-32 bg-transparent border-2 p-2 rounded-sm placeholder:text-white text-white border-white"
              placeholder="Enter Region"
              value={searchArea}
              onChange={handleArea}
              onKeyDown={(e) => e.key === "Enter" && areaFood(searchArea)}
            />
          </div>
        </div>
      </nav>
      <div className="w-11/12 my-5 mx-auto grid grid-cols-3 gap-4 max-md:grid-cols-1">
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
          <button className="text-2xl text-red-600 bg-yellow-600 rounded-2xl px-2 absolute top-8 left-[1220px] max-md:left-[400px]" onClick={() => setShowSelectedFood(false)}>X</button>
          <div className="bg-white shadow-md shadow-orange-700 p-5 rounded-md w-[80vw] h-[80vh] overflow-auto relative">
            <h4 className="text-2xl font-bold mb-4">{selectFood.strMeal}</h4>
            <p className="mb-4">{selectFood.strInstructions}</p>
            <iframe
              className="w-96 mx-auto aspect-video max-md:w-72 "
              src={`https://www.youtube.com/embed/${selectFood.strYoutube?.slice(
                32
              )}`}
              title={selectFood.strMeal}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
      <div>
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

      </div>
    </div>
  );
};

export default App;