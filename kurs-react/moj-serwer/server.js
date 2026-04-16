const express = require('express');
const cors = require('cors');
const app = express();

// Włączamy middleware: CORS i obsługę JSON-a
app.use(cors());
app.use(express.json());

// Nasza "baza danych" (zniknie po zrestartowaniu serwera)
let messages = [
    { author: "System", text: "Witaj na nowym serwerze klasowym!" }
];

// ENDPOINT 1: Pobieranie wiadomości (GET)
app.get('/api/messages', (req, res) => {
    // Zwracamy tablicę do przeglądarki klienta
    res.json(messages);
});

// ENDPOINT 2: Odbieranie nowej wiadomości (POST)
app.post('/api/messages', (req, res) => {
    const newMsg = req.body;
    
    if (!newMsg.author || !newMsg.text) {
        return res.status(400).json({ error: "Brakuje autora lub tekstu!" });
    }

    // Dodajemy wiadomość do tablicy
    messages.push(newMsg);
    
    // Ograniczamy do 50 ostatnich wiadomości, żeby nie zapchać pamięci
    if (messages.length > 50) messages.shift();

    // Odpowiadamy sukcesem
    res.status(201).json({ status: "OK" });
});

// Uruchamiamy nasłuchiwanie na porcie 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serwer działa pod adresem: http://localhost:${PORT}`);
    console.log(`➡️ Endpoint GET: http://localhost:${PORT}/api/messages`);
});