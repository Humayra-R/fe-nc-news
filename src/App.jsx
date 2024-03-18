import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import ArticlesData from './components/ArticlesData'
import ArticlePage from './components/ArticlePage'
import Footer from './components/Footer'


function App() {
  const loggedUser = { username: 'jessjelly'}

  return (
    <div>
      <Header userName={loggedUser.username} />
      <Routes>
        <Route path='/' element={<Home loggedUser={ loggedUser }/>} />
        <Route path='/articles' element={<ArticlesData />} />
        <Route path='/article/:article_id' element={<ArticlePage loggedUser={ loggedUser } />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
