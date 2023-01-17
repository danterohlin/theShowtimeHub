import { useContext, useEffect, useState } from "react";
import AuthContext from "../lib/authContext";
import SavedContext from "../lib/savedContext";
import Link from "next/link";
import Image from "next/image";

// const savedShows = (user) => {
//   const [shows, setShows] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchSaved = async () => {
//       if (user) {
//         try {
//           setLoading(true);
//           const res = await fetch(
//             `http://localhost:3000/api/saved/shows/${user.issuer}`
//           );
//           const data = await res.json();
//           setShows(data);
//         } catch (err) {
//           setShows([]);
//         }
//         setLoading(false);
//       }
//     };
//     fetchSaved();
//   }, [user]);

//   return { shows, loading };
// };

export default function accoount() {
  const { user, logoutUser } = useContext(AuthContext);
  const [show, setShow] = useState({});
  const { fetchSaved, saved } = useContext(SavedContext);
  const IMAGES_API = "https://image.tmdb.org/t/p/w500/";

  const removeShow = async (show) => {
    let res = await fetch(
      `http://localhost:3000/api/saved/remove/${user.issuer}`,
      {
        method: "POST",
        body: JSON.stringify({
          showId: show.id,
          showTitle: show.title ? show.title : show.name,
          userId: user.issuer,
        }),
      }
    );
    res = await res.json();
    console.log(res);
    fetchSaved(user);
  };

  return (
    <>
      {!user ? (
        <p className="p-10 h-screen text-gray-100">Loading..</p>
      ) : (
        <>
          <div className="text-gray-100">
            <div className="flex justify-end items-center">
              <div className="flex flex-col p-4">
                <div className="profile-info">{user.email}</div>
              </div>
              <div className="">
                <Link className="pr-6" href="#" onClick={logoutUser}>
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
