<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToPage = (role) => {
  if (role === 'index') {
    router.push({ name: 'index' });
  } else {
    console.log('Unknown role');
  }
};
</script>

<template>
  <header class="header">
    <div class="header-left">
      <p class="title">📊 Dashboard</p>
      <p class="welcome">Welcome back, User!</p>
    </div>
    <button class="logout-btn" @click="goToPage('index')" aria-label="Logout">
      🔓 Logout
    </button>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #5498FF, #3a7bd5);
  padding: 20px 30px;
  color: white;
  border-bottom: 4px solid #3a7bd5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  flex-wrap: wrap;
  font-family: 'Poppins', sans-serif;
  z-index: 10;
}

.header-left {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  user-select: none;
}

.welcome {
  font-size: 16px;
  margin-top: 6px;
  opacity: 0.85;
  user-select: none;
  font-weight: 500;
}

.logout-btn {
  background: rgba(255 255 255 / 0.15);
  color: #fff;
  border: 2px solid transparent;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 0.4s ease;
  box-shadow: 0 4px 15px rgba(84, 152, 255, 0.4);
  user-select: none;
}

.logout-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 300%;
  height: 100%;
  background: linear-gradient(45deg, #6aa6ff, #3a7bd5);
  filter: drop-shadow(0 5px 10px rgba(84, 152, 255, 0.5));
  border-radius: 30px;
  transition: transform 0.5s ease;
  z-index: -1;
}

.logout-btn:hover::before {
  transform: translateX(33%);
}

.logout-btn:hover {
  color: white;
  box-shadow: 0 10px 30px rgba(58, 123, 213, 0.6);
  border-color: #5498FF;
  transform: scale(1.05);
}

.logout-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 10px 3px rgba(84, 152, 255, 0.8);
}

@media (max-width: 600px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .logout-btn {
    align-self: flex-end;
    padding: 10px 20px;
    font-size: 13px;
  }
}
</style>
