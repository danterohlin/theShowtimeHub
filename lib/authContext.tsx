import { createContext, useState, useEffect } from "react";
import { Magic } from "magic-sdk";
import Router from "next/router"

const AuthContext = createContext();

let magic;
export const AuthProvider = (props) => {
  const [user, setUser] = useState(null); // Change null to {email} to see if it works

  /**
   * Adds email to user
   * @param {string} email
   */
  const loginUser = async (email) => {
    try {
      await magic.auth.loginWithMagicLink({ email });
      const { issuer } = await magic.user.getMetadata();
      setUser({ email, issuer });
      Router.push("/")
      return { 200: "success" }
    } catch (err) {
      setUser(null);
      return { 404: err }
    }
  };

  /**
   * Sets the user to null
   */
  const logoutUser = async (setContentType) => {
    try {
      await magic.user.logout();
      setUser(null);
      return { "status": 200 }
    } catch (err) { return { "status": err } }
  };

  const checkUserLoggedIn = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();

      if (isLoggedIn) {
        const { email, issuer } = await magic.user.getMetadata();
        setUser({ email, issuer });

        // just for testing
        const token = await getToken();
      }
    } catch (err) { }
  };

  /**
   * Retrieves the Magic Issues Bearer Token
   * This allows User to make authenticated requests
   * Token expires after 15 minutes
   */
  const getToken = async () => {
    try {
      const token = await magic.user.getIdToken();
      return token;
    } catch (err) { }
  };

  useEffect(() => {
    magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, getToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
