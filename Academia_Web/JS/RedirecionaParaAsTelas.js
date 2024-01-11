function fnRedirecionaParaTelaDeDashboard() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const Token = urlParams.get('Tk');
    window.location.href = `http://127.0.0.1:5500/Academia_Web/Dashboard/index.html?Tk=${Token}`;
}
function fnRedirecionaParaTelaDeAlunos() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const Token = urlParams.get('Tk');
    window.location.href = `http://127.0.0.1:5500/Academia_Web/TelaPrincipal/index.html?Tk=${Token}`;
}


