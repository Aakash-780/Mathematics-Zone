import { useEffect, useRef } from 'react';
import anime from 'animejs';

const symbols = ['π', '∫', '∞', '∑', '√', 'θ', 'Δ', '≈', 'f(x)', '±', '∈', '∂'];

const MathParticles = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        // Create elements dynamically and add styles
        const particlesCount = 25;

        for (let i = 0; i < particlesCount; i++) {
            const particle = document.createElement('div');
            particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];

            // Random starting size inside style
            const size = Math.random() * 2 + 1; // 1rem to 3rem
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;

            particle.style.position = 'absolute';
            particle.style.left = `${startX}px`;
            particle.style.top = `${startY}px`;
            particle.style.fontSize = `${size}rem`;
            particle.style.color = 'var(--particle-color)';
            particle.style.fontWeight = 'bold';
            particle.style.userSelect = 'none';
            particle.style.pointerEvents = 'none';
            particle.className = 'math-particle';

            container.appendChild(particle);
        }

        // Animate all elements continuously
        anime({
            targets: '.math-particle',
            translateX: function () { return anime.random(-150, 150); },
            translateY: function () { return anime.random(-150, 150); },
            scale: function () { return anime.random(0.8, 1.2); },
            rotate: function () { return anime.random(-360, 360); },
            duration: function () { return anime.random(4000, 10000); },
            easing: 'easeInOutQuad',
            direction: 'alternate',
            loop: true
        });

        return () => {
            // Cleanup particles
            if (container) {
                container.innerHTML = '';
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                overflow: 'hidden',
                pointerEvents: 'none'
            }}
        />
    );
};

export default MathParticles;
