import { useState, useEffect, useContext } from "react";
import SavedContext from "../lib/savedContext";
import AuthContext from "../lib/authContext";
import Router from "next/router";

export default function showPage({ show }: any) {
  interface ShowType {
    id: number;
    title: string;
    name: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    genres: [];
    media_type: string;
    vote_count: number;
    release_date: string;
    first_air_date: string;
  }
  const IMAGES_API = "https://image.tmdb.org/t/p/w500/";
  const [data, setData] = useState<ShowType>({
    id: 0,
    title: "",
    name: "",
    poster_path: "",
    overview: "",
    vote_average: 0,
    genres: [],
    media_type: "",
    vote_count: 0,
    release_date: "",
    first_air_date: ""
  });
  const { setSaved, saved, fetchSaved } = useContext(SavedContext)
  const { user } = useContext(AuthContext)
  const [alreadySaved, setAlreadySaved] = useState(false);
  const getShow = async () => {
    let res = await fetch(
      `https://api.themoviedb.org/3/${show.media_type ? show.media_type : "movie"
      }/${show.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    let data = await res.json();
    setData(data);
  };
  const saveShow = async (e) => {
    e.preventDefault();
    if (user === null) {
      Router.push("/login");
      return;
    }
    let res = await fetch(
      `http://localhost:3000/api/saved/add/${user.issuer}`,
      {
        method: "POST",
        body: JSON.stringify({
          showId: data.id,
          showTitle: data.title ? data.title : data.name,
          poster_path: data.poster_path,
          overview: data.overview,
          vote_average: data.vote_average,
          release_date: data.release_date
            ? data.release_data
            : data.first_air_date,
          media_type: data.media_type,
          genre_ids: data.genre_ids,
          userId: user.issuer,
        }),
      }
    );
    res = await res.json();
    setAlreadySaved(true);
    fetchSaved(user);
  };
  const removeShow = async (e) => {
    e.preventDefault();
    let res = await fetch(
      `http://localhost:3000/api/saved/remove/${user.issuer}`,
      {
        method: "POST",
        body: JSON.stringify({
          showId: data.id,
          userId: user.issuer,
        }),
      }
    );
    res = await res.json();
    setAlreadySaved(false);
    fetchSaved(user);
  };
  const checkList = () => {
    saved.data?.map((show) => {
      data.id === show.showId && setAlreadySaved(true);
    });
  };
  useEffect(() => {
    checkList();
  }, [data]);
  useEffect(() => {
    getShow();
  }, [])
  return (
    <div
      className="movie relative p-2 border-slate-250 pb-2 overflow-hidden flex justify-between w-full"
      key={data.id}
    >
      <div className=" text-gray-300 pr-8 p-4 flex flex-col ">
        <h4 className="text-md font-bold text-xl pb-2">
          {data.title ? data.title : data.name}
        </h4>
        <p className="text-sm pr-10 p-4 my-4">{data.overview}</p>
        <div className="text-sm flex flex-wrap pl-2 pt-4">
          {data.genres &&
            data.genres.map((e: any) => {
              return (
                <p className="pr-2" key={e.id}>
                  [ {e.name} ]
                </p>
              );
            })}
        </div>
        <p className="text-sm pt-4 pl-2">{data.release_date ? "Released: " + data.release_date : "First air date: " + data.first_air_date}</p>
        <p className="text-sm pt-4 pl-2">
          <i className="pr-2 text-sky-400 fa fa-star"></i>
          {data.vote_average} / 10
        </p>
        <p className="text-sm pt-2 pl-2">Votes: {data.vote_count}</p>
        <div className="flex mt-auto ml-2">
          {alreadySaved ? (
            <div
              onClick={removeShow}
              className="text-gray-200 bg-violet-800 px-4 py-2 rounded-2xl cursor-pointer hover:bg-violet-900 transition"
            >
              Remove from Watchlist
            </div>
          ) : (
            <div
              onClick={saveShow}
              className="text-gray-200 bg-violet-800 px-4 py-2 rounded-2xl cursor-pointer hover:bg-violet-900 transition"
            >
              Add to Watchlist
            </div>
          )}
        </div>
        <div className="w-full flex justify-end mt-auto ">
          <div className="cursor-pointer bg-gradient-to-l from-sky-400 to-sky-700 hover:from-sky-500 hover:to-sky-800 flex-shrink rounded-3xl px-10 py-6 color-white font-medium">
            <i className="fa text-xl">&#xf04b;</i>
          </div>
        </div>
      </div>
      {data.poster_path && (
        <img
          className="pointer-events-none"
          width="37%"
          src={IMAGES_API + data.poster_path}
          alt={data.title}
        />
      )}
    </div>
  );
}
