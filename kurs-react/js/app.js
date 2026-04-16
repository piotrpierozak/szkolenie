const btnWejdz = document.getElementById('btn-wejdz');
const inputNick = document.getElementById('input-nick');
const loginScreen = document.getElementById('login-screen');
const chatInterface = document.getElementById('chat-interface');

// Główna funkcja przełączająca widoki
function showChat() {
    loginScreen.style.display = 'none';    // Ukrywa logowanie
    chatInterface.style.display = 'block'; // Pokazuje czat
}

// Obsługa kliknięcia przycisku
btnWejdz.addEventListener('click', () => {
    const nick = inputNick.value.trim(); // .trim() usuwa zbędne spacje
    
    if (nick) {
        localStorage.setItem('shoutboxNick', nick);
        showChat();
    } else {
        alert("Proszę podaj swój nick!");
    }
});

// DODATEK: Sprawdź, czy nick jest już w pamięci przy starcie strony
const savedNick = localStorage.getItem('shoutboxNick');
if (savedNick) {
    showChat();
}