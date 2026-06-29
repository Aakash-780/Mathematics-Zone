import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Info, Sun, Moon, Laptop, GraduationCap, Menu, X, Mail } from 'lucide-react';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext';
import logoImg from '../assets/logo.png';

const Navbar = () => {
    const navRef = useRef(null);
    const location = useLocation();
    const { theme, setTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        // Animate navbar sliding down
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
        );
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getCurrentIcon = () => {
        if (theme === 'light') return <Moon size={18} />;
        return <Sun size={18} />;
    };

    return (
        <nav ref={navRef} className={`floating-nav ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <Link to="/" className="nav-logo-link">
                    <img 
                        src={logoImg} 
                        alt="Mathematic Zone" 
                        className="logo-theme-behavior nav-logo-img" 
                    />
                    <span className="nav-logo-text">Mathematics Zone</span>
                </Link>
                <div className="nav-right-sec">
                    <div className="desktop-nav-links">
                        <Link to="/" className={`desktop-nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                            Home
                        </Link>
                        <Link to="/about" className={`desktop-nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
                            <Info size={16} /> About
                        </Link>
                        <Link to="/courses" className={`desktop-nav-link ${location.pathname === '/courses' ? 'active' : ''}`}>
                            <GraduationCap size={16} /> Courses
                        </Link>
                        <Link to="/quizzes" className={`desktop-nav-link ${location.pathname === '/quizzes' ? 'active' : ''}`}>
                            <BookOpen size={16} /> Quizzes
                        </Link>
                        <Link to="/contact" className={`desktop-nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
                            <Mail size={16} /> Contact
                        </Link>
                    </div>

                    <div style={styles.switcherContainer}>
                        <button 
                            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
                            className="theme-switcher-btn theme-toggle-btn" 
                            aria-label="Toggle theme"
                        >
                            {getCurrentIcon()}
                        </button>
                    </div>

                    <button 
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="mobile-dropdown glass-card">
                    <Link to="/" style={location.pathname === '/' ? styles.activeLink : styles.link}>Home</Link>
                    <Link to="/about" style={location.pathname === '/about' ? styles.activeLink : styles.link}>
                        <Info size={18} /> About
                    </Link>
                    <Link to="/courses" style={location.pathname === '/courses' ? styles.activeLink : styles.link}>
                        <GraduationCap size={18} /> Courses
                    </Link>
                    <Link to="/quizzes" style={location.pathname === '/quizzes' ? styles.activeLink : styles.link}>
                        <BookOpen size={18} /> Quizzes
                    </Link>
                    <Link to="/contact" style={location.pathname === '/contact' ? styles.activeLink : styles.link}>
                        <Mail size={18} /> Contact
                    </Link>
                </div>
            )}
        </nav>
    );
};

const styles = {
    switcherContainer: {
        position: 'relative',
        display: 'inline-block'
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'var(--text-secondary)',
        fontWeight: '600',
        transition: 'color 0.3s ease'
    },
    activeLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'var(--text-primary)',
        fontWeight: '600',
        textShadow: '0 0 10px rgba(99, 102, 241, 0.5)'
    }
};

export default Navbar;
