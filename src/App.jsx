import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import WhyChoose from './pages/WhyChoose'
import Contact from './pages/Contact'
import { Helmet } from 'react-helmet-async'

const routes = {
  '/': Home,
  '/products': Products,
  '/about': About,
  '/why-choose-us': WhyChoose,
  '/contact': Contact,
}

function getPath() {
  const hash = window.location.hash.replace(/^#/, '')
  return hash || '/'
}

export default function App() {
  const [path, setPath] = useState(getPath)

  useEffect(() => {
    const onHash = () => setPath(getPath())
    window.addEventListener('hashchange', onHash)
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => window.removeEventListener('hashchange', onHash)
  }, [path])

  const Page = routes[path] || Home

  return (
    <div className="site-shell">
      
      <Header path={path} />
      <main><Page /></main>
      <Footer />
     
    </div>
  )
}
