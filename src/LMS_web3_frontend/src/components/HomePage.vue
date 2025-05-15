<template>
  <div class="home-page">
    <div class="content-wrapper">
      <h1 class="title">Welcome to <span class="highlight">Web3 LMS</span></h1>
      <p class="subtitle">
        A decentralized learning management system empowering students and teachers with blockchain technology.
      </p>

      <div class="button-container">
        <button @click="goToPage('student')" class="role-button student" aria-label="Student Role">
          Student
          <span class="btn-bg"></span>
        </button>
        <button @click="goToPage('teacher')" class="role-button teacher" aria-label="Teacher Role">
          Teacher
          <span class="btn-bg"></span>
        </button>
      </div>

      <p class="tagline">Start your journey in the future of education today.</p>
    </div>

    <!-- Floating shapes for extra vibe -->
    <div class="floating-shapes">
      <div class="shape circle"></div>
      <div class="shape square"></div>
      <div class="shape triangle"></div>
    </div>

    <footer>
      &copy; 2025 Web3 LMS. All rights reserved.
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    goToPage(role) {
      if (role === "student") {
        this.$router.push({ name: "student" });
      } else if (role === "teacher") {
        this.$router.push({ name: "teacher" });
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

.home-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #f0f4f8, #d9e3f0);
  color: #333;
  overflow: hidden;
  padding: 40px 20px 20px;
  position: relative;
  text-align: center;
}

/* Animated blurred blobs behind */
.home-page::before,
.home-page::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.25;
  animation: blobMove 20s infinite alternate ease-in-out;
  z-index: 0;
}

.home-page::before {
  width: 400px;
  height: 400px;
  background: #5498FF;
  top: 10%;
  left: -150px;
  animation-delay: 0s;
}

.home-page::after {
  width: 350px;
  height: 350px;
  background: #3a7bd5;
  bottom: 15%;
  right: -130px;
  animation-delay: 10s;
}

@keyframes blobMove {
  0% {
    transform: translate(0, 0) scale(1);
  }
  100% {
    transform: translate(40px, 30px) scale(1.1);
  }
}

/* Content wrapper fade-in */
.content-wrapper {
  max-width: 650px;
  margin-top: 50px;
  z-index: 1;
  animation: fadeInUp 1.2s ease forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
  from {
    opacity: 0;
    transform: translateY(25px);
  }
}

.title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #1a1a1a;
  text-shadow: 0 2px 6px rgba(84, 152, 255, 0.4);
}

.highlight {
  background: linear-gradient(90deg, #5498FF, #3a7bd5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 50px;
  color: #4a4a4a;
  line-height: 1.5;
}

/* Buttons container */
.button-container {
  display: flex;
  flex-direction: row;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 35px;
}

.role-button {
  position: relative;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
  padding: 18px 60px;
  border-radius: 50px;
  cursor: pointer;
  overflow: hidden;
  transition: color 0.4s ease;
  box-shadow: 0 8px 15px rgba(0,0,0,0.1);
  user-select: none;
  letter-spacing: 1.1px;
  z-index: 1;
}

.role-button .btn-bg {
  position: absolute;
  top: 0;
  left: -100%;
  width: 300%;
  height: 100%;
  background: linear-gradient(45deg, #5498FF, #3a7bd5);
  transition: transform 0.5s ease;
  z-index: -1;
  border-radius: 50px;
  filter: drop-shadow(0 5px 10px rgba(84, 152, 255, 0.5));
}

.role-button.student .btn-bg {
  background: linear-gradient(45deg, #6aa6ff, #3a7bd5);
  filter: drop-shadow(0 5px 10px rgba(84, 152, 255, 0.6));
}

.role-button.teacher .btn-bg {
  background: linear-gradient(135deg, #3a7bd5, #5498FF);
  filter: drop-shadow(0 5px 10px rgba(58, 123, 213, 0.6));
}

.role-button:hover .btn-bg {
  transform: translateX(33%);
}

.role-button:hover {
  color: #fff;
  box-shadow: 0 12px 25px rgba(58, 123, 213, 0.5);
  transition: box-shadow 0.3s ease;
}

.role-button:focus {
  outline: none;
  box-shadow: 0 0 10px 4px rgba(84, 152, 255, 0.7);
}

.tagline {
  font-style: italic;
  color: #666;
  font-size: 1.15rem;
  margin-bottom: 60px;
  user-select: none;
}

/* Floating shapes */
.floating-shapes {
  position: absolute;
  top: 10%;
  right: 10%;
  display: flex;
  gap: 30px;
  z-index: 0;
}

.shape {
  opacity: 0.12;
  animation: floatUpDown 6s ease-in-out infinite alternate;
}

.shape.circle {
  width: 70px;
  height: 70px;
  background: #5498FF;
  border-radius: 50%;
  animation-delay: 0s;
}

.shape.square {
  width: 60px;
  height: 60px;
  background: #3a7bd5;
  clip-path: polygon(10% 0%, 90% 0%, 100% 40%, 100% 90%, 90% 100%, 10% 100%, 0% 60%, 0% 10%);
  animation-delay: 2s;
}

.shape.triangle {
  width: 50px;
  height: 50px;
  background: #5498FF;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  animation-delay: 4s;
}

@keyframes floatUpDown {
  0% {
    transform: translateY(0);
    opacity: 0.12;
  }
  100% {
    transform: translateY(-15px);
    opacity: 0.2;
  }
}

/* Footer */
footer {
  font-size: 0.85rem;
  color: #999;
  margin-bottom: 10px;
  z-index: 1;
}

/* Responsive */
@media (max-width: 480px) {
  .content-wrapper {
    margin-top: 30px;
  }

  .title {
    font-size: 2.4rem;
  }

  .subtitle {
    font-size: 1rem;
    margin-bottom: 40px;
  }

  .button-container {
    gap: 20px;
  }

  .role-button {
    padding: 15px 45px;
    font-size: 1.1rem;
  }

  .tagline {
    font-size: 1rem;
    margin-bottom: 40px;
  }

  .floating-shapes {
    display: none;
  }
}
</style>
