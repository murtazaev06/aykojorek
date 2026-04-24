function typeWriter(text, element, speed = 25) {
  let i = 0;

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}

function openEnvelope() {
  const envelope = document.getElementById("envelope");
  const letter = document.getElementById("letter");
  const typedText = document.getElementById("typedText");

  if (!envelope || !letter || !typedText) return;

  /* =========================
       1. ENVELOPE OPEN
    ========================= */

  envelope.classList.add("open");
  envelope.style.transition = "0.7s ease";
  envelope.style.transform = "translateY(-15px) scale(0.97)";
  envelope.style.opacity = "0";
  envelope.style.pointerEvents = "none";

  /* =========================
       2. ATMOSPHERE SHIFT
    ========================= */

  document.body.classList.add("opened");

  /* =========================
       3. LETTER APPEAR
    ========================= */

  setTimeout(() => {
    letter.classList.add("show");

    /* =========================
       4. TYPEWRITER START
    ========================= */

    const text = typedText.innerText;
    typedText.innerHTML = "";

    typeWriter(text, typedText, 18);
  }, 500);
}
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  /* random position */
  heart.style.left = Math.random() * 100 + "vw";

  /* random size */
  let size = 10 + Math.random() * 20;
  heart.style.width = size + "px";
  heart.style.height = size + "px";

  /* speed */
  heart.style.animationDuration = 5 + Math.random() * 5 + "s";

  document.querySelector(".hearts").appendChild(heart);

  /* cleanup */
  setTimeout(() => {
    heart.remove();
  }, 10000);
}

/* spawn loop */
setInterval(createHeart, 300);

/* постоянный поток */
setInterval(createHeart, 400);
/* ===============================
   GLOBAL BACKGROUND MUSIC
================================ */
// =======================
// BACKGROUND MUSIC (MAIN ONLY)
// =======================

const music = new Audio("./assets/music.mp3");

music.loop = true;
music.volume = 0.2;

// браузеры требуют действие пользователя
function startMusic() {
  music.play().catch(() => {});
}

// первый тап / клик запускает музыку
document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });

/* ===== CURSOR HEART TRAIL ===== */

document.addEventListener("mousemove", (e) => {
  const heart = document.createElement("div");
  heart.className = "cursor-heart";

  heart.style.left = e.clientX + "px";
  heart.style.top = e.clientY + "px";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1200);
});
