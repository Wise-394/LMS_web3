<template>
  <nav class="navbar">
    <button class="burger" @click="toggleMenu" :aria-expanded="menuOpen" aria-label="Toggle navigation">
      <span :class="{ 'burger-line': true, 'open': menuOpen }"></span>
      <span :class="{ 'burger-line': true, 'open': menuOpen }"></span>
      <span :class="{ 'burger-line': true, 'open': menuOpen }"></span>
    </button>

    <ul :class="['nav-links', { open: menuOpen }]">
      <!-- Student Links -->
      <template v-if="role === 'student'">
        <li><router-link to="/Student" class="nav-link" active-class="active" @click="closeMenu">Home</router-link></li>
        <li><router-link to="/student/subject" class="nav-link" active-class="active" @click="closeMenu">Subject</router-link></li>
        <li><router-link to="/student/activities" class="nav-link" active-class="active" @click="closeMenu">Activities</router-link></li>
        <li><router-link to="Profile" class="nav-link" active-class="active" @click="closeMenu">Profile</router-link></li>
      </template>

      <!-- Teacher Links -->
      <template v-else-if="role === 'teacher'">
        <li><router-link to="/teacher" class="nav-link" active-class="active" @click="closeMenu">Home</router-link></li>
        <li><router-link to="/teacher/classes" class="nav-link" active-class="active" @click="closeMenu">Classes</router-link></li>
        <li><router-link to="/teacher/schedule" class="nav-link" active-class="active" @click="closeMenu">Schedule</router-link></li>
      </template>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  role: {
    type: String,
    required: true
  }
});

const menuOpen = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}
</script>

<style scoped>
.navbar {
  background-color: #5498FF;
  padding: 14px 24px;
  position: sticky;
  top: 10;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Burger button */
.burger {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 28px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  box-sizing: border-box;
  z-index: 20;
}

.burger:focus {
  outline: none;
}

.burger-line {
  width: 100%;
  height: 3px;
  background-color: white;
  border-radius: 2px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
}

/* Animate burger lines when open */
.burger-line.open:nth-child(1) {
  transform: rotate(45deg);
  top: 8px;
  position: relative;
}

.burger-line.open:nth-child(2) {
  opacity: 0;
  transform: translateX(20px);
}

.burger-line.open:nth-child(3) {
  transform: rotate(-45deg);
  top: -8px;
  position: relative;
}

/* Nav links container */
.nav-links {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin: 0;
  padding: 0;
  max-width: 900px;
  width: 100%;
  transition: max-height 0.3s ease;
}

/* Nav links style */
.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 10px 18px;
  border-radius: 8px;
  transition: all 0.25s ease;
  white-space: nowrap; /* Prevent text wrapping */
}

.nav-link:hover {
  background-color: #3a7bd5;
  color: #fff;
}

.active {
  background-color: #ffffff;
  color: #5498FF;
  font-weight: 700;
}

/* Mobile styles */
@media (max-width: 768px) {
  .burger {
    display: flex;
  }

  .nav-links {
    flex-direction: column;
    overflow: hidden;
    max-height: 0;
    width: 100%;
    background-color: #5498FF;
    border-radius: 0 0 12px 12px;
    transition: max-height 0.3s ease;
    margin-top: 8px;
  }

  .nav-links.open {
    max-height: 500px; /* enough to show all links */
  }

  .nav-link {
    width: 100%;
    text-align: center;
    padding: 14px 0;
    white-space: normal;
    border-top: 1px solid rgba(255,255,255,0.2);
  }

  .nav-link:first-child {
    border-top: none;
  }
}
</style>
