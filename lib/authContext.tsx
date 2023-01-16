import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Magic } from "magic-sdk";

const AuthContext = createContext();

let magic;
export const AuthProvider = (props) => {
	const [user, setUser] = useState(null); // Change null to {email} to see if it works
	const router = useRouter();

	/**
	 * Adds email to user
	 * @param {string} email
	 */
	const loginUser = async (email) => {
		try {
			await magic.auth.loginWithMagicLink({ email });
			setUser({ email, issuer });
			router.push("/");
		} catch (err) {
			setUser(null);
		}
	};

	/**
	 * Sets the user to null
	 */
	const logoutUser = async () => {
		try {
			await magic.user.logout();
			setUser(null);
			router.push("/");
		} catch (err) { }
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
