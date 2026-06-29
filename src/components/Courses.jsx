import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, GraduationCap, Zap, Sparkles, X, CheckCircle2, ArrowRight, FunctionSquare, Binary, Sigma, ShieldAlert, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const courseCategories = [
    {
        id: 'foundation',
        title: 'JEE & NEET FOUNDATION',
        badge: 'PREMIUM TRACK',
        description: 'Elite preparatory modules designed for cracking IIT-JEE (Main & Advanced) and NEET.',
        icon: <Cpu size={24} color="#ec4899" />,
        courses: [
            {
                name: 'IIT-JEE Ultimate Prep',
                duration: '1 or 2 Year Program',
                target: 'Classes 11th, 12th & Droppers',
                subjects: 'Physics, Chemistry, Mathematics',
                details: ['Rigorous daily practice papers (DPPs)', 'Weekly NTA-level computer-based mock tests', 'Dedicated logic modules by Ashutosh Sir', 'IITian mentored doubt-clearing sessions']
            },
            {
                name: 'NEET Vanguard Prep',
                duration: '1 or 2 Year Program',
                target: 'Classes 11th, 12th & Droppers',
                subjects: 'Physics, Chemistry, Biology (Botany + Zoology)',
                details: ['Comprehensive NCERT line-by-line decoding', 'High-yield biology flashcards & diagnostic tests', 'Physics numerical logic-first methodology', 'Full-syllabus mock tests with analytics']
            },
            {
                name: 'Pre-Foundation Starter',
                duration: '1 Year Program',
                target: 'Classes 9th & 10th',
                subjects: 'Maths, Physics, Chemistry, Biology',
                details: ['Bridging school syllabus to competitive level', 'Olympiad & NTSE special preparation resources', 'Mental aptitude and logical reasoning classes', 'Early conceptual mastery program']
            }
        ]
    },
    {
        id: 'senior',
        title: 'SENIOR SECONDARY DIVISION',
        badge: 'BOARDS MASTERY',
        description: 'Comprehensive curriculum for Board exams along with conceptual logic strengthening.',
        icon: <GraduationCap size={24} color="#818cf8" />,
        courses: [
            {
                name: 'Class 12th Board Excellence',
                duration: '1 Year Academic Session',
                target: 'Class 12th students',
                subjects: 'Mathematics, Physics, Chemistry, Biology, Commerce',
                details: ['Full board syllabus completion by October', 'Board answer-writing representation workshops', 'Previous 15 years solved paper sessions', 'Chapter-wise cumulative tests']
            },
            {
                name: 'Class 11th Fundamentals',
                duration: '1 Year Academic Session',
                target: 'Class 11th students',
                subjects: 'Mathematics, Physics, Chemistry, Biology, Commerce',
                details: ['Focus on complex core concepts transition', 'Building base for Class 12th & entrance tests', 'Weekly evaluation tests with feedback', 'Formula derivation and logic mapping sheets']
            }
        ]
    },
    {
        id: 'high-school',
        title: 'HIGH SCHOOL DIVISION',
        badge: 'BOARD PREPARATORY',
        description: 'Building critical thinking, board exam writing standards, and numerical logic.',
        icon: <BookOpen size={24} color="#f59e0b" />,
        courses: [
            {
                name: 'Class 10th Board Powerpack',
                duration: '1 Year Program',
                target: 'Class 10th students',
                subjects: 'Mathematics, Science (Phy/Chem/Bio), Social Studies, English',
                details: ['Strict alignment with CBSE/State Board syllabus', 'Mock board papers simulating real atmosphere', 'Fear elimination for Mathematics & Chemistry', 'Revision bootcamps in December & January']
            },
            {
                name: 'Class 9th Foundation Core',
                duration: '1 Year Program',
                target: 'Class 9th students',
                subjects: 'Mathematics, Science, Social Studies, English',
                details: ['Transitioning to higher-level concepts', 'In-depth conceptual logic mapping', 'Regular doubt clearing & analytical sessions', 'Foundation building for board streams']
            }
        ]
    },
    {
        id: 'junior',
        title: 'JUNIOR EDUCATION WING',
        badge: 'LOGIC BUILDING',
        description: 'Cultivating curiosity, removing math phobias, and introducing core science fundamentals.',
        icon: <Sparkles size={24} color="#10b981" />,
        courses: [
            {
                name: 'Classes 6th - 8th Logic Wings',
                duration: '1 Year Program per Class',
                target: 'Classes 6th, 7th & 8th students',
                subjects: 'Mathematics, Science, English, Social Science',
                details: ['Removal of fear for numbers through fun models', 'Interactive visual and physical science models', 'Mental math trick training modules', 'Regular olympiad level basics classes']
            }
        ]
    }
];

const Courses = () => {
    const mainRef = useRef(null);
    const bgRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    
    // Modal states
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [enquirySubmitted, setEnquirySubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', schoolClass: '', query: '' });

    // Scroll locking when modal is open
    useEffect(() => {
        if (selectedCourse) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedCourse]);

    // Handle mouse tracking
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

    // Generate Background Math Symbols
    const mathSymbols = ["π", "√", "Σ", "∫", "Δ", "∞", "∂", "ϕ", "e", "u", "ƒ"];
    const backgroundElements = Array.from({ length: 35 }).map((_, i) => ({
        id: i,
        sym: mathSymbols[i % mathSymbols.length],
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.15 + 0.05,
        scale: Math.random() * 1.5 + 0.5
    }));

    useGSAP(() => {
        gsap.from(".hero-content", { scale: 0.9, opacity: 0, duration: 1.5, ease: "expo.out" });
        gsap.utils.toArray(".course-category-section").forEach((section) => {
            gsap.from(section, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%"
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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Simulate API post
        setEnquirySubmitted(true);
        setTimeout(() => {
            setEnquirySubmitted(false);
            setSelectedCourse(null);
            setFormData({ name: '', phone: '', email: '', schoolClass: '', query: '' });
        }, 2500);
    };

    const formulaString = "E=mc²   ∫f(x)dx   a²+b²=c²   lim(h→0)   ∑n=1   √x   dy/dx   sin(θ)   πr²   log(x)   ".repeat(10);

    return (
        <div ref={mainRef} style={styles.page}>
            <div ref={bgRef} style={styles.mathBackground}>
                {backgroundElements.map((item) => (
                    <span key={item.id} className="flying-symbol" style={{
                        ...styles.floatingSymbol, left: item.left, top: item.top,
                        opacity: item.opacity, transform: `scale(${item.scale})`
                    }}>{item.sym}</span>
                ))}
            </div>

            {/* ENQUIRY MODAL */}
            {selectedCourse && createPortal(
                <div style={styles.modalOverlay} onClick={() => setSelectedCourse(null)}>
                    <div style={styles.modalCard} className="glass-card enquiry-modal" onClick={(e) => e.stopPropagation()}>
                        <button style={styles.closeBtn} onClick={() => setSelectedCourse(null)}><X size={24} /></button>
                        
                        {enquirySubmitted ? (
                            <div style={styles.successWrapper}>
                                <CheckCircle2 size={60} color="#10b981" />
                                <h2 style={styles.successTitle}>Enquiry Submitted!</h2>
                                <p style={styles.successSub}>Thank you. Our counselor will contact you within 24 hours.</p>
                            </div>
                        ) : (
                            <>
                                <div style={styles.modalHeader}>
                                    <Zap size={20} color="#818cf8" />
                                    <h3 style={styles.modalHeading}>Course Enquiry</h3>
                                </div>
                                <p style={styles.modalCourseName}>{selectedCourse.name}</p>
                                
                                <form onSubmit={handleFormSubmit} style={styles.form}>
                                    <div className="enquiry-form-grid">
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Full Name</label>
                                            <input 
                                                type="text" 
                                                required 
                                                value={formData.name} 
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                                                className="enquiry-input"
                                                placeholder="Your Name"
                                            />
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Phone Number</label>
                                            <input 
                                                type="tel" 
                                                required 
                                                value={formData.phone} 
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                                                className="enquiry-input"
                                                placeholder="Contact Number"
                                            />
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Email Address</label>
                                            <input 
                                                type="email" 
                                                value={formData.email} 
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                                                className="enquiry-input"
                                                placeholder="Your Email"
                                            />
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Current Class</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={formData.schoolClass} 
                                                onChange={(e) => setFormData({ ...formData, schoolClass: e.target.value })} 
                                                className="enquiry-input"
                                                placeholder="e.g. Class 10th"
                                            />
                                        </div>
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Additional Details (Optional)</label>
                                        <textarea 
                                            value={formData.query} 
                                            onChange={(e) => setFormData({ ...formData, query: e.target.value })} 
                                            className="enquiry-textarea"
                                            placeholder="Any specific questions or targets?"
                                        />
                                    </div>
                                    
                                    <button type="submit" style={styles.submitBtn} className="enquire-submit-btn">
                                        SUBMIT ENQUIRY <ArrowRight size={16} />
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>,
                document.body
            )}

            {/* HEADER HERO */}
            <header style={styles.fullHero}>
                <div style={styles.spotlight} />
                <div style={styles.gridOverlay} />

                {/* Formula Scroll */}
                <div className="scroll-text" style={{ ...styles.formulaScroll, top: '10%' }}>
                    {formulaString}
                </div>
                <div className="scroll-text" style={{ ...styles.formulaScroll, top: 'auto', bottom: '10%' }}>
                    {formulaString}
                </div>

                {/* Floating Elements */}
                <div className="float-slow" style={{ ...styles.symbol, top: '15%', left: '12%' }}><Sigma size={40}/></div>
                <div className="float-fast" style={{ ...styles.symbol, top: '25%', right: '15%' }}><FunctionSquare size={50}/></div>
                <div className="float-slow" style={{ ...styles.symbol, bottom: '20%', left: '18%' }}><Binary size={45}/></div>
                <div className="float-fast" style={{ ...styles.symbol, bottom: '15%', right: '12%', fontSize: '2rem' }}>Δx</div>

                {/* Interactive coordinates */}
                <div className="coords-tracker" style={{ left: mousePos.x + 20, top: mousePos.y + 20 }}>
                    COORD: [{mousePos.x}, {mousePos.y}] <br/>
                    VECTOR: {Math.sqrt(mousePos.x**2 + mousePos.y**2).toFixed(0)}u
                </div>

                <div className="hero-content" style={styles.heroInner}>
                    <div style={styles.badge}><Zap size={14} /> EXPLORE PROGRAMS</div>
                    <h1 style={styles.title}>COURSES <br /><span style={styles.gradientText}>WE OFFER</span></h1>
                    <p style={styles.subtitle}>Unlock academic success and entrance examinations with Ashutosh Sir's proprietary Logic-First training method.</p>
                    <div style={styles.scrollIndicator}>SCROLL TO EXPLORE PORTAL</div>
                </div>
            </header>

            {/* CATEGORIES / GRID SECTION */}
            <div style={styles.contentWrapper}>
                {courseCategories.map((category) => (
                    <section key={category.id} className="course-category-section" style={styles.categorySection}>
                        <div className="category-header" style={styles.categoryHeader}>
                            <div style={styles.iconCircle}>
                                {category.icon}
                            </div>
                            <div style={styles.categoryHeaderText}>
                                <div style={styles.sectionBadge}>{category.badge}</div>
                                <h2 style={styles.categoryTitle}>{category.title}</h2>
                                <p style={styles.categoryDesc}>{category.description}</p>
                            </div>
                        </div>

                        <div className="courses-grid" style={styles.coursesGrid}>
                            {category.courses.map((course, index) => (
                                <div key={index} className="bento-card" style={styles.courseCard}>
                                    <div style={styles.cardHeader}>
                                        <h3 style={styles.courseName}>{course.name}</h3>
                                        <div style={styles.courseDuration}>{course.duration}</div>
                                    </div>
                                    
                                    <div style={styles.tagGroup}>
                                        <span style={styles.tag}>Target: {course.target}</span>
                                        <span style={{ ...styles.tag, background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-1)' }}>
                                            {course.subjects}
                                        </span>
                                    </div>

                                    <div style={styles.features}>
                                        <h4 style={styles.featuresTitle}>Program Highlights:</h4>
                                        <ul style={styles.featureList}>
                                            {course.details.map((detail, dIdx) => (
                                                <li key={dIdx} style={styles.featureItem}>
                                                    <CheckCircle2 size={16} color="#818cf8" style={{ flexShrink: 0 }} />
                                                    <span>{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button 
                                        onClick={() => setSelectedCourse(course)}
                                        style={styles.enquireBtn}
                                        className="enquire-btn"
                                    >
                                        ENQUIRE NOW <ArrowRight size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

const styles = {
    page: { 
        background: 'var(--bg-color)', 
        color: 'var(--text-primary)', 
        minHeight: '100vh', 
        fontFamily: "'Inter', sans-serif", 
        position: 'relative', 
        transition: 'background 0.3s ease, color 0.3s ease',
        '--x': '50%',
        '--y': '50%',
        overflowX: 'hidden'
    },
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
    
    contentWrapper: { maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 12 },
    categorySection: { marginBottom: '100px' },
    categoryHeader: { display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '3rem', flexDirection: 'row' },
    iconCircle: { background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '1.2rem', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.3s, border-color 0.3s' },
    categoryHeaderText: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
    sectionBadge: { color: 'var(--accent-2)', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '2px' },
    categoryTitle: { fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)', margin: 0 },
    categoryDesc: { color: 'var(--text-secondary)', fontSize: '1.05rem', margin: 0, transition: 'color 0.3s ease' },
    
    coursesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' },
    courseCard: { background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '28px', padding: '2.5rem', display: 'flex', flexDirection: 'column', backdropFilter: 'blur(12px)', transition: 'background-color 0.3s, border-color 0.3s' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.2rem', flexWrap: 'wrap' },
    courseName: { fontSize: '1.5rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)', transition: 'color 0.3s ease' },
    courseDuration: { fontSize: '0.8rem', fontWeight: '700', padding: '4px 12px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-secondary)' },
    tagGroup: { display: 'flex', gap: '0.6rem', marginBottom: '2rem', flexWrap: 'wrap' },
    tag: { fontSize: '0.75rem', fontWeight: '700', padding: '4px 10px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '6px', color: 'var(--text-secondary)' },
    
    features: { marginBottom: '2.5rem', flexGrow: 1 },
    featuresTitle: { fontSize: '0.9rem', fontWeight: '900', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' },
    featureList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' },
    featureItem: { display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: '1.4' },
    
    enquireBtn: { width: '100%', background: 'var(--glass-bg)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)', padding: '1rem', borderRadius: '16px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.3s ease' },

    badge: { display: 'inline-block', padding: '6px 16px', borderRadius: '20px', border: '1px solid var(--card-border)', background: 'var(--card-bg)', fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--accent-1)', marginBottom: '20px', letterSpacing: '2px', transition: 'background-color 0.3s, border-color 0.3s, color 0.3s' },

    // ENQUIRY MODAL STYLES
    modalOverlay: { position: 'fixed', inset: 0, background: 'var(--modal-overlay)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(15px)', padding: '20px' },
    modalCard: { background: 'var(--card-bg)', border: '1px solid var(--card-border)', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' },
    closeBtn: { position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', zIndex: 10, outline: 'none' },
    modalHeader: { display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '0.5rem' },
    modalHeading: { fontSize: '0.8rem', fontWeight: '900', letterSpacing: '2px', color: 'var(--accent-1)', margin: 0 },
    modalCourseName: { fontSize: '1.8rem', fontWeight: '850', color: 'var(--text-primary)', margin: '0 0 1.5rem 0' },
    
    form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    formGroup: { display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' },
    label: { fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-secondary)' },
    submitBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'linear-gradient(90deg, #818cf8, #ec4899)', border: 'none', color: '#fff', padding: '0.95rem', borderRadius: '14px', fontWeight: '900', fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(129,140,248,0.2)', transition: 'all 0.3s' },

    successWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem 0' },
    successTitle: { fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-primary)', margin: '1rem 0 0.5rem' },
    successSub: { color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }
};

export default Courses;
