import { useEffect, useState } from "react";
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserContext } from "../lib/userContext";
import { magic } from '../lib/magic';

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser({ loading: true });
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        magic.user.getMetadata().then((userData) => setUser(userData));
      } else {
        Router.push('/login');
        setUser({ user: null });
      }
    });
  }, []);
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )

}
