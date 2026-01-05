export function generateClientId() {
    return 'User_' + Math.random().toString(36).substr(2, 9);
}

export function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

export function formatTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString();
}
