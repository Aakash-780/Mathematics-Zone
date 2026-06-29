import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Youtube, Instagram, Sigma, FunctionSquare, Binary, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const mainRef = useRef(null);
    const bgRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

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
        gsap.from(".contact-grid-card", {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".contact-grid",
                start: "top 85%"
            }
        });
        gsap.from(".map-section", {
            y: 45,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".map-section",
                start: "top 85%"
            }
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
        setFormSubmitted(true);
        setTimeout(() => {
            setFormSubmitted(false);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        }, 3000);
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
                    <div style={styles.badge}><Sparkles size={14} /> GET IN TOUCH</div>
                    <h1 style={styles.title}>CONTACT <br /><span style={styles.gradientText}>OUR HUB</span></h1>
                    <p style={styles.subtitle}>Have questions about admissions, board preparation or competitive classes? Reach out to Mathematic Zone today.</p>
                    <div style={styles.scrollIndicator}>SCROLL TO CONTACT US</div>
                </div>
            </header>

            {/* CONTACT DETAILS & FORM SECTION */}
            <div style={styles.contentWrapper}>
                <div className="contact-grid" style={styles.contactGrid}>
                    
                    {/* Left Column: Contact Cards */}
                    <div className="contact-grid-card" style={styles.infoCol}>
                        
                        {/* Timings Card */}
                        <div className="bento-card" style={styles.contactCard}>
                            <div style={styles.cardHeader}>
                                <div style={{ ...styles.iconCircle, background: 'rgba(245, 158, 11, 0.1)' }}>
                                    <Clock size={24} color="#f59e0b" />
                                </div>
                                <div>
                                    <h3 style={styles.cardTitle}>Working Hours</h3>
                                    <p style={styles.cardDetail}>Office & Class Timings</p>
                                </div>
                            </div>
                            <div style={styles.timingList}>
                                <div style={styles.timingRow}>
                                    <span style={styles.timingDay}>Monday - Saturday</span>
                                    <span style={styles.timingTime}>09:00 AM - 08:30 PM</span>
                                </div>
                                <div style={styles.timingRow}>
                                    <span style={styles.timingDay}>Sunday</span>
                                    <span style={{ ...styles.timingTime, color: 'var(--accent-2)' }}>Closed</span>
                                </div>
                            </div>
                        </div>

                        {/* Call Card */}
                        <a href="tel:+918109605081" className="bento-card" style={styles.contactCardLink}>
                            <div style={styles.cardHeader}>
                                <div style={{ ...styles.iconCircle, background: 'rgba(99, 102, 241, 0.1)' }}>
                                    <Phone size={24} color="var(--accent-1)" />
                                </div>
                                <div>
                                    <h3 style={styles.cardTitle}>Call Center</h3>
                                    <p style={styles.cardValue}>+91 81096 05081</p>
                                </div>
                            </div>
                        </a>

                        {/* Email Card */}
                        <a href="mailto:mathematicszoneraipur@gmail.com" className="bento-card" style={styles.contactCardLink}>
                            <div style={styles.cardHeader}>
                                <div style={{ ...styles.iconCircle, background: 'rgba(236, 72, 153, 0.1)' }}>
                                    <Mail size={24} color="var(--accent-2)" />
                                </div>
                                <div>
                                    <h3 style={styles.cardTitle}>Email Support</h3>
                                    <p style={styles.cardValue}>mathematicszoneraipur@gmail.com</p>
                                </div>
                            </div>
                        </a>

                        {/* Address Card */}
                        <div className="bento-card" style={styles.contactCard}>
                            <div style={styles.cardHeader}>
                                <div style={{ ...styles.iconCircle, background: 'rgba(16, 185, 129, 0.1)' }}>
                                    <MapPin size={24} color="#10b981" />
                                </div>
                                <div>
                                    <h3 style={styles.cardTitle}>Our Campus</h3>
                                    <p style={styles.cardDetail}>Dubey Colony Rd, Mowa, Raipur, Chhattisgarh 492014</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="contact-grid-card" style={styles.formCol}>
                        <div className="bento-card" style={styles.formCard}>
                            {formSubmitted ? (
                                <div style={styles.successWrapper}>
                                    <CheckCircle2 size={60} color="#10b981" />
                                    <h2 style={styles.successTitle}>Message Sent!</h2>
                                    <p style={styles.successSub}>Thank you for reaching out. We will get back to you shortly.</p>
                                </div>
                            ) : (
                                <>
                                    <h2 style={styles.formHeading}>Send A Message</h2>
                                    <p style={styles.formSub}>Get a callback or detailed response from our executive.</p>

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
                                                <label style={styles.label}>Email Address</label>
                                                <input 
                                                    type="email" 
                                                    required
                                                    value={formData.email} 
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                                                    className="enquiry-input"
                                                    placeholder="Your Email"
                                                />
                                            </div>
                                        </div>

                                        <div className="enquiry-form-grid" style={{ marginTop: '0.5rem' }}>
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
                                                <label style={styles.label}>Subject</label>
                                                <input 
                                                    type="text" 
                                                    required
                                                    value={formData.subject} 
                                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })} 
                                                    className="enquiry-input"
                                                    placeholder="Reason for Contact"
                                                />
                                            </div>
                                        </div>

                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Your Message</label>
                                            <textarea 
                                                required
                                                value={formData.message} 
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                                                className="enquiry-textarea"
                                                placeholder="Write your message here..."
                                                style={{ minHeight: '120px' }}
                                            />
                                        </div>
                                        
                                        <button type="submit" style={styles.submitBtn} className="enquire-submit-btn">
                                            SEND MESSAGE <Send size={16} />
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>

                </div>

                {/* Embedded Map Section */}
                <section className="map-section" style={styles.mapSection}>
                    <div style={styles.sectionHeader}>
                        <MapPin size={28} color="var(--accent-1)" />
                        <h2 style={styles.massiveHeading}>FIND US ON MAP</h2>
                    </div>
                    <div style={styles.mapFrame}>
                        <iframe 
                            title="Mathematic Zone Location" 
                            src="https://maps.google.com/maps?hl=en&q=Dubey+Colony+Rd,+Dubey+Colony,+Mowa,+Raipur,+Chhattisgarh+492014&ie=UTF8&t=&z=15&iwloc=B&output=embed" 
                            width="100%" 
                            height="450" 
                            style={styles.iframe} 
                            allowFullScreen="" 
                            loading="lazy"
                        ></iframe>
                    </div>
                </section>
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
    contactGrid: { display: 'flex', gap: '2.5rem', flexWrap: 'wrap', marginBottom: '100px', alignItems: 'stretch' },
    infoCol: { flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    formCol: { flex: '1 1 500px', display: 'flex' },
    
    contactCard: { background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '24px', padding: '2rem', backdropFilter: 'blur(12px)', transition: 'background-color 0.3s, border-color 0.3s' },
    contactCardLink: { display: 'block', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '24px', padding: '2rem', backdropFilter: 'blur(12px)', transition: 'transform 0.3s, border-color 0.3s, background-color 0.3s, box-shadow 0.3s' },
    cardHeader: { display: 'flex', gap: '1.2rem', alignItems: 'center' },
    iconCircle: { width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    cardTitle: { fontSize: '0.85rem', fontWeight: '900', color: 'var(--text-secondary)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '3px' },
    cardDetail: { fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: '700', lineHeight: '1.4', margin: 0 },
    cardValue: { fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: '800', margin: 0 },
    
    timingList: { display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1.5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' },
    timingRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' },
    timingDay: { color: 'var(--text-secondary)', fontWeight: '600' },
    timingTime: { color: 'var(--text-primary)', fontWeight: '700' },

    badge: { display: 'inline-block', padding: '6px 16px', borderRadius: '20px', border: '1px solid var(--card-border)', background: 'var(--card-bg)', fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--accent-1)', marginBottom: '20px', letterSpacing: '2px', transition: 'background-color 0.3s, border-color 0.3s, color 0.3s' },
    
    formCard: { width: '100%', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '28px', padding: '3rem', backdropFilter: 'blur(12px)', transition: 'background-color 0.3s, border-color 0.3s' },
    formHeading: { fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.5rem' },
    formSub: { color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    formGroup: { display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' },
    label: { fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-secondary)' },
    submitBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'linear-gradient(90deg, #818cf8, #ec4899)', border: 'none', color: '#fff', padding: '1rem', borderRadius: '14px', fontWeight: '900', fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(129,140,248,0.2)', transition: 'all 0.3s', marginTop: '1rem' },
    
    successWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '3rem 0' },
    successTitle: { fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)', margin: '1.2rem 0 0.6rem' },
    successSub: { color: 'var(--text-secondary)', fontSize: '1rem', margin: 0 },

    mapSection: { marginBottom: '100px' },
    sectionHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2.5rem' },
    massiveHeading: { fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: 0 },
    mapFrame: { borderRadius: '40px', overflow: 'hidden', border: '1px solid var(--card-border)', background: 'var(--card-bg)', padding: '10px', transition: 'background-color 0.3s, border-color 0.3s' },
    iframe: { border: '0', borderRadius: '32px', filter: 'var(--map-filter)', transition: 'filter 0.3s ease' }
};

export default Contact;
