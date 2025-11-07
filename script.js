// Custom cursor glow effect
document.addEventListener('mousemove', (e) => {
    const glow = document.querySelector('.cursor-glow');
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// Typing animation for terminal
const commands = [
    'initializing AI workflow...',
    'loading development tools...',
    'optimizing performance...',
    'ready to ship 🚀'
];

let commandIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextElement = document.getElementById('typed-text');
const typingSpeed = 80;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeCommand() {
    const currentCommand = commands[commandIndex];

    if (!isDeleting && charIndex <= currentCommand.length) {
        typedTextElement.textContent = currentCommand.substring(0, charIndex);
        charIndex++;
        setTimeout(typeCommand, typingSpeed);
    } else if (isDeleting && charIndex >= 0) {
        typedTextElement.textContent = currentCommand.substring(0, charIndex);
        charIndex--;
        setTimeout(typeCommand, deletingSpeed);
    } else if (!isDeleting && charIndex > currentCommand.length) {
        isDeleting = true;
        setTimeout(typeCommand, pauseTime);
    } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        commandIndex = (commandIndex + 1) % commands.length;
        setTimeout(typeCommand, 500);
    }
}

// Start typing animation
setTimeout(typeCommand, 1000);

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active nav link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNav() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--primary)';
        }
    });
}

window.addEventListener('scroll', highlightNav);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 800;
    }
});

// Project cards animation on scroll
const projectCards = document.querySelectorAll('.project-card');

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1
});

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-50px)';
    card.style.transition = 'all 0.6s ease';
    projectObserver.observe(card);
});

// Stats counter animation
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            if (element.textContent.includes('x')) {
                element.textContent = Math.ceil(start) + 'x';
            } else if (element.textContent.includes('%')) {
                element.textContent = Math.ceil(start) + '%';
            } else {
                element.textContent = Math.ceil(start);
            }
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = element.dataset.target;
        }
    }

    updateCounter();
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('counted')) {
                statNumber.classList.add('counted');
                const text = statNumber.textContent;
                statNumber.dataset.target = text;

                if (text.includes('x')) {
                    animateCounter(statNumber, parseInt(text), 2000);
                } else if (text.includes('%')) {
                    animateCounter(statNumber, parseInt(text), 2000);
                } else if (text.includes('/')) {
                    // Keep as is for "24/7"
                    return;
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// Contact cards hover effect with 3D tilt
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Add random code snippets floating effect (easter egg)
function createFloatingCode() {
    const codeSnippets = [
        'const ai = async () => {}',
        'npm install future',
        'git commit -m "ship it"',
        'function innovate(){}',
        'import { AI } from "tools"',
        '10x.productivity()'
    ];

    const snippet = document.createElement('div');
    snippet.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    snippet.style.cssText = `
        position: fixed;
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        color: rgba(0, 255, 136, 0.3);
        pointer-events: none;
        z-index: 0;
        left: ${Math.random() * 100}vw;
        top: -50px;
        animation: float-up 15s linear forwards;
    `;

    document.body.appendChild(snippet);

    setTimeout(() => {
        snippet.remove();
    }, 15000);
}

// Add floating code animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create floating code occasionally
setInterval(createFloatingCode, 5000);

// Terminal window drag effect (fake draggable)
const terminal = document.querySelector('.terminal-window');
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;

if (terminal) {
    terminal.querySelector('.terminal-header').addEventListener('mousedown', (e) => {
        isDragging = true;
        initialX = e.clientX - terminal.offsetLeft;
        initialY = e.clientY - terminal.offsetTop;
        terminal.style.position = 'fixed';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            terminal.style.left = currentX + 'px';
            terminal.style.top = currentY + 'px';
            terminal.style.right = 'auto';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// Add glitch effect to logo on hover
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('mouseenter', () => {
        let iterations = 0;
        const interval = setInterval(() => {
            logo.textContent = logo.textContent
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return logo.dataset.text[index];
                    }
                    return String.fromCharCode(33 + Math.floor(Math.random() * 94));
                })
                .join('');

            iterations += 1/3;

            if (iterations >= logo.dataset.text.length) {
                clearInterval(interval);
                logo.textContent = logo.dataset.text;
            }
        }, 30);
    });
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 2s linear infinite';

        const easterEgg = document.createElement('div');
        easterEgg.textContent = '🚀 HYPERDRIVE ACTIVATED 🚀';
        easterEgg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            font-family: 'JetBrains Mono', monospace;
            color: var(--primary);
            z-index: 10000;
            animation: pulse 1s ease-in-out infinite;
        `;
        document.body.appendChild(easterEgg);

        setTimeout(() => {
            easterEgg.remove();
            document.body.style.animation = '';
        }, 3000);
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }

    @keyframes pulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
    }
`;
document.head.appendChild(rainbowStyle);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll handlers
window.addEventListener('scroll', throttle(highlightNav, 100));

// Preload animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading state
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
