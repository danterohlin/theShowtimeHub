export default function sidebar({ setCurrent, current, setShowsData, publicRuntimeConfig }: any) {
    const handleClick = async (e: any) => {
        let res, data;
        switch (e.target.innerHTML) {
            case "All":
                res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${publicRuntimeConfig.apiKey}&page=2`);
                data = await res.json();
                console.log(data)
                setShowsData(data.results)
                break;
            case "Trending":
                res = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${publicRuntimeConfig.apiKey}`);
                data = await res.json();
                setShowsData(data.results)
                break;
            case "Movies":
                res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${publicRuntimeConfig.apiKey}`);
                data = await res.json();
                setShowsData(data.results)
                break;
            case "TV Shows":
                res = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${publicRuntimeConfig.apiKey}`);
                data = await res.json();
                setShowsData(data.results)
                break;
            case "Recommended":
                res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${publicRuntimeConfig.apiKey}&page=4`);
                data = await res.json();
                setShowsData(data.results)
                break;
            default:
                break;
        }
        // if (current == e.target.innerHTML) {
        //     return;
        // } else {
        //     const res = await fetch(`https://api.themoviedb.org/3/${e.target.innerHTML}/?api_key=${publicRuntimeConfig.apiKey}`);
        //     const data = await res.json();
        //     setShowsData(data)
        // }
        setCurrent(e.target.innerHTML)
    }


    return (
        <div className=" text-gray-200 w-1/6  z-10">
            <p className={`whitespace-nowrap  p-4 px-6  cursor-pointer bg-slate-150 hover:bg-slate-150 hover:border-r-2 transition border-sky-500 ${current == "All" && " border-r-2 text-sky-400"}`} onClick={handleClick}>All</p>
            <p className={`whitespace-nowrap  p-4 px-6  cursor-pointer bg-slate-150 hover:bg-slate-150 hover:border-r-2 transition border-sky-500 ${current == "Trending" && " border-r-2 text-sky-400"}`} onClick={handleClick}>Trending</p>
            <p className={`whitespace-nowrap  p-4 px-6  cursor-pointer bg-slate-150 hover:bg-slate-150 hover:border-r-2 transition border-sky-500 ${current == "Movies" && " border-r-2 text-sky-400"}`} onClick={handleClick}>Movies</p>
            <p className={`whitespace-nowrap  p-4 px-6  cursor-pointer bg-slate-150 hover:bg-slate-150 hover:border-r-2 transition border-sky-500 ${current == "TV Shows" && " border-r-2 text-sky-400"}`} onClick={handleClick}>TV Shows</p>
            <p className={`whitespace-nowrap  p-4 px-6  cursor-pointer bg-slate-150 hover:bg-slate-150 hover:border-r-2 transition border-sky-500 ${current == "Recommended" && " border-r-2 text-sky-400"}`} onClick={handleClick}>Recommended</p>
            <p className={`whitespace-nowrap  p-4 px-6  cursor-pointer bg-slate-150 hover:bg-slate-150 hover:border-r-2 transition border-sky-500`}  >Categories</p>
            <p className={`whitespace-nowrap  p-4 px-6  cursor-pointer bg-slate-150 hover:bg-slate-150 hover:border-r-2 transition border-sky-500`}  >Top Rated</p>
            <p className={`whitespace-nowrap  p-4 px-6  cursor-pointer bg-slate-150 hover:bg-slate-150 hover:border-r-2 transition border-sky-500`}  >Popular</p>
            <p className={`whitespace-nowrap  p-4 px-6  cursor-pointer bg-slate-150 hover:bg-slate-150 hover:border-r-2 transition border-sky-500`}  >Oscar Nominated</p>
            <p className={`whitespace-nowrap  p-4 px-6  cursor-pointer bg-slate-150 hover:bg-slate-150 hover:border-r-2 transition border-sky-500`}  >Most Viewed</p>
            <p className={`whitespace-nowrap  p-4 px-6  cursor-pointer bg-slate-150 hover:bg-slate-150 hover:border-r-2 transition border-sky-500`}  >Relaxing</p>
            <p className={`whitespace-nowrap  p-4 px-6  cursor-pointer bg-slate-150 hover:bg-slate-150 hover:border-r-2 transition border-sky-500`}  >Comedy</p>
            <p className={`whitespace-nowrap  p-4 px-6  cursor-pointer bg-slate-150 hover:bg-slate-150 hover:border-r-2 transition border-sky-500`}  >Top Rated Actors</p>
        </div>
    )
}
