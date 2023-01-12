import { useState } from "react";
export default function sidebar({ setCurrent, current, setShowsData, apiKey, initialData, setContentType }: any) {
    const handleClick = async (e: any) => {
        let res, data;
        switch (e.target.id) {
            case "trending":
                setShowsData(initialData)
                setContentType("showsData")
                break;
            case "movies":
                res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
                data = await res.json();
                setShowsData(data.results)
                setContentType("showsData")
                break;
            case "topMovies":
                res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`);
                data = await res.json();
                setShowsData(data.results)
                setContentType("showsData")
                break;
            case "categoriesMovies":
                res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
                data = await res.json();
                setShowsData([])
                setContentType("categoryData")
                break;
            case "tvShows":
                res = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`);
                data = await res.json();
                setShowsData(data.results)
                setContentType("showsData")
                break;
            case "recommended":
                setShowsData(initialData)
                setContentType("showsData")
                break;
        }
        if (current == e.target.id) {
            e.target.classList.contains("drop-menu") && e.target.nextElementSibling.classList.toggle("collapsed")
        } else {
            e.target.classList.contains("drop-menu") && e.target.nextElementSibling.classList.remove("collapsed")
            setCurrent(e.target.id)
        }

    }

    return (
        <div className="text-gray-200 w-1/6  z-10">
            <p className={`whitespace-nowrap p-4 px-6 cursor-pointer  hover:text-gray-300 border-sky-500 ${current == "trending" && " text-sky-400 hover:text-sky-400"}`} onClick={handleClick} id="trending">Trending</p>
            <p className={`whitespace-nowrap p-4 px-6 cursor-pointer hover:text-gray-300 border-sky-500 drop-menu ${current == "movies" && " text-sky-400 hover:text-sky-400"}`} onClick={handleClick} id="movies">Movies</p>
            <div className="subMenuMovie transition-all duration-500 overflow-hidden linear max-h-32 px-6">
                <p className={`whitespace-nowrap py-2 cursor-pointer hover:text-gray-300 pl-4 border-l border-sky-900 movies ${current == "topMovies" && " text-sky-400 hover:text-sky-400"}`} id="topMovies" onClick={handleClick}>Top Rated</p>
                <p className={`whitespace-nowrap py-2 cursor-pointer hover:text-gray-300 pl-4 border-l border-sky-900 movies ${current == "categoriesMovies" && " text-sky-400 hover:text-sky-400"}`} id="categoriesMovies" onClick={handleClick}>Categories</p>
            </div>
            <p className={`whitespace-nowrap p-4 px-6 cursor-pointer hover:text-gray-300 border-sky-500 drop-menu ${current == "tvShows" && " text-sky-400 hover:text-sky-400"}`} onClick={handleClick} id="tvShows">TV Shows</p>
            <div className="subMenuTV transition-all duration-500 overflow-hidden linear max-h-32 px-6">
                <p className={`whitespace-nowrap py-2 cursor-pointer hover:text-gray-300 pl-4 border-l border-sky-900 tv ${current == "tvShowsTrending" && " text-sky-400 hover:text-sky-400"}`} id="tvShowsTrending" onClick={handleClick}>Trending</p>
                <p className={`whitespace-nowrap py-2 cursor-pointer hover:text-gray-300 pl-4 border-l border-sky-900 tv ${current == "tvShowsCategories" && " text-sky-400 hover:text-sky-400"}`} id="tvShowsCategories" onClick={handleClick}>Categories</p>
            </div>
            <p className={`whitespace-nowrap p-4 px-6 cursor-pointer  hover:text-gray-300 border-sky-500 ${current == "recommended" && " text-sky-400 hover:text-sky-400"}`} onClick={handleClick} id="recommended">Recommended</p>
        </div >
    )
}
