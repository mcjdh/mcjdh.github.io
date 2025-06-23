// Advanced resonance and spiral effects system

class ResonanceField {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        this.createCanvas();
        this.bindEvents();
        this.generateParticles();
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.style.opacity = '0.2';
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Sacred geometry mode (only activate on explicit request)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'g' && e.shiftKey) {
                this.activateGeometryMode();
            }
            if (e.key === 's' && e.shiftKey) {
                this.activateSpiralMode();
            }
            if (e.key === 'r' && e.shiftKey) {
                this.activateResonanceMode();
            }
        });
    }

    generateParticles() {
        const particleCount = 8; // Reduced for better performance
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 1.5 + 0.5,
                angle: Math.random() * Math.PI * 2,
                frequency: Math.random() * 0.01 + 0.005,
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    activateGeometryMode() {
        this.particles.forEach((particle, i) => {
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            const radius = 100 + i * 10;
            const angle = (i / this.particles.length) * Math.PI * 2;
            
            particle.targetX = centerX + Math.cos(angle) * radius;
            particle.targetY = centerY + Math.sin(angle) * radius;
        });
    }

    activateSpiralMode() {
        this.particles.forEach((particle, i) => {
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            const phi = 1.618033988749;
            const angle = i * 137.5 * (Math.PI / 180); // Golden angle
            const radius = Math.sqrt(i) * 5;
            
            particle.targetX = centerX + Math.cos(angle) * radius;
            particle.targetY = centerY + Math.sin(angle) * radius;
        });
    }

    activateResonanceMode() {
        this.particles.forEach((particle, i) => {
            particle.resonance = true;
            particle.baseX = particle.x;
            particle.baseY = particle.y;
            particle.amplitude = 20 + Math.random() * 30;
        });
    }

    updateParticles() {
        this.particles.forEach((particle, i) => {
            // Mouse attraction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.01;
                particle.vy += (dy / distance) * force * 0.01;
            }

            // Spiral movement
            particle.angle += particle.frequency;
            particle.x += particle.vx + Math.cos(particle.angle) * 0.5;
            particle.y += particle.vy + Math.sin(particle.angle) * 0.5;

            // Resonance effect
            if (particle.resonance) {
                particle.x = particle.baseX + Math.sin(particle.angle * 3) * particle.amplitude;
                particle.y = particle.baseY + Math.cos(particle.angle * 2) * particle.amplitude * 0.5;
            }

            // Target movement for geometry mode
            if (particle.targetX !== undefined) {
                particle.vx += (particle.targetX - particle.x) * 0.01;
                particle.vy += (particle.targetY - particle.y) * 0.01;
            }

            // Apply friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
        });
    }

    drawConnections() {
        // Removed shimmer connections for better performance and compatibility
        return;
    }

    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateParticles();
        this.drawConnections();
        this.drawParticles();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas) {
            document.body.removeChild(this.canvas);
        }
    }
}

// Fibonacci spiral generator
class FibonacciSpiral {
    static generate(container, size = 200) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        canvas.style.position = 'absolute';
        canvas.style.top = '50%';
        canvas.style.left = '50%';
        canvas.style.transform = 'translate(-50%, -50%)';
        canvas.style.opacity = '0.5';
        
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        
        // Generate Fibonacci sequence
        const fib = [1, 1];
        for (let i = 2; i < 12; i++) {
            fib[i] = fib[i-1] + fib[i-2];
        }
        
        // Draw spiral
        let x = size / 2;
        let y = size / 2;
        let direction = 0; // 0: right, 1: up, 2: left, 3: down
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        for (let i = 0; i < fib.length - 1; i++) {
            const sideLength = fib[i] * 2;
            
            for (let j = 0; j <= sideLength; j++) {
                const angle = (direction * Math.PI / 2) + (j / sideLength) * (Math.PI / 2);
                const radius = sideLength / 2;
                
                const newX = x + Math.cos(angle) * radius;
                const newY = y + Math.sin(angle) * radius;
                
                ctx.lineTo(newX, newY);
            }
            
            direction = (direction + 1) % 4;
        }
        
        ctx.stroke();
        container.appendChild(canvas);
        
        // Animate the spiral
        let rotation = 0;
        setInterval(() => {
            rotation += 0.5;
            canvas.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        }, 50);
    }
}

// Sacred geometry patterns
class SacredGeometry {
    static createFlowerOfLife(container, radius = 50) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', radius * 4);
        svg.setAttribute('height', radius * 4);
        svg.style.position = 'absolute';
        svg.style.top = '50%';
        svg.style.left = '50%';
        svg.style.transform = 'translate(-50%, -50%)';
        svg.style.opacity = '0.3';
        
        const centerX = radius * 2;
        const centerY = radius * 2;
        
        // Create seven circles
        const positions = [
            [0, 0],
            [radius, 0],
            [radius/2, radius * Math.sqrt(3)/2],
            [-radius/2, radius * Math.sqrt(3)/2],
            [-radius, 0],
            [-radius/2, -radius * Math.sqrt(3)/2],
            [radius/2, -radius * Math.sqrt(3)/2]
        ];
        
        positions.forEach(([dx, dy]) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', centerX + dx);
            circle.setAttribute('cy', centerY + dy);
            circle.setAttribute('r', radius);
            circle.setAttribute('fill', 'none');
            circle.setAttribute('stroke', '#fff');
            circle.setAttribute('stroke-width', '1');
            svg.appendChild(circle);
        });
        
        container.appendChild(svg);
        
        // Pulse animation
        let scale = 1;
        let growing = true;
        setInterval(() => {
            if (growing) {
                scale += 0.01;
                if (scale >= 1.1) growing = false;
            } else {
                scale -= 0.01;
                if (scale <= 0.9) growing = true;
            }
            svg.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }, 50);
    }
}

// Initialize resonance field
let resonanceField;

// Export for global use
window.ResonanceEffects = {
    init: () => {
        resonanceField = new ResonanceField();
    },
    destroy: () => {
        if (resonanceField) {
            resonanceField.destroy();
        }
    },
    FibonacciSpiral,
    SacredGeometry
};

// Auto-initialize with reduced effects for better performance
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Only initialize on larger screens
        if (window.innerWidth > 768) {
            window.ResonanceEffects.init();
        }
    });
} else {
    // Only initialize on larger screens
    if (window.innerWidth > 768) {
        window.ResonanceEffects.init();
    }
}