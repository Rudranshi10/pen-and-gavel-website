import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC4Yjfr1WqoM-PmEQxHq-Sj2BTQvmoBOkk",
  authDomain: "penandgavelposts.firebaseapp.com",
  databaseURL: "https://penandgavelposts-default-rtdb.firebaseio.com/",
  projectId: "penandgavelposts",
  storageBucket: "penandgavelposts.firebasestorage.app",
  messagingSenderId: "1094706446735",
  appId: "1:1094706446735:web:0d86c105c86ba51ab20bfa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Screen switching
const signupScreen = document.getElementById("signup-screen");
const loginScreen = document.getElementById("login-screen");
const goToLogin = document.getElementById("go-to-login");
const goToSignup = document.getElementById("go-to-signup");

goToLogin.addEventListener("click", () => {
  signupScreen.classList.remove("active");
  loginScreen.classList.add("active");
});

goToSignup.addEventListener("click", () => {
  loginScreen.classList.remove("active");
  signupScreen.classList.add("active");
});

// Redirect helper
function redirectBack() {
  const redirect = localStorage.getItem("redirectAfterLogin");
  if (redirect) {
    localStorage.removeItem("redirectAfterLogin");
    window.location.href = redirect;
  } else {
    // Go back to homepage
    window.location.href = "../index.html";
  }
}

// Email Signup
document.getElementById("signup-btn").addEventListener("click", () => {
  const email = document.getElementById("signup-email").value.trim();
  const pass = document.getElementById("signup-password").value.trim();
  
  if (!email || !pass) {
    alert("Please fill in all fields");
    return;
  }
  
  createUserWithEmailAndPassword(auth, email, pass)
    .then(() => redirectBack())
    .catch(e => alert(e.message));
});

// Email Login
document.getElementById("login-btn").addEventListener("click", () => {
  const email = document.getElementById("login-email").value.trim();
  const pass = document.getElementById("login-password").value.trim();
  
  if (!email || !pass) {
    alert("Please fill in all fields");
    return;
  }
  
  signInWithEmailAndPassword(auth, email, pass)
    .then(() => redirectBack())
    .catch(e => alert(e.message));
});

// Google Login (both buttons)
document.getElementById("google-login").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(() => redirectBack())
    .catch(e => alert(e.message));
});

document.getElementById("google-signup").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(() => redirectBack())
    .catch(e => alert(e.message));
});