import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Youtube, Instagram, Facebook, ArrowRight, FunctionSquare, Binary, Sigma } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const container = useRef();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            container.current.style.setProperty('--x', `${e.clientX}px`);
            container.current.style.setProperty('--y', `${e.clientY}px`);
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

        tl.from(".math-badge", { opacity: 0, y: -20, duration: 1, delay: 0.5 })
          .from(".hero-title span", { y: 80, rotate: 2, opacity: 0, stagger: 0.2, duration: 1 }, "-=0.7")
          .from(".hero-p", { opacity: 0, y: 20, duration: 1 }, "-=0.8")
          .from(".action-bar", { scale: 0.9, opacity: 0, duration: 0.8 }, "-=0.5");

        gsap.to(".float-slow", { y: -30, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".float-fast", { y: 30, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
        
        // Target all formula scrolls
        gsap.to(".scroll-text", {
            xPercent: -20,
            repeat: -1,
            duration: 75,
            ease: "none"
        });
    }, { scope: container });

    const formulaString = "E=mc²   ∫f(x)dx   a²+b²=c²   lim(h→0)   ∑n=1   √x   dy/dx   sin(θ)   πr²   log(x)   ".repeat(10);

    return (
        <section ref={container} style={styles.section}>
            <div style={styles.spotlight} />
            <div style={styles.gridOverlay} />

            {/* Formula Loop - TOP */}
            <div className="scroll-text" style={{ ...styles.formulaScroll, top: '10%' }}>
                {formulaString}
            </div>

            {/* Formula Loop - BOTTOM */}
            <div className="scroll-text" style={{ ...styles.formulaScroll, top: 'auto', bottom: '10%' }}>
                {formulaString}
            </div>

            <div className="float-slow" style={{ ...styles.symbol, top: '15%', left: '12%' }}><Sigma size={40}/></div>
            <div className="float-fast" style={{ ...styles.symbol, top: '25%', right: '15%' }}><FunctionSquare size={50}/></div>
            <div className="float-slow" style={{ ...styles.symbol, bottom: '20%', left: '18%' }}><Binary size={45}/></div>
            <div className="float-fast" style={{ ...styles.symbol, bottom: '15%', right: '12%', fontSize: '2rem' }}>Δx</div>

            <div className="coords-tracker" style={{ left: mousePos.x + 20, top: mousePos.y + 20 }}>
                COORD: [{mousePos.x}, {mousePos.y}] <br/>
                VECTOR: {Math.sqrt(mousePos.x**2 + mousePos.y**2).toFixed(0)}u
            </div>

            <div className="hero-inner" style={styles.inner}>
                <div className="math-badge" style={styles.badge}>
                    AB MATHS SE DAR NAI LAGTA
                </div>

                <h1 className="hero-title" style={styles.title}>
                    <span style={{ display: 'block' }}>MASTER THE MATHS WITH</span>
                    <span style={styles.gradientText}>MATHEMATIC ZONE</span>
                </h1>

                <p className="hero-p" style={styles.description}>
                    A digital class for the modern student. 
                    AI-powered tests and access elite video solutions.
                    Courses available for class 6th to 12th.
                </p>

                {/* SINGLE LINE ACTION BAR */}
                <div className="hero-action-bar action-bar" style={styles.actionBar}>
                    <Link to="/courses" style={styles.primaryBtn}>
                        Explore Courses <ArrowRight size={20} />
                    </Link>
                    <div style={styles.socialGroup} className="hero-social-group">
                        <a href="https://www.youtube.com/@mathematicszoneraipur9736" style={styles.iconBtn}><Youtube /></a>
                        <a href="https://www.instagram.com/mathematicszoneraipur/" style={styles.iconBtn}><Instagram /></a>
                        <a href="https://www.facebook.com/p/Mathematics-Zone-Raipur-100063916630597/" style={styles.iconBtn}><Facebook /></a>
                    </div>
                </div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        height: '100vh',
        background: 'var(--bg-color)',
        color: 'var(--text-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif",
        '--x': '50%',
        '--y': '50%',
        transition: 'background 0.3s ease, color 0.3s ease'
    },
    spotlight: {
        position: 'absolute',
        inset: 0,
        background: 'var(--spotlight-gradient)',
        zIndex: 2,
        pointerEvents: 'none'
    },
    gridOverlay: {
        position: 'absolute',
        inset: 0,
        backgroundImage: 'var(--grid-overlay)',
        backgroundSize: '50px 50px',
        maskImage: 'radial-gradient(circle at center, black, transparent 90%)',
        zIndex: 1
    },
    formulaScroll: {
        position: 'absolute',
        width: '200%',
        fontSize: '4rem',
        fontWeight: '900',
        whiteSpace: 'nowrap',
        color: 'var(--formula-color)',
        userSelect: 'none',
        pointerEvents: 'none'
    },

    inner: {
        zIndex: 10,
        textAlign: 'center',
        maxWidth: '1000px',
        padding: '0 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    badge: {
        background: 'rgba(99, 102, 241, 0.1)',
        border: '1px solid rgba(99, 102, 241, 0.4)',
        padding: '0.6rem 1.2rem',
        borderRadius: '30px',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        letterSpacing: '3px',
        color: 'var(--accent-1)',
        marginBottom: '2.5rem',
        display: 'inline-block',
        backdropFilter: 'blur(5px)'
    },
    title: {
        fontSize: 'clamp(3rem, 10vw, 7rem)',
        fontWeight: '900',
        lineHeight: '0.85',
        letterSpacing: '-0.05em',
        marginBottom: '2.5rem'
    },
    gradientText: {
        background: 'linear-gradient(to right, #818cf8, #c084fc, #fb7185)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'block'
    },
    description: {
        fontSize: '1.25rem',
        color: 'var(--text-secondary)',
        maxWidth: '600px',
        margin: '0 auto 3.5rem auto',
        lineHeight: '1.6',
        transition: 'color 0.3s ease'
    },
    actionBar: {
        display: 'flex',
        flexDirection: 'row', // Force horizontal
        gap: '1.2rem',
        justifyContent: 'center',
        alignItems: 'center'
    },
    socialGroup: {
        display: 'flex',
        gap: '1.2rem',
        alignItems: 'center'
    },
    primaryBtn: {
        background: 'var(--hero-btn-bg)',
        color: 'var(--hero-btn-text)',
        padding: '1.2rem 2.8rem',
        borderRadius: '14px',
        fontWeight: '800',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
        fontSize: '1.1rem',
        boxShadow: '0 10px 30px var(--hero-btn-shadow)',
        transition: 'all 0.3s ease'
    },
    iconBtn: {
        padding: '1.2rem',
        borderRadius: '14px',
        border: '1px solid var(--icon-btn-border)',
        background: 'var(--icon-btn-bg)',
        color: 'var(--icon-btn-text)',
        display: 'flex',
        alignItems: 'center',
        backdropFilter: 'blur(15px)',
        transition: 'all 0.3s ease'
    },
    symbol: {
        position: 'absolute',
        color: 'var(--particle-color)',
        userSelect: 'none',
        zIndex: 3,
        transition: 'color 0.3s ease'
    }
};

export default Hero;