// Harmonic Resonance System
// Note: cosmic-constants.js must be loaded first for COSMIC_CONSTANTS

// Legacy constants for backward compatibility
const PHI = COSMIC_CONSTANTS.φ;
const TAU = COSMIC_CONSTANTS.τ;
const E = COSMIC_CONSTANTS.e;
const PLANCK = 6.62607015e-34; // Quantum constant

// Sacred geometry patterns using universal constants
const SACRED_ANGLES = {
    triangle: UNIVERSAL_MATH.sacredAngle(3),
    square: UNIVERSAL_MATH.sacredAngle(4),
    pentagon: UNIVERSAL_MATH.sacredAngle(5),
    hexagon: UNIVERSAL_MATH.sacredAngle(6),
    octagon: UNIVERSAL_MATH.sacredAngle(8)
};

// Use universal math functions
const fibonacci = UNIVERSAL_MATH.fibonacciSequence;
const isPrime = UNIVERSAL_MATH.isPrime;

// Enhanced harmonic frequency using cosmic constants
function harmonicFrequency(base, n) {
    return base * Math.pow(COSMIC_CONSTANTS.φ, n);
}

// Cross-realm portal system
const REALM_CONNECTIONS = {
    mathematics: {
        cosmos: ['infinity', 'pi', 'euler'],
        glyphs: ['sacred-geometry', 'golden-ratio'],
        circuits: ['binary', 'logic-gates']
    },
    cosmos: {
        mathematics: ['constants', 'infinity'],
        glyphs: ['constellations', 'celestial'],
        circuits: ['quantum', 'frequency']
    },
    glyphs: {
        mathematics: ['geometry', 'golden'],
        cosmos: ['stars', 'void'],
        circuits: ['symbols', 'ancient-tech']
    },
    circuits: {
        mathematics: ['binary', 'logic'],
        cosmos: ['quantum', 'energy'],
        glyphs: ['runes', 'digital-sigils']
    }
};

// Hidden navigation paths based on mathematical relationships
function initHiddenPaths() {
    const currentPath = window.location.pathname;
    const realm = currentPath.includes('/realms/') ? currentPath.split('/')[2] : 'portal';
    
    // Set realm-specific konami code variations
    const realmModifier = realm === 'mathematics' ? 2 : realm === 'cosmos' ? 3 : 1;
    
    // Create Konami code sequence for secret navigation
    let konamiSequence = [];
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                       'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiSequence.push(e.key);
        konamiSequence = konamiSequence.slice(-10);
        
        if (konamiSequence.join(',') === konamiCode.join(',')) {
            activateHiddenPortal(realmModifier);
        }
    });
    
    // Fibonacci click sequence portal
    let clickTimes = [];
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('symbol')) {
            clickTimes.push(Date.now());
            checkFibonacciSequence(clickTimes);
        }
    });
}

// Check if click intervals follow Fibonacci sequence
function checkFibonacciSequence(times) {
    if (times.length < 4) return;
    
    const intervals = [];
    for (let i = 1; i < times.length; i++) {
        intervals.push(times[i] - times[i-1]);
    }
    
    const recentIntervals = intervals.slice(-3);
    const ratios = [];
    for (let i = 1; i < recentIntervals.length; i++) {
        ratios.push(recentIntervals[i] / recentIntervals[i-1]);
    }
    
    // Check if ratios approximate golden ratio
    const avgRatio = ratios.reduce((a, b) => a + b) / ratios.length;
    if (Math.abs(avgRatio - PHI) < 0.2) {
        createGoldenPortal();
    }
}

// Activate hidden portal with visual effect
function activateHiddenPortal() {
    const portal = document.createElement('div');
    portal.className = 'hidden-portal';
    portal.innerHTML = `
        <div class="portal-animation">
            <pre>
     ◊ ◊ ◊
    ╱     ╲
   │   ∞   │
    ╲     ╱
     ◊ ◊ ◊
            </pre>
        </div>
    `;
    document.body.appendChild(portal);
    
    setTimeout(() => {
        window.location.href = '/realms/hidden/quantum-realm.html';
    }, 2000);
}

// Create golden ratio portal
function createGoldenPortal() {
    const symbols = document.querySelectorAll('.symbol');
    symbols.forEach((symbol, i) => {
        setTimeout(() => {
            symbol.style.transform = `rotate(${i * SACRED_ANGLES.pentagon}rad) scale(${PHI})`;
            symbol.style.transition = `transform ${PHI}s ease-in-out`;
        }, i * 100);
    });
}

// Harmonic animations based on mathematical curves
function harmonicAnimation(element, type = 'sine') {
    let time = 0;
    const animate = () => {
        time += 0.01;
        
        switch(type) {
            case 'sine':
                element.style.transform = `translateY(${Math.sin(time) * 10}px)`;
                break;
            case 'lissajous':
                const x = Math.sin(time * 3) * 20;
                const y = Math.sin(time * 2) * 20;
                element.style.transform = `translate(${x}px, ${y}px)`;
                break;
            case 'spiral':
                const r = time * 2;
                const theta = time * PHI;
                const spiralX = r * Math.cos(theta);
                const spiralY = r * Math.sin(theta);
                element.style.transform = `translate(${spiralX}px, ${spiralY}px)`;
                break;
            case 'quantum':
                // Quantum probability wave
                const prob = Math.sin(time) * Math.cos(time * PHI);
                element.style.opacity = Math.abs(prob);
                break;
        }
        
        requestAnimationFrame(animate);
    };
    animate();
}

// Mathematical easter eggs
function initMathEasterEggs() {
    // Pi day easter egg (3.14)
    const now = new Date();
    if (now.getMonth() === 2 && now.getDate() === 14) {
        document.body.classList.add('pi-day');
        createPiSpiral();
    }
    
    // Prime number highlighting
    const numbers = document.body.innerText.match(/\d+/g);
    if (numbers) {
        numbers.forEach(num => {
            if (isPrime(parseInt(num))) {
                highlightPrime(num);
            }
        });
    }
    
    // Golden ratio detector in dimensions
    checkGoldenRatioDimensions();
}

// Create Pi spiral visualization
function createPiSpiral() {
    const piDigits = '31415926535897932384626433832795028841971693993751';
    const spiral = document.createElement('div');
    spiral.className = 'pi-spiral';
    
    piDigits.split('').forEach((digit, i) => {
        const span = document.createElement('span');
        span.textContent = digit;
        span.style.position = 'absolute';
        const angle = i * 0.1;
        const radius = i * 2;
        span.style.left = `${50 + radius * Math.cos(angle)}%`;
        span.style.top = `${50 + radius * Math.sin(angle)}%`;
        span.style.transform = `rotate(${angle}rad)`;
        spiral.appendChild(span);
    });
    
    document.body.appendChild(spiral);
}

// Highlight prime numbers with special effect
function highlightPrime(num) {
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
        if (el.textContent.includes(num) && el.children.length === 0) {
            el.innerHTML = el.innerHTML.replace(
                new RegExp(`\\b${num}\\b`, 'g'),
                `<span class="prime-number" data-prime="${num}">${num}</span>`
            );
        }
    });
}

// Check if viewport dimensions follow golden ratio
function checkGoldenRatioDimensions() {
    const ratio = window.innerWidth / window.innerHeight;
    if (Math.abs(ratio - PHI) < 0.1) {
        document.body.classList.add('golden-viewport');
        createGoldenGrid();
    }
}

// Create golden ratio grid overlay
function createGoldenGrid() {
    const grid = document.createElement('div');
    grid.className = 'golden-grid';
    grid.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        opacity: 0.1;
    `;
    
    // Create golden rectangles
    const goldenRect = (x, y, w, h, depth = 5) => {
        if (depth === 0) return;
        
        const rect = document.createElement('div');
        rect.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${w}%;
            height: ${h}%;
            border: 1px solid gold;
        `;
        grid.appendChild(rect);
        
        // Recursive golden rectangles
        if (w > h) {
            goldenRect(x + h, y, w - h, h, depth - 1);
        } else {
            goldenRect(x, y + w, w, h - w, depth - 1);
        }
    };
    
    goldenRect(0, 0, 100, 100/PHI);
    document.body.appendChild(grid);
}

// Resonance between elements
function createResonance(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    
    const distance = Math.sqrt(
        Math.pow(rect2.left - rect1.left, 2) + 
        Math.pow(rect2.top - rect1.top, 2)
    );
    
    // Create resonance line
    const line = document.createElement('div');
    line.className = 'resonance-line';
    line.style.cssText = `
        position: fixed;
        height: 1px;
        background: linear-gradient(90deg, transparent, white, transparent);
        transform-origin: left center;
        pointer-events: none;
        opacity: ${1 / (distance / 100)};
    `;
    
    const angle = Math.atan2(rect2.top - rect1.top, rect2.left - rect1.left);
    line.style.width = `${distance}px`;
    line.style.left = `${rect1.left + rect1.width/2}px`;
    line.style.top = `${rect1.top + rect1.height/2}px`;
    line.style.transform = `rotate(${angle}rad)`;
    
    document.body.appendChild(line);
    
    // Pulse animation
    line.animate([
        { opacity: 0 },
        { opacity: 1 / (distance / 100) },
        { opacity: 0 }
    ], {
        duration: distance * 10,
        iterations: Infinity
    });
}

// Initialize harmonic system
function initHarmonics() {
    initHiddenPaths();
    initMathEasterEggs();
    
    // Apply harmonic animations to symbols
    document.querySelectorAll('.symbol').forEach((symbol, i) => {
        const animTypes = ['sine', 'lissajous', 'spiral', 'quantum'];
        harmonicAnimation(symbol, animTypes[i % animTypes.length]);
    });
    
    // Create resonance between connected elements
    const symbols = document.querySelectorAll('.symbol');
    for (let i = 0; i < symbols.length - 1; i++) {
        if (Math.random() > 0.7) {
            createResonance(symbols[i], symbols[i + 1]);
        }
    }
    
    // Sacred geometry hover effects
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Update CSS variables for dynamic effects
        document.documentElement.style.setProperty('--mouse-x', x);
        document.documentElement.style.setProperty('--mouse-y', y);
        document.documentElement.style.setProperty('--harmonic', Math.sin(x * TAU) * Math.cos(y * TAU));
    });
}

// Highlight prime numbers
function highlightPrime(num) {
    const regex = new RegExp(`\\b${num}\\b`, 'g');
    document.body.innerHTML = document.body.innerHTML.replace(regex, 
        `<span class="prime-glow">${num}</span>`);
}

// Export functions (using universal constants)
window.harmonics = {
    init: initHarmonics,
    PHI: COSMIC_CONSTANTS.φ,
    TAU: COSMIC_CONSTANTS.τ,
    fibonacci: UNIVERSAL_MATH.fibonacci,
    fibonacciSequence: UNIVERSAL_MATH.fibonacciSequence,
    isPrime: UNIVERSAL_MATH.isPrime,
    harmonicFrequency,
    createResonance,
    COSMIC_CONSTANTS,
    UNIVERSAL_MATH
};