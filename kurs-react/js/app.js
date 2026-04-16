// --- USTAWIENIA ---
const API_URL = 'https://apichat.m89.pl/api/messages'; // Upewnij się, że serwer działa na tym porcie!

// --- POBIERANIE ELEMENTÓW Z HTML ---
const loginScreen = document.getElementById('login-screen');
const chatInterface = document.getElementById('chat-interface');
const chatMessages = document.getElementById('chat-messages');

const btnWejdz = document.getElementById('btn-wejdz');
const btnWyloguj = document.getElementById('btn-wyloguj');
const inputNick = document.getElementById('input-nick');

const formularzWiadomosci = document.getElementById('formularz-wiadomosci');
const inputWiadomosc = document.getElementById('input-wiadomosc');

// --- FUNKCJA: Pobieranie i wyświetlanie wiadomości ---
async function pobierzWiadomosci() {
    try {
        const response = await fetch(API_URL);
        const dane = await response.json();

        chatMessages.innerHTML = ''; // Czyścimy okno przed rysowaniem

        dane.forEach(msg => {
            const div = document.createElement('div');
            div.style.marginBottom = "8px";

            // Zadanie: ładna data
            const dataObiekt = new Date(msg.timestamp);
            const ladnaGodzina = dataObiekt.toLocaleTimeString('pl-PL');

            div.innerHTML = `
                <small style="color: gray;">[${ladnaGodzina}]</small> 
                <strong>${msg.author}:</strong> ${msg.text}
            `;
            chatMessages.appendChild(div);
        });

        // Przewiń na dół przy nowej wiadomości
        chatMessages.scrollTop = chatMessages.scrollHeight;

    } catch (error) {
        console.error("Błąd pobierania:", error);
    }
}

// --- FUNKCJA: Przełączanie na czat ---
function pokazCzat() {
    loginScreen.style.display = 'none';
    chatInterface.style.display = 'block';
    
    // Pobierz od razu i ustaw odświeżanie co 3 sekundy
    pobierzWiadomosci();
    setInterval(pobierzWiadomosci, 3000);
}

// --- OBSŁUGA ZDARZEŃ ---

// Kliknięcie wejdź
btnWejdz.addEventListener('click', () => {
    const nick = inputNick.value.trim();
    if (nick) {
        localStorage.setItem('shoutboxNick', nick);
        pokazCzat();
    } else {
        alert("Wpisz nick!");
    }
});

// Kliknięcie wyloguj
btnWyloguj.addEventListener('click', () => {
    localStorage.removeItem('shoutboxNick');
    window.location.reload(); // Odświeża stronę i wraca do logowania
});

// Wysyłanie wiadomości
formularzWiadomosci.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nowaWiadomosc = {
        author: localStorage.getItem('shoutboxNick'),
        text: inputWiadomosc.value
    };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nowaWiadomosc)
        });

        inputWiadomosc.value = ''; // Czyścimy pole po wysłaniu
        pobierzWiadomosci();      // Odświeżamy listę od razu
    } catch (error) {
        console.error("Błąd wysyłania:", error);
    }
});

// --- AUTO-LOGOWANIE ---
const zapisanyNick = localStorage.getItem('shoutboxNick');
if (zapisanyNick) {
    pokazCzat();
}