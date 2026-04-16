const btnWejdz = document.getElementById('btn-wejdz');
const inputNick = document.getElementById('input-nick');
const loginScreen = document.getElementById('login-screen');
const chatInterface = document.getElementById('chat-interface');
const chatMessages = document.getElementById('chat-messages');

const API_URL = 'https://apichat.m89.pl/api/messages';

async function pobierzWiadomosci() {
    try {
        const response = await fetch(API_URL);
        const dane = await response.json();

        chatMessages.innerHTML = '';

        dane.forEach(msg => {
            const div = document.createElement('div');
            div.innerHTML = `<strong>${msg.author}:</strong> ${msg.text}`;
            chatMessages.appendChild(div);
        });
    } catch (error) {
        console.error("Błąd:", error);
    }
}

btnWejdz.addEventListener('click', () => {
    const nick = inputNick.value;
    if(nick) {
        localStorage.setItem('shoutboxNick', nick);
        
        loginScreen.style.display = 'none';
        chatInterface.style.display = 'block';
        
        
        pobierzWiadomosci();
    }
});

setInterval(pobierzWiadomosci, 3000);

const formularzWiadomosci = document.getElementById('formularz-wiadomosci');
const inputWiadomosc = document.getElementById('input-wiadomosc');

formularzWiadomosci.addEventListener('submit', async (event) => {
    event.preventDefault(); 
    
    const nick = localStorage.getItem('shoutboxNick');
    const tekst = inputWiadomosc.value;

    if (nick && tekst) {
        const nowaWiadomosc = {
            author: nick,
            text: tekst
        };

        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nowaWiadomosc)
            });

            inputWiadomosc.value = '';

            pobierzWiadomosci();

        } catch (error) {
            console.error("Błąd podczas wysyłania:", error);
        }
    }
});