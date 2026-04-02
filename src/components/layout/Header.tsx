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

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg"
        >
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/support"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-primary text-white py-3 rounded-lg font-bold mt-4"
            >
              <EditableText contentPath="header.cta" as="span" />
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
