import { useEffect, useState, useContext } from 'react'
import Sidebar from '../components/sidebar'
import Show from '../components/show'
import ShowPage from '../components/showPage'
import Header from '../components/header'
import Categories from '../components/categories'
import Account from '../components/account'
import SavedContext from '../lib/savedContext'


export default function Home(initialData) {
  const [showsData, setShowsData] = useState([])
  const [show, setShow] = useState({})
  const [current, setCurrent] = useState("trending")
  const [contentType, setContentType] = useState("showsData")
  const [categoriesType, setCategoriesType] = useState({})
  const { saved } = useContext(SavedContext)

  useEffect(() => {
    setShowsData(initialData.trendingShowsData.results)
  }, [initialData])

  return (
    <>
      <Header setShowsData={setShowsData} setContentType={setContentType} initialData={initialData.trendingShowsData.results} setCurrent={setCurrent} />
      <div className=' bg-zinc-900 from w-full'>
        <div className='flex max-w-8xl m-auto'>
          <Sidebar setCurrent={setCurrent} setContentType={setContentType} setCategoriesType={setCategoriesType} current={current} setShowsData={setShowsData} initialData={initialData.trendingShowsData.results} />
          <main className="bg-zinc-900 scrollbar-thin pr-2 scrollbar-thumb-sky-600 scrollbar-track-slate-700 h-[calc(100vh-68px)] w-full">
            <div className='flex flex-wrap p-2 '>
              {contentType == "showsData" &&
                showsData.map((show: any, i) => {
                  if (!show.poster_path) {
                    return;
                  } else {
                    return (
                      <Show
                        data={show}
                        genres={initialData.genreData.genres}
                        setShow={setShow}
                        setContentType={setContentType}
                        key={i}
                        saved={saved}
                      />
                    )
                  }
                })
              }
              {contentType == "showData" &&
                <ShowPage
                  show={show}
                  genres={initialData.genreData.genres}
                />
              }
              {contentType == "categoryData" &&
                <Categories categoriesType={categoriesType} setShowsData={setShowsData} setContentType={setContentType} />
              }
              {contentType == "account" &&
                <Account />
              }
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {

  const trendingShowsData = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.API_KEY}`)
    .then(response => response)
    .then(data => { return data.json() })
  const genreData = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`)
    .then(response => response)
    .then(data => { return data.json() })

  return {
    props: { trendingShowsData, genreData },
  }
}
