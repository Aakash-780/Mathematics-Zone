import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext';
import logoImg from '../assets/logo.png';

const loadingLogs = [
    { pct: 0, text: "SYS: Initializing bootloader..." },
    { pct: 8, text: "SYS: Loading core assets & packages..." },
    { pct: 15, text: "MATH: Spawning sigma & vector particles..." },
    { pct: 24, text: "CALC: Constructing coordinate tracker arrays..." },
    { pct: 32, text: "CALC: Resolving algebraic logic states..." },
    { pct: 40, text: "CALC: Deriving definite integrals..." },
    { pct: 48, text: "SYS: Synchronizing theme parameters..." },
    { pct: 56, text: "LNK: Fetching YouTube lecture streams..." },
    { pct: 64, text: "LNK: Caching Instagram community feeds..." },
    { pct: 72, text: "MATH: Loading classes 6th to 12th math models..." },
    { pct: 80, text: "MATH: Fetching IIT-JEE & NEET Vanguard prep modules..." },
    { pct: 88, text: "SYS: Booting Ashutosh Sir's Logic-First engine..." },
    { pct: 95, text: "SYS: All optimization sequences complete..." },
    { pct: 99, text: "SYS: Boot sequence successful." }
];

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const { theme } = useTheme();
    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const logoRef = useRef(null);
    const canvasRef = useRef(null);

    // Determine target theme dynamically
    const isDarkTheme = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    useEffect(() => {
        let timeoutId;
        let start = 0;

        const triggerExitAnimation = () => {
            const tl = gsap.timeline({
                onComplete: onComplete
            });

            tl.to(cardRef.current, {
                scale: 0.9,
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut"
            })
            .to(containerRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: "power4.inOut"
            }, "-=0.2");
        };

        const updateProgress = () => {
            if (start >= 100) {
                triggerExitAnimation();
                return;
            }

            // Variable increments for realism (speed up increments)
            let increment = 1;
            if (start < 30) {
                increment = Math.floor(Math.random() * 4) + 2; // 2-5
            } else if (start >= 30 && start < 70) {
                increment = Math.floor(Math.random() * 3) + 2; // 2-4
            } else if (start >= 70 && start < 90) {
                increment = Math.random() > 0.5 ? 2 : 1; // 1-2
            } else {
                increment = Math.floor(Math.random() * 4) + 3; // 3-6
            }

            start = Math.min(100, start + increment);
            setProgress(start);

            // Variable delay to simulate computation heavy stages (reduced delays)
            let delay = 20;
            if (start > 70 && start < 90) {
                delay = Math.floor(Math.random() * 50) + 25; // 25-75ms for compilation simulation
            } else {
                delay = Math.floor(Math.random() * 15) + 8; // 8-23ms for normal progression
            }

            timeoutId = setTimeout(updateProgress, delay);
        };

        timeoutId = setTimeout(updateProgress, 100);

        return () => clearTimeout(timeoutId);
    }, [onComplete]);

    // Canvas Mathematical Constellation Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const particleCount = 30;
        const particles = [];
        const symbols = ["π", "√", "Σ", "∫", "Δ", "∞", "∂", "ϕ", "e", "θ", "λ", "ƒ", "log", "dy/dx"];

        // Setup theme colors for particles
        const colorPrimary = isDarkTheme ? 'rgba(99, 102, 241, 0.12)' : 'rgba(79, 70, 229, 0.08)';
        const textColor = isDarkTheme ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.06)';
        const lineColor = isDarkTheme ? 'rgba(255, 255, 255, 0.03)' : 'rgba(15, 23, 42, 0.02)';

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.7,
                vy: (Math.random() - 0.5) * 0.7,
                size: Math.random() * 2 + 1,
                symbol: symbols[i % symbols.length],
                useSymbol: Math.random() > 0.45,
                scale: Math.random() * 0.7 + 0.5
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw line connections
            for (let i = 0; i < particleCount; i++) {
                for (let j = i + 1; j < particleCount; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 140) {
                        ctx.beginPath();
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = (1 - dist / 140) * 0.7;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw symbols & nodes
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                if (p.useSymbol) {
                    ctx.save();
                    ctx.font = `${Math.floor(13 * p.scale)}px 'Space Grotesk', sans-serif`;
                    ctx.fillStyle = textColor;
                    ctx.fillText(p.symbol, p.x, p.y);
                    ctx.restore();
                } else {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = colorPrimary;
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDarkTheme]);

    // Active log scrolling
    const activeLogs = loadingLogs.filter(log => progress >= log.pct).slice(-4);
    const consoleBg = isDarkTheme ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.03)';

    return (
        <div ref={containerRef} style={styles.container}>
            <style>{`
                @keyframes logoPulse {
                    0% { transform: scale(1); filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.15)); }
                    50% { transform: scale(1.02); filter: drop-shadow(0 0 25px rgba(236, 72, 153, 0.25)); }
                    100% { transform: scale(1); filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.15)); }
                }
                @keyframes borderGlow {
                    0%, 100% { border-color: var(--glass-border); }
                    50% { border-color: rgba(99, 102, 241, 0.45); }
                }
                @keyframes barScan {
                    0% { left: -30%; }
                    100% { left: 130%; }
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
                .logo-pulse-container {
                    animation: logoPulse 3s infinite ease-in-out;
                }
                .glass-card-glow {
                    animation: borderGlow 4s infinite ease-in-out;
                }
                .scan-line::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    width: 30%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                    animation: barScan 2s infinite linear;
                }
            `}</style>
            
            <canvas ref={canvasRef} style={styles.canvas} />

            <div ref={cardRef} className="glass-card-glow" style={styles.card}>
                {/* LOGO */}
                <div ref={logoRef} className="logo-pulse-container" style={styles.logoWrapper}>
                    <img 
                        src={logoImg} 
                        alt="Mathematic Zone Logo" 
                        className="logo-theme-behavior" 
                        style={{ height: '90px', width: 'auto', margin: '-20px 0', display: 'block' }} 
                    />
                </div>

                {/* PROGRESS COUNTER */}
                <div style={styles.counterRow}>
                    <span style={styles.systemText}>BOOT_SEQUENCE</span>
                    <span className="title-gradient" style={styles.percentText}>{progress}%</span>
                </div>

                {/* PROGRESS BAR */}
                <div style={styles.progressBarWrapper}>
                    <div className="scan-line" style={{ ...styles.progressBar, width: `${progress}%` }} />
                </div>

                {/* CONSOLE TERMINAL */}
                <div style={{ ...styles.consoleWrapper, background: consoleBg }}>
                    {activeLogs.map((log, index) => {
                        const isLatest = progress >= log.pct && (index === activeLogs.length - 1);
                        const isSuccess = progress === 100 || !isLatest;
                        return (
                            <div key={log.pct} style={styles.consoleLine}>
                                <span style={styles.lineNum}>{String(loadingLogs.indexOf(log) + 1).padStart(2, '0')}</span>
                                <span style={{
                                    ...styles.lineStatus,
                                    color: isSuccess ? '#10b981' : '#f59e0b',
                                    animation: isSuccess ? 'none' : 'blink 1.2s infinite ease-in-out'
                                }}>
                                    {isSuccess ? '✓' : '●'}
                                </span>
                                <span style={{
                                    ...styles.lineText,
                                    color: isSuccess ? 'var(--text-secondary)' : 'var(--text-primary)',
                                    fontWeight: isSuccess ? 'normal' : 'bold'
                                }}>
                                    {log.text}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'var(--bg-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        overflow: 'hidden',
        transition: 'background 0.3s ease'
    },
    canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
    },
    card: {
        width: '100%',
        maxWidth: '460px',
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '24px',
        padding: '2.5rem',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.8rem',
        zIndex: 10,
        transition: 'background-color 0.3s, border-color 0.3s'
    },
    logoWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100px',
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',
        transition: 'background-color 0.3s, border-color 0.3s'
    },
    counterRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%'
    },
    systemText: {
        fontSize: '0.75rem',
        fontWeight: '800',
        color: 'var(--text-secondary)',
        letterSpacing: '2px',
        fontFamily: 'monospace'
    },
    percentText: {
        fontSize: '2.8rem',
        fontWeight: '900',
        fontFamily: "'Space Grotesk', sans-serif",
        lineHeight: 1
    },
    progressBarWrapper: {
        width: '100%',
        height: '6px',
        background: 'var(--glass-border)',
        borderRadius: '999px',
        overflow: 'hidden',
        position: 'relative'
    },
    progressBar: {
        height: '100%',
        background: 'var(--accent-gradient)',
        borderRadius: '999px',
        transition: 'width 0.15s linear',
        boxShadow: '0 0 10px var(--accent-1)',
        position: 'relative',
        overflow: 'hidden'
    },
    consoleWrapper: {
        width: '100%',
        border: '1px solid var(--glass-border)',
        borderRadius: '12px',
        padding: '1.2rem',
        height: '125px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        textAlign: 'left',
        transition: 'background-color 0.3s, border-color 0.3s'
    },
    consoleLine: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontFamily: 'monospace',
        fontSize: '0.8rem',
        lineHeight: 1.4
    },
    lineNum: {
        color: 'var(--text-secondary)',
        opacity: 0.4,
        userSelect: 'none',
        width: '15px'
    },
    lineStatus: {
        fontWeight: 'bold',
        userSelect: 'none'
    },
    lineText: {
        fontFamily: 'monospace',
        letterSpacing: '0.5px'
    }
};

export default Preloader;
