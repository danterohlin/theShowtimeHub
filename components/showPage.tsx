export default function showPage({ title, index, overview, poster_path, publicRuntimeConfig, setSearchResults, genres, rating }: any) {
    const IMAGES_API = 'https://image.tmdb.org/t/p/w500/'
    return (
        <div className="movie relative p-2 border-slate-250 pb-2 overflow-hidden flex justify-between w-full" key={index}>
            <div className=" text-gray-300 pr-8 p-4 flex flex-col ">
                <h4 className="text-md font-bold text-xl pb-2">{title}</h4>
                <p className="text-sm pr-10 bg-slate-150 p-4">{overview}</p>
                <div className="text-sm flex flex-wrap pl-2 pt-4">
                    {genres && genres.map((e: any) => {
                        return (<p className="pr-2" key={e.id}>[ {e.name} ]</p>)
                    })}
                </div>
                <p className="text-sm pt-4 pl-2"><i className="pr-2 text-sky-400 fa fa-star"></i>{rating}/10</p>
                <div className="w-full flex justify-end mt-auto "><div className="cursor-pointer bg-gradient-to-l from-sky-400 to-sky-700 hover:from-sky-500 hover:to-sky-800 flex-shrink rounded-3xl px-10 py-6 color-white font-medium"><i className="fa text-xl">&#xf04b;</i></div></div>
            </div>
            <img className="" src={IMAGES_API + poster_path} alt={title} />
        </div>
    )
}
