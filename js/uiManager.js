export class UIManager {
    static init(processHandler) {
        this.processHandler = processHandler;
        this.bindEvents();
        this.setupServiceWorker();
    }

    static bindEvents() {
        document.getElementById('processBtn').addEventListener('click', () => {
            const text = document.getElementById('inputEditor').textContent;
            const options = {
                simplify: document.querySelector('[name="simplify"]').checked,
                punctuation: document.querySelector('[name="punctuation"]').checked
            };
            this.processHandler(text, options);
        });

        document.getElementById('copyBtn').addEventListener('click', () => {
            const text = document.getElementById('outputEditor').textContent;
            navigator.clipboard.writeText(text);
            alert('Texto copiado al portapapeles');
        });

        document.getElementById('fileInput').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            const text = await file.text();
            document.getElementById('inputEditor').textContent = text;
        });
    }

    static toggleLoading(show) {
        document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none';
    }

    static updateProgress(progress) {
        const progressBar = document.querySelector('.progress');
        progressBar.style.width = `${progress * 100}%`;
    }

    static showResult(text) {
        document.getElementById('outputEditor').textContent = text;
        this.toggleLoading(false);
    }

    static showError(error) {
        console.error(error);
        alert(`Error: ${error}`);
        this.toggleLoading(false);
    }

    static setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .catch(error => console.error('SW Error:', error));
        }
    }
}
