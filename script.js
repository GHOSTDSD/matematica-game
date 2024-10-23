const square = document.querySelector(".center-square");
const particles = document.querySelectorAll(".wind-particle");
const countdownElement = document.getElementById('countdown');
const fullscreenRect = document.createElement('div'); // Cria o retângulo
fullscreenRect.classList.add('fullscreen-rect');
document.body.appendChild(fullscreenRect); // Adiciona à página

let countdownValue = 3; // Valor inicial da contagem regressiva
let rotationAngle = 0; // Ângulo inicial de rotação

// Função para atualizar a contagem regressiva
function updateCountdown() {
    countdownElement.textContent = countdownValue; // Atualiza o texto da contagem regressiva
}

// Função para girar o quadrado e exibir partículas a cada segundo
function rotateAndWind() {
    // Atualiza a rotação incremental do quadrado
    rotationAngle += 120; // Incrementa 120 graus (360/3 segundos)
    square.style.transform = `rotate(${rotationAngle}deg)`;

    // Ativa a animação das partículas
    particles.forEach(particle => {
        particle.style.animationPlayState = 'running'; // Inicia a animação das partículas
        setTimeout(() => {
            particle.style.animationPlayState = 'paused'; // Pausa após 1 segundo
        }, 1000); // Tempo da animação de 1 segundo
    });
}

// Função para animar o retângulo ao chegar em "1"
function animateFullscreenRect() {
    fullscreenRect.style.width = '100%'; // Preenche a tela
    setTimeout(() => {
        fullscreenRect.style.width = '0'; // Volta a 0 após preencher
        // Muda a página após a animação
        setTimeout(() => {
             window.location.href = 'game.html'; // Substitua pela URL desejada
        }, 2000); 
       
    }, 2000); // 1s para expandir, 1s para voltar
}

// Função para iniciar o processo de regressiva e rotação
function startCountdown() {
    const countdownInterval = setInterval(() => {
        if (countdownValue > 0) {
            updateCountdown();  // Atualiza a contagem
            rotateAndWind();     // Rotaciona o quadrado e exibe partículas
            countdownValue--;    // Decrementa a contagem
        } else {
            clearInterval(countdownInterval); // Para a regressiva
            rotateAndWind(); // Gira o quadrado no final também
            animateFullscreenRect(); // Anima o retângulo preenchendo a tela
            countdownValue = 3; // Reinicia a contagem
            setTimeout(startCountdown, 3000); // Reinicia o processo após 3 segundos
        }
    }, 1000); // A cada 1 segundo
}

// Inicia a contagem regressiva
startCountdown();
