<template>
  <div class="home-page">
    <div class="content-wrapper">
      <h1 class="title">Welcome to <span class="highlight">Web3 LMS</span></h1>
      <p class="subtitle">
        A decentralized learning management system empowering students and teachers with blockchain technology.
      </p>

      <div class="button-container">
        <button @click="goToLogin" class="login-button" aria-label="Login">
          Login
          <span class="btn-bg"></span>
        </button>
      </div>

      <p class="tagline">Start your journey in the future of education today.</p>
    </div>

    <!-- Floating shapes for background effect -->
    <div class="floating-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
    </div>

    <footer>
      &copy; {{ currentYear }} Web3 LMS. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentYear = computed(() => new Date().getFullYear());

const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: 'Inter', system-ui, sans-serif;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  color: #0f172a;
  overflow: hidden;
  padding: 40px 20px;
  position: relative;
  text-align: center;
}

/* Background shapes */
.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.shape {
  position: absolute;
  background: linear-gradient(135deg, #0ea5e9, #2563eb);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  filter: blur(40px);
  opacity: 0.1;
  animation: floatAnimation 20s infinite alternate ease-in-out;
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  left: -150px;
}

.shape-2 {
  width: 400px;
  height: 400px;
  top: 40%;
  right: -200px;
  animation-delay: 5s;
}

.shape-3 {
  width: 200px;
  height: 200px;
  bottom: 10%;
  left: 10%;
  animation-delay: 10s;
}

.shape-4 {
  width: 250px;
  height: 250px;
  top: 20%;
  left: 30%;
  animation-delay: 15s;
}

@keyframes floatAnimation {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  100% {
    transform: translate(30px, 30px) rotate(60deg) scale(1.1);
  }
}

.content-wrapper {
  max-width: 650px;
  margin: auto;
  position: relative;
  z-index: 1;
  animation: fadeInUp 1.2s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;
  background: linear-gradient(135deg, #0ea5e9, #2563eb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(14, 165, 233, 0.2);
}

.subtitle {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 400;
  margin-bottom: 3rem;
  color: #64748b;
  line-height: 1.6;
}

.button-container {
  margin-bottom: 2rem;
}

.login-button {
  position: relative;
  background: linear-gradient(135deg, #0ea5e9, #2563eb);
  border: none;
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  padding: 1rem 3rem;
  border-radius: 50px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.3);
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(14, 165, 233, 0.4);
}

.login-button:active {
  transform: translateY(1px);
}

.tagline {
  font-size: 1.125rem;
  color: #64748b;
  margin-bottom: 2rem;
}

footer {
  color: #64748b;
  font-size: 0.875rem;
  margin-top: auto;
  padding: 1rem;
  z-index: 1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .home-page {
    padding: 20px;
  }
  
  .content-wrapper {
    padding: 0 1rem;
  }
  
  .login-button {
    width: 100%;
    max-width: 300px;
  }
}
</style>
