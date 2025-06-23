// Living ASCII Animation Controller
// Breathing, resonating ASCII art with mathematical timing

class LivingASCII {
    constructor() {
        this.animations = new Map();
        this.goldenRatio = 1.618;
        this.pi = Math.PI;
        this.isActive = true;
        this.performanceMode = this.detectPerformanceMode();
        this.init();
    }
    
    detectPerformanceMode() {
        // Detect device capabilities
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const lowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (isMobile || lowMemory || reducedMotion) {
            document.body.classList.add('reduced-animations');
            return 'minimal';
        }
        
        return 'full';
    }
    
    init() {
        if (this.performanceMode === 'minimal') {
            // Only basic animations on low-performance devices
            this.enhanceBorders();
            return;
        }
        
        this.setupMathematicalTiming();
        this.createDynamicWaveforms();
        this.enhanceStaticElements();
        this.setupInteractiveResonance();
    }
    
    setupMathematicalTiming() {
        // Apply delays based on mathematical sequences
        const fibSequence = [1, 1, 2, 3, 5, 8, 13, 21];
        
        document.querySelectorAll('.wave-char').forEach((char, i) => {
            const delay = (fibSequence[i % fibSequence.length] * 100) + 'ms';
            char.style.animationDelay = delay;
        });
        
        document.querySelectorAll('.cymatics-node').forEach((node, i) => {
            const angle = (i * 2 * this.pi) / this.goldenRatio;
            const delay = Math.sin(angle) * 500 + 500; // 0-1000ms range
            node.style.animationDelay = delay + 'ms';
        });
        
        document.querySelectorAll('.constellation-node').forEach((node, i) => {
            const goldenDelay = (i * this.goldenRatio * 200) % 2000;
            node.style.animationDelay = goldenDelay + 'ms';
        });
    }
    
    createDynamicWaveforms() {
        // Only enhance waveforms that don't already have .wave-char elements
        const waveElements = document.querySelectorAll('#main-wave:not(.waveform-enhanced), .live-waveform:not(.waveform-enhanced)');
        
        waveElements.forEach(element => {
            element.classList.add('waveform-enhanced');
            // Use CSS animations instead of JavaScript for better performance
        });
    }
    
    enhanceStaticElements() {
        // Convert static ASCII to living elements
        this.enhanceBorders();
        this.enhanceSymbols();
        this.enhanceGeometry();
    }
    
    enhanceBorders() {
        const borders = document.querySelectorAll('.border, .ascii-art');
        borders.forEach(border => {
            if (!border.classList.contains('breathing-border')) {
                border.classList.add('breathing-border');
            }
        });
    }
    
    enhanceSymbols() {
        // Only enhance symbols that aren't already enhanced
        const unenhancedElements = document.querySelectorAll('*:not(.enhanced)');
        
        unenhancedElements.forEach(element => {
            if (element.children.length === 0 && element.textContent.trim()) {
                let html = element.innerHTML;
                let hasChanges = false;
                
                // Only enhance if not already enhanced
                if (!html.includes('<span class=')) {
                    const mathSymbols = ['∞', 'π', 'φ'];
                    const sacredSymbols = ['☥', 'ॐ', '☯'];
                    
                    mathSymbols.forEach(symbol => {
                        if (html.includes(symbol)) {
                            const regex = new RegExp(`(?<!<[^>]*>${symbol})${symbol}(?![^<]*>)`, 'g');
                            html = html.replace(regex, `<span class="infinity-flow">${symbol}</span>`);
                            hasChanges = true;
                        }
                    });
                    
                    sacredSymbols.forEach(symbol => {
                        if (html.includes(symbol)) {
                            const regex = new RegExp(`(?<!<[^>]*>${symbol})${symbol}(?![^<]*>)`, 'g');
                            html = html.replace(regex, `<span class="sacred-pulse">${symbol}</span>`);
                            hasChanges = true;
                        }
                    });
                    
                    if (hasChanges) {
                        element.innerHTML = html;
                        element.classList.add('enhanced');
                    }
                }
            }
        });
    }
    
    enhanceGeometry() {
        // Add rotation to geometric patterns
        const geometricElements = document.querySelectorAll('[class*="portal"], .center-nexus');
        geometricElements.forEach(element => {
            if (!element.classList.contains('golden-rotate')) {
                // Add subtle breathing to portals
                element.classList.add('portal-energy');
            }
        });
    }
    
    setupInteractiveResonance() {
        // Throttled mouse proximity effects for performance
        let mouseTimeout;
        this.throttledMouseMove = (e) => {
            if (mouseTimeout) return;
            mouseTimeout = setTimeout(() => {
                this.createProximityResonance(e.clientX, e.clientY);
                mouseTimeout = null;
            }, 50); // Throttle to 20fps
        };
        
        // Click creates harmonic burst (limited frequency)
        let lastClick = 0;
        this.throttledClick = (e) => {
            const now = Date.now();
            if (now - lastClick > 500) { // Limit to once per 500ms
                this.createHarmonicBurst(e.clientX, e.clientY);
                lastClick = now;
            }
        };
        
        // Store references for cleanup
        document.addEventListener('mousemove', this.throttledMouseMove);
        document.addEventListener('click', this.throttledClick);
    }
    
    createProximityResonance(mouseX, mouseY) {
        // Viewport-aware proximity calculation
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const maxDistance = Math.min(viewportWidth, viewportHeight) * 0.15; // 15% of smaller viewport dimension
        
        // Limit to closest elements for performance
        const elements = Array.from(document.querySelectorAll('.wave-char, .cymatics-node, .constellation-node'))
            .slice(0, 8);
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
            );
            
            if (distance < maxDistance) {
                const intensity = 1 - (distance / maxDistance);
                const scale = 1 + intensity * 0.08; // Reduced scale effect
                
                element.style.transform = `scale(${scale})`;
                element.style.transition = 'all 0.2s ease-out';
            } else {
                element.style.transform = '';
            }
        });
    }
    
    createHarmonicBurst(x, y) {
        // Viewport-aware burst
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const burstRadius = Math.min(viewportWidth, viewportHeight) * 0.05; // 5% of smaller dimension
        
        const burst = document.createElement('div');
        burst.className = 'harmonic-burst';
        burst.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 1000;
            font-family: monospace;
            color: white;
            transform: translate(-50%, -50%);
        `;
        
        // Only 4 particles for performance
        const symbols = ['◊', '○', '●', '△'];
        const pattern = symbols[Math.floor(Math.random() * symbols.length)];
        
        for (let i = 0; i < 4; i++) {
            const particle = document.createElement('span');
            particle.textContent = pattern;
            particle.style.cssText = `
                position: absolute;
                left: 0;
                top: 0;
                animation: harmonic-burst 0.8s ease-out forwards;
            `;
            
            const angle = (i / 4) * 2 * Math.PI;
            
            particle.style.setProperty('--end-x', Math.cos(angle) * burstRadius + 'px');
            particle.style.setProperty('--end-y', Math.sin(angle) * burstRadius + 'px');
            
            burst.appendChild(particle);
        }
        
        document.body.appendChild(burst);
        
        setTimeout(() => burst.remove(), 800);
    }
    
    // Fibonacci spiral ASCII generation
    generateFibonacciSpiral(size = 20) {
        const spiral = [];
        const center = Math.floor(size / 2);
        
        for (let y = 0; y < size; y++) {
            spiral[y] = new Array(size).fill(' ');
        }
        
        let x = center, y = center;
        let dx = 0, dy = -1;
        
        const fibSeq = this.generateFibonacci(20);
        
        for (let i = 0; i < fibSeq.length; i++) {
            const steps = fibSeq[i];
            for (let step = 0; step < steps && x >= 0 && x < size && y >= 0 && y < size; step++) {
                spiral[y][x] = '●';
                x += dx;
                y += dy;
            }
            
            // Spiral direction change
            if (dx === 0 && dy === -1) { dx = 1; dy = 0; }
            else if (dx === 1 && dy === 0) { dx = 0; dy = 1; }
            else if (dx === 0 && dy === 1) { dx = -1; dy = 0; }
            else if (dx === -1 && dy === 0) { dx = 0; dy = -1; }
        }
        
        return spiral.map(row => row.join('')).join('\n');
    }
    
    generateFibonacci(n) {
        const fib = [1, 1];
        for (let i = 2; i < n; i++) {
            fib[i] = fib[i-1] + fib[i-2];
        }
        return fib;
    }
    
    // Pause/resume animations
    pause() {
        this.isActive = false;
        document.body.style.animationPlayState = 'paused';
    }
    
    resume() {
        this.isActive = true;
        document.body.style.animationPlayState = 'running';
    }
    
    // Disable all animations for emergency performance
    disableAll() {
        document.body.classList.add('no-animations');
        this.isActive = false;
        
        // Cancel any active performance monitoring
        if (this.performanceAnimationId) {
            cancelAnimationFrame(this.performanceAnimationId);
            this.performanceAnimationId = null;
        }
        
        // Clear any active timeouts/intervals
        this.cleanup();
    }
    
    // Cleanup method for proper resource management
    cleanup() {
        // Clear animation references
        this.animations.clear();
        
        // Remove event listeners to prevent memory leaks
        document.removeEventListener('mousemove', this.throttledMouseMove);
        document.removeEventListener('click', this.throttledClick);
        
        // Cancel any pending animation frames
        if (this.performanceAnimationId) {
            cancelAnimationFrame(this.performanceAnimationId);
        }
    }
    
    // Performance monitoring
    monitorPerformance() {
        let frameCount = 0;
        let lastTime = performance.now();
        let animationId = null;
        
        const checkFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                if (fps < 20) {
                    console.log('⌚ ↓ → ∅');
                    this.disableAll();
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                        animationId = null;
                    }
                    return; // Stop monitoring
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            if (this.isActive) {
                animationId = requestAnimationFrame(checkFPS);
            }
        };
        
        if (this.performanceMode === 'full') {
            animationId = requestAnimationFrame(checkFPS);
        }
        
        // Store reference for cleanup
        this.performanceAnimationId = animationId;
    }
}

// Add harmonic burst animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes harmonic-burst {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--end-x), var(--end-y)) scale(0.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.livingASCII = new LivingASCII();
        // Start performance monitoring after a delay
        setTimeout(() => {
            window.livingASCII.monitorPerformance();
        }, 2000);
    });
} else {
    window.livingASCII = new LivingASCII();
    setTimeout(() => {
        window.livingASCII.monitorPerformance();
    }, 2000);
}

// Export for other modules
window.LivingASCII = LivingASCII;