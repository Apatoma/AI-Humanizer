import { UIManager } from './uiManager.js';

document.addEventListener('DOMContentLoaded', () => {
    UIManager.init();
    
    const worker = new Worker('./js/textWorker.js');
    
    worker.onmessage = (e) => {
        if (e.data.error) {
            console.error(e.data.error);
            UIManager.showError(e.data.error);
        } else {
            UIManager.showResult(e.data);
        }
    };

    document.getElementById('processBtn').addEventListener('click', () => {
        const inputText = document.getElementById('inputEditor').textContent;
        const options = {
            simplify: document.querySelector('[name="simplify"]').checked,
            punctuation: document.querySelector('[name="punctuation"]').checked
        };
        worker.postMessage({ 
            text: inputText,
            lang: document.getElementById('languageSelect').value,
            options: options
        });
    });
});