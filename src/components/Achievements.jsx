import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, X, GraduationCap, Play, Pause, Award } from 'lucide-react';

const toppers = [
    { name: "Aarav Sharma", class: "Class 12th", score: "98.8%", highlight: "100/100 in Maths", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=60" },
    { name: "Ananya Patel", class: "Class 12th", score: "98.2%", highlight: "99/100 in Chemistry", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60" },
    { name: "Rohan Gupta", class: "Class 10th", score: "97.8%", highlight: "100/100 in Science", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60" },
    { name: "Diya Iyer", class: "Class 12th", score: "97.5%", highlight: "Biology State Topper", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60" },
    { name: "Devansh Singh", class: "Class 12th", score: "97.2%", highlight: "Commerce Stream Topper", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60" },
    { name: "Ishita Verma", class: "Class 10th", score: "96.8%", highlight: "99/100 in Mathematics", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60" },
    { name: "Kabir Mehta", class: "Class 12th", score: "96.5%", highlight: "98/100 in Physics", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=60" },
    { name: "Meera Nair", class: "Class 12th", score: "96.2%", highlight: "100/100 in Accountancy", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=60" },
    { name: "Aditya Roy", class: "Class 10th", score: "96.0%", highlight: "98% in Science and Math", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=60" },
    { name: "Sanya Kapoor", class: "Class 12th", score: "95.8%", highlight: "97/100 in Economics", img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&auto=format&fit=crop&q=60" },
    { name: "Yash Vardhan", class: "Class 12th", score: "95.5%", highlight: "IIT-JEE Pre-Foundation", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60" },
    { name: "Kriti Sen", class: "Class 10th", score: "95.4%", highlight: "English Topper 99/100", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=60" },
    { name: "Rahul Deshmukh", class: "Class 12th", score: "95.2%", highlight: "98/100 in CS", img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=60" },
    { name: "Sneha Reddy", class: "Class 12th", score: "95.0%", highlight: "96% Board Average", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60" },
    { name: "Vikram Malhotra", class: "Class 10th", score: "94.8%", highlight: "99% in Board Algebra", img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=60" },
    { name: "Riya Bose", class: "Class 12th", score: "94.5%", highlight: "Biology High Score", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=60" },
    { name: "Siddharth Jain", class: "Class 12th", score: "94.2%", highlight: "Maths Core Topper", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&auto=format&fit=crop&q=60" },
    { name: "Tanya Sharma", class: "Class 10th", score: "94.0%", highlight: "CBSE Merit List", img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&auto=format&fit=crop&q=60" },
    { name: "Aaryan Kapoor", class: "Class 12th", score: "93.8%", highlight: "Chemistry Honors", img: "https://images.unsplash.com/photo-1489980508314-941910ded1f4?w=150&auto=format&fit=crop&q=60" },
    { name: "Nehal Joshi", class: "Class 12th", score: "93.5%", highlight: "Applied Math Topper", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60" }
];

const Achievements = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [autoScroll, setAutoScroll] = useState(true);

    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [modalOpen]);

    return (
        <section style={styles.section}>
            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.badge}>
                        <Award size={14} /> MZ CHAMPIONS
                    </div>
                    <h2 style={styles.heading}>
                        MZ <span style={styles.gradientText}>BOARD</span> ACHIEVEMENTS
                    </h2>
                    <p style={styles.subText}>
                        Transforming complex board syllabus into top tier results. Here are our outstanding scorers in Class 10th and 12th boards.
                    </p>
                </div>

                {/* Horizontal Marquee Ribbon */}
                <div className="achievers-marquee-outer">
                    <div className="achievers-marquee-inner">
                        {[...toppers, ...toppers].map((student, idx) => {
                            const isClass12 = student.class === "Class 12th";
                            const highlightColor = isClass12 ? "var(--accent-2)" : "var(--accent-1)";
                            const glowShadow = isClass12 
                                ? "0 8px 25px rgba(236, 72, 153, 0.16)" 
                                : "0 8px 25px rgba(99, 102, 241, 0.16)";
                            return (
                                <div 
                                    key={idx} 
                                    className="bento-card topper-card" 
                                    style={{ 
                                        borderColor: `${highlightColor}33`,
                                        boxShadow: `0 10px 30px rgba(0, 0, 0, 0.25), ${glowShadow}`,
                                        '--hover-glow': isClass12 ? 'rgba(236, 72, 153, 0.35)' : 'rgba(99, 102, 241, 0.35)'
                                    }}
                                >
                                    <img src={student.img} alt={student.name} className="topper-avatar" style={{ borderColor: highlightColor }} />
                                    <div style={styles.cardInfo}>
                                        <h4 style={styles.cardName}>{student.name}</h4>
                                        <div style={styles.cardStats}>
                                            <span style={styles.cardClass}>{student.class}</span>
                                            <span style={{ 
                                                ...styles.scoreBadge, 
                                                color: highlightColor,
                                                borderColor: `${highlightColor}33`,
                                                background: `${highlightColor}15`
                                            }}>
                                                {student.score}
                                            </span>
                                        </div>
                                        <div style={styles.cardTag}>
                                            <Sparkles size={11} color={highlightColor} /> 
                                            <span>{student.highlight}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Open Modal CTA Button */}
                <div style={styles.btnRow}>
                    <button onClick={() => setModalOpen(true)} style={styles.themedBtn} className="enquire-btn">
                        VIEW ALL SCORERS ({toppers.length} Toppers)
                    </button>
                </div>

                {/* Modal Container rendered via React Portal */}
                {modalOpen && createPortal(
                    <div style={styles.modalOverlay} onClick={() => setModalOpen(false)}>
                        <div style={styles.modalCard} className="glass-card" onClick={(e) => e.stopPropagation()}>
                            <button style={styles.closeBtn} onClick={() => setModalOpen(false)}><X size={24} /></button>
                            
                            <div style={styles.modalHeader}>
                                <GraduationCap size={22} color="#818cf8" />
                                <h3 style={styles.modalHeading}>HALL OF FAME</h3>
                            </div>
                            
                            {/* Toggle auto-scroll vs manual scroll */}
                            <div style={styles.controlRow}>
                                <span style={styles.controlLabel}>
                                    {autoScroll ? "VERTICAL STREAMING SPEED ACTIVATED" : "MANUAL VIEWING ENABLED"}
                                </span>
                                <button 
                                    onClick={() => setAutoScroll(!autoScroll)} 
                                    style={styles.toggleBtn}
                                >
                                    {autoScroll ? <Pause size={12} /> : <Play size={12} />}
                                    {autoScroll ? "MANUAL" : "AUTO PLAY"}
                                </button>
                            </div>

                            {/* Modal Content Scroll Box */}
                            <div className="modal-marquee-outer">
                                {autoScroll ? (
                                    <div className="modal-marquee-inner">
                                        {[...toppers, ...toppers].map((student, idx) => {
                                            const isClass12 = student.class === "Class 12th";
                                            const highlightColor = isClass12 ? "var(--accent-2)" : "var(--accent-1)";
                                            const glowShadow = isClass12 
                                                ? "0 4px 15px rgba(236, 72, 153, 0.08)" 
                                                : "0 4px 15px rgba(99, 102, 241, 0.08)";
                                            return (
                                                <div 
                                                    key={idx} 
                                                    style={{ 
                                                        ...styles.listItem,
                                                        borderColor: `${highlightColor}22`,
                                                        boxShadow: `0 4px 15px rgba(0, 0, 0, 0.1), ${glowShadow}`
                                                    }}
                                                >
                                                    <img src={student.img} alt={student.name} style={{ ...styles.listAvatar, border: `2px solid ${highlightColor}` }} />
                                                    <div style={styles.listText}>
                                                        <h4 style={styles.listName}>{student.name}</h4>
                                                        <div style={styles.listTag}>
                                                            <Sparkles size={11} color={highlightColor} />
                                                            <span>{student.highlight}</span>
                                                        </div>
                                                    </div>
                                                    <div style={styles.listStats}>
                                                        <span style={styles.listClass}>{student.class}</span>
                                                        <span style={{ 
                                                            ...styles.scoreBadge, 
                                                            fontSize: '0.85rem',
                                                            padding: '3px 8px',
                                                            borderRadius: '8px',
                                                            color: highlightColor,
                                                            borderColor: `${highlightColor}33`,
                                                            background: `${highlightColor}15`
                                                        }}>
                                                            {student.score}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="modal-marquee-inner-scrollable">
                                        {toppers.map((student, idx) => {
                                            const isClass12 = student.class === "Class 12th";
                                            const highlightColor = isClass12 ? "var(--accent-2)" : "var(--accent-1)";
                                            const glowShadow = isClass12 
                                                ? "0 4px 15px rgba(236, 72, 153, 0.08)" 
                                                : "0 4px 15px rgba(99, 102, 241, 0.08)";
                                            return (
                                                <div 
                                                    key={idx} 
                                                    style={{ 
                                                        ...styles.listItem,
                                                        borderColor: `${highlightColor}22`,
                                                        boxShadow: `0 4px 15px rgba(0, 0, 0, 0.1), ${glowShadow}`
                                                    }}
                                                >
                                                    <img src={student.img} alt={student.name} style={{ ...styles.listAvatar, border: `2px solid ${highlightColor}` }} />
                                                    <div style={styles.listText}>
                                                        <h4 style={styles.listName}>{student.name}</h4>
                                                        <div style={styles.listTag}>
                                                            <Sparkles size={11} color={highlightColor} />
                                                            <span>{student.highlight}</span>
                                                        </div>
                                                    </div>
                                                    <div style={styles.listStats}>
                                                        <span style={styles.listClass}>{student.class}</span>
                                                        <span style={{ 
                                                            ...styles.scoreBadge, 
                                                            fontSize: '0.85rem',
                                                            padding: '3px 8px',
                                                            borderRadius: '8px',
                                                            color: highlightColor,
                                                            borderColor: `${highlightColor}33`,
                                                            background: `${highlightColor}15`
                                                        }}>
                                                            {student.score}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
            </div>
        </section>
    );
};

const styles = {
    section: { padding: '80px 0', background: 'var(--bg-color)', position: 'relative', overflow: 'visible', transition: 'background 0.3s ease' },
    container: { width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px', position: 'relative' },
    header: { textAlign: 'center', marginBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    badge: { 
        background: 'var(--card-bg)', border: '1px solid var(--card-border)', padding: '0.5rem 1.2rem', 
        borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--accent-1)', 
        marginBottom: '1.2rem', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px',
        transition: 'all 0.3s ease'
    },
    heading: { fontSize: 'clamp(2.5rem, 5vw, 3.2rem)', fontWeight: '950', letterSpacing: '-0.03em', color: 'var(--text-primary)' },
    gradientText: { background: 'linear-gradient(90deg, #818cf8, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    subText: { color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.8rem', maxWidth: '600px', lineHeight: '1.6', transition: 'color 0.3s ease' },
    
    cardInfo: { display: 'flex', flexDirection: 'column', gap: '0.25rem', flexGrow: 1, textAlign: 'left' },
    cardName: { fontSize: '1.15rem', fontWeight: '900', margin: 0, color: 'var(--text-primary)', transition: 'color 0.3s' },
    cardStats: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', margin: '2px 0' },
    cardClass: { fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '700' },
    scoreBadge: {
        fontSize: '0.92rem',
        fontWeight: '950',
        padding: '4px 10px',
        borderRadius: '10px',
        border: '1px solid',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        letterSpacing: '0.5px'
    },
    cardTag: {
        fontSize: '0.72rem',
        color: 'var(--text-secondary)',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid var(--glass-border)',
        padding: '3px 8px',
        borderRadius: '8px',
        width: 'fit-content',
        marginTop: '6px'
    },
    listTag: {
        fontSize: '0.72rem',
        color: 'var(--text-secondary)',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        marginTop: '2px'
    },
    
    btnRow: { display: 'flex', justifyContent: 'center', marginTop: '3.5rem' },
    themedBtn: {
        background: 'var(--card-bg)',
        color: 'var(--text-primary)',
        border: '1px solid var(--card-border)',
        padding: '1.2rem 2.8rem',
        borderRadius: '50px',
        fontWeight: '900',
        fontSize: '1rem',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease'
    },

    // MODAL
    modalOverlay: { position: 'fixed', inset: 0, background: 'var(--modal-overlay)', zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(20px)', padding: '20px' },
    modalCard: { width: '100%', maxWidth: '620px', background: 'var(--card-bg)', border: '1px solid var(--card-border)', padding: '2.5rem', borderRadius: '32px', position: 'relative', display: 'flex', flexDirection: 'column', height: '80vh', justifyContent: 'space-between', boxShadow: '0 25px 60px rgba(0,0,0,0.4)' },
    closeBtn: { position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', outline: 'none' },
    modalHeader: { display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '0.2rem' },
    modalHeading: { fontSize: '0.85rem', fontWeight: '950', letterSpacing: '3px', color: 'var(--accent-1)', margin: 0 },
    
    controlRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.1)', padding: '10px 16px', borderRadius: '12px', border: '1px solid var(--glass-border)', margin: '1rem 0' },
    controlLabel: { fontSize: '0.68rem', fontFamily: 'monospace', color: 'var(--text-secondary)', fontWeight: 'bold', letterSpacing: '1px' },
    toggleBtn: { display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '5px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' },
    
    listItem: { display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '1.1rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '18px', transition: 'all 0.2s' },
    listAvatar: { width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' },
    listText: { display: 'flex', flexDirection: 'column', gap: '0.25rem', flexGrow: 1, textAlign: 'left' },
    listName: { fontSize: '1rem', fontWeight: '850', margin: 0, color: 'var(--text-primary)' },
    listHighlight: { fontSize: '0.78rem', color: 'var(--text-secondary)' },
    listStats: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.1rem', textAlign: 'right' },
    listClass: { fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' },
    listScore: { fontSize: '1.05rem', color: 'var(--accent-2)', fontWeight: '950' }
};

export default Achievements;
