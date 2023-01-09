export default function show({ title, index, overview, poster_path, publicRuntimeConfig, setShowData, setShowsData, rating, genres, genre_ids, media_type }: any) {
    const IMAGES_API = 'https://image.tmdb.org/t/p/w500/'
    const getShow = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/${media_type ? media_type : "movie"}/${index}?api_key=${publicRuntimeConfig.apiKey}`)
        const showData = await res.json()
        setShowsData([])
        setShowData(showData)
    }

    return (
        <div onClick={getShow} className="group movie cursor-pointer relative m-2 bg-gray-900 overflow-hidden w-[calc(20%-16px)]" key={index}>
            <img className="group-hover:opacity-70" src={IMAGES_API + poster_path} alt={title} />
            <div className="absolute transition-transform bg-opacity-80 ease-in-out duration-500 translate-y-0 group-hover:-translate-y-full bg-black text-gray-300 opacity-90 p-4 pt-2 -left-1 -right-1">
                <h4 className="text-md font-bold pb-2">{title}</h4>
                <p className="text-sm font-medium"><i className="pr-2 text-sky-400 fa fa-star"></i>{rating} / 10</p>
                <p>{media_type && media_type.charAt(0).toUpperCase() + media_type.slice(1)}</p>
                <div className="text-xs flex flex-wrap">
                    {genres.map((e: any) => {
                        if (genre_ids.includes(e.id)) {
                            return (<p key={e.id} className="pr-1 whitespace-nowrap">{e.name}</p>)
                        }
                    })}
                </div>
            </div>

        </div>
    )
}
