import { createContext, useState, useEffect, useContext } from "react"
import AuthContext from "./authContext";
const SavedContext = createContext()

export const SavedProvider = (props) => {
    const [saved, setSaved] = useState([]);
    const { user } = useContext(AuthContext)
    useEffect(() => {
        fetchSaved(user)
    }, [user])
    const fetchSaved = async (user) => {
        try {
            const res = await fetch(`http://localhost:3000/api/saved/shows/${user.issuer}`)
            const data = await res.json()
            setSaved(data)
        } catch (err) {
            setSaved([])
        }
    }
    return (
        <SavedContext.Provider value={{ fetchSaved, saved, setSaved }}>
            {props.children}
        </SavedContext.Provider>
    );
}
export default SavedContext;