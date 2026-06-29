import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
    GraduationCap,
    Dna,
    FlaskConical,
    Atom,
    BookOpen,
    Users,
    ArrowRight
} from 'lucide-react';
import ashutoshImg from '../assets/ashutosh.png';
import vishnuImg from '../assets/vishnu.png';
import surajImg from '../assets/suraj.png';

const FacultySection = () => {
    const sectionRef = useRef(null);

    const faculty = [
        { 
            name: "Ashutosh Sir", 
            subject: "Mathematics", 
            exp: "10+ Years Experience", 
            expNum: "10+",
            students: "2.5K+",
            line: "Ab Maths se darr nahi, ishq hoga!", 
            color: "#6366f1", 
            img: ashutoshImg,
            iconType: "math",
            imgStyle: { objectPosition: 'center' }
        },
        { 
            name: "Vishnu Sir", 
            subject: "Biology", 
            exp: "8+ Years Experience", 
            expNum: "8+",
            students: "1.8K+",
            line: "Ratta chodo, Biology ko feel karo!", 
            color: "#ec4899", 
            img: vishnuImg,
            iconType: "biology",
            imgStyle: { objectPosition: 'center' }
        },
        { 
            name: "Suraj Sir", 
            subject: "Chemistry", 
            exp: "7+ Years Experience", 
            expNum: "7+",
            students: "2.1K+",
            line: "Reactions ratna bhul jao, samjho!", 
            color: "#f59e0b", 
            img: surajImg,
            iconType: "chemistry",
            imgStyle: { objectPosition: 'center' }
        }
    ];

    useGSAP(() => {
        gsap.to(".bg-particle", {
            y: "random(-60, 60)",
            x: "random(-30, 30)",
            rotation: "random(-20, 20)",
            duration: "random(4, 6)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(".bg-orb", {
            scale: 1.3,
            opacity: 0.3,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 2
        });
    }, { scope: sectionRef });

    const renderCircleBadge = (type) => {
        switch (type) {
            case 'math':
                return <span style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 'bold', fontFamily: 'serif' }}>√x</span>;
            case 'biology':
                return <Dna size={18} color="#fff" />;
            case 'chemistry':
                return <FlaskConical size={18} color="#fff" />;
            case 'physics':
                return <Atom size={18} color="#fff" />;
            case 'english':
                return <BookOpen size={18} color="#fff" />;
            default:
                return <GraduationCap size={18} color="#fff" />;
        }
    };

    return (
        <section ref={sectionRef} style={styles.section}>
            <div style={styles.gridOverlay} />
            <div style={styles.meshGradient} />

            <div className="bg-orb" style={{ ...styles.orb, top: '10%', left: '15%', background: '#6366f1' }} />
            <div className="bg-orb" style={{ ...styles.orb, bottom: '15%', right: '10%', background: '#ec4899' }} />

            <div className="bg-particle" style={{ ...styles.particle, top: '20%', left: '8%' }}>Σ</div>
            <div className="bg-particle" style={{ ...styles.particle, top: '45%', right: '12%', fontSize: '5rem' }}>√</div>
            <div className="bg-particle" style={{ ...styles.particle, bottom: '15%', left: '15%' }}>dy/dx</div>
            <div className="bg-particle" style={{ ...styles.particle, bottom: '25%', right: '5%' }}>∞</div>

            <div style={styles.container}>
                <div style={styles.header}>
                    <div className="faculty-badge-top" style={styles.badgeTop}>
                        OUR FACULTY
                    </div>
                    <h2 style={styles.heading}>
                        Learn From the <span style={styles.gradientText}>Best Minds</span>
                    </h2>
                    <p style={styles.subheading}>
                        Our experienced faculty members are dedicated to helping you achieve your academic goals.
                    </p>
                </div>

                <div style={styles.grid}>
                    {faculty.map((teacher, idx) => (
                        <div key={idx} className="faculty-card" style={{ ...styles.card, borderBottom: `4px solid ${teacher.color}` }}>
                            <div style={styles.imageWrapper}>
                                <img
                                    src={teacher.img}
                                    alt={teacher.name}
                                    className="faculty-image"
                                    style={{ ...styles.image, ...teacher.imgStyle }}
                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1544717297-fa95b3ee9213?q=80&w=800&auto=format&fit=crop'; }}
                                />
                                <div style={styles.imageGradientOverlay} />
                                <div style={{ ...styles.circleBadge, background: teacher.color }}>
                                    {renderCircleBadge(teacher.iconType)}
                                </div>
                                <div style={{ ...styles.subjectTag, background: teacher.color }}>
                                    {teacher.subject}
                                </div>
                            </div>

                            <div style={styles.info}>
                                <div style={styles.topContent}>
                                    <h3 style={styles.name}>{teacher.name}</h3>
                                    <span style={{ ...styles.expText, color: teacher.color }}>{teacher.exp}</span>
                                </div>

                                <div style={styles.quoteBox}>
                                    <span style={{ ...styles.quoteSign, color: teacher.color }}>“</span>
                                    <p style={styles.line}>{teacher.line}</p>
                                </div>

                                <div style={styles.divider} />

                                <div style={styles.statsPanel}>
                                    <div style={styles.statCol}>
                                        <GraduationCap size={18} color={teacher.color} />
                                        <div style={styles.statTexts}>
                                            <span style={styles.statVal}>{teacher.expNum}</span>
                                            <span style={styles.statLabel}>Years Exp</span>
                                        </div>
                                    </div>
                                    <div style={styles.statCol}>
                                        <Users size={18} color={teacher.color} />
                                        <div style={styles.statTexts}>
                                            <span style={styles.statVal}>{teacher.students}</span>
                                            <span style={styles.statLabel}>Students</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={styles.footerBtnContainer}>
                    <Link to="/about" className="faculty-view-all-btn" style={styles.viewAllBtn}>
                        View All Faculty <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

const styles = {
    section: { padding: '100px 20px', background: 'var(--bg-color)', color: 'var(--text-primary)', position: 'relative', overflow: 'hidden', transition: 'background 0.3s ease, color 0.3s ease' },
    gridOverlay: { position: 'absolute', inset: 0, backgroundImage: 'var(--grid-overlay)', backgroundSize: '45px 45px', zIndex: 1, pointerEvents: 'none' },
    meshGradient: { position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(129, 140, 248, 0.08) 0%, transparent 50%)', zIndex: 0, pointerEvents: 'none' },
    orb: { position: 'absolute', width: '350px', height: '350px', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.15, zIndex: 1, pointerEvents: 'none' },
    particle: { position: 'absolute', color: 'var(--particle-color)', fontSize: '3.5rem', fontWeight: '900', pointerEvents: 'none', zIndex: 1, transition: 'color 0.3s ease' },
    container: { maxWidth: '1320px', margin: '0 auto', position: 'relative', zIndex: 10 },
    header: { textAlign: 'center', marginBottom: '4.5rem' },
    badgeTop: { background: 'rgba(99, 102, 241, 0.06)', border: '1px solid rgba(99, 102, 241, 0.12)', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '900', color: 'var(--accent-1)', letterSpacing: '1px', marginBottom: '1rem', display: 'inline-block', textTransform: 'uppercase', transition: 'all 0.3s ease' },
    heading: { fontSize: 'clamp(2.3rem, 5vw, 3.5rem)', fontWeight: '950', color: 'var(--text-primary)', letterSpacing: '-0.04em', lineHeight: '1.2' },
    subheading: { fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0.8rem auto 0 auto', lineHeight: '1.6', fontWeight: '500' },
    gradientText: { background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },

    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1.8rem',
        alignItems: 'stretch'
    },
    card: {
        flex: '1 1 280px',
        maxWidth: '320px',
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '24px',
        overflow: 'visible', // Allows subject tag to overhang slightly
        backdropFilter: 'blur(15px)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 12px 30px var(--faculty-shadow)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative'
    },
    imageWrapper: { position: 'relative', width: '100%', aspectRatio: '4/5', overflow: 'hidden', borderTopLeftRadius: '23px', borderTopRightRadius: '23px', flexShrink: 0 },
    image: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' },
    imageGradientOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)', pointerEvents: 'none', zIndex: 1 },
    circleBadge: { position: 'absolute', top: '15px', left: '15px', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.18)', zIndex: 3 },
    subjectTag: { position: 'absolute', bottom: '14px', left: '15px', padding: '5px 12px', borderRadius: '8px', color: '#fff', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 2 },

    info: { padding: '1.25rem 1.25rem 1rem 1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
    topContent: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '0.5rem' },
    name: { fontSize: '1.2rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.1rem', transition: 'color 0.3s ease', letterSpacing: '-0.01em' },
    expText: { fontSize: '0.8rem', fontWeight: '700', transition: 'color 0.3s ease' },

    quoteBox: { display: 'flex', alignItems: 'flex-start', gap: '4px', minHeight: '44px', marginBottom: '0.5rem' },
    quoteSign: { fontSize: '1.8rem', fontWeight: '900', fontFamily: 'Georgia, serif', lineHeight: '1', marginTop: '-4px' },
    line: { fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0, lineHeight: '1.5' },

    divider: { height: '1px', background: 'var(--card-border)', margin: '0.6rem 0', opacity: 0.5 },
    statsPanel: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    statCol: { display: 'flex', alignItems: 'center', gap: '8px' },
    statTexts: { display: 'flex', flexDirection: 'column' },
    statVal: { fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: '1.2' },
    statLabel: { fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' },

    footerBtnContainer: { textAlign: 'center', marginTop: '3.5rem' },
    viewAllBtn: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--card-bg)', border: '1px solid var(--accent-1)', padding: '0.75rem 2rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: '800', color: 'var(--accent-1)', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }
};

export default FacultySection;