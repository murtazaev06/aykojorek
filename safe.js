const correct = "01012026";
let input = "";

const keypad = document.getElementById("keypad");
const click = document.getElementById("clickSound");

const display = document.getElementById("display");
const placeholder = document.getElementById("placeholder");

/* CREATE KEYS */
const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, "←", 0, "✓"];

keys.forEach((key) => {
  const btn = document.createElement("div");
  btn.className = "key";
  btn.textContent = key;

  btn.onclick = () => press(key);

  keypad.appendChild(btn);
});

function press(key) {
  click.currentTime = 0;
  click.play();

  if (key === "←") {
    input = input.slice(0, -1);
    update();
    return;
  }

  if (key === "✓") {
    check();
    return;
  }

  if (input.length < 8) {
    input += key;
    update();
  }
}

function update() {
  display.textContent = "●".repeat(input.length);

  /* если есть ввод — скрываем текст */
  if (input.length > 0) {
    placeholder.style.opacity = "0";
    placeholder.style.transform = "translate(-50%,-60%)";
  } else {
    placeholder.style.opacity = "0.8";
    placeholder.style.transform = "translate(-50%,-50%)";
  }
}

function check() {
  if (input === correct) {
    document.querySelector(".safe").classList.add("open");

    setTimeout(() => {
      window.location.href = "main.html";
    }, 2000);
  } else {
    shake();
    input = "";
    update();
  }
}

function shake() {
  const safe = document.querySelector(".safe");

  safe.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-15px)" },
      { transform: "translateX(15px)" },
      { transform: "translateX(-10px)" },
      { transform: "translateX(0)" },
    ],
    { duration: 400 }
  );
}
/* PERFECT FLOATING HEART SYSTEM */

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
