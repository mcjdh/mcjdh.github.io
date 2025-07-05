/**
 * Animal Crossing Style Voice Module
 * Generates syllable-like sounds for text streaming
 */

class VoiceModule {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.volume = 0.1;
        this.pitchVariation = 0.2;
        
        // Character type mappings for different sounds
        this.charMappings = {
            // Hebrew vowels (lower, warmer tones)
            vowels: {
                chars: ['א', 'ע', 'ו', 'י', 'ה', 'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'],
                baseFreq: 220,
                waveform: 'sine',
                duration: 120
            },
            
            // Hebrew consonants (higher, sharper tones)
            consonants: {
                chars: ['ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת'],
                baseFreq: 330,
                waveform: 'square',
                duration: 80
            },
            
            // English letters (medium tones)
            english: {
                chars: 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ',
                baseFreq: 280,
                waveform: 'triangle',
                duration: 90
            },
            
            // Numbers (technical beeps)
            numbers: {
                chars: '0123456789',
                baseFreq: 440,
                waveform: 'sawtooth',
                duration: 70
            },
            
            // Mystical symbols (ethereal tones)
            mystical: {
                chars: ['◊', '∞', '∿', '◎', '●', '○', '◯', '⟷', '✦', '✧', '✨', '⋆', '✱', '✲', '✳'],
                baseFreq: 523,
                waveform: 'sine',
                duration: 150
            },
            
            // Punctuation (quick clicks)
            punctuation: {
                chars: '.,!?;:()[]{}"\'-→',
                baseFreq: 800,
                waveform: 'square',
                duration: 40
            }
        };
        
        this.initialize();
    }
    
    initialize() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    }
    
    getCharacterType(char) {
        for (const [type, mapping] of Object.entries(this.charMappings)) {
            if (mapping.chars.includes(char) || 
                (typeof mapping.chars === 'string' && mapping.chars.includes(char))) {
                return mapping;
            }
        }
        
        // Default for unknown characters
        return {
            baseFreq: 300,
            waveform: 'sine',
            duration: 100
        };
    }
    
    playCharacterSound(char) {
        if (!this.enabled || !this.audioContext || char === ' ' || char === '\n') {
            return;
        }
        
        // Resume audio context if suspended (user interaction requirement)
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        const mapping = this.getCharacterType(char);
        const now = this.audioContext.currentTime;
        
        // Create oscillator
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        // Connect nodes
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Set waveform
        oscillator.type = mapping.waveform;
        
        // Set frequency with slight randomization
        const pitchVariation = (Math.random() - 0.5) * this.pitchVariation;
        const frequency = mapping.baseFreq * (1 + pitchVariation);
        oscillator.frequency.setValueAtTime(frequency, now);
        
        // Set volume envelope (quick attack, quick decay)
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(this.volume, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + (mapping.duration / 1000));
        
        // Start and stop
        oscillator.start(now);
        oscillator.stop(now + (mapping.duration / 1000));
        
        // Clean up
        oscillator.onended = () => {
            oscillator.disconnect();
            gainNode.disconnect();
        };
    }
    
    // Public methods for control
    enable() {
        this.enabled = true;
    }
    
    disable() {
        this.enabled = false;
    }
    
    toggle() {
        this.enabled = !this.enabled;
    }
    
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }
    
    setPitchVariation(variation) {
        this.pitchVariation = Math.max(0, Math.min(1, variation));
    }
    
    // Test function
    testSound(char = '◊') {
        this.playCharacterSound(char);
    }
}

// Global instance
window.VoiceModule = VoiceModule;

// Auto-initialize
window.voiceModule = new VoiceModule();

// Console helper
console.log('🎵 Voice Module loaded - try voiceModule.testSound("◊")');