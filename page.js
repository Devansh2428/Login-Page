import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCMuUnb4FWfODMXsDlg1NtwbczTXPIpWjI",
  authDomain: "formlogin-dfcde.firebaseapp.com",
  projectId: "formlogin-dfcde",
  storageBucket: "formlogin-dfcde.firebasestorage.app",
  messagingSenderId: "940185036694",
  appId: "1:940185036694:web:2c7a0479103a9085095fb7",
  measurementId: "G-ZL48QHPNZY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ================== UI Switches =====================
document.getElementById('reg-btn').addEventListener('click', () => {
  document.getElementById('register-div').style.display = "inline";
  document.getElementById('login-div').style.display = "none";
});

document.getElementById('log-btn').addEventListener('click', () => {
  document.getElementById('register-div').style.display = "none";
  document.getElementById('login-div').style.display = "inline";
});

// ================== Validation Functions =====================
function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

function validatePassword(password) {
  // At least 1 uppercase, 1 lowercase, 1 number, 6–12 characters
  const passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,12}$/;
  return passPattern.test(password);
}

function showResult(message, isError = false) {
  const resultBox = document.getElementById("result-box");
  const result = document.getElementById("result");
  resultBox.style.display = "inline";
  result.style.color = isError ? "red" : "white";
  result.innerHTML = message;
  document.getElementById("login-div").style.display = "none";
  document.getElementById("register-div").style.display = "none";
}

// ================== LOGIN =====================
document.getElementById('login-btn').addEventListener('click', () => {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!email || !password) {
    showResult("⚠ Please fill all fields.", true);
    return;
  }

  if (!validateEmail(email)) {
    showResult("❌ Invalid email format.", true);
    return;
  }

  if (!validatePassword(password)) {
    showResult("❌ Password must be 6–12 chars, include uppercase, lowercase, and a number.", true);
    return;
  }

  // If all valid, call Firebase
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      showResult("✅ Welcome back," +email+" ! Logged in successfully.");
    })
    .catch(error => {
      showResult("❌ " + error.message, true);
    });
});

// ================== REGISTER =====================
document.getElementById("register-btn").addEventListener('click', () => {
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();

  if (!email || !password) {
    showResult("⚠ Please fill all fields.", true);
    return;
  }

  if (!validateEmail(email)) {
    showResult("❌ Invalid email format.", true);
    return;
  }

  if (!validatePassword(password)) {
    showResult("❌ Password must be 6–12 chars, include uppercase, lowercase, and a number.", true);
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      showResult("🎉"+email+" was registered successfully.");
    })
    .catch(error => {
      showResult("❌ " + error.message, true);
    });
});

// ================== LOG OUT =====================
document.getElementById("log-out-btn").addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      document.getElementById("result-box").style.display = "none";
      document.getElementById("login-div").style.display = "inline";
    })
    .catch(error => {
      showResult("❌ " + error.message, true);
    });
});