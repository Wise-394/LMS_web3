<template>
  <div class="app-container">
    <!-- Navigation Sidebar -->
    <nav class="sidebar" :class="{ 'sidebar-collapsed': isCollapsed }">
      <div class="sidebar-header">
        <img src="../../assets/logo.svg" alt="LMS Logo" class="logo" />
        <button @click="toggleSidebar" class="collapse-btn">
          <span class="material-icons">{{ isCollapsed ? 'chevron_right' : 'chevron_left' }}</span>
        </button>
      </div>

      <div class="nav-links">
        <router-link to="/dashboard" class="nav-item" :class="{ active: currentRoute === '/dashboard' }">
          <span class="material-icons">dashboard</span>
          <span class="nav-text" v-show="!isCollapsed">Dashboard</span>
        </router-link>

        <router-link to="/courses" class="nav-item" :class="{ active: currentRoute === '/courses' }">
          <span class="material-icons">school</span>
          <span class="nav-text" v-show="!isCollapsed">Courses</span>
        </router-link>

        <router-link to="/assignments" class="nav-item" :class="{ active: currentRoute === '/assignments' }">
          <span class="material-icons">assignment</span>
          <span class="nav-text" v-show="!isCollapsed">Assignments</span>
        </router-link>

        <router-link to="/grades" class="nav-item" :class="{ active: currentRoute === '/grades' }">
          <span class="material-icons">grade</span>
          <span class="nav-text" v-show="!isCollapsed">Grades</span>
        </router-link>

        <router-link to="/calendar" class="nav-item" :class="{ active: currentRoute === '/calendar' }">
          <span class="material-icons">calendar_today</span>
          <span class="nav-text" v-show="!isCollapsed">Calendar</span>
        </router-link>
      </div>

      <div class="sidebar-footer">
        <div class="user-info" v-if="!isCollapsed">
          <img src="../../assets/default-avatar.png" alt="User Avatar" class="user-avatar" />
          <div class="user-details">
            <span class="user-name">John Doe</span>
            <span class="user-role">Student</span>
          </div>
        </div>
        <button @click="handleLogout" class="logout-btn">
          <span class="material-icons">logout</span>
          <span class="nav-text" v-show="!isCollapsed">Logout</span>
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content" :class="{ 'content-expanded': isCollapsed }">
      <!-- Top Header -->
      <header class="top-header">
        <div class="header-left">
          <h1 class="page-title">{{ pageTitle }}</h1>
        </div>
        <div class="header-right">
          <div class="search-bar">
            <span class="material-icons">search</span>
            <input type="text" placeholder="Search..." />
          </div>
          <button class="notification-btn">
            <span class="material-icons">notifications</span>
            <span class="notification-badge">3</span>
          </button>
        </div>
      </header>

      <!-- Page Content -->
      <div class="page-content">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const isCollapsed = ref(false);
const currentRoute = computed(() => route.path);
const pageTitle = computed(() => {
  const titles = {
    '/dashboard': 'Dashboard',
    '/courses': 'My Courses',
    '/assignments': 'Assignments',
    '/grades': 'Grades',
    '/calendar': 'Calendar'
  };
  return titles[route.path] || 'Dashboard';
});

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const handleLogout = async () => {
  // Clear any stored data
  localStorage.removeItem('userRole');
  // Redirect to login
  await router.push('/');
};
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
}

/* Sidebar Styles */
.sidebar {
  width: 280px;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  color: #fff;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 1000;
}

.sidebar-collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  height: 40px;
  width: auto;
}

.collapse-btn {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.collapse-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-links {
  padding: 1rem 0;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.2s ease;
  gap: 1rem;
}

.nav-item:hover, .nav-item.active {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-item .material-icons {
  font-size: 1.5rem;
}

.sidebar-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  color: #fff;
}

.user-role {
  font-size: 0.875rem;
  color: #94a3b8;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 0.75rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Main Content Styles */
.main-content {
  margin-left: 280px;
  flex: 1;
  transition: all 0.3s ease;
  min-height: 100vh;
}

.content-expanded {
  margin-left: 80px;
}

.top-header {
  background: #fff;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f1f5f9;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  width: 300px;
}

.search-bar input {
  border: none;
  background: none;
  outline: none;
  width: 100%;
  font-size: 0.95rem;
}

.search-bar .material-icons {
  color: #64748b;
}

.notification-btn {
  position: relative;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.notification-btn:hover {
  background-color: #f1f5f9;
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ef4444;
  color: #fff;
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  border-radius: 999px;
  border: 2px solid #fff;
}

.page-content {
  padding: 2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    position: fixed;
  }

  .sidebar-collapsed {
    transform: translateX(0);
    width: 280px;
  }

  .main-content {
    margin-left: 0;
  }

  .content-expanded {
    margin-left: 0;
  }

  .search-bar {
    display: none;
  }
}
</style> 