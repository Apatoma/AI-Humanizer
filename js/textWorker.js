importScripts('./textProcessor.js');

const humanizer = new TextHumanizer();

self.onmessage = (e) => {
    try {
        const progressCallback = (progress) => {
            self.postMessage({ progress });
        };

        const result = humanizer.process(
            e.data.text,
            e.data.lang,
            e.data.options,
            progressCallback
        );

        self.postMessage({ result });
    } catch (error) {
        self.postMessage({ 
            error: error.message || 'Error desconocido',
            stack: error.stack 
        });
    }
};
