import { useState } from "react"

export default function show({ data, genres, setShow, setContentType }: any) {
    const [loading, setLoading] = useState(false)
    const IMAGES_API = 'https://image.tmdb.org/t/p/w500/'
    const handleClick = () => {
        setShow({ id: data.id, media_type: data.title ? "movie" : "tv" })
        setContentType("showData")
    }
    const saveShow = async (e) => {
        setLoading(true);
        e.preventDefault();
        let res = await fetch("http://localhost:3000/api/movies", {
            method: "POST",
            body: JSON.stringify({
                showId: data.id,
            }),
        });
        res = await res.json();
        setLoading(false);
    }
    return (
        <div className="w-1/5">
            <div onClick={saveShow} className="cursor-pointer text-gray-200">Save</div><div>{loading && <p>Loading...</p>}</div>
            <div onClick={handleClick} className="group movie cursor-pointer relative m-2 bg-gray-900 overflow-hidden" key={data.id}>
                <img className="group-hover:opacity-70 pointer-events-none" src={IMAGES_API + data.poster_path} alt={data.title} />

                <div className="absolute transition-transform bg-opacity-80 ease-in-out duration-500 translate-y-0 group-hover:-translate-y-full bg-black text-gray-300 opacity-90 p-4 pt-2 -left-1 -right-1">
                    <h4 className="text-md font-bold pb-2">{data.title ? data.title : data.name}</h4>
                    <p className="text-sm font-medium"><i className="pr-2 text-sky-400 fa fa-star"></i>{data.vote_average} / 10</p>
                    <p>{data.media_type && data.media_type.charAt(0).toUpperCase() + data.media_type.slice(1)}</p>
                    <div className="text-xs flex flex-wrap">
                        {genres.map((e: any) => {
                            if (data.genre_ids.includes(e.id)) {
                                return (<p key={e.id} className="pr-1 whitespace-nowrap">{e.name}</p>)
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
