import { UIManager } from './uiManager.js';

class App {
    static init() {
        this.worker = new Worker('./js/textWorker.js');
        this.setupWorker();
        UIManager.init(this.handleProcess.bind(this));
    }

    static setupWorker() {
        this.worker.onmessage = (e) => {
            if (e.data.progress) {
                UIManager.updateProgress(e.data.progress);
                return;
            }

            if (e.data.error) {
                UIManager.showError(e.data.error);
            } else {
                UIManager.showResult(e.data.result);
            }
        };

        this.worker.onerror = (error) => {
            UIManager.showError('Error en el Worker: ' + error.message);
        };
    }

    static handleProcess(text, options) {
        if (!text.trim()) {
            alert('¡Ingresa un texto primero!');
            return;
        }

        UIManager.toggleLoading(true);
        this.worker.postMessage({
            text: text,
            lang: document.getElementById('languageSelect').value,
            options: options
        });
    }
}

document.addEventListener('DOMContentLoaded', () => App.init());
});
