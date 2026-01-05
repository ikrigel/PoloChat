import { escapeHtml, formatTime } from './utils.js';

export class UIManager {
    constructor(messagesContainer) {
        this.messagesContainer = messagesContainer;
    }

    addFinalMessage(data) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message final-message';
        messageElement.innerHTML = `
            <div class="message-header">
                <span class="username">${escapeHtml(data.username)}</span>
                <span class="timestamp">${formatTime(data.timestamp)}</span>
            </div>
            <div class="message-content">${escapeHtml(data.text)}</div>
        `;

        this.messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
    }

    addSystemMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message system-message';
        messageElement.innerHTML = `<div class="message-content">${escapeHtml(text)}</div>`;
        this.messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}
