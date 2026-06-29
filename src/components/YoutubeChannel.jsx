import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Youtube, Play, ExternalLink, MonitorPlay, Zap } from 'lucide-react';

const ChannelMZ = () => {
    const sectionRef = useRef(null);

    // Content remains exactly the same
    const mzvids = [
        { id: '1', title: 'CBSE Class 12th: Most Important Chemistry MCQ Part-3 (2026)', category: 'Board Special', thumb: 'https://img.youtube.com/vi/9zXK7CErjK8/hqdefault.jpg' },
        { id: '2', title: 'CBSE CLASS 10TH - COMPLETE CHEMISTRY AND BIOLOGY - IMPORTANT - QUESTIONS', category: 'One Shot', thumb: 'https://img.youtube.com/vi/qzwhW57skQU/hqdefault.jpg' },
        { id: '3', title: 'CBSE CLASS 12TH - COMPLETE BIOLOGY - IMPORTANT - QUESTIONS', category: 'Class 10th', thumb: 'https://img.youtube.com/vi/fTRA8td8PlA/hqdefault.jpg' },
    ];

    // Background Emojis themed with Indigo/Pink shadows
    const bgElements = [
        { emoji: '📺', top: '10%', left: '5%', size: '3.5rem', color: '#818cf8' },
        { emoji: '🚀', bottom: '20%', right: '8%', size: '3rem', color: '#ec4899' },
        { emoji: '🧪', top: '40%', right: '5%', size: '2.5rem', color: '#818cf8' },
        { emoji: '📐', bottom: '10%', left: '10%', size: '4rem', color: '#ec4899' },
        { emoji: '⚛️', top: '15%', right: '25%', size: '2rem', color: '#818cf8' },
        { emoji: '📝', bottom: '40%', left: '3%', size: '2.5rem', color: '#ec4899' },
    ];

    useGSAP(() => {
        gsap.from(".vid-card", {
            y: 50, opacity: 0, stagger: 0.15, duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 85%" }
        });

        gsap.to(".floating-emoji", {
            y: "random(-50, 50)",
            x: "random(-30, 30)",
            rotation: "random(-20, 20)",
            duration: "random(2.5, 4)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.2
        });

        // Subtle Pulse for the button glow
        gsap.to(".btn-glow-pulse", {
            opacity: 0.6,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} style={styles.section}>
            <div style={styles.bgLayer}>
                {bgElements.map((el, index) => (
                    <span key={index} className="floating-emoji" style={{
                        ...styles.emoji,
                        top: el.top, left: el.left, right: el.right, bottom: el.bottom,
                        fontSize: el.size, textShadow: `0 0 30px ${el.color}30`
                    }}>
                        {el.emoji}
                    </span>
                ))}
            </div>

            <div style={styles.container}>
                <div style={styles.header}>
                    <div style={styles.badge}>RELOADED // VIDEO VAULT</div>
                    <h2 style={styles.heading}>
                        EXPLORE THE <span style={styles.gradientText}>DIGITAL ARCHIVE</span>
                    </h2>
                    <p style={styles.subText}>Premium material driving our digital revolution.</p>
                </div>

                <div style={styles.grid}>
                    {mzvids.map((vid) => (
                        <div key={vid.id} className="vid-card" style={styles.card}>
                            <div style={styles.thumbArea}>
                                <img src={vid.thumb} alt={vid.title} style={styles.image} />
                                <div style={styles.glassTag}>{vid.category}</div>
                                <div className="overlay" style={styles.overlay}>
                                    <div style={styles.playIconBox}><Play size={25} fill="#fff" /></div>
                                </div>
                            </div>
                            <div style={styles.content}>
                                <h3 style={styles.vidTitle}>{vid.title}</h3>
                                <a href="https://www.youtube.com/@mathematicszoneraipur9736" target="_blank" rel="noreferrer" style={styles.simpleWatchBtn}>
                                    Watch Session <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* THEMED BUTTON DESIGN */}
                <div style={styles.footerAction}>
                    <div className="btn-glow-pulse" style={styles.btnShadow} />
                    <a 
                        href="https://www.youtube.com/@mathematicszoneraipur9736/playlists" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="explore-mz-btn"
                        style={styles.themedBtn}
                    >
                        <MonitorPlay size={20} />
                        EXPLORE DIGITAL MZ
                        <Zap size={18} fill="#fff" />
                    </a>
                </div>
            </div>
        </section>
    );
};

const styles = {
    section: { padding: '100px 20px', background: 'var(--bg-color)', color: 'var(--text-primary)', position: 'relative', overflow: 'hidden', transition: 'background 0.3s ease, color 0.3s ease' },
    bgLayer: { position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' },
    emoji: { position: 'absolute', color: 'var(--particle-color)', userSelect: 'none', transition: 'color 0.3s ease' },
    container: { maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 },
    header: { textAlign: 'center', marginBottom: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    badge: {
        background: 'var(--card-bg)', border: '1px solid var(--card-border)', padding: '0.5rem 1.2rem', 
        borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--accent-1)', 
        marginBottom: '1.5rem', letterSpacing: '2px', transition: 'all 0.3s ease'
    },
    heading: { fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '900', letterSpacing: '-0.04em', color: 'var(--text-primary)' },
    gradientText: { 
        background: 'linear-gradient(90deg, #818cf8, #ec4899)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    subText: { color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem', maxWidth: '500px', transition: 'color 0.3s ease' },
    grid: { display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.8rem', marginBottom: '6rem', alignItems: 'stretch' },
    card: { 
        flex: '1 1 320px', maxWidth: '340px', background: 'var(--card-bg)', 
        border: '1px solid var(--card-border)', borderRadius: '28px', 
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        backdropFilter: 'blur(12px)', transition: 'background-color 0.3s, border-color 0.3s'
    },
    thumbArea: { position: 'relative', height: '210px', width: '100%', overflow: 'hidden' },
    image: { width: '100%', height: '100%', objectFit: 'cover' },
    glassTag: { position: 'absolute', top: '15px', left: '15px', background: 'rgba(129, 140, 248, 0.8)', padding: '5px 12px', borderRadius: '10px', fontSize: '0.65rem', fontWeight: '900', color: '#fff' },
    overlay: { position: 'absolute', inset: 0, background: 'rgba(129, 140, 248, 0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: 0, transition: '0.3s' },
    playIconBox: { width: '55px', height: '55px', borderRadius: '50%', background: '#818cf8', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 20px rgba(129, 140, 248, 0.4)' },
    content: { padding: '1.8rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
    vidTitle: { fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.4', minHeight: '3.2em', color: 'var(--text-primary)', transition: 'color 0.3s ease' },
    simpleWatchBtn: { color: 'var(--accent-2)', textDecoration: 'none', fontWeight: '800', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' },
    
    footerAction: { textAlign: 'center', width: '100%', display: 'flex', justifyContent: 'center', position: 'relative' },
    btnShadow: {
        position: 'absolute', width: '250px', height: '60px', borderRadius: '50px',
        background: 'linear-gradient(90deg, #818cf8, #ec4899)', filter: 'blur(25px)',
        zIndex: -1, opacity: 0.3
    },
    themedBtn: {
        background: 'var(--card-bg)',
        color: 'var(--text-primary)',
        textDecoration: 'none',
        padding: '1.2rem 3rem',
        borderRadius: '50px',
        fontWeight: '900',
        fontSize: '1.1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        letterSpacing: '1px',
        border: '1px solid var(--card-border)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease'
    }
};

export default ChannelMZ;