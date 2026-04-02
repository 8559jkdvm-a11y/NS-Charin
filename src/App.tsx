import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MainPage from './pages/MainPage';
import ProductDetails from './pages/ProductDetails';
import Services from './pages/Services';
import About from './pages/About';
import Support from './pages/Support';
import AdminLogin from './pages/AdminLogin';
import { AdminProvider } from './context/AdminContext';
import { ContentProvider } from './context/ContentContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AdminProvider>
        <ContentProvider>
          <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/products/details" element={<ProductDetails />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/admin" element={<AdminLogin />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </Router>
        </ContentProvider>
      </AdminProvider>
    </ErrorBoundary>
  );
}
