import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowLeft, BookOpen, Zap, Sparkles, GraduationCap } from 'lucide-react';

const quizModules = [
    {
        id: 'trigonometry',
        title: 'Trigonometry module',
        description: 'Master sines, cosines, and tangents!',
        questions: [
            { question: "What is the value of sin(90°)?", options: ["0", "1", "-1", "undefined"], answer: "1" },
            { question: "If tan(θ) = 1, what is θ (in degrees)?", options: ["30°", "45°", "60°", "90°"], answer: "45°" },
            { question: "What is sin²(x) + cos²(x)?", options: ["0", "1", "2", "tan²(x)"], answer: "1" }
        ]
    },
    {
        id: 'integration',
        title: 'Integration module',
        description: 'Practice definite and indefinite integrals.',
        questions: [
            { question: "What is the integral of x dx?", options: ["x² + C", "0.5x² + C", "1", "x/2 + C"], answer: "0.5x² + C" },
            { question: "Integral of cos(x) dx?", options: ["sin(x) + C", "-sin(x) + C", "cos²(x) + C", "-cos(x) + C"], answer: "sin(x) + C" },
            { question: "What is the integral of e^x dx?", options: ["e^x + C", "xe^x + C", "ln(x) + C", "e^(x+1) + C"], answer: "e^x + C" }
        ]
    },
    {
        id: 'algebra',
        title: 'Algebra fundamentals',
        description: 'Solve polynomial equations and more.',
        questions: [
            { question: "Solve for x: 2x + 5 = 13", options: ["4", "3", "5", "8"], answer: "4" },
            { question: "What is the discriminant of ax² + bx + c?", options: ["b - 4ac", "b² + 4ac", "b² - 4ac", "sqrt(b) - ac"], answer: "b² - 4ac" },
            { question: "Factor: x² - 9", options: ["(x-3)(x-3)", "(x+3)(x-3)", "(x+9)(x-1)", "x(x-9)"], answer: "(x+3)(x-3)" }
        ]
    },
    {
        id: 'calculus',
        title: 'Derivatives Basics',
        description: 'Find rates of change using limits.',
        questions: [
            { question: "What is the derivative of x²?", options: ["x", "2x", "x³", "1"], answer: "2x" },
            { question: "Derivative of ln(x)?", options: ["1/x", "e^x", "x", "ln(x²)"], answer: "1/x" },
            { question: "Derivative of sin(x)?", options: ["-cos(x)", "cos(x)", "-sin(x)", "tan(x)"], answer: "cos(x)" }
        ]
    }
];

const Quizzes = () => {
    const [selectedModule, setSelectedModule] = useState(null);
    const [currentQuiz, setCurrentQuiz] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const mainRef = useRef(null);
    const questionRef = useRef(null);
    const optionsRef = useRef(null);

    useGSAP(() => {
        // Continuous drift for emojis
        gsap.to(".flying-emoji", {
            y: "random(-100, 100)",
            x: "random(-50, 50)",
            rotation: "random(-20, 20)",
            duration: "random(8, 15)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Stagger entrance animation for module cards
        gsap.from(".quiz-module-card", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.1
        });
    }, { scope: mainRef });

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) setScore(score + 1);
        const nextQuiz = currentQuiz + 1;
        if (nextQuiz < selectedModule.questions.length) {
            setCurrentQuiz(nextQuiz);
            gsap.fromTo([questionRef.current, optionsRef.current], 
                { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 });
        } else {
            setShowScore(true);
        }
    };

    return (
        <div ref={mainRef} style={styles.page}>
            {/* BACKGROUND LAYER WITH VISIBLE EMOJIS */}
            <div style={styles.bgOverlay}>
                <div style={styles.mesh} />
                <span className="flying-emoji" style={{ ...styles.emoji, top: '15%', left: '8%' }}>π</span>
                <span className="flying-emoji" style={{ ...styles.emoji, top: '45%', right: '12%' }}>√</span>
                <span className="flying-emoji" style={{ ...styles.emoji, bottom: '25%', left: '15%' }}>Σ</span>
                <span className="flying-emoji" style={{ ...styles.emoji, bottom: '15%', right: '10%' }}>∫</span>
                <span className="flying-emoji" style={{ ...styles.emoji, top: '25%', right: '35%' }}>∞</span>
            </div>

            <div style={styles.container}>
                {!selectedModule ? (
                    <>
                        <div style={styles.header}>
                            <div style={styles.badge}><Zap size={14} /> QUIZ PORTAL</div>
                            <h1 style={styles.pageTitle}>LEVEL UP YOUR <span style={styles.gradientText}>LOGIC</span></h1>
                            <p style={styles.subtitle}>Choose a module and start your digital assessment.</p>
                        </div>

                        <div style={styles.modulesGrid}>
                            {quizModules.map((mod) => (
                                <div key={mod.id} className="quiz-module-card bento-card" style={styles.moduleCard}>
                                    <div style={styles.iconCircle}>
                                        <BookOpen size={24} color="#818cf8" />
                                    </div>
                                    <h3 style={styles.moduleTitle}>{mod.title}</h3>
                                    <p style={styles.moduleDesc}>{mod.description}</p>
                                    <button 
                                        style={styles.startBtn} 
                                        onClick={() => setSelectedModule(mod)}
                                    >
                                        START TEST
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div style={styles.quizWrapper}>
                        <button onClick={() => setSelectedModule(null)} style={styles.backButton}>
                            <ArrowLeft size={16} /> BACK TO LIST
                        </button>

                        <div style={styles.quizCard}>
                            {showScore ? (
                                <div style={styles.scoreSection}>
                                    <GraduationCap size={60} color="#ec4899" />
                                    <h2 style={styles.scoreTitle}>Final Score: {score} / {selectedModule.questions.length}</h2>
                                    <button style={styles.startBtn} onClick={() => setSelectedModule(null)}>FINISH</button>
                                </div>
                            ) : (
                                <>
                                    {/* Quiz Progress Bar */}
                                    <div style={styles.progressBarWrapper}>
                                        <div style={{ 
                                            ...styles.progressBar, 
                                            width: `${(currentQuiz / selectedModule.questions.length) * 100}%` 
                                        }} />
                                    </div>
                                    
                                    <div style={styles.qHeader}>
                                        <p style={styles.qIndex}>QUESTION {currentQuiz + 1}</p>
                                        <h3 ref={questionRef} style={styles.qText}>{selectedModule.questions[currentQuiz].question}</h3>
                                    </div>
                                    <div ref={optionsRef} style={styles.answerGrid}>
                                        {selectedModule.questions[currentQuiz].options.map((option, idx) => (
                                            <button 
                                                key={idx} 
                                                className="option-btn"
                                                style={styles.optionBtn} 
                                                onClick={() => handleAnswerOptionClick(option === selectedModule.questions[currentQuiz].answer)}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    page: { 
        backgroundColor: 'var(--bg-color)', 
        color: 'var(--text-primary)', 
        minHeight: '100vh', 
        position: 'relative', 
        paddingTop: '120px',
        paddingBottom: '80px',
        overflowX: 'hidden',
        transition: 'background-color 0.3s ease, color 0.3s ease'
    },
    bgOverlay: { position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' },
    mesh: { position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(129, 140, 248, 0.08), transparent 70%)' },
    emoji: { 
        position: 'absolute', 
        color: 'var(--particle-color)', 
        fontSize: '4rem', 
        fontWeight: 'bold',
        transition: 'color 0.3s ease'
    },
    
    container: { maxWidth: '1100px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 10 },
    header: { textAlign: 'center', marginBottom: '4rem' },
    badge: { 
        background: 'rgba(129, 140, 248, 0.1)', 
        padding: '6px 16px', 
        borderRadius: '50px', 
        color: 'var(--accent-1)', 
        fontSize: '0.7rem', 
        fontWeight: 'bold', 
        border: '1px solid rgba(129, 140, 248, 0.2)',
        marginBottom: '1rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px'
    },
    pageTitle: { fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '900', marginBottom: '0.5rem' },
    gradientText: { background: 'linear-gradient(90deg, #818cf8, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    subtitle: { color: 'var(--text-secondary)', fontSize: '1.1rem', transition: 'color 0.3s ease' },

    modulesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' },
    moduleCard: { 
        background: 'var(--card-bg)', 
        border: '1px solid var(--card-border)', 
        borderRadius: '28px', 
        padding: '2.5rem', 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        backdropFilter: 'blur(10px)',
        transition: 'background-color 0.3s, border-color 0.3s'
    },
    iconCircle: { background: 'rgba(129, 140, 248, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' },
    moduleTitle: { fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.8rem', color: 'var(--text-primary)', transition: 'color 0.3s ease' },
    moduleDesc: { color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', flexGrow: 1, lineHeight: '1.5', transition: 'color 0.3s ease' },
    startBtn: { 
        background: 'linear-gradient(90deg, #818cf8, #ec4899)', 
        color: '#fff', 
        border: 'none', 
        padding: '1rem 2rem', 
        borderRadius: '14px', 
        fontWeight: '900', 
        fontSize: '0.9rem',
        cursor: 'pointer',
        boxShadow: '0 10px 20px rgba(129, 140, 248, 0.2)',
        transition: 'all 0.3s ease'
    },

    quizWrapper: { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    backButton: { background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '0.8rem 1.5rem', borderRadius: '12px', cursor: 'pointer', marginBottom: '3rem', fontSize: '0.8rem', fontWeight: 'bold', transition: 'all 0.3s ease' },
    quizCard: { 
        background: 'var(--card-bg)', 
        border: '1px solid var(--card-border)', 
        borderRadius: '40px', 
        padding: '3.5rem', 
        width: '100%', 
        maxWidth: '700px',
        backdropFilter: 'blur(20px)',
        transition: 'background-color 0.3s, border-color 0.3s'
    },
    qIndex: { fontSize: '0.75rem', fontWeight: '900', color: 'var(--accent-1)', letterSpacing: '2px', marginBottom: '1rem', textAlign: 'center' },
    qText: { fontSize: '1.8rem', fontWeight: '800', textAlign: 'center', marginBottom: '2.5rem', lineHeight: '1.3', color: 'var(--text-primary)', transition: 'color 0.3s' },
    answerGrid: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    optionBtn: { 
        background: 'var(--glass-bg)', 
        border: '1px solid var(--glass-border)', 
        color: 'var(--text-primary)', 
        padding: '1.5rem', 
        borderRadius: '20px', 
        textAlign: 'left', 
        cursor: 'pointer', 
        fontSize: '1.1rem', 
        fontWeight: '600',
        transition: 'all 0.3s ease',
        outline: 'none'
    },
    scoreSection: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    scoreTitle: { fontSize: '2.2rem', fontWeight: '900', margin: '1.5rem 0', color: 'var(--text-primary)', transition: 'color 0.3s' },
    progressBarWrapper: {
        width: '100%',
        height: '6px',
        background: 'var(--glass-border)',
        borderRadius: '999px',
        overflow: 'hidden',
        marginBottom: '2rem',
        position: 'relative'
    },
    progressBar: {
        height: '100%',
        background: 'var(--accent-gradient)',
        borderRadius: '999px',
        transition: 'width 0.3s ease-out',
        boxShadow: '0 0 10px var(--accent-1)'
    }
};

export default Quizzes;