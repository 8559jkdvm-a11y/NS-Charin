import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import { EditableText, EditableImage } from '@/src/components/ui/Editable';

const navItems = [
  { name: '홈', path: '/' },
  { name: '상세정보', path: '/products/details' },
  { name: '기능/서비스', path: '/services' },
  { name: '브랜드스토리', path: '/about' },
  { name: '고객지원', path: '/support' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <EditableImage 
            contentPath="header.logo" 
            className="h-10 w-auto object-contain" 
            alt="차린 로고" 
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'text-base font-medium transition-colors hover:text-primary',
                location.pathname === item.path ? 'text-primary' : 'text-gray-600'
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/support"
            className="bg-primary text-white px-5 py-2 rounded-full text-base font-bold hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <ShoppingCart size={16} />
            <EditableText contentPath="header.cta" as="span" />
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Nav Menu */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-50 md:hidden shadow-2xl flex flex-col"
      >
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <Link to="/" onClick={() => setIsOpen(false)}>
            <EditableImage 
              contentPath="header.logo" 
              className="h-8 w-auto object-contain" 
              alt="차린 로고" 
            />
          </Link>
          <button className="text-gray-600 p-2" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto py-8 px-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block py-4 text-lg font-bold transition-colors",
                location.pathname === item.path ? "text-primary" : "text-gray-700"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="p-6 border-t border-gray-100">
          <Link
            to="/support"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20"
          >
            <EditableText contentPath="header.cta" as="span" />
          </Link>
          <p className="text-center text-xs text-gray-400 mt-6 font-medium">
            © 2024 논산계룡축협 차린. All rights reserved.
          </p>
        </div>
      </motion.div>
    </header>
  );
}
