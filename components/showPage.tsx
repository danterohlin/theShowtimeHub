export default function showPage({ title, index, overview, poster_path, publicRuntimeConfig, setSearchResults, genres, rating }: any) {
    const IMAGES_API = 'https://image.tmdb.org/t/p/w500/'
    return (
        <div className="movie relative p-2 bg-gray-900 overflow-hidden flex justify-between w-full" key={index}>
            <div className="bg-gray-900 text-gray-300 opacity-90 pr-8 flex flex-col">
                <h4 className="text-md font-bold text-xl pb-2">{title}</h4>
                <p className="text-sm">{overview}</p>

                <div className="text-sm flex flex-wrap pt-4">
                    {genres && genres.map((e: any) => {
                        return (<p className="pr-2" key={e.id}>[ {e.name} ]</p>)
                    })}
                </div>
                <p className="text-sm pt-4"><i className="pr-2 text-sky-400 fa fa-star"></i>{rating}/10</p>
                <div className="w-full flex justify-end mt-auto"><div className="cursor-pointer bg-sky-600 flex-shrink rounded-2xl px-10 py-6 color-white font-medium my-4 hover:bg-sky-700"><i className="fa text-xl">&#xf04b;</i></div></div>

            </div>

            <img className="" src={IMAGES_API + poster_path} alt={title} />
        </div>
    )
}
