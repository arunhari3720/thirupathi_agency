
import React, { useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import WhyChoose from './pages/WhyChoose'
import Contact from './pages/Contact'
import Cart from './components/checkoutproducts/Products'


import { trackPageView } from './analytics/analytics'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

// Google Analytics Page Tracking
function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    trackPageView(
      location.pathname + location.search
    )
  }, [location.pathname, location.search])

  return null
}

function SiteLayout() {
  const location = useLocation()
  const path = location.pathname

  return (
    <div className="site-shell">
      <ScrollToTop />
      <AnalyticsTracker />

      <Header path={path} />
      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/why-choose-us" element={<WhyChoose />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteLayout />
    </BrowserRouter>
  )
}
