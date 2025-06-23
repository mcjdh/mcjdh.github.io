// Quantum Particle System
// Implements wave-particle duality, quantum entanglement, and probability fields

class QuantumParticle {
    constructor(x, y, symbol) {
        this.x = x;
        this.y = y;
        this.symbol = symbol;
        this.waveFunction = Math.random() * Math.PI * 2;
        this.probability = 1;
        this.entangled = null;
        this.spin = Math.random() > 0.5 ? 1 : -1;
        this.energy = Math.random() * 10 + 1;
        this.momentum = {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
        };
        this.element = this.createElement();
    }
    
    createElement() {
        const elem = document.createElement('span');
        elem.className = 'quantum-particle';
        elem.textContent = this.symbol;
        elem.style.cssText = `
            position: fixed;
            left: ${this.x}px;
            top: ${this.y}px;
            pointer-events: none;
            transition: none;
            font-size: 2rem;
            will-change: transform, opacity;
            z-index: 1000;
        `;
        document.body.appendChild(elem);
        return elem;
    }
    
    collapse() {
        // Wave function collapse
        this.probability = 1;
        this.element.style.opacity = '1';
        this.element.style.filter = 'none';
    }
    
    entangle(otherParticle) {
        this.entangled = otherParticle;
        otherParticle.entangled = this;
        
        // Create entanglement visualization
        const line = document.createElement('div');
        line.className = 'entanglement-line';
        line.style.cssText = `
            position: fixed;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(138, 43, 226, 0.5), 
                transparent
            );
            height: 1px;
            pointer-events: none;
            transform-origin: left center;
            z-index: 999;
        `;
        document.body.appendChild(line);
        
        this.entanglementLine = line;
        otherParticle.entanglementLine = line;
    }
    
    update(deltaTime) {
        // Quantum wave evolution
        this.waveFunction += deltaTime * this.energy;
        
        // Heisenberg uncertainty principle
        const uncertainty = 0.5 / Math.sqrt(this.energy);
        const dx = (Math.random() - 0.5) * uncertainty;
        const dy = (Math.random() - 0.5) * uncertainty;
        
        // Update position with quantum jitter
        this.x += this.momentum.x + dx;
        this.y += this.momentum.y + dy;
        
        // Quantum tunneling at boundaries
        if (this.x < 0 || this.x > window.innerWidth) {
            if (Math.random() < 0.1) { // 10% tunneling probability
                this.x = window.innerWidth - this.x;
            } else {
                this.momentum.x *= -1;
            }
        }
        
        if (this.y < 0 || this.y > window.innerHeight) {
            if (Math.random() < 0.1) {
                this.y = window.innerHeight - this.y;
            } else {
                this.momentum.y *= -1;
            }
        }
        
        // Wave-particle duality visualization
        const wave = Math.sin(this.waveFunction);
        this.probability = Math.abs(wave);
        
        // Update visual properties
        this.element.style.transform = `
            translate(-50%, -50%)
            scale(${0.5 + this.probability * 0.5})
            rotate(${this.waveFunction}rad)
        `;
        this.element.style.opacity = 0.3 + this.probability * 0.7;
        this.element.style.filter = `blur(${(1 - this.probability) * 2}px)`;
        
        // Update position
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        
        // Entanglement effects
        if (this.entangled && this.entanglementLine) {
            // Opposite spin correlation
            if (Math.random() < 0.01) {
                this.spin *= -1;
                this.entangled.spin = -this.spin;
            }
            
            // Update entanglement line
            const dx = this.entangled.x - this.x;
            const dy = this.entangled.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);
            
            this.entanglementLine.style.width = `${distance}px`;
            this.entanglementLine.style.left = `${this.x}px`;
            this.entanglementLine.style.top = `${this.y}px`;
            this.entanglementLine.style.transform = `rotate(${angle}rad)`;
            this.entanglementLine.style.opacity = Math.max(0, 1 - distance / 500);
        }
    }
    
    destroy() {
        this.element.remove();
        if (this.entanglementLine) {
            this.entanglementLine.remove();
        }
    }
}

class QuantumField {
    constructor() {
        this.particles = [];
        this.fieldStrength = 0;
        this.observers = [];
        this.lastTime = Date.now();
        this.running = true;
        
        // Quantum field fluctuations
        this.createFieldVisualization();
        this.animate();
    }
    
    createFieldVisualization() {
        const field = document.createElement('canvas');
        field.className = 'quantum-field';
        field.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            opacity: 0.1;
            z-index: 1;
        `;
        field.width = window.innerWidth;
        field.height = window.innerHeight;
        document.body.appendChild(field);
        
        this.fieldCanvas = field;
        this.fieldCtx = field.getContext('2d');
    }
    
    createParticle(x, y, symbol) {
        const particle = new QuantumParticle(x, y, symbol);
        this.particles.push(particle);
        
        // Chance of entanglement with existing particles
        if (this.particles.length > 1 && Math.random() < 0.3) {
            const other = this.particles[Math.floor(Math.random() * (this.particles.length - 1))];
            if (!other.entangled) {
                particle.entangle(other);
            }
        }
        
        return particle;
    }
    
    observe(x, y, radius = 100) {
        // Observer effect - collapse wave functions near observation point
        this.observers.push({ x, y, radius, time: Date.now() });
        
        this.particles.forEach(particle => {
            const dx = particle.x - x;
            const dy = particle.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < radius) {
                // Probability of collapse decreases with distance
                const collapseProbability = 1 - (distance / radius);
                if (Math.random() < collapseProbability) {
                    particle.collapse();
                }
            }
        });
    }
    
    updateField() {
        // Clear field
        this.fieldCtx.clearRect(0, 0, this.fieldCanvas.width, this.fieldCanvas.height);
        
        // Draw quantum probability field
        const imageData = this.fieldCtx.createImageData(
            this.fieldCanvas.width,
            this.fieldCanvas.height
        );
        const data = imageData.data;
        
        for (let x = 0; x < this.fieldCanvas.width; x += 4) {
            for (let y = 0; y < this.fieldCanvas.height; y += 4) {
                let probability = 0;
                
                // Calculate field strength from all particles
                this.particles.forEach(particle => {
                    const dx = x - particle.x;
                    const dy = y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // Quantum field strength decreases with distance
                    const fieldContribution = particle.probability * 
                        Math.exp(-distance / 100) * 
                        Math.sin(particle.waveFunction + distance / 50);
                    
                    probability += fieldContribution;
                });
                
                // Normalize and visualize
                const intensity = Math.abs(probability) * 255;
                const index = (y * this.fieldCanvas.width + x) * 4;
                
                data[index] = intensity;     // Red
                data[index + 1] = intensity * 0.5; // Green
                data[index + 2] = intensity * 0.8; // Blue
                data[index + 3] = intensity * 0.5; // Alpha
            }
        }
        
        this.fieldCtx.putImageData(imageData, 0, 0);
    }
    
    animate() {
        if (!this.running) return;
        
        const now = Date.now();
        const deltaTime = (now - this.lastTime) / 1000;
        this.lastTime = now;
        
        // Update particles
        this.particles.forEach(particle => {
            particle.update(deltaTime);
        });
        
        // Remove old observers
        this.observers = this.observers.filter(obs => now - obs.time < 1000);
        
        // Update quantum field visualization
        if (Math.random() < 0.1) { // Update field 10% of frames for performance
            this.updateField();
        }
        
        // Remove particles that have decayed
        this.particles = this.particles.filter(particle => {
            if (particle.energy < 0.1) {
                particle.destroy();
                return false;
            }
            particle.energy *= 0.999; // Gradual decay
            return true;
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    stop() {
        this.running = false;
        this.particles.forEach(p => p.destroy());
        this.fieldCanvas.remove();
    }
}

// Initialize quantum particle system
function initQuantumParticles(symbols = ['◆', '◊', '○', '●', '□', '■', '△', '▽', '※', '◉', '◈']) {
    const quantumField = new QuantumField();
    
    // Create particles on click
    document.addEventListener('click', (e) => {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        quantumField.createParticle(e.clientX, e.clientY, symbol);
        
        // Observer effect
        quantumField.observe(e.clientX, e.clientY);
    });
    
    // Create spontaneous quantum fluctuations
    setInterval(() => {
        if (Math.random() < 0.1 && quantumField.particles.length < 20) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const symbol = symbols[Math.floor(Math.random() * symbols.length)];
            quantumField.createParticle(x, y, symbol);
        }
    }, 1000);
    
    // Mouse observation effect
    let lastMouseTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastMouseTime > 100) { // Throttle to 10Hz
            quantumField.observe(e.clientX, e.clientY, 50);
            lastMouseTime = now;
        }
    });
    
    return quantumField;
}

// Export for use
window.quantumParticles = {
    init: initQuantumParticles,
    QuantumField,
    QuantumParticle
};