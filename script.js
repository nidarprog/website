/* =========================================================
   HTML MASTER – MAIN SCRIPT
   Author: You 🙂
   Purpose: Navigation, Editor, Exercises, XP, Gamification
========================================================= */

/* -----------------------------
   GLOBAL STATE (XP SYSTEM)
----------------------------- */
const HM = {
  xp: Number(localStorage.getItem("hm_xp")) || 0,
  level: Number(localStorage.getItem("hm_level")) || 1,
  xpPerLevel: 100
};

function saveXP() {
  localStorage.setItem("hm_xp", HM.xp);
  localStorage.setItem("hm_level", HM.level);
}

function addXP(amount, reason = "") {
  HM.xp += amount;

  while (HM.xp >= HM.level * HM.xpPerLevel) {
    HM.xp -= HM.level * HM.xpPerLevel;
    HM.level++;
    showToast(`🎉 Level Up! You reached Level ${HM.level}`);
  }

  saveXP();
  updateXPHUD();
}

function updateXPHUD() {
  const levelEl = document.querySelector("[data-hm-level]");
  const xpEl = document.querySelector("[data-hm-xp]");
  const barEl = document.querySelector("[data-hm-xpbar]");

  if (!levelEl || !xpEl || !barEl) return;

  levelEl.textContent = HM.level;
  xpEl.textContent = HM.xp;

  const percent = Math.min(
    100,
    (HM.xp / (HM.level * HM.xpPerLevel)) * 100
  );
  barEl.style.width = percent + "%";
}

/* -----------------------------
   SIMPLE TOAST (NO LIBRARY)
----------------------------- */
function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #2ecc71;
    color: white;
    padding: 12px 18px;
    border-radius: 6px;
    font-size: 14px;
    z-index: 9999;
    box-shadow: 0 6px 20px rgba(0,0,0,.2);
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

/* -----------------------------
   NAVIGATION (MOBILE)
----------------------------- */
function initNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Mobile dropdowns
  document.querySelectorAll(".dropdown > a").forEach(link => {
    link.addEventListener("click", e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const menu = link.nextElementSibling;
        if (menu) {
          menu.style.display =
            menu.style.display === "grid" ? "none" : "grid";
        }
      }
    });
  });
}

/* -----------------------------
   HTML EDITOR – RUN CODE
----------------------------- */
function initEditor() {
  const runBtn = document.getElementById("runCode");
  const editor = document.getElementById("htmlCode");
  const iframe = document.getElementById("outputFrame");

  if (!runBtn || !editor || !iframe) return;

  runBtn.addEventListener("click", () => {
    const code = editor.value;
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    doc.open();
    doc.write(code);
    doc.close();

    addXP(10, "Run Code");
  });

  // Auto-save editor
  editor.addEventListener("input", () => {
    localStorage.setItem("htmlEditorCode", editor.value);
  });

  // Restore editor
  const saved = localStorage.getItem("htmlEditorCode");
  if (saved) editor.value = saved;
}

/* -----------------------------
   LOAD EXAMPLE FROM REFERENCE
----------------------------- */
function loadExampleFromReference() {
  const editor = document.getElementById("htmlCode");
  if (!editor) return;

  const example = localStorage.getItem("tagExample");
  if (!example) return;

  if (editor.value.trim()) {
    const ok = confirm(
      "Load example from Reference?\nThis will replace your current code."
    );
    if (!ok) {
      localStorage.removeItem("tagExample");
      return;
    }
  }

  editor.value = example;
  localStorage.removeItem("tagExample");

  editor.scrollIntoView({ behavior: "smooth", block: "center" });
  showToast("📘 Example loaded from Reference");
}

/* -----------------------------
   QUICK EXAMPLES (Try It)
----------------------------- */
window.loadExample = function (id) {
  const examples = {
    "table-example": `<table border="1">
  <tr><th>Name</th><th>Age</th></tr>
  <tr><td>John</td><td>25</td></tr>
</table>`,
    "image-example": `<a href="https://example.com">
  <img src="https://via.placeholder.com/300" alt="Image">
</a>`,
    "form-example": `<form>
  <input type="text" placeholder="Name">
  <input type="email" placeholder="Email">
  <button>Submit</button>
</form>`,
    "nav-example": `<nav>
  <a href="#">Home</a> |
  <a href="#">About</a> |
  <a href="#">Contact</a>
</nav>`
  };

  const editor = document.getElementById("htmlCode");
  if (!editor || !examples[id]) return;

  editor.value = examples[id];
  editor.scrollIntoView({ behavior: "smooth" });

  addXP(5, "Load Example");
};

/* -----------------------------
   EXERCISES (REAL PAGES)
----------------------------- */
window.startExercise = function (id) {
  addXP(15, "Start Exercise");

  const pages = {
    1: "exercises/exercise1.html",
    2: "exercises/exercise2.html",
    3: "exercises/exercise3.html"
  };

  if (pages[id]) {
    window.location.href = pages[id];
  }
};

/* -----------------------------
   PROGRESS BAR
----------------------------- */
function initProgressBar() {
  const bar = document.querySelector(".progress-fill");
  const percent = document.querySelector(".progress-percent");

  if (!bar || !percent) return;

  const value = Math.min(100, HM.level * 10);
  bar.style.width = value + "%";
  percent.textContent = value + "%";
}

/* -----------------------------
   INIT EVERYTHING
----------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initEditor();
  loadExampleFromReference();
  initProgressBar();
  updateXPHUD();
});
