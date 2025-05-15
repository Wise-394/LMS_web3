<template>
  <div class="login-container">
    <h2>Login to <span class="highlight">Web3 LMS</span></h2>
    <form @submit.prevent="handleLogin" novalidate>
      <div class="form-group">
        <label for="username">Username</label>
        <input
          v-model="username"
          id="username"
          type="text"
          autocomplete="username"
          required
          placeholder="Enter your username"
          :disabled="isLoading"
          autofocus
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="password"
          id="password"
          type="password"
          autocomplete="current-password"
          required
          placeholder="Enter your password"
          :disabled="isLoading"
        />
      </div>

      <button 
        type="submit" 
        class="login-button"
        :disabled="isLoading"
      >
        <span v-if="isLoading" class="spinner"></span>
        <span>{{ isLoading ? 'Logging in...' : 'Login' }}</span>
      </button>

      <p v-if="error" class="error" role="alert">{{ error }}</p>
    </form>

    <footer>
      &copy; 2025 Web3 LMS. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);
const router = useRouter();

const validateCredentials = (user, pass) => {
  if (!user.trim() || !pass.trim()) {
    return { isValid: false, message: "Please enter both username and password." };
  }
  
  // Check for student credentials
  if (user.toLowerCase() === "student" && pass === "student") {
    return { isValid: true, role: "student" };
  }
  
  // Check for teacher credentials
  if (user.toLowerCase() === "teacher" && pass === "teacher") {
    return { isValid: true, role: "teacher" };
  }
  
  return { isValid: false, message: "Invalid username or password." };
};

const handleLogin = async () => {
  try {
    error.value = "";
    isLoading.value = true;

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const validation = validateCredentials(username.value, password.value);

    if (!validation.isValid) {
      error.value = validation.message;
      return;
    }

    // Route based on role
    const route = validation.role === "student" ? "/student" : "/teacher";
    await router.push(route);

  } catch (err) {
    error.value = "An error occurred. Please try again.";
    console.error("Login error:", err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&display=swap");

.login-container {
  max-width: 420px;
  margin: 80px auto 40px;
  padding: 40px 30px 50px;
  background: linear-gradient(135deg, #f0f4f8, #d9e3f0);
  border-radius: 16px;
  box-shadow: 0 14px 35px rgba(84, 152, 255, 0.2);
  font-family: "Poppins", sans-serif;
  position: relative;
  text-align: center;
  animation: fadeInUp 1.2s ease forwards;
  opacity: 0;
}

.login-container::before {
  content: "";
  position: absolute;
  top: -100px;
  left: -100px;
  width: 180px;
  height: 180px;
  background: #5498ff;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.2;
  animation: blobMove 20s infinite alternate ease-in-out;
  z-index: 0;
}

.login-container::after {
  content: "";
  position: absolute;
  bottom: -80px;
  right: -90px;
  width: 140px;
  height: 140px;
  background: #3a7bd5;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.25;
  animation: blobMove 20s infinite alternate ease-in-out reverse;
  z-index: 0;
}

h2 {
  font-weight: 600;
  font-size: 2.4rem;
  margin-bottom: 25px;
  position: relative;
  z-index: 1;
  color: #1a1a1a;
}

.highlight {
  background: linear-gradient(90deg, #5498ff, #3a7bd5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.form-group {
  margin-bottom: 25px;
  text-align: left;
  position: relative;
  z-index: 1;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #444;
  user-select: none;
}

input {
  width: 100%;
  padding: 14px 15px;
  border-radius: 12px;
  border: 1.5px solid #ccc;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 3px 6px rgba(84, 152, 255, 0.05);
  font-family: "Poppins", sans-serif;
  outline-offset: 2px;
}

input::placeholder {
  color: #a9a9a9;
  font-weight: 400;
}

input:focus {
  border-color: #5498ff;
  box-shadow: 0 0 10px rgba(84, 152, 255, 0.5);
  outline: none;
}

.login-button {
  width: 100%;
  padding: 14px 0;
  font-size: 1.15rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(45deg, #5498ff, #3a7bd5);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(84, 152, 255, 0.4);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.login-button:not(:disabled):hover {
  box-shadow: 0 14px 30px rgba(58, 123, 213, 0.7);
  transform: scale(1.05);
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.error {
  margin-top: 18px;
  color: #e94b4b;
  font-weight: 600;
  user-select: none;
  position: relative;
  z-index: 1;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blobMove {
  0% {
    transform: translate(0, 0) scale(1);
  }
  100% {
    transform: translate(30px, 20px) scale(1.05);
  }
}

/* Responsive */
@media (max-width: 480px) {
  .login-container {
    margin: 40px 20px;
    padding: 30px 20px 40px;
  }

  h2 {
    font-size: 1.8rem;
  }

  input {
    padding: 12px 12px;
  }

  .login-button {
    padding: 12px 0;
    font-size: 1rem;
  }
}
</style>
