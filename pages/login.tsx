import Head from "next/head";
import { useContext, useState } from "react";
import AuthContext from "../lib/authContext";
import Router from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    loginUser(email);
  };

  return (
    <div className="bg-slate-900 h-screen text-gray-100">
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Login here to make your purchase"
        ></meta>
      </Head>
      <div className="h-full flex justify-center flex-col items-center">
        <h2 className="pb-4 text-xl">Login</h2>
        <form onSubmit={handleSubmit} className="flex">
          <input
            className="bg-transparent bg-slate-700 focus:outline-0 rounded-l-xl px-4 py-1"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email.."
          />
          <button className="btn px-6 py-2.5 bg-gradient-to-l from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-600 text-white font-medium text-xs leading-tight uppercase rounded-r-xl shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out flex items-center">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
