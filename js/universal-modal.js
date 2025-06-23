// ◊ Universal Modal System ◊
// Prevents softlock issues and provides consistent UX

class UniversalModal {
    constructor() {
        this.activeModals = new Set();
        this.escapeHandler = this.handleEscape.bind(this);
        this.init();
    }
    
    init() {
        // Global escape key handler for all modals
        document.addEventListener('keydown', this.escapeHandler);
    }
    
    create(content, options = {}) {
        const modal = document.createElement('div');
        modal.className = 'universal-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: ${9000 + this.activeModals.size};
            opacity: 0;
            transition: opacity 0.2s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.cssText = `
            background: rgba(0,0,0,0.95);
            color: white;
            padding: 2rem;
            border: 2px solid gold;
            border-radius: 10px;
            font-family: monospace;
            max-width: 90vw;
            max-height: 90vh;
            overflow: auto;
            position: relative;
            transform: scale(0.8);
            transition: transform 0.2s ease;
            ${options.customCSS || ''}
        `;
        
        // Add content
        if (typeof content === 'string') {
            modalContent.innerHTML = content;
        } else {
            modalContent.appendChild(content);
        }
        
        // Add close button
        const closeButton = document.createElement('div');
        closeButton.innerHTML = '✗';
        closeButton.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            color: gold;
            cursor: pointer;
            font-size: 1.2rem;
            padding: 0.2rem;
            line-height: 1;
            user-select: none;
        `;
        closeButton.addEventListener('click', () => this.dismiss(modal));
        modalContent.appendChild(closeButton);
        
        modal.appendChild(modalContent);
        
        // Click outside to dismiss
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.dismiss(modal);
            }
        });
        
        // Prevent content clicks from dismissing
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        document.body.appendChild(modal);
        this.activeModals.add(modal);
        
        // Animate in
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        });
        
        return modal;
    }
    
    dismiss(modal) {
        if (!modal || !this.activeModals.has(modal)) return;
        
        // Animate out
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
            this.activeModals.delete(modal);
        }, 200);
    }
    
    dismissAll() {
        this.activeModals.forEach(modal => this.dismiss(modal));
    }
    
    handleEscape(e) {
        if (e.key === 'Escape' && this.activeModals.size > 0) {
            // Dismiss the topmost modal
            const modals = Array.from(this.activeModals);
            const topModal = modals[modals.length - 1];
            this.dismiss(topModal);
        }
    }
    
    destroy() {
        this.dismissAll();
        document.removeEventListener('keydown', this.escapeHandler);
    }
}

// Global instance
window.UniversalModal = UniversalModal;
window.modalSystem = new UniversalModal();

// Helper function for easy modal creation
window.createModal = (content, options) => {
    return window.modalSystem.create(content, options);
};

window.dismissAllModals = () => {
    window.modalSystem.dismissAll();
};

// ⌨ → ∅ (universal symbol for "any key to dismiss")
// Now changed to: ESC → ∅ (escape key only)