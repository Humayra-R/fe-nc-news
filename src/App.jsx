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
    <div>
      <Header userName={loggedUser.username} />
      <div className='test'>
        <Routes>
        <Route path='/' element={<Home loggedUser={ loggedUser }/>} />
        <Route path='/articles' element={<ArticlesPage />} />
        <Route path='/article/:article_id' element={<ArticlePage loggedUser={ loggedUser } />} />
      </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
