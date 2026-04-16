const btnWejdz = document.getElementById('btn-wejdz');
const inputNick = document.getElementById('input-nick');

btnWejdz.addEventListener('click', () => {
    const nick = inputNick.value;
    if(nick) {
        localStorage.setItem('shoutboxNick', nick);
        // TODO: Napisz funkcję, która ukrywa logowanie i pokazuje czat
    }
});