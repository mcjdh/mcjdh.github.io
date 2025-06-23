function initParticles(symbols = ['◆', '◊', '○', '●', '□', '■', '△', '▽', '※', '◉', '◈']) {
    document.body.addEventListener('click', function(e) {
        const span = document.createElement('span');
        span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        span.style.position = 'fixed';
        span.style.left = e.clientX + 'px';
        span.style.top = e.clientY + 'px';
        span.style.pointerEvents = 'none';
        span.style.fontSize = '2rem';
        span.style.transition = 'all 1s ease-out';
        span.style.transform = 'translate(-50%, -50%)';
        
        document.body.appendChild(span);
        
        setTimeout(() => {
            span.style.transform = 'translate(-50%, -50%) translateY(-100px) rotate(360deg) scale(0)';
            span.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            span.remove();
        }, 1000);
    });
}