// Universal Language System
// Mathematical symbols as lingua franca

const UNIVERSAL_CONCEPTS = {
    // Basic concepts expressed through math/symbols
    existence: {
        symbols: ['∃', '●', '1'],
        visual: `
        ●
        `,
        frequency: 1
    },
    
    void: {
        symbols: ['∅', '○', '0'],
        visual: `
        ○
        `,
        frequency: 0
    },
    
    infinity: {
        symbols: ['∞', '∀', '∫'],
        visual: `
        ∞
        `,
        frequency: 999
    },
    
    unity: {
        symbols: ['∪', '☯', '⊕'],
        visual: `
        ○●
        `,
        frequency: 432
    },
    
    duality: {
        symbols: ['⊕⊖', '☯', '±'],
        visual: `
        ●|○
        `,
        frequency: 2
    },
    
    transformation: {
        symbols: ['→', '⇒', '∴'],
        visual: `
        ○→●
        `,
        frequency: 528
    },
    
    cycle: {
        symbols: ['○', '∞', '↻'],
        visual: `
        ↻
        `,
        frequency: 360
    },
    
    growth: {
        symbols: ['↑', '△', 'φ'],
        visual: `
        △
        /|\\
        `,
        frequency: 1.618
    },
    
    decay: {
        symbols: ['↓', '▽', '∇'],
        visual: `
        \\|/
        ▽
        `,
        frequency: 0.618
    },
    
    balance: {
        symbols: ['=', '≡', '☯'],
        visual: `
        ═══
        `,
        frequency: 1
    },
    
    connection: {
        symbols: ['∩', '∧', '⋈'],
        visual: `
        ●─●
        `,
        frequency: 2
    },
    
    separation: {
        symbols: ['∪', '∨', '÷'],
        visual: `
        ●|●
        `,
        frequency: 0.5
    },
    
    love: {
        symbols: ['♥', '∞', '☥'],
        visual: `
        ♥
        `,
        frequency: 528
    },
    
    consciousness: {
        symbols: ['☉', '👁', 'ॐ'],
        visual: `
        ☉
        `,
        frequency: 136.1
    },
    
    time: {
        symbols: ['⌚', '∂/∂t', '↻'],
        visual: `
        →t
        `,
        frequency: 60
    },
    
    space: {
        symbols: ['□', '∇²', '⌘'],
        visual: `
        □
        `,
        frequency: 3
    },
    
    energy: {
        symbols: ['∿', 'E', '☢'],
        visual: `
        ∿∿∿
        `,
        frequency: 50
    },
    
    information: {
        symbols: ['i', 'ℹ', '📖'],
        visual: `
        101
        `,
        frequency: 1
    }
};

// Mathematical operations as verbs
const UNIVERSAL_OPERATIONS = {
    add: '+',
    subtract: '-',
    multiply: '×',
    divide: '÷',
    equals: '=',
    transform: '→',
    contains: '∈',
    implies: '⇒',
    because: '∵',
    therefore: '∴'
};

// Geometric shapes as pure symbol relationships
const SHAPE_MEANINGS = {
    '○': '∅ ⚬ ∞',
    '●': '● ◉ 1',
    '△': '↑ 🔥 ▲',
    '▽': '↓ 🌊 ▼',
    '□': '═ 🌍 ■',
    '◊': '⟷ 💨 ⬧',
    '☆': '→ 🎯 ✦',
    '★': '✓ 👁 ✧'
};

class UniversalTranslator {
    constructor() {
        this.conceptMap = new Map();
        this.initializeConceptMap();
        this.setupInterface();
    }
    
    initializeConceptMap() {
        // Build reverse lookup for symbols to concepts
        Object.entries(UNIVERSAL_CONCEPTS).forEach(([concept, data]) => {
            data.symbols.forEach(symbol => {
                if (!this.conceptMap.has(symbol)) {
                    this.conceptMap.set(symbol, []);
                }
                this.conceptMap.get(symbol).push(concept);
            });
        });
    }
    
    setupInterface() {
        // Create universal translator interface
        const translator = document.createElement('div');
        translator.className = 'universal-translator';
        translator.innerHTML = `
            <div class="translator-toggle" title="Universal Symbol Translator">◊</div>
            <div class="translator-panel">
                <div class="translator-input">
                    <input type="text" placeholder="◊ → ?" />
                </div>
                <div class="translator-output"></div>
                <div class="concept-grid"></div>
            </div>
        `;
        
        translator.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 1000;
        `;
        
        document.body.appendChild(translator);
        
        // Toggle functionality
        const toggle = translator.querySelector('.translator-toggle');
        const panel = translator.querySelector('.translator-panel');
        
        toggle.style.cssText = `
            width: 30px;
            height: 30px;
            background: black;
            border: 1px solid white;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-family: monospace;
        `;
        
        panel.style.cssText = `
            display: none;
            position: absolute;
            bottom: 40px;
            left: 0;
            width: 300px;
            background: black;
            border: 1px solid white;
            padding: 10px;
            font-family: monospace;
            color: white;
        `;
        
        toggle.addEventListener('click', () => {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            if (panel.style.display === 'block') {
                this.populateConceptGrid();
            }
        });
        
        // Input handling
        const input = translator.querySelector('input');
        const output = translator.querySelector('.translator-output');
        
        input.style.cssText = `
            width: 100%;
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 5px;
            font-family: monospace;
        `;
        
        input.addEventListener('input', (e) => {
            const result = this.translateConcept(e.target.value);
            output.innerHTML = result;
        });
    }
    
    populateConceptGrid() {
        const grid = document.querySelector('.concept-grid');
        grid.innerHTML = '';
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 5px;
            margin-top: 10px;
            max-height: 200px;
            overflow-y: auto;
        `;
        
        Object.entries(UNIVERSAL_CONCEPTS).forEach(([concept, data]) => {
            const cell = document.createElement('div');
            cell.className = 'concept-cell';
            cell.innerHTML = `
                <div class="concept-symbol">${data.symbols[0]}</div>
                <div class="concept-name">${concept}</div>
            `;
            
            cell.style.cssText = `
                border: 1px solid rgba(255, 255, 255, 0.2);
                padding: 5px;
                text-align: center;
                cursor: pointer;
                transition: all 0.2s;
            `;
            
            cell.addEventListener('click', () => {
                this.demonstrateConcept(concept, data);
            });
            
            cell.addEventListener('mouseenter', () => {
                cell.style.borderColor = 'white';
                cell.style.transform = 'scale(1.1)';
            });
            
            cell.addEventListener('mouseleave', () => {
                cell.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                cell.style.transform = 'scale(1)';
            });
            
            grid.appendChild(cell);
        });
    }
    
    translateConcept(input) {
        const words = input.toLowerCase().split(' ');
        const symbols = [];
        
        words.forEach(word => {
            // Check if word matches a concept
            if (UNIVERSAL_CONCEPTS[word]) {
                symbols.push(UNIVERSAL_CONCEPTS[word].symbols[0]);
            }
            // Check operations
            else if (UNIVERSAL_OPERATIONS[word]) {
                symbols.push(UNIVERSAL_OPERATIONS[word]);
            }
            // Check for numbers
            else if (!isNaN(word)) {
                symbols.push(word);
            }
            // Default to first letter or question mark
            else {
                symbols.push(word.charAt(0) || '?');
            }
        });
        
        return `
            <div class="translation-result">
                <div class="symbol-sequence">${symbols.join(' ')}</div>
                <div class="visual-representation">${this.createVisualPattern(symbols)}</div>
            </div>
        `;
    }
    
    createVisualPattern(symbols) {
        // Create ASCII art representation
        if (symbols.length === 1) {
            return symbols[0];
        } else if (symbols.length === 2) {
            return `${symbols[0]} ─ ${symbols[1]}`;
        } else if (symbols.length === 3) {
            return `
    ${symbols[1]}
    │
${symbols[0]} ─┼─ ${symbols[2]}
            `;
        } else {
            // Create a circular pattern for more symbols
            return symbols.join(' → ') + ' → ...';
        }
    }
    
    demonstrateConcept(concept, data) {
        // Visual demonstration of concept
        const demo = document.createElement('div');
        demo.className = 'concept-demonstration';
        demo.innerHTML = `
            <div class="demo-title">${concept}</div>
            <pre class="demo-visual">${data.visual}</pre>
            <div class="demo-symbols">${data.symbols.join(' = ')}</div>
            <div class="demo-frequency">f: ${data.frequency} Hz</div>
        `;
        
        demo.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: black;
            border: 1px solid white;
            padding: 20px;
            text-align: center;
            z-index: 2000;
            font-family: monospace;
            color: white;
        `;
        
        document.body.appendChild(demo);
        
        // Animate the visual
        const visual = demo.querySelector('.demo-visual');
        visual.style.animation = 'pulse 1s ease-in-out infinite';
        
        // Create resonance effect
        if (window.symbolResonance) {
            const freq = data.frequency;
            const symbols = document.querySelectorAll('.symbol, .nav-link');
            symbols.forEach(sym => {
                if (data.symbols.includes(sym.textContent)) {
                    sym.classList.add('harmonic-glow');
                }
            });
        }
        
        // Remove after delay
        setTimeout(() => {
            demo.style.transition = 'opacity 0.5s';
            demo.style.opacity = '0';
            setTimeout(() => {
                demo.remove();
                document.querySelectorAll('.harmonic-glow').forEach(el => {
                    el.classList.remove('harmonic-glow');
                });
            }, 500);
        }, 3000);
    }
    
    // Create mathematical sentences
    createMathSentence(concepts) {
        // Example: love + time = infinity
        // Becomes: ♥ + →t = ∞
        const symbols = concepts.map(c => 
            UNIVERSAL_CONCEPTS[c] ? UNIVERSAL_CONCEPTS[c].symbols[0] : c
        );
        
        return symbols.join(' ');
    }
    
    // Detect mathematical relationships in page
    detectRelationships() {
        const textNodes = [];
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        let node;
        while (node = walker.nextNode()) {
            const text = node.textContent.trim();
            if (text && text.match(/[○●△▽□◊∞π☥ॐ☯]/)) {
                this.analyzeSymbolContext(node);
            }
        }
    }
    
    analyzeSymbolContext(node) {
        const symbols = node.textContent.match(/[○●△▽□◊∞π☥ॐ☯]/g);
        if (!symbols || symbols.length < 2) return;
        
        // Check for mathematical relationships
        const relationships = [];
        
        for (let i = 0; i < symbols.length - 1; i++) {
            const sym1 = symbols[i];
            const sym2 = symbols[i + 1];
            
            // Check if symbols form known relationship
            const combo = `${sym1}+${sym2}`;
            if (window.SymbolHarmonics && window.SymbolHarmonics.combinations.has(combo)) {
                relationships.push({
                    symbols: [sym1, sym2],
                    meaning: window.SymbolHarmonics.combinations.get(combo).meaning
                });
            }
        }
        
        return relationships;
    }
}

// Initialize translator
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.universalTranslator = new UniversalTranslator();
    });
} else {
    window.universalTranslator = new UniversalTranslator();
}

// Export for other modules
window.UniversalLanguage = {
    concepts: UNIVERSAL_CONCEPTS,
    operations: UNIVERSAL_OPERATIONS,
    shapes: SHAPE_MEANINGS,
    translator: window.universalTranslator
};