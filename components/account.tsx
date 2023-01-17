import { useContext, useEffect, useState } from "react";
import AuthContext from "../lib/authContext";
import SavedContext from "../lib/savedContext";
import Link from "next/link";
export default function account({ setContentType }) {
  const { user, logoutUser } = useContext(AuthContext);
  const { fetchSaved, saved, setSaved } = useContext(SavedContext);
  const IMAGES_API = "https://image.tmdb.org/t/p/w500/";

  const removeShow = async (show) => {
    let res = await fetch(
      `http://localhost:3000/api/saved/remove/${user.issuer}`,
      {
        method: "POST",
        body: JSON.stringify({
          showId: show.showId,
          showTitle: show.title ? show.title : show.name,
          userId: user.issuer,
        }),
      }
    );

    res = await res.json();
    fetchSaved(user);
  };

  const logout = async () => {
    let res = await logoutUser();
    let result = await res
    if (result.status === 200) {
      setContentType("showsData")
      setSaved([])
    }
  }

  return (
    <>
      {!user ? (
        <p className="p-10 h-screen text-gray-100">Loading..</p>
      ) : (
        <>
          <div className="text-gray-100 w-full">
            <div className="flex justify-end items-center">
              <div className="flex flex-col p-4">
                <div className="profile-info">{user.email}</div>
              </div>
              <div className="">
                <Link className="pr-6 text-sky-700" href="" onClick={logout}>
                  Logout
                </Link>
              </div>
            </div>
            <div className="">
              <h3 className="text-xl pb-2 text-sky-400">Your Watchlist</h3>
              <div className="flex flex-wrap">
                {saved.data.map((show, i) => (
                  <div key={i} className="m-2 group relative overflow-hidden">
                    <img
                      className="group-hover:opacity-90 pointer-events-none"
                      src={IMAGES_API + show.poster_path}
                      alt={show.title}
                      width="140px"
                    />
                    <p
                      className="text-gray-200 cursor-pointer absolute absolute transition-transform ease-in-out duration-500 translate-y-0 group-hover:-translate-y-full bg-zinc-1000 hover:text-gray-300 pt-2 right-0 left-0 text-center pb-2"
                      onClick={() => removeShow(show)}
                    >
                      Remove
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
