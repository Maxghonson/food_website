import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoFastFoodSharp } from "react-icons/io5";
import { FoodsProps } from "./Type";

const App = () => {
    let [foods, setFoods] = useState<FoodsProps[]>([]);
    let [selectFood, setSelectFood] = useState<FoodsProps>();
    let [hide, setHide] = useState(true);
    let [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        axios
            .get("https://www.themealdb.com/api/json/v1/1/search.php?s=beef")
            .then((data) => {
                setFoods(data.data.meals);
                setSelectFood(data.data.meals[0]);
            })
            .catch((err) => console.log(err.message));
    }, []);

    const handleNextClick = (item: FoodsProps) => {
        setSelectFood(item);
        setHide(false);
    };

    const handleHideClick = () => {
        setHide(true);
    };

    const handleSearch = () => {
        axios
            .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTitle}`)
            .then((data) => {
                setFoods(data.data.meals);
                setSelectFood(data.data.meals[0]);
            })
            .catch((err) => console.log(err.message));
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
            e.currentTarget.blur(); 
        }
    };

    return (
        <div>
            <nav className="h-[10vh] bg-purple-800 text-white flex justify-between items-center px-10">
                <IoFastFoodSharp color="red" size={40} />
                <div className="flex gap-10">
                    <input
                        type="search"
                        className="bg-transparent border-2 p-2 rounded-sm placeholder:text-white text-white border-white"
                        placeholder="Titleni kiriting"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <input
                        type="search"
                        className="bg-transparent border-2 p-2 rounded-sm placeholder:text-white text-white border-white"
                        placeholder="Hududni kiriting"/>
                    
                </div>
            </nav>
            {hide ? (
                <div className="w-11/12 my-0 py-5 mx-auto grid grid-cols-3 gap-2">
                    {foods?.map((item, index) => (
                        <div key={index} onClick={() => handleNextClick(item)} className="next shadow-md cursor-pointer duration-300 hover:shadow-slate-800 rounded-md shadow-slate-500 p-5">
                            <img src={item.strMealThumb} alt={item.strMeal} />
                            <h3 className="text-xl mt-2">
                                <b>Sarlavha: </b>
                                {item.strMeal}
                            </h3>
                            <div className="my-2 flex justify-between">
                                <p>
                                    <b>Kategoriya: </b>
                                    {item.strCategory}
                                </p>
                                <p>
                                    <b>Hudud: </b>
                                    {item.strArea}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center w-[100vw] h-[110vh] bg-slate-200">
                    <div className="first shadow-md shadow-orange-700 p-5 mt-16 rounded-md w-[60vw] h-[110vh]">
                        <button onClick={handleHideClick} className="absolute top-[100px] right-[180px] bg-red-500 text-white px-2 py-1 rounded">X</button>
                        <h4>{selectFood?.strMeal}</h4>
                        <p>{selectFood?.strInstructions}</p>
                        <iframe
                            className="ml-16"
                            width="640"
                            height="290"
                            src={`https://www.youtube.com/embed/${selectFood?.strYoutube.slice(31)}`}
                            title={selectFood?.strMeal}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;