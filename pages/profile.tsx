import { useContext } from 'react';
import { UserContext } from '../lib/userContext';

const Profile = ({ movieList }) => {
    const [user] = useContext(UserContext);

    return (
        <>
            {user?.loading ? (
                <p>Loading..</p>
            ) : (
                user?.issuer && (
                    <>
                        <div className='bg-slate-900 text-gray-100 h-screen'>
                            <div className='p-10'>
                                <div className='label text-sky-400'>Email</div>
                                <div className='profile-info'>{user.email}</div>
                                <div className='label text-sky-400'>User Id</div>
                                <div className='profile-info'>{user.issuer}</div>
                            </div>
                            <div className='p-10'>
                                <h3 className='text-xl pb-2 text-sky-400'>Your saved movies</h3>
                                <ul >
                                    {movieList.data.map((m) =>
                                        <li key={m.showId}>{m.showId}</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </>
                )
            )}
        </>
    );
};
export default Profile;

Profile.getInitialProps = async (context) => {
    const res = await fetch("http://localhost:3000/api/movies", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const movieList = await res.json();

    return { movieList }
}
