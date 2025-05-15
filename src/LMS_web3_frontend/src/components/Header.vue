<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showProfileMenu = ref(false);
const showNotifications = ref(false);
const searchQuery = ref('');

// Mock notifications
const notifications = ref([
  {
    id: 1,
    type: 'assignment',
    message: 'New assignment posted in Filipino',
    time: '5 minutes ago',
    unread: true
  },
  {
    id: 2,
    type: 'grade',
    message: 'Your Math quiz has been graded',
    time: '1 hour ago',
    unread: true
  },
  {
    id: 3,
    type: 'announcement',
    message: 'Important: System maintenance scheduled',
    time: '2 hours ago',
    unread: false
  }
]);

const unreadCount = ref(2);

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value;
  if (showNotifications.value) showNotifications.value = false;
};

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  if (showProfileMenu.value) showProfileMenu.value = false;
};

const handleSearch = () => {
  // Implement search functionality
  console.log('Searching for:', searchQuery.value);
};

const logout = () => {
  router.push('/');
};

// Close dropdowns when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.closest('.profile-section') && !target.closest('.notifications-section')) {
      showProfileMenu.value = false;
      showNotifications.value = false;
    }
  });
});
</script>

<template>
  <header class="header">
    <div class="header-bg"></div>
    <div class="header-content">
      <!-- Logo Section -->
      <div class="logo-section">
        <router-link to="/" class="logo">
          <div class="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
              <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
              <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
              <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
            </svg>
          </div>
          <span class="logo-text">Web3 LMS</span>
        </router-link>
      </div>

      <!-- Search Section -->
      <div class="search-section">
        <div class="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="search-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Search courses, assignments..."
            @keyup.enter="handleSearch"
          >
        </div>
      </div>

      <!-- Right Section -->
      <div class="right-section">
        <!-- Notifications -->
        <div class="notifications-section">
          <button class="notification-button" @click="toggleNotifications">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="notification-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            <span v-if="unreadCount" class="notification-badge pulse">{{ unreadCount }}</span>
          </button>

          <!-- Notifications Dropdown -->
          <div v-if="showNotifications" class="notifications-dropdown">
            <div class="dropdown-header">
              <h3>Notifications</h3>
              <button class="mark-all-read">Mark all as read</button>
            </div>
            <div class="notifications-list">
              <div 
                v-for="notification in notifications" 
                :key="notification.id"
                class="notification-item"
                :class="{ unread: notification.unread }"
              >
                <span class="notification-type-icon" :class="notification.type">
                  <svg v-if="notification.type === 'assignment'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  <svg v-else-if="notification.type === 'grade'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
                  </svg>
                </span>
                <div class="notification-content">
                  <p class="notification-message">{{ notification.message }}</p>
                  <span class="notification-time">{{ notification.time }}</span>
                </div>
              </div>
            </div>
            <div class="dropdown-footer">
              <router-link to="/notifications">View all notifications</router-link>
            </div>
          </div>
        </div>

        <!-- Profile Section -->
        <div class="profile-section">
          <button class="profile-button" @click="toggleProfileMenu">
            <img 
              src="https://ui-avatars.com/api/?name=Juan+Dela+Cruz&background=5498FF&color=fff" 
              alt="Profile"
              class="profile-image"
            >
          </button>

          <!-- Profile Dropdown -->
          <div v-if="showProfileMenu" class="profile-dropdown">
            <div class="profile-header">
              <img 
                src="https://ui-avatars.com/api/?name=Juan+Dela+Cruz&background=5498FF&color=fff" 
                alt="Profile"
                class="large-profile-image"
              >
              <div class="profile-info">
                <h3>Juan Dela Cruz</h3>
                <p>Student</p>
              </div>
            </div>
            <div class="dropdown-links">
              <router-link to="/profile" class="dropdown-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                My Profile
              </router-link>
              <router-link to="/settings" class="dropdown-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </router-link>
              <router-link to="/help" class="dropdown-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
                Help Center
              </router-link>
              <button @click="logout" class="dropdown-item logout">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: linear-gradient(135deg, #0ea5e9, #2563eb);
  padding: 0.75rem 1.5rem;
  color: white;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  position: relative;
}

/* Logo Section */
.logo-section {
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
}

.logo-icon {
  width: 2rem;
  height: 2rem;
  color: white;
}

.logo-text {
  background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 700;
}

/* Search Section */
.search-section {
  flex-grow: 1;
  max-width: 600px;
}

.search-bar {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.search-bar:focus-within {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.search-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: rgba(255, 255, 255, 0.7);
  margin-right: 0.75rem;
}

.search-bar input {
  flex-grow: 1;
  border: none;
  background: transparent;
  padding: 0.5rem;
  font-size: 0.95rem;
  color: white;
  outline: none;
}

.search-bar input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

/* Right Section */
.right-section {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

/* Notifications */
.notifications-section {
  position: relative;
}

.notification-button {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 0.625rem;
  cursor: pointer;
  position: relative;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.notification-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.notification-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
}

.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  border-radius: 999px;
  font-weight: 600;
  border: 2px solid #0ea5e9;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.pulse {
  animation: pulse 2s infinite;
}

.notifications-dropdown {
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  width: 320px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
              0 8px 10px -6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transform-origin: top right;
  animation: dropdown 0.2s ease;
}

@keyframes dropdown {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.dropdown-header {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
}

.dropdown-header h3 {
  font-size: 1rem;
  color: #1e293b;
  margin: 0;
  font-weight: 600;
}

.mark-all-read {
  background: none;
  border: none;
  color: #2563eb;
  font-size: 0.875rem;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.2s ease;
}

.mark-all-read:hover {
  color: #1d4ed8;
}

.notifications-list {
  max-height: 400px;
  overflow-y: auto;
}

.notification-item {
  padding: 1rem;
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

.notification-item:hover {
  background-color: #f8fafc;
}

.notification-item.unread {
  background-color: #eff6ff;
}

.notification-type-icon {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  flex-shrink: 0;
}

.notification-type-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.notification-type-icon.assignment {
  background-color: #dbeafe;
  color: #2563eb;
}

.notification-type-icon.grade {
  background-color: #dcfce7;
  color: #16a34a;
}

.notification-type-icon.announcement {
  background-color: #fef3c7;
  color: #d97706;
}

.notification-content {
  flex-grow: 1;
}

.notification-message {
  margin: 0;
  font-size: 0.875rem;
  color: #1e293b;
  line-height: 1.4;
}

.notification-time {
  font-size: 0.75rem;
  color: #64748b;
  display: block;
  margin-top: 0.25rem;
}

.dropdown-footer {
  padding: 0.75rem;
  text-align: center;
  border-top: 1px solid #e5e7eb;
  background: #f8fafc;
}

.dropdown-footer a {
  color: #2563eb;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.dropdown-footer a:hover {
  color: #1d4ed8;
}

/* Profile Section */
.profile-section {
  position: relative;
}

.profile-button {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.profile-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.profile-image {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  object-fit: cover;
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  width: 280px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
              0 8px 10px -6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transform-origin: top right;
  animation: dropdown 0.2s ease;
}

.profile-header {
  padding: 1.25rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f8fafc;
}

.large-profile-image {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 12px;
  object-fit: cover;
}

.profile-info h3 {
  margin: 0;
  font-size: 1rem;
  color: #1e293b;
  font-weight: 600;
}

.profile-info p {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: #64748b;
}

.dropdown-links {
  padding: 0.5rem;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #1e293b;
  text-decoration: none;
  font-size: 0.875rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-weight: 500;
}

.dropdown-item svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #64748b;
  transition: color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f8fafc;
}

.dropdown-item:hover svg {
  color: #2563eb;
}

.dropdown-item.logout {
  color: #ef4444;
  width: 100%;
  text-align: left;
  border: none;
  background: none;
  font-size: 0.875rem;
  cursor: pointer;
}

.dropdown-item.logout svg {
  color: #ef4444;
}

.dropdown-item.logout:hover {
  background-color: #fef2f2;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header {
    padding: 0.75rem 1rem;
  }

  .logo-text {
    display: none;
  }

  .search-section {
    display: none;
  }

  .header-content {
    gap: 1rem;
  }

  .notification-button,
  .profile-button {
    padding: 0.5rem;
  }

  .notification-icon,
  .profile-image {
    width: 2rem;
    height: 2rem;
  }
}
</style>
