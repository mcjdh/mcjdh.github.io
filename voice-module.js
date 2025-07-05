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
            // Hebrew vowels (lower, warmer tones) - only actual vowel letters
            hebrewVowels: {
                chars: ['א', 'ע', 'ו', 'י'],
                baseFreq: 200,
                waveform: 'sine',
                duration: 140
            },
            
            // Hebrew consonants (higher, sharper tones) - complete set
            hebrewConsonants: {
                chars: ['ב', 'ג', 'ד', 'ה', 'ז', 'ח', 'ט', 'כ', 'ל', 'מ', 'נ', 'ס', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת', 'ך', 'ם', 'ן', 'ף', 'ץ'],
                baseFreq: 320,
                waveform: 'square',
                duration: 85
            },
            
            // Hebrew vowel points (niqqud) - ethereal, brief tones
            niqqud: {
                chars: ['ְ', 'ִ', 'ֵ', 'ֶ', 'ַ', 'ָ', 'ֹ', 'ּ'],
                baseFreq: 180,
                waveform: 'sine',
                duration: 60
            },
            
            // English vowels
            englishVowels: {
                chars: ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'],
                baseFreq: 240,
                waveform: 'sine',
                duration: 110
            },
            
            // English consonants (medium tones)
            englishConsonants: {
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
    
    playCharacterSound(char, context = {}) {
        if (!this.enabled || !this.audioContext || char === ' ' || char === '\n') {
            return;
        }
        
        // Resume audio context if suspended (user interaction requirement)
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        const mapping = this.getCharacterType(char);
        const now = this.audioContext.currentTime;
        
        // Create oscillator and filter for more dynamic sound
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filterNode = this.audioContext.createBiquadFilter();
        
        // Connect nodes: oscillator -> filter -> gain -> destination
        oscillator.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Set waveform
        oscillator.type = mapping.waveform;
        
        // Dynamic frequency based on character type and context
        let frequency = this.calculateDynamicFrequency(char, mapping, context);
        
        // For Hebrew text, add subtle frequency modulation
        if (this.isHebrewChar(char)) {
            const modulation = Math.sin(now * 8) * 0.05;
            frequency *= (1 + modulation);
            
            // Add filter sweep for mystical feel
            filterNode.type = 'lowpass';
            filterNode.frequency.setValueAtTime(frequency * 2, now);
            filterNode.frequency.exponentialRampToValueAtTime(frequency * 0.8, now + (mapping.duration / 1000));
        }
        
        oscillator.frequency.setValueAtTime(frequency, now);
        
        // Enhanced volume envelope based on character type
        const attack = mapping.chars.includes(char) && char.match(/[◊∞∿]/) ? 0.02 : 0.01;
        const decay = mapping.duration / 1000;
        
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(this.volume, now + attack);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + decay);
        
        // Start and stop
        oscillator.start(now);
        oscillator.stop(now + decay);
        
        // Clean up
        oscillator.onended = () => {
            oscillator.disconnect();
            filterNode.disconnect();
            gainNode.disconnect();
        };
    }
    
    calculateDynamicFrequency(char, mapping, context) {
        let baseFreq = mapping.baseFreq;
        
        // Add pitch variation
        const pitchVariation = (Math.random() - 0.5) * this.pitchVariation;
        baseFreq *= (1 + pitchVariation);
        
        // Hebrew-specific frequency adjustments
        if (this.isHebrewChar(char)) {
            // Higher frequencies for certain letters
            if (['ק', 'צ', 'ח', 'ט'].includes(char)) {
                baseFreq *= 1.15;
            }
            // Lower frequencies for guttural sounds
            if (['ע', 'ח', 'ר'].includes(char)) {
                baseFreq *= 0.85;
            }
        }
        
        // Mystical symbols get harmonic frequencies
        if (['◊', '∞', '∿'].includes(char)) {
            const harmonics = [1, 1.5, 2, 2.5, 3];
            const harmonic = harmonics[Math.floor(Math.random() * harmonics.length)];
            baseFreq *= harmonic;
        }
        
        return baseFreq;
    }
    
    isHebrewChar(char) {
        return /[\u0590-\u05FF]/.test(char);
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
console.log('◊ Dynamic Voice Module loaded - try voiceModule.testSound("◊") or voiceModule.testSound("ב")');