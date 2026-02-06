document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  document.body.addEventListener("click", () => music.play().catch(() => {}), { once: true });

  // Contador regressivo
  const contador = document.getElementById("contador");
  const dataFesta = new Date("2026-02-27T17:00:00").getTime();

  setInterval(() => {
    const agora = new Date().getTime();
    const diferenca = dataFesta - agora;

    if (diferenca <= 0) { contador.innerHTML = "🎉 A FESTA COMEÇOU! 🎉"; return; }

    const dias = Math.floor(diferenca / (1000*60*60*24));
    const horas = Math.floor((diferenca % (1000*60*60*24)) / (1000*60*60));
    const minutos = Math.floor((diferenca % (1000*60*60)) / (1000*60));
    const segundos = Math.floor((diferenca % (1000*60)) / 1000);

    contador.innerHTML = `⏳ Faltam ${dias} dias, ${horas}h ${minutos}m ${segundos}s!`;
  }, 1000);

  // Modal
  const btnConfirmar = document.querySelector(".btn-confirmar");
  const modal = document.getElementById("modal");
  const btnEnviar = document.getElementById("enviar");

  btnConfirmar.addEventListener("click", () => modal.style.display = "block");
  window.addEventListener("click", (e) => { if(e.target === modal) modal.style.display = "none"; });

  // Enviar RSVP com confete
  btnEnviar.addEventListener("click", async () => {
    const nomeInput = document.getElementById("nome");
    const nome = nomeInput.value.trim();
    if (!nome) { alert("Digite o nome 😊"); return; }

    try {
      const resposta = await fetch("https://convite-backend-fhuk.onrender.com/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome })
      });

      if (!resposta.ok) throw new Error("Erro no servidor");

      confetti({ particleCount: 200, spread: 160, origin: { y: 0.6 } });

      alert("Presença confirmada! 🎉");
      modal.style.display = "none";
      nomeInput.value = "";

    } catch (err) {
      alert("Erro ao conectar ao servidor 😢\nVerifique se o backend está rodando.");
      console.error("ERRO RSVP:", err);
    }
  });
});
