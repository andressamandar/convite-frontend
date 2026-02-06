document.addEventListener("DOMContentLoaded", function () {

  // 🎵 Corrige autoplay bloqueado
  const music = document.getElementById("bg-music");
  document.body.addEventListener("click", () => {
    music.play().catch(() => {});
  }, { once: true });

  // ⏳ CONTADOR
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

  // 🪟 ABRIR MODAL
  const btnConfirmar = document.querySelector(".btn-confirmar");
  const modal = document.getElementById("modal");

  btnConfirmar.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // ❌ FECHAR MODAL AO CLICAR FORA
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // 📩 ENVIAR RSVP COM CONFETE
  const btnEnviar = modal.querySelector("button");
  btnEnviar.addEventListener("click", async () => {
    const nomeInput = document.getElementById("nome");
    const nome = nomeInput.value.trim();

    if (!nome) {
      alert("Digite o nome 😊");
      return;
    }

    try {
      const resposta = await fetch("https://convite-backend-fhuk.onrender.com/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome })
      });

      if (!resposta.ok) throw new Error("Erro no servidor");

      // 🎉 Confete ao clicar em Enviar
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 },
        gravity: 0.8,
        scalar: 1.2
      });

      alert("Presença confirmada! 🎉");

      modal.style.display = "none";
      nomeInput.value = "";

    } catch (erro) {
      alert("Erro ao conectar ao servidor 😢\nVerifique se o backend está rodando.");
      console.error("ERRO RSVP:", erro);
    }
  });

});
