import { useState, useContext, useEffect } from "react"
import AuthContext from "../lib/authContext"
import SavedContext from "../lib/savedContext"

export default function show({ data, genres, setShow, setContentType }: any) {
    const [loading, setLoading] = useState(false)
    const { user } = useContext(AuthContext)
    const [alreadySaved, setAlreadySaved] = useState(false)
    const { saved, fetchSaved } = useContext(SavedContext)
    const IMAGES_API = 'https://image.tmdb.org/t/p/w500/'
    const handleClick = () => {
        setShow({ id: data.id, media_type: data.title ? "movie" : "tv" })
        setContentType("showData")
    }
    const saveShow = async (e) => {
        e.preventDefault();
        let res = await fetch(`http://localhost:3000/api/saved/add/${user.issuer}`, {
            method: "POST",
            body: JSON.stringify({
                showId: data.id,
                showTitle: data.title ? data.title : data.name,
                userId: user.issuer
            }),
        });
        res = await res.json();
        console.log(res)
        setAlreadySaved(true);
        fetchSaved(user)
    }
    const removeShow = async (e) => {
        e.preventDefault();
        let res = await fetch(`http://localhost:3000/api/saved/remove/${user.issuer}`, {
            method: "POST",
            body: JSON.stringify({
                showId: data.id,
                showTitle: data.title ? data.title : data.name,
                userId: user.issuer
            }),
        });
        res = await res.json();
        console.log(res)
        setAlreadySaved(false);
        fetchSaved(user)
    }

    const checkList = () => {
        saved.data?.map((show) => {
            data.id === show.showId && setAlreadySaved(true)
        })
    }

    useEffect(() => {
        checkList()
        console.log(saved)
    }, [saved])


    return (
        <div className="w-1/5">
            <div className="group movie relative m-2 bg-gray-900 overflow-hidden" key={data.id}>
                <div onClick={handleClick} className="cursor-pointer">
                    <img className="group-hover:opacity-70 pointer-events-none" src={IMAGES_API + data.poster_path} alt={data.title} />
                </div>
                <div className="absolute transition-transform ease-in-out duration-500 translate-y-0 group-hover:-translate-y-full bg-zinc-1000 text-gray-300 pt-2 -left-1 -right-1">
                    <h4 onClick={handleClick} className="text-md font-bold pb-2 cursor-pointer px-4">{data.title ? data.title : data.name}</h4>
                    <p className="text-sm font-medium px-4 pb-2"><i className="pr-2 text-sky-400 fa fa-star"></i>{data.vote_average} / 10</p>
                    <p className="px-4 pb-2">{data.media_type && data.media_type.charAt(0).toUpperCase() + data.media_type.slice(1)}</p>
                    <div className="text-xs flex flex-wrap px-4 pb-2">
                        {genres.map((e: any) => {
                            if (data.genre_ids.includes(e.id)) {
                                return (<p key={e.id} className="pr-1 whitespace-nowrap">{e.name}</p>)
                            }
                        })}
                    </div>
                    {alreadySaved ? <div onClick={removeShow} className="cursor-pointer text-gray-200 w-full bg-sky-700 hover:bg-sky-800 py-2 mt-2 text-center"> Remove from Watchlist</div> : <div onClick={saveShow} className="cursor-pointer text-gray-200 w-full bg-sky-700 hover:bg-sky-800 py-2 mt-2 text-center"> Add to Watchlist</div>}
                </div>
            </div>
        </div>
    )
}
