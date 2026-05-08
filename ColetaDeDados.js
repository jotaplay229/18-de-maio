function enviarAmostragem() {

    const nome = document.getElementById("nome").value.trim();
    const numero = document.getElementById("numero").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!nome || !numero || !email) {
        alert("Preencha todos os campos.");
        return;
    }

    const agora = new Date();

    const data = agora.toLocaleDateString("pt-BR");

    const hora = agora.toLocaleTimeString("pt-BR");

    function detectarSistema() {

        const userAgent = navigator.userAgent;

        if (/windows/i.test(userAgent)) {
            return "Windows";
        }

        if (/android/i.test(userAgent)) {
            return "Android";
        }

        if (/iphone|ipad|ipod/i.test(userAgent)) {
            return "iOS";
        }

        if (/mac/i.test(userAgent)) {
            return "MacOS";
        }

        if (/linux/i.test(userAgent)) {
            return "Linux";
        }

        return navigator.platform || "Não identificado";
    }

    const amostraDeDados = {

        nome: nome,

        numero: numero,

        email: email,

        sistema: detectarSistema(),

        plataforma: navigator.platform,

        navegador: navigator.userAgent,

        idioma: navigator.language,

        cookiesAtivos: navigator.cookieEnabled,

        online: navigator.onLine,

        larguraTela: screen.width,

        alturaTela: screen.height,

        profundidadeCor: screen.colorDepth,

        memoriaRAM: navigator.deviceMemory || "Não suportado",

        nucleosCPU: navigator.hardwareConcurrency || "Não suportado",

        data: data,

        hora: hora

    };

    console.log(amostraDeDados);

    google.script.run

        .withSuccessHandler(function () {

            alert("Dados enviados com sucesso!");

            document.getElementById("formulario").reset();

        })

        .withFailureHandler(function (erro) {

            console.error(erro);

            alert("Erro ao enviar os dados.");

        })

        .salvarNaPlanilha(amostraDeDados);
}

function salvarNaPlanilha(dados) {

  const planilha = SpreadsheetApp
    .getActiveSpreadsheet()
    .getActiveSheet();

  planilha.appendRow([

    dados.data,
    dados.hora,

    dados.nome,
    dados.numero,
    dados.email,

    dados.sistema,
    dados.plataforma,

    dados.idioma,

    dados.larguraTela + "x" + dados.alturaTela,

    dados.profundidadeCor,

    dados.cookiesAtivos ? "Sim" : "Não",

    dados.online ? "Online" : "Offline",

    dados.memoriaRAM,

    dados.nucleosCPU,

    dados.navegador

  ]);

  return true;
}