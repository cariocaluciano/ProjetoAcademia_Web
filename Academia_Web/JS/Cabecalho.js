const cabecalhoLateralDireito = document.getElementById('CabecalhoLateralDireitoComConfiguracoes');
const cabecaLateralEsquerdo = document.getElementById('CabecalhoLateralEsquerdaComConfiguracoes')

var HtmlCabecalhoDireito = `  <nav class="navbar navbar-dark bg-dark fixed-top">
<div class="container-fluid">
    <a class="navbar-brand" href="http://127.0.0.1:5500/Academia_Web/Dashboard/index.html?Tk=38078e4b-8b80-422e-a427-8c5e570ff0c9" id = "NavbarPrincipal"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar"
        aria-labelledby="offcanvasDarkNavbarLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">NOMEDAEMPRESA</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
        <p id="NomeUsuarioEIdAcademia"></p> 
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Dropdown
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </li>
            </ul>
            <form class="d-flex mt-3" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-success" type="submit">Search</button>
            </form>
        </div>
        <div class="offcanvas-footer">
            <button type="button"class="btn icon-link icon-link-hover" style = "color: white;" data-bs-toggle="modal" data-bs-target="#ModalLogOf" >Sair <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-closed" viewBox="0 0 16 16">
            <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3zm1 13h8V2H4z"/>
            <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0"/>
          </svg></button>
        </div>
    </div>
</div>
</nav>
`
var HtmlCabecalhoEsquerdo = `
<div class="ConteudoDaesquerda">
<button id="btn-Dashboard" type="button" class="btn btn-dark w-100" onclick="fnRedirecionaParaTelaDeDashboard()">Dashboard</button>
<button type="button" class="btn btn-dark w-100" onclick="fnRedirecionaParaTelaDeAlunos()">Alunos</button>
</div>
`

cabecalhoLateralDireito.innerHTML = HtmlCabecalhoDireito;
cabecaLateralEsquerdo.innerHTML = HtmlCabecalhoEsquerdo;






