import { useState, useEffect } from "react";

export default function categories({ apiKey }: any) {
    const [categories, setCategories] = useState([])
    const fetchCategories = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
        const data = await res.json();
        setCategories(data.genres)
    }

    useEffect(() => {
        fetchCategories();
    }, [])


    return (
        <div className="text-white font-bold font-nunito tracking-wider z-10 flex flex-wrap p-10 ">{categories.length > 1 ? categories.map((e: any) => {
            return (<p className="p-6  bg-sky-800 rounded m-2 w-[calc(25%-1rem)] cursor-pointer hover:bg-sky-900 transition">{e.name}</p>)
        }) : <p>loading...</p>
        }</div>
    )
}
