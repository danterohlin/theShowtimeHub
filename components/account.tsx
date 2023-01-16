import { useContext, useEffect, useState } from 'react';
import AuthContext from '../lib/authContext';
import Link from 'next/link'

const savedShows = (user) => {
    const [shows, setShows] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchSaved = async () => {
            if (user) {
                try {
                    setLoading(true)
                    const res = await fetch(`http://localhost:3000/api/saved/shows/${user.issuer}`)
                    const data = await res.json()
                    setShows(data)
                } catch (err) {
                    setShows([])
                }
                setLoading(false)
            }
        }
        fetchSaved()
    }, [user])

    return { shows, loading }
}

export default function accoount() {
    const { user, logoutUser } = useContext(AuthContext)
    const { shows, loading } = savedShows(user)

    return (
        <>
            {!user ? (
                <p className="p-10 h-screen text-gray-100">Loading..</p>
            ) : (
                <>
                    <div className='text-gray-100 '>
                        <div className='p-10'>
                            <div className='flex flex-col p-4'>
                                <div className='label text-sky-400'>Email</div>
                                <div className='profile-info'>{user.email}</div>
                                <div className='label text-sky-400'>User Id</div>
                                <div className='profile-info'>{user.issuer}</div>
                            </div>
                            <div className='flex'>
                                <Link className="border border-slate-250 px-4 mt-2 py-2 " href="#" onClick={logoutUser}>Logout</Link>
                            </div>

                        </div>
                        <div className='p-10'>
                            <h3 className='text-xl pb-2 text-sky-400'>Your saved movies</h3>
                            {loading && <p>Loading your orders..</p>}
                            {shows.data?.map((show, i) => (
                                <div key={i}>
                                    {show.showTitle}
                                </div>
                            ))}
                        </div>
                    </div>
                </>

            )}
        </>
    );
};