export class UIManager {
    static init() {
        this.bindEvents();
        this.setupServiceWorker();
    }

    static bindEvents() {
        document.getElementById('processBtn').addEventListener('click', () => this.toggleLoading(true));
        document.getElementById('copyBtn').addEventListener('click', () => this.copyText());
        document.getElementById('fileInput').addEventListener('change', e => this.handleFile(e));
    }

    static showResult(text) {
        const output = document.getElementById('outputEditor');
        output.textContent = text;
        output.classList.add('slide-enter-active');
        this.toggleLoading(false);
    }

    static showError(error) {
        console.error(error);
        this.toggleLoading(false);
        alert(`Error: ${error}`);
    }

    static toggleLoading(show) {
        document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none';
    }

    static async handleFile(event) {
        const file = event.target.files[0];
        const text = await file.text();
        document.getElementById('inputEditor').textContent = text;
    }

    static copyText() {
        const text = document.getElementById('outputEditor').textContent;
        navigator.clipboard.writeText(text);
    }

    static setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .catch(error => console.error('SW Error:', error));
        }
    }
}