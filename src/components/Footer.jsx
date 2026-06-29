import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Youtube, Instagram, Facebook, Mail, MapPin, Phone, Zap } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.mainGrid}>
                    
                    {/* Brand Section */}
                    <div style={styles.brandSection}>
                        <h3 style={styles.title}>
                            <span style={styles.gradientText}>MATHEMATIC</span> ZONE
                        </h3>
                        <p style={styles.description}>
                            A multi-disciplinary educational powerhouse. Transforming complex challenges into simplified success stories through our "Logic-First" methodology.
                        </p>
                        <div style={styles.socialLinks}>
                            <a href="https://www.youtube.com/@mathematicszoneraipur9736" style={styles.socialIcon}><Youtube size={20} /></a>
                            <a href="https://www.instagram.com/mathematicszoneraipur/" style={styles.socialIcon}><Instagram size={20} /></a>
                            <a href="https://www.facebook.com/p/Mathematics-Zone-Raipur-100063916630597/" style={styles.socialIcon}><Facebook size={20} /></a>
                            <a href="mailto:mathematicszoneraipur@gmail.com" style={styles.socialIcon}><Mail size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div style={styles.linkSection}>
                        <h4 style={styles.subTitle}>EXPLORE</h4>
                        <ul style={styles.list}>
                            <li style={styles.listItem}><Link to="/" style={styles.link}>Home</Link></li>
                            <li style={styles.listItem}><Link to="/about" style={styles.link}>About MZ</Link></li>
                            <li style={styles.listItem}><Link to="/courses" style={styles.link}>Programs</Link></li>
                            <li style={styles.listItem}><Link to="/quizzes" style={styles.link}>Quizzes</Link></li>
                            <li style={styles.listItem}><Link to="/contact" style={styles.link}>Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div style={styles.linkSection}>
                        <h4 style={styles.subTitle}>CONTACT</h4>
                        <ul style={styles.list}>
                            <li style={styles.contactItem}>
                                <MapPin size={18} color="#818cf8" />
                                <span>Raipur, Chhattisgarh, India</span>
                            </li>
                            <li style={styles.contactItem}>
                                <Phone size={18} color="#818cf8" />
                                <a href="tel:+918109605081" style={styles.link}>+91 81096 05081</a>
                            </li>
                            <li style={styles.contactItem}>
                                <Zap size={18} color="#ec4899" />
                                <span>Digital Learning Portal</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div style={styles.bottomBar}>
                    <div style={styles.divider} />
                    <div style={styles.bottomContent}>
                        <p style={styles.copyright}>
                            &copy; {new Date().getFullYear()} Mathematic Zone. All rights reserved.
                        </p>
                        <p style={styles.tagline}>
                            To Sir with <Heart size={14} fill="#ec4899" color="#ec4899" style={{ verticalAlign: 'middle' }} /> | Built for the Modern Student
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        background: 'var(--footer-bg, #020202)',
        borderTop: '1px solid var(--glass-border)',
        padding: '80px 20px 40px 20px',
        color: 'var(--text-primary)',
        fontFamily: "'Inter', sans-serif",
        transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
    },
    mainGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '3rem',
        marginBottom: '4rem'
    },
    brandSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: '900',
        letterSpacing: '-0.02em',
        margin: 0
    },
    gradientText: {
        background: 'linear-gradient(90deg, #818cf8, #ec4899)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    description: {
        color: '#94a3b8',
        lineHeight: '1.6',
        fontSize: '0.95rem'
    },
    socialLinks: {
        display: 'flex',
        gap: '1rem'
    },
    socialIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-primary)',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    },
    linkSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    subTitle: {
        fontSize: '0.8rem',
        fontWeight: '900',
        letterSpacing: '2px',
        color: 'var(--text-primary)',
        margin: 0,
        textTransform: 'uppercase',
        transition: 'color 0.3s ease'
    },
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem'
    },
    listItem: {
        fontSize: '0.95rem'
    },
    link: {
        color: '#94a3b8',
        textDecoration: 'none',
        transition: '0.3s ease'
    },
    contactItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: '#94a3b8',
        fontSize: '0.95rem'
    },
    bottomBar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
    },
    divider: {
        height: '1px',
        width: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)'
    },
    bottomContent: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem'
    },
    copyright: {
        color: '#64748b',
        fontSize: '0.85rem'
    },
    tagline: {
        color: '#64748b',
        fontSize: '0.85rem'
    }
};

export default Footer;