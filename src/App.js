import { useEffect, useState, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createResource as fetchData, API_URL } from './helper'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import Spinner from './Spinner'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'

function App() {
	let [search, setSearch] = useState('')
	let [message, setMessage] = useState('Search for Music!')
	let [data, setData] = useState()

	useEffect(() => {
        if (search) {
            setData(fetchData(search))
        }
    }, [search])

    useEffect(() => {
        if(search) {
            const fetchData = async () => {
                document.title = `${search} Music`
                const response = await fetch(API_URL + search)
                const resData = await response.json()
                if (resData.results.length > 0) {
                    return setData(resData.results)
                } else {
                    return setMessage('Not Found')
                }
            }
            fetchData()
        }
    }, [search])
    
	
	const handleSearch = (e, term) => {
		e.preventDefault()
		setSearch(term)
	}


return (
    <div className="App">
    {message}
        <Router>
            <Routes>
                <Route path="/" element={
                    <fragment>
                        <SearchBar handleSearch = {handleSearch}/>
                        <Suspense fallback={<Spinner />}>
                        <Gallery data={data} />
                        </Suspense>
                    </fragment>
                } />
                <Route path="/album/:id" element={<AlbumView />} />
                <Route path="/artist/:id" element={<ArtistView />} />
            </Routes>
        </Router>
    </div>
)

    
}


export default App;

