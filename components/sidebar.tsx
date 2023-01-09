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
        <div className="bg-slate-700 text-gray-200 w-1/6 py-4 px-4">
            <p className={`whitespace-nowrap bg-slate-600 p-4 px-8 my-1 cursor-pointer hover:bg-slate-800 transition ${current == "All" && "bg-slate-500"}`} onClick={handleClick}>All</p>
            <p className={`whitespace-nowrap bg-slate-600 p-4 px-8 my-1 cursor-pointer hover:bg-slate-800 transition ${current == "Trending" && "bg-slate-500"}`} onClick={handleClick}>Trending</p>
            <p className={`whitespace-nowrap bg-slate-600 p-4 px-8 my-1 cursor-pointer hover:bg-slate-800 transition ${current == "Movies" && "bg-slate-500"}`} onClick={handleClick}>Movies</p>
            <p className={`whitespace-nowrap bg-slate-600 p-4 px-8 my-1 cursor-pointer hover:bg-slate-800 transition ${current == "TV Shows" && "bg-slate-500"}`} onClick={handleClick}>TV Shows</p>
            <p className={`whitespace-nowrap bg-slate-600 p-4 px-8 my-1 cursor-pointer hover:bg-slate-800 transition ${current == "Recommended" && "bg-slate-500"}`} onClick={handleClick}>Recommended</p>
        </div>
    )
}
