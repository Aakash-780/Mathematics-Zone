import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Star, Trophy, Users, BookOpen, MapPin, GraduationCap, Quote, MessageSquare, Calendar, Zap, Sparkles, X, ChevronLeft, ChevronRight, FunctionSquare, Binary, Sigma } from 'lucide-react';
import ashutoshImg from '../assets/ashutosh.jpg';
import childrenDay1 from '../assets/children_day/children_day_1.jpg';
import childrenDay2 from '../assets/children_day/children_day_2.jpg';
import childrenDay3 from '../assets/children_day/children_day_3.png';
import cricket1 from '../assets/cricket/cricket_1.jpg';
import cricket2 from '../assets/cricket/cricket_2.jpg';
import teachersDay1 from '../assets/teachers_day/teachers_day_1.jpg';
import teachersDay2 from '../assets/teachers_day/teachers_day_2.png';
import farewell1 from '../assets/farewell/farewell_1.png';
import farewell2 from '../assets/farewell/farewell_2.png';
import farewell3 from '../assets/farewell/farewell_3.png';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const mainRef = useRef(null);
    const bgRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    
    // State for Modal and Slider
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Scroll locking when lightbox is open
    useEffect(() => {
        if (selectedEvent) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedEvent]);

    // Mouse Spotlight listener
    useEffect(() => {
        const handleMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            if (mainRef.current) {
                mainRef.current.style.setProperty('--x', `${e.clientX}px`);
                mainRef.current.style.setProperty('--y', `${e.clientY}px`);
            }
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    // Dynamic Symbol Generation
    const mathSymbols = ["π", "√", "Σ", "∫", "Δ", "∞", "∂", "ϕ", "e", "u", "ƒ"];
    const backgroundElements = Array.from({ length: 35 }).map((_, i) => ({
        id: i,
        sym: mathSymbols[i % mathSymbols.length],
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.15 + 0.05,
        scale: Math.random() * 1.5 + 0.5
    }));

    const reviews = [
        { name: "Rahul T.", text: "Best logic-based teaching!", initial: "RT" },
        { name: "Sneha V.", text: "Sir makes math so easy.", initial: "SV" },
        { name: "Aman P.", text: "Chemistry faculty is elite.", initial: "AP" },
        { name: "Priya S.", text: "Proven success indeed.", initial: "PS" },
        { name: "Vikram J.", text: "Logic-First is the way.", initial: "VJ" },
        { name: "Ananya R.", text: "Grateful for MZ support.", initial: "AR" },
        { name: "Karan M.", text: "Top-notch Commerce wing.", initial: "KM" },
        { name: "Ishita D.", text: "Interactive and fun!", initial: "ID" },
        { name: "Rohit B.", text: "Highly recommended.", initial: "RB" },
        { name: "Megha L.", text: "Cracked my boards easily.", initial: "ML" }
    ];

    const events = [
        { 
            title: "Cricket Tournament", 
            img: cricket1, 
            date: "FEB 2026",
            gallery: [
                cricket1,
                cricket2,
            ]
        },
        { 
            title: "Teachers Day Celebration", 
            img: teachersDay1, 
            date: "SEP 2025",
            gallery: [
                teachersDay1,
                teachersDay2,
            ]
        },
        { 
            title: "Farewell Party", 
            img: farewell3, 
            date: "APR 2025",
            gallery: [
                farewell3,
                farewell1,
                farewell2,
            ]
        },
        { 
            title: "Children's Day Celebration", 
            img: childrenDay3, 
            date: "NOV 2025",
            gallery: [
                childrenDay3,
                childrenDay1,
                childrenDay2
            ]
        }
    ];

    useGSAP(() => {
        gsap.from(".hero-content", { scale: 0.9, opacity: 0, duration: 1.5, ease: "expo.out" });
        gsap.utils.toArray(".bento-card").forEach((card) => {
            gsap.from(card, {
                y: 30, 
                opacity: 0, 
                duration: 0.8, 
                ease: "power3.out",
                scrollTrigger: { 
                    trigger: card, 
                    start: "top 90%" 
                }
            });
        });
        gsap.to(".flying-symbol", {
            y: "random(-100, 100)", x: "random(-50, 50)", duration: "random(10, 20)",
            repeat: -1, yoyo: true, ease: "none"
        });

        // Floating symbols in header
        gsap.to(".float-slow", { y: -30, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".float-fast", { y: 30, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });

        // Scrolling formulas
        gsap.to(".scroll-text", {
            xPercent: -20,
            repeat: -1,
            duration: 75,
            ease: "none"
        });
    }, { scope: mainRef });

    // Slider Logic
    const nextImage = () => {
        if (selectedEvent) {
            setActiveImageIndex((prev) => (prev + 1) % selectedEvent.gallery.length);
        }
    };

    const prevImage = () => {
        if (selectedEvent) {
            setActiveImageIndex((prev) => (prev - 1 + selectedEvent.gallery.length) % selectedEvent.gallery.length);
        }
    };

    const openGallery = (event) => {
        setSelectedEvent(event);
        setActiveImageIndex(0);
    };

    const formulaString = "E=mc²   ∫f(x)dx   a²+b²=c²   lim(h→0)   ∑n=1   √x   dy/dx   sin(θ)   πr²   log(x)   ".repeat(10);

    return (
        <div ref={mainRef} style={styles.container}>
            <div ref={bgRef} style={styles.mathBackground}>
                {backgroundElements.map((item) => (
                    <span key={item.id} className="flying-symbol" style={{
                        ...styles.floatingSymbol, left: item.left, top: item.top,
                        opacity: item.opacity, transform: `scale(${item.scale})`
                    }}>{item.sym}</span>
                ))}
            </div>

            {/* LIGHTBOX SLIDER MODAL */}
            {selectedEvent && createPortal(
                <div style={styles.modalOverlay} onClick={() => setSelectedEvent(null)}>
                    <button className="lightbox-close-btn" onClick={() => setSelectedEvent(null)}><X size={32} /></button>
                    
                    <div className="lightbox-slider" style={styles.sliderContainer} onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-arrow" style={styles.navBtnLeft} onClick={prevImage}><ChevronLeft size={40} /></button>
                        
                        <div style={styles.imageFocusBox}>
                            <img 
                                src={selectedEvent.gallery[activeImageIndex]} 
                                alt="Event Detail" 
                                style={styles.sliderImg} 
                            />
                            <div style={styles.imageCounter}>
                                {activeImageIndex + 1} / {selectedEvent.gallery.length}
                            </div>
                        </div>

                        <button className="lightbox-arrow" style={styles.navBtnRight} onClick={nextImage}><ChevronRight size={40} /></button>
                    </div>
                    
                    <div style={styles.modalCaption}>
                        <h3 style={styles.modalTitle}>{selectedEvent.title}</h3>
                        <p style={styles.modalSub}>{selectedEvent.date}</p>
                    </div>
                </div>,
                document.body
            )}

            <header style={styles.fullHero}>
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

                {/* Floating Elements */}
                <div className="float-slow" style={{ ...styles.symbol, top: '15%', left: '12%' }}><Sigma size={40}/></div>
                <div className="float-fast" style={{ ...styles.symbol, top: '25%', right: '15%' }}><FunctionSquare size={50}/></div>
                <div className="float-slow" style={{ ...styles.symbol, bottom: '20%', left: '18%' }}><Binary size={45}/></div>
                <div className="float-fast" style={{ ...styles.symbol, bottom: '15%', right: '12%', fontSize: '2rem' }}>Δx</div>

                {/* Interactive Coordinates Tracker */}
                <div className="coords-tracker" style={{ left: mousePos.x + 20, top: mousePos.y + 20 }}>
                    COORD: [{mousePos.x}, {mousePos.y}] <br/>
                    VECTOR: {Math.sqrt(mousePos.x**2 + mousePos.y**2).toFixed(0)}u
                </div>

                <div className="hero-content" style={styles.heroInner}>
                    <div style={styles.badge}>AB MATHS SE DAR NAI LAGTA</div>
                    <h1 style={styles.title}>ABOUT <br /><span style={styles.gradientText}>MATHEMATIC</span> ZONE</h1>
                    <p style={styles.subtitle}>Welcome to a world where learning mathematics is not just a subject, but an interactive journey. Our mission is to transform complex challenges into exciting puzzles.</p>
                    <div style={styles.scrollIndicator}>SCROLL TO EXPLORE MZ</div>
                </div>
            </header>

            <div className="content-wrapper" style={styles.contentWrapper}>
                {/* INSTITUTE SECTION */}
                <section style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <GraduationCap size={32} color="#818cf8" />
                        <h2 style={styles.massiveHeading}>THE INSTITUTE</h2>
                    </div>
                    <div className="bento-card sir-card-layout" style={styles.sirCard}>
                        <div className="sir-card-content">
                            <div className="sir-card-text-col">
                                <Quote size={40} color="rgba(129, 140, 248, 0.2)" />
                                <h3 style={styles.sirName}>The Legacy of MZ</h3>
                                <p style={styles.sirText}>
                                    <strong>Mathematics Zone (MZ)</strong> a specialized hub for cracking the code of numbers—has now evolved into a multi-disciplinary educational powerhouse. Under the visionary leadership of <strong>Ashutosh Sir</strong>, we have transitioned from a single-subject boutique into a comprehensive center for Physics, Chemistry, and Biology, alongside our flagship Mathematics programs.
                                </p>
                            </div>
                            <div className="sir-card-img-col">
                                <img src={ashutoshImg} alt="Ashutosh Sir" className="sir-card-img" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ACHIEVEMENTS SECTION */}
                <section style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <Award size={32} color="#ec4899" />
                        <h2 style={styles.massiveHeading}>OUR ACHIEVEMENTS</h2>
                    </div>
                    <div className="bento-grid" style={styles.bentoGrid}>
                        <div className="bento-card" style={styles.mainBento}>
                            <Trophy size={48} color="#6366f1" />
                            <h2 style={styles.cardBigTitle}>1000+ Students</h2>
                            <p style={styles.cardText}>Mentored globally across 50+ countries with engaging interactive tools.</p>
                        </div>
                        <div className="bento-card" style={styles.smallBento}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Star color="#f59e0b" fill="#f59e0b" size={24} />
                                <h3 style={styles.cardSmallTitle}>Top Rated Tutor</h3>
                            </div>
                            <p style={{...styles.cardText, marginTop: '10px'}}>Maintained a 4.9/5 rating average across all teaching platforms.</p>
                        </div>
                        <div className="bento-card" style={styles.smallBento}>
                            <BookOpen color="#10b981" />
                            <h4 style={{fontSize: '1.1rem', margin: '10px 0 5px', fontWeight: '800'}}>Award-Winning Content</h4>
                            <p style={{...styles.cardText, fontSize: '0.9rem'}}>Recognized for best visual aids and interactive math quizzes in 2024.</p>
                        </div>
                        <div className="bento-card" style={styles.smallBento}>
                            <Users color="#818cf8" />
                            <h4 style={{fontSize: '1.1rem', margin: '10px 0 5px', fontWeight: '800'}}>Interactive Community</h4>
                            <p style={{...styles.cardText, fontSize: '0.9rem'}}>Compete with peers globally and share solutions.</p>
                        </div>
                    </div>
                </section>

                {/* STUDENT FEEDBACK COLLAGE */}
                <section style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <MessageSquare size={32} color="#818cf8" />
                        <h2 style={styles.massiveHeading}>STUDENT FEEDBACK</h2>
                    </div>
                    <div className="bento-grid" style={styles.reviewGrid}>
                        {reviews.map((rev, i) => (
                            <div key={i} className="bento-card" style={styles.reviewCard}>
                                <div style={styles.reviewHeader}>
                                    <div style={styles.avatar}>{rev.initial}</div>
                                    <span style={styles.reviewerName}>{rev.name}</span>
                                    <div style={styles.starSet}><Star size={10} fill="#f59e0b" color="#f59e0b" /> 5.0</div>
                                </div>
                                <p style={styles.reviewText}>"{rev.text}"</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* MZ HIGHLIGHTS (EVENTS) */}
                <section style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <Calendar size={32} color="#ec4899" />
                        <h2 style={styles.massiveHeading}>MZ HIGHLIGHTS</h2>
                    </div>
                    <div className="bento-grid" style={styles.bentoGrid}>
                        {events.map((event, i) => (
                            <div 
                                key={i} 
                                className="bento-card" 
                                style={styles.eventCard}
                                onClick={() => openGallery(event)}
                            >
                                <div style={styles.eventImageContainer}>
                                    <img src={event.img} alt={event.title} style={styles.eventImg} />
                                    <div style={styles.eventOverlay}>
                                        <div style={styles.eventDateBadge}>{event.date}</div>
                                    </div>
                                </div>
                                <div style={styles.eventContent}>
                                    <h3 style={styles.eventTitle}>{event.title}</h3>
                                    <div style={styles.eventTag}><Sparkles size={14} /> VIEW GALLERY</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* MAP SECTION */}
                <section style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <MapPin size={32} color="#f59e0b" />
                        <h2 style={styles.massiveHeading}>FIND US HERE</h2>
                    </div>
                    <div style={styles.mapFrame}>
                        <iframe title="Mathematic Zone Location" src="https://maps.google.com/maps?hl=en&q=Dubey+Colony+Rd,+Dubey+Colony,+Mowa,+Raipur,+Chhattisgarh+492014&ie=UTF8&t=&z=15&iwloc=B&output=embed" width="100%" height="400" style={styles.iframe} allowFullScreen="" loading="lazy"></iframe>
                    </div>
                </section>
            </div>
        </div>
    );
};

const styles = {
    container: { background: 'var(--bg-color)', color: 'var(--text-primary)', minHeight: '100vh', fontFamily: "'Inter', sans-serif", position: 'relative', transition: 'background 0.3s ease, color 0.3s ease', '--x': '50%', '--y': '50%' },
    mathBackground: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 },
    floatingSymbol: { position: 'absolute', fontSize: '4rem', color: 'var(--particle-color)', userSelect: 'none', fontWeight: '100', transition: 'color 0.3s ease' },
    fullHero: { height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden', zIndex: 10 },
    spotlight: { position: 'absolute', inset: 0, background: 'var(--spotlight-gradient)', zIndex: 2, pointerEvents: 'none' },
    gridOverlay: { position: 'absolute', inset: 0, backgroundImage: 'var(--grid-overlay)', backgroundSize: '50px 50px', maskImage: 'radial-gradient(circle at center, black, transparent 90%)', zIndex: 1 },
    formulaScroll: { position: 'absolute', width: '200%', fontSize: '4rem', fontWeight: '900', whiteSpace: 'nowrap', color: 'var(--formula-color)', userSelect: 'none', pointerEvents: 'none' },

    symbol: { position: 'absolute', color: 'var(--particle-color)', userSelect: 'none', zIndex: 3, transition: 'color 0.3s ease' },
    heroInner: { padding: '0 20px', maxWidth: '900px', zIndex: 10 },
    title: { fontSize: 'clamp(2.5rem, 10vw, 6rem)', fontWeight: '900', lineHeight: '1', marginBottom: '2rem' },
    gradientText: { background: 'linear-gradient(90deg, #818cf8, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    subtitle: { fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto', transition: 'color 0.3s ease' },
    scrollIndicator: { position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', letterSpacing: '5px', opacity: 0.3, fontWeight: 'bold' },
    contentWrapper: { maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 },
    section: { marginBottom: '120px' },
    sectionHeader: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' },
    massiveHeading: { fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.02em' },
    bentoGrid: { display: 'flex', flexWrap: 'wrap', gap: '20px' },
    mainBento: { flex: '1 1 100%', background: 'rgba(99,102,241,0.08)', border: '1px solid var(--card-border)', borderRadius: '32px', padding: 'clamp(25px, 5vw, 45px)', backdropFilter: 'blur(10px)', transition: 'border-color 0.3s ease' },
    smallBento: { flex: '1 1 300px', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '24px', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backdropFilter: 'blur(10px)', transition: 'background-color 0.3s, border-color 0.3s' },
    sirCard: { background: 'var(--sir-bg)', border: '1px solid var(--card-border)', borderRadius: '32px', padding: 'clamp(25px, 6vw, 50px)', backdropFilter: 'blur(12px)', transition: 'background-color 0.3s, border-color 0.3s' },
    sirName: { fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: '900', color: 'var(--accent-1)', margin: '1rem 0' },
    sirText: { fontSize: '1.15rem', color: 'var(--sir-text)', lineHeight: '1.8', transition: 'color 0.3s ease' },
    badge: { display: 'inline-block', padding: '6px 16px', borderRadius: '20px', border: '1px solid var(--card-border)', background: 'var(--card-bg)', fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--accent-1)', marginBottom: '20px', letterSpacing: '2px', transition: 'background-color 0.3s, border-color 0.3s, color 0.3s' },
    mapFrame: { borderRadius: '40px', overflow: 'hidden', border: '1px solid var(--card-border)', background: 'var(--card-bg)', padding: '10px', transition: 'background-color 0.3s, border-color 0.3s' },
    iframe: { border: '0', borderRadius: '32px', filter: 'var(--map-filter)', transition: 'filter 0.3s ease' },

    reviewGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' },
    reviewCard: { background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '20px', padding: '20px', backdropFilter: 'blur(8px)', transition: 'background-color 0.3s, border-color 0.3s' },
    reviewHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' },
    avatar: { width: '32px', height: '32px', background: 'linear-gradient(45deg, #818cf8, #ec4899)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' },
    reviewerName: { fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', transition: 'color 0.3s ease' },
    starSet: { marginLeft: 'auto', fontSize: '0.7rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px' },
    reviewText: { fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: '1.4', transition: 'color 0.3s ease' },

    eventCard: { flex: '1 1 45%', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '28px', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.3s, border-color 0.3s, background-color 0.3s' },
    eventImageContainer: { position: 'relative', height: '220px', overflow: 'hidden' },
    eventImg: { width: '100%', height: '100%', objectFit: 'cover' },
    eventOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', display: 'flex', alignItems: 'flex-end', padding: '20px' },
    eventDateBadge: { background: 'var(--accent-1)', color: '#fff', padding: '4px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 'bold' },
    eventContent: { padding: '20px' },
    eventTitle: { fontSize: '1.2rem', fontWeight: '800', margin: '0 0 10px', color: 'var(--text-primary)', transition: 'color 0.3s ease' },
    eventTag: { display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-2)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' },

    // LIGHTBOX MODAL STYLES
    modalOverlay: { position: 'fixed', inset: 0, background: 'var(--modal-overlay)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(15px)', padding: '20px', transition: 'background-color 0.3s ease' },
    sliderContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '1200px', gap: '20px' },
    navBtnLeft: { background: 'var(--glass-bg)', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    navBtnRight: { background: 'var(--glass-bg)', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    imageFocusBox: { position: 'relative', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' },
    sliderImg: { maxWidth: '100%', maxHeight: '70vh', borderRadius: '20px', boxShadow: '0 0 50px rgba(129, 140, 248, 0.3)', border: '1px solid var(--card-border)' },
    imageCounter: { position: 'absolute', bottom: '-40px', color: 'var(--text-secondary)', fontWeight: 'bold', fontSize: '0.9rem' },
    modalCaption: { textAlign: 'center', marginTop: '60px' },
    modalTitle: { fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '5px' },
    modalSub: { color: 'var(--accent-1)', fontWeight: 'bold', letterSpacing: '2px' }
};

export default About;