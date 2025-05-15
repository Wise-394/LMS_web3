<template>
  <nav class="navbar" :class="{ 'menu-open': menuOpen }">
    <div class="nav-bg"></div>
    <button
      class="menu-button"
      @click="toggleMenu"
      :aria-expanded="menuOpen"
      aria-label="Toggle navigation"
    >
      <span :class="{ 'menu-icon': true, 'open': menuOpen }"></span>
    </button>

    <div class="nav-container" :class="{ 'open': menuOpen }">
      <ul class="nav-links">
        <li v-for="link in navLinks" :key="link.to">
          <router-link
            :to="link.to"
            class="nav-link"
            :class="{ 'active': isActive(link) }"
            @click="closeMenu"
          >
            <span class="link-icon" v-html="link.icon"></span>
            <span class="link-text">{{ link.label }}</span>
            <span class="active-indicator" :class="{ 'show': isActive(link) }"></span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  role: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const menuOpen = ref(false);

const studentLinks = [
  { 
    to: '/student',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>`,
    label: 'Home',
    name: 'student'
  },
  {
    to: '/student/subject',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>`,
    label: 'Subjects',
    name: 'subject'
  },
  {
    to: '/student/activities',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>`,
    label: 'Activities',
    name: 'activities'
  },
  {
    to: '/student/profile',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>`,
    label: 'Profile',
    name: 'profile'
  }
];

const teacherLinks = [
  {
    to: '/teacher',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>`,
    label: 'Home',
    name: 'teacher'
  },
  {
    to: '/teacher/classes',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
          </svg>`,
    label: 'Classes',
    name: 'classes'
  },
  {
    to: '/teacher/schedule',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
          </svg>`,
    label: 'Schedule',
    name: 'schedule'
  }
];

const navLinks = computed(() => {
  return props.role === 'student' ? studentLinks : teacherLinks;
});

const isActive = (link) => {
  return route.path === link.to || route.name === link.name;
};

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #0ea5e9, #2563eb);
  position: sticky;
  top: 64px; /* Height of header */
  z-index: 40;
  padding: 0.5rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.05);
}

.nav-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-link:hover {
  color: white;
  transform: translateY(-1px);
}

.nav-link:hover::before {
  opacity: 1;
}

.nav-link.active {
  color: white;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.15);
}

.nav-link.active::before {
  opacity: 1;
  background: rgba(255, 255, 255, 0.1);
}

.link-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  position: relative;
  z-index: 1;
}

.link-icon svg {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
  stroke: currentColor;
}

.nav-link:hover .link-icon svg {
  transform: scale(1.1);
}

.link-text {
  position: relative;
  z-index: 1;
}

.active-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: white;
  transform: scaleX(0);
  transition: transform 0.3s ease;
  border-radius: 3px;
  opacity: 0.9;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

.active-indicator.show {
  transform: scaleX(1);
}

/* Menu Button (Mobile) */
.menu-button {
  display: none;
  background: none;
  border: none;
  padding: 1rem;
  cursor: pointer;
  position: relative;
  z-index: 50;
}

.menu-icon {
  display: block;
  width: 24px;
  height: 2px;
  background: rgba(255, 255, 255, 0.9);
  position: relative;
  transition: background-color 0.3s ease;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background: rgba(255, 255, 255, 0.9);
  transition: transform 0.3s ease;
}

.menu-icon::before {
  top: -8px;
}

.menu-icon::after {
  bottom: -8px;
}

.menu-icon.open {
  background: transparent;
}

.menu-icon.open::before {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-icon.open::after {
  transform: rotate(-45deg) translate(5px, -5px);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar {
    padding: 0;
    background: transparent;
    border: none;
    box-shadow: none;
  }

  .menu-button {
    display: block;
    margin-left: 1rem;
  }

  .nav-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient(135deg, #0ea5e9, #2563eb);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    padding: 5rem 1.5rem 1.5rem;
    overflow-y: auto;
  }

  .nav-container.open {
    transform: translateX(0);
  }

  .nav-links {
    flex-direction: column;
    gap: 0.75rem;
  }

  .nav-link {
    padding: 1rem;
    width: 100%;
    border-radius: 12px;
    animation: slideIn 0.3s ease forwards;
    animation-delay: calc(var(--index) * 0.1s);
    opacity: 0;
    color: rgba(255, 255, 255, 0.8);
  }

  .nav-link:hover,
  .nav-link.active {
    background: rgba(255, 255, 255, 0.15);
    color: white;
  }

  .active-indicator {
    display: none;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .navbar {
    background: linear-gradient(135deg, #0369a1, #1e40af);
  }

  .nav-link {
    color: rgba(255, 255, 255, 0.7);
  }

  .nav-link:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }

  .nav-link.active {
    color: white;
    background: rgba(255, 255, 255, 0.15);
  }

  .active-indicator {
    background: white;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    .nav-container {
      background: linear-gradient(135deg, #0369a1, #1e40af);
    }

    .menu-icon,
    .menu-icon::before,
    .menu-icon::after {
      background: rgba(255, 255, 255, 0.9);
    }
  }
}
</style>
