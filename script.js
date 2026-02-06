document.addEventListener("DOMContentLoaded", function () {

  // 🎵 Corrige autoplay bloqueado
  const music = document.getElementById("bg-music");
  document.body.addEventListener("click", () => {
    music.play().catch(() => {});
  }, { once: true });

  // ⏳ CONTAGEM REGRESSIVA
  const contador = document.getElementById("contador");
  const dataFesta = new Date("2026-02-27T17:00:00").getTime();

  setInterval(() => {
    const agora = new Date().getTime();
    const diferenca = dataFesta - agora;

    if (diferenca <= 0) {
      contador.innerHTML = "🎉 A FESTA COMEÇOU! 🎉";
      return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    contador.innerHTML =
      `⏳ Faltam ${dias} dias, ${horas}h ${minutos}m ${segundos}s!`;
  }, 1000);

});


// 🪟 ABRIR MODAL
function abrirModal() {
  document.getElementById("modal").style.display = "block";
}

// ❌ FECHAR MODAL AO CLICAR FORA
window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};


// 📩 ENVIAR RSVP
async function enviar() {
  const nomeInput = document.getElementById("nome");
  const nome = nomeInput.value.trim();

  if (!nome) {
    alert("Digite o nome 😊");
    return;
  }

  try {
    const resposta = await fetch("http://localhost:3000/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome })
    });

    if (!resposta.ok) throw new Error("Erro no servidor");

    // 🎉 Confete
    confetti({
      particleCount: 180,
      spread: 120,
      origin: { y: 0.6 }
    });

    alert("Presença confirmada! 🎉");

    document.getElementById("modal").style.display = "none";
    nomeInput.value = "";

  } catch (erro) {
    alert("Erro ao conectar ao servidor 😢\nVerifique se o backend está rodando.");
    console.error("ERRO RSVP:", erro);
  }
}
