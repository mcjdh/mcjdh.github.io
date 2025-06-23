// ◊ Cosmic Mathematical Constants ◊
// Universal harmonic relationships for all realms

// Base Constants from Nature's Code
const φ = (1 + Math.sqrt(5)) / 2;  // Golden Ratio: 1.618...
const τ = Math.PI * 2;             // Tau: full circle constant
const e = Math.E;                  // Euler's number: natural growth
const √2 = Math.SQRT2;             // Diagonal unity
const √5 = Math.sqrt(5);           // Fibonacci foundation

// Sacred Mathematical Relationships
const COSMIC_CONSTANTS = {
    // Primary Constants
    φ: φ,
    π: Math.PI,
    τ: τ,
    e: e,
    √2: √2,
    √5: √5,
    
    // Golden Derivatives
    φ²: φ * φ,                     // φ² = φ + 1
    φ⁻¹: 1 / φ,                   // φ⁻¹ = φ - 1
    φ³: φ * φ * φ,
    
    // Harmonic Base Frequencies (Hz)
    A432: 432,                     // Natural harmonic base
    C528: 528,                     // DNA repair frequency
    sacred396: 396,                // Root chakra liberation
    sacred741: 741,                // Awakening intuition
    sacred963: 963,                // Divine connection
    
    // Geometric Constants
    pentagram: τ / 5,              // Pentagon angle
    hexagon: τ / 6,                // Hexagon angle
    octagon: τ / 8,                // Octagon angle
    
    // Mystical Numbers
    seven: 7,                      // Completeness
    twelve: 12,                    // Cosmic cycles
    sixtyfour: 64,                 // I-Ching hexagrams
};

// Mathematical Functions using Universal Constants
const UNIVERSAL_MATH = {
    // Optimized prime checker using √n boundary
    isPrime: n => n > 1 && !Array.from({length: Math.floor(Math.sqrt(n))}, (_, i) => i + 2)
        .some(i => n % i === 0),
    
    // Fibonacci generator using golden ratio (Binet's formula)
    fibonacci: n => Math.round((Math.pow(φ, n) - Math.pow(-φ, -n)) / √5),
    
    // Fibonacci sequence generator (memory efficient)
    fibonacciSequence: function* () {
        let [a, b] = [0, 1];
        while (true) {
            yield a;
            [a, b] = [b, a + b];
        }
    },
    
    // Harmonic frequency calculator based on golden relationships
    harmonicFreq: (base = COSMIC_CONSTANTS.A432) => ({
        fundamental: base,
        octave: base * 2,
        fifth: base * 3/2,
        golden: base * φ,
        divine: base * φ²,
        sacred: base * e,
        cosmic: base * τ,
    }),
    
    // Sacred geometry angle calculator
    sacredAngle: sides => τ / sides,
    
    // Golden rectangle proportions
    goldenRect: size => ({
        width: size,
        height: size / φ,
        area: size * (size / φ)
    }),
    
    // Spiral coordinates using golden angle
    goldenSpiral: (radius, rotations = 1) => {
        const goldenAngle = τ / φ²; // 137.508° in radians
        return Array.from({length: Math.floor(rotations * 360)}, (_, i) => ({
            x: radius * Math.cos(i * goldenAngle) * Math.sqrt(i),
            y: radius * Math.sin(i * goldenAngle) * Math.sqrt(i),
            angle: i * goldenAngle
        }));
    },
    
    // Cymatics pattern generator
    cymaticsPattern: (frequency, size = 20) => {
        const pattern = [];
        const center = size / 2;
        for (let y = 0; y < size; y++) {
            pattern[y] = [];
            for (let x = 0; x < size; x++) {
                const distance = Math.sqrt((x - center) ** 2 + (y - center) ** 2);
                const wave = Math.sin(distance * frequency / 100) * Math.cos(distance * φ);
                pattern[y][x] = wave > 0.3 ? '●' : wave < -0.3 ? '○' : '·';
            }
        }
        return pattern.map(row => row.join('')).join('\n');
    }
};

// Symbol-to-frequency mapping using harmonic relationships
const SYMBOL_HARMONICS = {
    // Mathematical symbols
    '∞': COSMIC_CONSTANTS.A432 * φ,      // Infinity frequency
    'π': COSMIC_CONSTANTS.A432 * Math.PI, // Pi frequency  
    'φ': COSMIC_CONSTANTS.A432 * φ,       // Golden frequency
    'e': COSMIC_CONSTANTS.A432 * e,       // Natural frequency
    '∑': COSMIC_CONSTANTS.A432,           // Summation base
    '∏': COSMIC_CONSTANTS.C528,           // Product frequency
    '∫': COSMIC_CONSTANTS.sacred741,      // Integration frequency
    '∂': COSMIC_CONSTANTS.sacred396,      // Partial derivative
    
    // Sacred symbols
    '◊': COSMIC_CONSTANTS.A432 * φ²,      // Diamond/portal
    '○': COSMIC_CONSTANTS.A432 / φ,       // Void/potential
    '●': COSMIC_CONSTANTS.A432 * 2,       // Matter/presence
    '△': COSMIC_CONSTANTS.sacred741,      // Ascension
    '▽': COSMIC_CONSTANTS.sacred396,      // Grounding
    '☯': COSMIC_CONSTANTS.C528,           // Unity frequency
    '☥': COSMIC_CONSTANTS.sacred963,      // Ankh divine connection
    'ॐ': COSMIC_CONSTANTS.sacred741,      // Om sacred sound
    
    // Cosmic symbols
    '✦': COSMIC_CONSTANTS.C528 * φ,       // Star light
    '☉': COSMIC_CONSTANTS.C528 * 2,       // Sun frequency
    '☽': COSMIC_CONSTANTS.A432 / 2,       // Moon frequency
    '⋆': COSMIC_CONSTANTS.sacred963,      // Stellar connection
};

// Export for global use
if (typeof window !== 'undefined') {
    window.COSMIC_CONSTANTS = COSMIC_CONSTANTS;
    window.UNIVERSAL_MATH = UNIVERSAL_MATH;
    window.SYMBOL_HARMONICS = SYMBOL_HARMONICS;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        COSMIC_CONSTANTS,
        UNIVERSAL_MATH,
        SYMBOL_HARMONICS
    };
}