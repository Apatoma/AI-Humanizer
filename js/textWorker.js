importScripts('./textProcessor.js');

const humanizer = new TextHumanizer();

self.addEventListener('message', (e) => {
    try {
        const result = humanizer.process(
            e.data.text,
            e.data.lang,
            e.data.options
        );
        self.postMessage(result);
    } catch (error) {
        self.postMessage({ error: error.message });
    }
});