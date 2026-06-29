import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import anime from 'animejs';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        let isHovering = false;

        // Movement handler
        const onMouseMove = (e) => {
            // Small dot cursor instantly follows
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

            // Animated trailing cursor
            anime({
                targets: follower,
                translateX: e.clientX,
                translateY: e.clientY,
                duration: 300,
                easing: 'easeOutQuart',
                scale: isHovering ? 2.5 : 1,
                opacity: isHovering ? 0.3 : 1
            });
        };

        // Hover effect for interactive elements
        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName.toLowerCase() === 'button' ||
                target.tagName.toLowerCase() === 'a' ||
                target.closest('button') ||
                target.closest('a') ||
                target.getAttribute('role') === 'button' ||
                target.classList.contains('interactive')
            ) {
                isHovering = true;
                cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(0)`;
            } else {
                isHovering = false;
                cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
            }
        };

        // Add listeners
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return createPortal(
        <div className="custom-cursor">
            <div
                ref={followerRef}
                style={styles.follower}
            />
            <div
                ref={cursorRef}
                style={styles.dot}
            />
        </div>,
        document.body
    );
};

const styles = {
    dot: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '8px',
        height: '8px',
        backgroundColor: 'var(--text-primary)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999999,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.1s ease',
        marginLeft: '-4px',
        marginTop: '-4px'
    },
    follower: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '40px',
        height: '40px',
        border: '2px solid var(--accent-1)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999998,
        marginLeft: '-20px',
        marginTop: '-20px',
        boxShadow: '0 0 15px var(--accent-1)'
    }
};

export default CustomCursor;
