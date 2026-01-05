import { generateClientId } from './utils.js';
import { WebSocketManager } from './websocket-manager.js';
import { UIManager } from './ui-manager.js';
import { TypingIndicator } from './typing-indicator.js';
import { MessageHandler } from './message-handler.js';

class ChatClient {
    constructor() {
        this.clientId = generateClientId();
        this.username = '';
        this.isClearingInput = false;

        // DOM references
        this.messageInput = document.getElementById('messageInput');
        this.usernameInput = document.getElementById('username');

        // Initialize modules
        this.uiManager = new UIManager(document.getElementById('messages'));
        this.typingIndicator = new TypingIndicator(
            document.getElementById('messages'),
            () => this.username
        );
        this.messageHandler = new MessageHandler(
            this.uiManager,
            this.typingIndicator
        );
        this.websocket = new WebSocketManager(
            'ws://localhost:8080',
            (data) => this.messageHandler.handle(data),
            () => this.onConnected(),
            () => this.onDisconnected(),
            (error) => this.onError(error)
        );

        this.init();
    }

    init() {
        this.websocket.connect();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.messageInput.addEventListener('input', (e) => {
            this.handleTyping(e.target.value);
        });

        this.usernameInput.addEventListener('change', (e) => {
            this.username = e.target.value.trim() || this.clientId;
            this.websocket.send({
                type: 'username_change',
                username: this.username
            });
        });

        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.sendFinalMessage();
            }
        });
    }

    handleTyping(text) {
        if (this.isClearingInput) return;

        if (!this.username) {
            this.username = this.usernameInput.value.trim() || this.clientId;
        }

        this.websocket.send({
            type: 'typing',
            username: this.username,
            text: text,
            timestamp: Date.now()
        });
    }

    sendFinalMessage() {
        const text = this.messageInput.value.trim();
        if (text) {
            // Ensure username is set
            if (!this.username) {
                this.username = this.usernameInput.value.trim() || this.clientId;
            }

            this.websocket.send({
                type: 'message',
                username: this.username,
                text: text,
                timestamp: Date.now()
            });

            this.isClearingInput = true;
            this.messageInput.value = '';
            this.isClearingInput = false;
        }
    }

    onConnected() {
        this.uiManager.addSystemMessage('Connected to chat server');
    }

    onDisconnected() {
        this.uiManager.addSystemMessage('Disconnected from server. Trying to reconnect...');
    }

    onError(error) {
        this.uiManager.addSystemMessage('Connection error occurred');
    }
}

new ChatClient();
