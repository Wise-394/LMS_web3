<template>
  <nav class="navbar">
    <button
      class="burger"
      @click="toggleMenu"
      :aria-expanded="menuOpen"
      aria-label="Toggle navigation"
    >
      <span :class="{ 'burger-line': true, 'open': menuOpen }"></span>
      <span :class="{ 'burger-line': true, 'open': menuOpen }"></span>
      <span :class="{ 'burger-line': true, 'open': menuOpen }"></span>
    </button>

    <ul :class="['nav-links', { open: menuOpen }]">
      <!-- Student Links -->
      <template v-if="role === 'student'">
        <li>
          <router-link
            to="/Student"
            class="nav-link"
            active-class="active"
            @click="closeMenu"
            >Home</router-link
          >
        </li>
        <li>
          <router-link
            to="/student/subject"
            class="nav-link"
            active-class="active"
            @click="closeMenu"
            >Subject</router-link
          >
        </li>
        <li>
          <router-link
            to="/student/activities"
            class="nav-link"
            active-class="active"
            @click="closeMenu"
            >Activities</router-link
          >
        </li>
        <li>
          <router-link
            to="Profile"
            class="nav-link"
            active-class="active"
            @click="closeMenu"
            >Profile</router-link
          >
        </li>
      </template>

      <!-- Teacher Links -->
      <template v-else-if="role === 'teacher'">
        <li>
          <router-link
            to="/teacher"
            class="nav-link"
            active-class="active"
            @click="closeMenu"
            >Home</router-link
          >
        </li>
        <li>
          <router-link
            to="/teacher/classes"
            class="nav-link"
            active-class="active"
            @click="closeMenu"
            >Classes</router-link
          >
        </li>
        <li>
          <router-link
            to="/teacher/schedule"
            class="nav-link"
            active-class="active"
            @click="closeMenu"
            >Schedule</router-link
          >
        </li>
      </template>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  role: {
    type: String,
    required: true,
  },
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
  background: linear-gradient(90deg, #4a8fff, #5ca3ff);
  padding: 16px 28px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 6px 18px rgba(84, 152, 255, 0.25);

  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Poppins", sans-serif;
}

/* Burger button */
.burger {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 26px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  box-sizing: border-box;
  z-index: 110;
}

.burger:focus {
  outline: 2px solid #cce4ff;
  outline-offset: 4px;
}

.burger-line {
  width: 100%;
  height: 3px;
  background-color: white;
  border-radius: 3px;
  transition: transform 0.4s ease, opacity 0.4s ease;
  transform-origin: center;
}

/* Animate burger lines when open */
.burger-line.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.burger-line.open:nth-child(2) {
  opacity: 0;
  transform: translateX(30px);
}

.burger-line.open:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Nav links container */
.nav-links {
  list-style: none;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
  margin: 0;
  padding: 0;
  max-width: 900px;
  width: 100%;
  transition: max-height 0.4s ease, opacity 0.4s ease;
  opacity: 1;
}

/* Nav links style */
.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 12px 22px;
  border-radius: 12px;
  transition: background-color 0.3s ease, color 0.3s ease,
    box-shadow 0.3s ease;
  white-space: nowrap; /* Prevent text wrapping */
  box-shadow: inset 0 0 0 0 transparent;
}

.nav-link:hover,
.nav-link:focus-visible {
  background-color: #3a7bd5;
  color: #fff;
  box-shadow: 0 4px 15px rgba(58, 123, 213, 0.6);
  outline: none;
}

.active {
  background-color: #ffffff;
  color: #5498ff;
  font-weight: 700;
  box-shadow: 0 4px 20px rgba(84, 152, 255, 0.5);
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
    opacity: 0;
    width: 100%;
    background: linear-gradient(180deg, #4a8fff, #5ca3ff);
    border-radius: 0 0 14px 14px;
    margin-top: 12px;
    transition: max-height 0.5s ease, opacity 0.5s ease;
  }

  .nav-links.open {
    max-height: 500px; /* enough to show all links */
    opacity: 1;
  }

  .nav-link {
    width: 100%;
    text-align: center;
    padding: 16px 0;
    white-space: normal;
    border-top: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: none;
  }

  .nav-link:first-child {
    border-top: none;
  }
}
</style>
