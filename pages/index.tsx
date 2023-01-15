import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar'
import Show from '../components/show'
import ShowPage from '../components/showPage'
import Header from '../components/header'
import Categories from '../components/categories'


export default function Home(initialData) {
  const [showsData, setShowsData] = useState([])
  const [show, setShow] = useState({})
  const [current, setCurrent] = useState("trending")
  const [contentType, setContentType] = useState("showsData")
  const [categoriesType, setCategoriesType] = useState({})

  useEffect(() => {
    setShowsData(initialData.trendingShowsData.results)
  }, [initialData])

  return (
    <>
      <Head>
        <title>BTV</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/pnlogo.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>
      <Image src="https://cfcdn.apowersoft.info/astro/picwish/assets/index-fourth-bg.a19a2877.svg" width="100" height="100" className=' absolute w-1/2 left-1/2 overflow-hidden pointer-events-none opacity-50' alt="bg-img"></Image>
      <Image src="https://cfcdn.apowersoft.info/astro/picwish/assets/index-fourth-bg.a19a2877.svg" width="100" height="100" className=' absolute w-1/3 right-1/3 overflow-hidden pointer-events-none opacity-5' alt="bg-img"></Image>
      <Header setShowsData={setShowsData} setContentType={setContentType} initialData={initialData.trendingShowsData.results} setCurrent={setCurrent} />
      <div className=' bg-slate-900 from w-full'>
        <div className='flex  max-w-8xl m-auto'>
          <Sidebar setCurrent={setCurrent} setContentType={setContentType} setCategoriesType={setCategoriesType} current={current} setShowsData={setShowsData} initialData={initialData.trendingShowsData.results} />
          <main className="bg-slate-900 scrollbar-thin pr-2 scrollbar-thumb-sky-600 scrollbar-track-slate-700 h-[calc(100vh-68px)] w-full">
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
