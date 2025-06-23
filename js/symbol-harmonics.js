// Symbol Harmonic Resonance System
// Universal language through mathematical relationships

// Use universal symbol harmonics from cosmic-constants.js
const SYMBOL_FREQUENCIES = SYMBOL_HARMONICS;

// Enhanced harmonic relationships using cosmic constants
const HARMONIC_RATIOS = {
    octave: 2,
    fifth: 3/2,
    fourth: 4/3,
    majorThird: 5/4,
    minorThird: 6/5,
    golden: COSMIC_CONSTANTS.φ,
    tau: COSMIC_CONSTANTS.τ,
    e: COSMIC_CONSTANTS.e,
    phi_squared: COSMIC_CONSTANTS.φ²
};

// Symbol combination discoveries
const SYMBOL_COMBINATIONS = new Map([
    ['☥+ॐ', { result: '∞', meaning: 'eternal consciousness' }],
    ['○+●', { result: '☯', meaning: 'unity of opposites' }],
    ['△+▽', { result: '✡', meaning: 'as above so below' }],
    ['∞+1', { result: '∞', meaning: 'infinite absorption' }],
    ['π+φ', { result: '⌘', meaning: 'mathematical command' }],
    ['☉+☽', { result: '☥', meaning: 'celestial life' }],
]);

// Cross-realm resonance patterns
class SymbolResonance {
    constructor() {
        this.activeResonances = new Map();
        this.discoveredCombinations = new Set();
        this.resonanceCanvas = null;
        this.audioContext = null;
        this.oscillators = new Map();
    }
    
    init() {
        this.setupResonanceVisualizer();
        this.initializeSymbolInteractions();
        this.createHarmonicField();
    }
    
    setupResonanceVisualizer() {
        // Create ASCII canvas for resonance patterns
        const visualizer = document.createElement('div');
        visualizer.className = 'resonance-visualizer';
        visualizer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 200px;
            height: 100px;
            font-family: monospace;
            font-size: 10px;
            color: rgba(255, 255, 255, 0.3);
            pointer-events: none;
            white-space: pre;
            line-height: 1;
        `;
        document.body.appendChild(visualizer);
        this.resonanceCanvas = visualizer;
        
        // Start visualization loop
        this.animateResonance();
    }
    
    animateResonance() {
        const width = 40;
        const height = 10;
        const time = Date.now() * 0.001;
        let ascii = '';
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const wave1 = Math.sin(x * 0.2 + time) * Math.cos(y * 0.3);
                const wave2 = Math.sin(x * 0.1 - time * 0.5) * Math.sin(y * 0.2);
                const combined = wave1 + wave2;
                
                // Convert to ASCII density
                const chars = ' .·:;+=xX#';
                const index = Math.floor((combined + 2) / 4 * chars.length);
                ascii += chars[Math.max(0, Math.min(index, chars.length - 1))];
            }
            ascii += '\n';
        }
        
        this.resonanceCanvas.textContent = ascii;
        requestAnimationFrame(() => this.animateResonance());
    }
    
    initializeSymbolInteractions() {
        // Track symbol proximity and interactions
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('symbol') || 
                e.target.classList.contains('nav-link') ||
                e.target.textContent.match(/[☥ॐ☯✡∑∏∞πφ☉☽✦◊○●△▽]/)) {
                this.activateSymbolResonance(e.target);
            }
        });
        
        // Symbol combination detection
        let symbolSequence = [];
        document.addEventListener('click', (e) => {
            const symbol = this.extractSymbol(e.target);
            if (symbol) {
                symbolSequence.push(symbol);
                this.checkCombination(symbolSequence);
                
                // Keep only last 3 symbols
                if (symbolSequence.length > 3) {
                    symbolSequence.shift();
                }
            }
        });
    }
    
    extractSymbol(element) {
        const text = element.textContent;
        const symbolMatch = text.match(/[☥ॐ☯✡∑∏∞πφ☉☽✦◊○●△▽⌘]/);
        return symbolMatch ? symbolMatch[0] : null;
    }
    
    activateSymbolResonance(element) {
        const symbol = this.extractSymbol(element);
        if (!symbol || !SYMBOL_FREQUENCIES[symbol]) return;
        
        const frequency = SYMBOL_FREQUENCIES[symbol];
        const rect = element.getBoundingClientRect();
        
        // Create visual resonance ripple
        this.createResonanceRipple(rect.left + rect.width/2, rect.top + rect.height/2, frequency);
        
        // Find harmonic symbols
        this.findHarmonicSymbols(symbol, frequency);
    }
    
    createResonanceRipple(x, y, frequency) {
        const ripple = document.createElement('div');
        ripple.className = 'resonance-ripple';
        ripple.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
        `;
        
        document.body.appendChild(ripple);
        
        // Animate ripple based on frequency
        const duration = 10000 / frequency;
        ripple.animate([
            { width: '0px', height: '0px', opacity: 1 },
            { width: '300px', height: '300px', opacity: 0 }
        ], {
            duration: duration,
            easing: 'ease-out'
        }).onfinish = () => ripple.remove();
    }
    
    findHarmonicSymbols(sourceSymbol, sourceFreq) {
        const harmonicSymbols = [];
        
        // Find symbols with harmonic frequency relationships
        Object.entries(SYMBOL_FREQUENCIES).forEach(([symbol, freq]) => {
            if (symbol === sourceSymbol) return;
            
            const ratio = freq / sourceFreq;
            
            // Check if ratio matches any harmonic interval
            Object.entries(HARMONIC_RATIOS).forEach(([interval, value]) => {
                if (Math.abs(ratio - value) < 0.05 || Math.abs(ratio - 1/value) < 0.05) {
                    harmonicSymbols.push({ symbol, interval, freq });
                }
            });
        });
        
        // Create resonance connections
        harmonicSymbols.forEach(({ symbol }) => {
            const elements = this.findSymbolElements(symbol);
            elements.forEach(el => {
                this.createResonanceLine(sourceSymbol, symbol, el);
            });
        });
    }
    
    findSymbolElements(symbol) {
        const elements = [];
        const allElements = document.querySelectorAll('*');
        
        allElements.forEach(el => {
            if (el.textContent === symbol || el.textContent.includes(symbol)) {
                elements.push(el);
            }
        });
        
        return elements;
    }
    
    createResonanceLine(symbol1, symbol2, targetElement) {
        const line = document.createElement('div');
        line.className = 'harmonic-connection';
        line.dataset.symbols = `${symbol1}-${symbol2}`;
        
        // ASCII line pattern based on symbol combination
        const pattern = this.getResonancePattern(symbol1, symbol2);
        line.textContent = pattern;
        
        line.style.cssText = `
            position: fixed;
            color: rgba(255, 255, 255, 0.2);
            font-family: monospace;
            pointer-events: none;
            white-space: nowrap;
            animation: harmonic-pulse 2s infinite;
        `;
        
        document.body.appendChild(line);
        
        // Position line
        const rect = targetElement.getBoundingClientRect();
        line.style.left = rect.left + 'px';
        line.style.top = rect.top + 'px';
        
        // Remove after animation
        setTimeout(() => line.remove(), 2000);
    }
    
    getResonancePattern(symbol1, symbol2) {
        // Use cosmic constants for pattern generation
        const φ = COSMIC_CONSTANTS.φ;
        const waveSymbols = ['∿', '≈', '∼', '～', '⋯'];
        
        // Mathematical pattern selection using golden ratio
        const charSum = symbol1.charCodeAt(0) + symbol2.charCodeAt(0);
        const goldenIndex = Math.floor((charSum / φ) % waveSymbols.length);
        const patternLength = Math.floor(φ * 3); // ~4.85, rounds to 5
        
        return waveSymbols[goldenIndex].repeat(patternLength);
    }
    
    checkCombination(sequence) {
        if (sequence.length < 2) return;
        
        const recent = sequence.slice(-2);
        const combo = recent.join('+');
        const reverseCombo = recent.reverse().join('+');
        
        let discovery = SYMBOL_COMBINATIONS.get(combo) || SYMBOL_COMBINATIONS.get(reverseCombo);
        
        if (discovery && !this.discoveredCombinations.has(combo)) {
            this.discoveredCombinations.add(combo);
            this.revealDiscovery(recent, discovery);
        }
    }
    
    revealDiscovery(symbols, discovery) {
        const revelation = document.createElement('div');
        revelation.className = 'symbol-revelation';
        revelation.innerHTML = `
            <div class="revelation-formula">
                ${symbols[0]} + ${symbols[1]} = ${discovery.result}
            </div>
            <div class="revelation-meaning">
                "${discovery.meaning}"
            </div>
        `;
        
        revelation.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            font-family: monospace;
            color: white;
            background: rgba(0, 0, 0, 0.9);
            padding: 20px;
            border: 1px solid white;
            z-index: 1000;
        `;
        
        document.body.appendChild(revelation);
        
        // Particle celebration
        this.celebrateDiscovery(discovery.result);
        
        // Remove after showing
        setTimeout(() => {
            revelation.style.transition = 'opacity 1s';
            revelation.style.opacity = '0';
            setTimeout(() => revelation.remove(), 1000);
        }, 3000);
    }
    
    celebrateDiscovery(symbol) {
        const particles = [];
        const count = 20;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.textContent = symbol;
            particle.className = 'discovery-particle';
            particle.style.cssText = `
                position: fixed;
                left: 50%;
                top: 50%;
                color: white;
                font-family: monospace;
                pointer-events: none;
                z-index: 999;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (i / count) * Math.PI * 2;
            const velocity = 5 + Math.random() * 5;
            
            particle.animate([
                { 
                    transform: 'translate(-50%, -50%)',
                    opacity: 1
                },
                { 
                    transform: `translate(calc(-50% + ${Math.cos(angle) * velocity * 50}px), calc(-50% + ${Math.sin(angle) * velocity * 50}px))`,
                    opacity: 0
                }
            ], {
                duration: 2000,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }
    }
    
    createHarmonicField() {
        // Create subtle background harmonic field
        const field = document.createElement('div');
        field.className = 'harmonic-field';
        field.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.02;
            font-family: monospace;
            font-size: 20px;
            line-height: 1.5;
            white-space: pre;
            overflow: hidden;
        `;
        
        // Generate field pattern
        const updateField = () => {
            const time = Date.now() * 0.0001;
            const symbols = ['·', '∴', '∵', '∷', '‥', '⁘', '⁙'];
            let pattern = '';
            
            for (let y = 0; y < 30; y++) {
                for (let x = 0; x < 50; x++) {
                    const wave = Math.sin(x * 0.1 + time) * Math.cos(y * 0.1 + time);
                    const index = Math.floor((wave + 1) * symbols.length / 2);
                    pattern += symbols[Math.max(0, Math.min(index, symbols.length - 1))];
                }
                pattern += '\n';
            }
            
            field.textContent = pattern;
        };
        
        document.body.appendChild(field);
        setInterval(updateField, 100);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.symbolResonance = new SymbolResonance();
        window.symbolResonance.init();
    });
} else {
    window.symbolResonance = new SymbolResonance();
    window.symbolResonance.init();
}

// Export for other modules
window.SymbolHarmonics = {
    frequencies: SYMBOL_FREQUENCIES,
    ratios: HARMONIC_RATIOS,
    combinations: SYMBOL_COMBINATIONS,
    resonance: window.symbolResonance
};