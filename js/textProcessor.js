export class TextHumanizer {
    constructor() {
        this.replacements = {
            en: {
                "utilize": "use",
                "demonstrate": "show",
                "approximately": "about",
                "subsequently": "later",
                "consequently": "so"
            },
            es: {
                "no obstante": "pero",
                "en consecuencia": "por eso",
                "por ende": "por eso",
                "asimismo": "también",
                "no obstante": "sin embargo"
            }
        };
    }

    process(text, lang = 'es', options) {
        let result = text;
        
        // Paso 1: Limpiar caracteres especiales
        result = result.replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ¿¡!?,.\s]/g, '');
        
        // Paso 2: Simplificar vocabulario
        if(options.simplify) {
            const regex = new RegExp(
                Object.keys(this.replacements[lang]).join('|'), 
                'gi'
            );
            result = result.replace(regex, match => 
                this.replacements[lang][match.toLowerCase()]);
        }
        
        // Paso 3: Formatear párrafos
        if(options.punctuation) {
            result = result
                .split('\n')
                .map(p => p.trim())
                .filter(p => p)
                .map(p => {
                    const firstChar = p[0].toUpperCase();
                    const rest = p.slice(1);
                    return `${firstChar}${rest.replace(/\.$/, '')}.`;
                })
                .join('\n\n');
        }
        
        return result;
    }
}