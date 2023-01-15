import { useState, useEffect } from "react";

export default function categories({ apiKey, categoriesType, setShowsData, setContentType }: any) {
    const [categories, setCategories] = useState([])
    const fetchCategories = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/genre/${categoriesType}/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`)
        const data = await res.json();
        setCategories(data.genres)
    }

    const handleClick = async (e: any) => {
        const res = await fetch(`https://api.themoviedb.org/3/discover/${categoriesType}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&with_genres=${e.target.id}&sort_by=vote_average.desc&vote_count.gte=100`)
        const data = await res.json();
        setContentType("showsData")
        setShowsData(data.results)
    }

    useEffect(() => {
        fetchCategories();
    }, [categoriesType])


    return (
        <div className="text-white font-bold font-nunito tracking-wider z-10 flex flex-wrap p-10 ">{categories.length > 1 ? categories.map((e: any) => {
            return (<p className="p-6 bg-sky-800 rounded m-2 w-[calc(25%-1rem)] cursor-pointer hover:bg-sky-900 transition" onClick={handleClick} id={e.id} key={e.id}>{e.name}</p>)
        }) : <p>loading...</p>
        }</div>
    )
}
