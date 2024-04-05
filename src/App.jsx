import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/pages/Home'
import ArticlesPage from './components/pages/ArticlesPage'
import ArticlePage from './components/pages/ArticlePage'
import Footer from './components/Footer'

function App() {
  const loggedUser = { username: 'jessjelly'}

  return (
    <>
      <Header userName={loggedUser.username} />
        <Routes>
        <Route path='/' element={<Home loggedUser={ loggedUser }/>} />
        <Route path='/articles' element={<ArticlesPage />} />
        <Route path='/article/:article_id' element={<ArticlePage loggedUser={ loggedUser } />} />
      </Routes>
    <div className='app' >
      <Footer />
    </div>
    </>
  )
}

export default App
