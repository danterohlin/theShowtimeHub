import { useState } from "react"
import Image from 'next/image'

interface Form {
    searchTerm: string;
}

export default function header({ setShowsData, publicRuntimeConfig, initialData }: any) {
    const [formInput, setFormInput] = useState<Form>({ searchTerm: "" })
    const [searchTerm, setSearchTerm] = useState('')
    const handleInput = (event: any) => {
        let { name, value } = event.target
        setFormInput({ ...formInput, [name]: value })
        setSearchTerm(event.target.value)
    }
    const search = async (event: any) => {
        event.preventDefault()
        if (searchTerm == "") {
            setShowsData(initialData)
            return;
        }
        let res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${publicRuntimeConfig.apiKey}&query=${formInput.searchTerm}&language=en-US&page=1&include_adult=false`)
        let data = await res.json();
        setShowsData(data.results)
    }
    const reset = async (event: any) => {
        setShowsData(initialData)
    }
    return (
        <div className='bg-slate-900 w-full  z-10'>
            <div className="flex flex justify-between px-6 max-w-8xl m-auto items-center text-white">
                <div className="w-1/3 flex"> <div onClick={reset} className="tracking-widest bg-slate-900 rounded text-2xl font-bold cursor-pointer font-nunito inline-block"><div className="flex"><Image width="40" height="30" alt="playNextLogo" src="/pnlogo.png" /><span className="pl-2">BTV</span></div></div></div>
                <form onSubmit={search} className="flex p-4 w-1/3">
                    <input className="search bg-transparent bg-slate-700 w-96 focus:outline-0 rounded-l-xl px-4 py-1" placeholder="Search" name="searchTerm" type="text" value={searchTerm} onChange={handleInput} />
                    <button className="btn inline-block px-6 py-2.5 bg-gradient-to-l from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-600 text-white font-medium text-xs leading-tight uppercase rounded-r-xl shadow-md  hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" id="button-addon2" type="submit">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                        </svg>
                    </button>
                </form>
                <div className="w-1/3"></div>
            </div>
        </div >
    )
}
