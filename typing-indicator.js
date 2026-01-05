import { escapeHtml } from './utils.js';

export class TypingIndicator {
    constructor(messagesContainer, getCurrentUsername) {
        this.messagesContainer = messagesContainer;
        this.getCurrentUsername = getCurrentUsername;
        this.currentTypingUsers = new Map();
    }

    update(data) {
        // Don't show typing indicator for own messages
        if (data.username === this.getCurrentUsername()) return;

        let messageElement = this.currentTypingUsers.get(data.username);

        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'message typing-message';
            messageElement.dataset.username = data.username;
            this.currentTypingUsers.set(data.username, messageElement);
            this.messagesContainer.appendChild(messageElement);
        }

        if (data.text.trim() === '') {
            this.remove(data.username);
            return;
        }

        messageElement.innerHTML = `
            <div class="message-header">
                <span class="username">${escapeHtml(data.username)}</span>
                <span class="typing-indicator">typing...</span>
            </div>
            <div class="message-content">${escapeHtml(data.text)}</div>
        `;

        this.scrollToBottom();
    }

    remove(username) {
        const messageElement = this.currentTypingUsers.get(username);
        if (messageElement && messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
            this.currentTypingUsers.delete(username);
        }
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}
