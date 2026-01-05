export class MessageHandler {
    constructor(uiManager, typingIndicator) {
        this.uiManager = uiManager;
        this.typingIndicator = typingIndicator;
    }

    handle(data) {
        switch (data.type) {
            case 'typing':
                return this.handleTyping(data);
            case 'message':
                return this.handleMessage(data);
            case 'user_stopped_typing':
                return this.handleStoppedTyping(data);
        }
    }

    handleTyping(data) {
        this.typingIndicator.update(data);
    }

    handleMessage(data) {
        this.uiManager.addFinalMessage(data);
        this.typingIndicator.remove(data.username);
    }

    handleStoppedTyping(data) {
        this.typingIndicator.remove(data.username);
    }
}
