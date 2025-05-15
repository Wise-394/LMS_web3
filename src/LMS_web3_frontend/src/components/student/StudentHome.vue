<script setup>
import { ref } from 'vue';
import Header from '../Header.vue';
import Navbar from '../Navbar.vue';
import ListItem from '../ListItem.vue';

// Sample progress values
const progress1 = ref(40); 
const progress2 = ref(90);

// Sample announcements arrays
const teacherAnnouncements = ref([
  {
    subject: "Filipino",
    teacher: "G. Santos",
    message: "📢 Paalala: Ang deadline ng assignment ay sa Biyernes, 5:00 PM. Pakisigurado na ito ay maipasa sa oras."
  },
  {
    subject: "Mathematics",
    teacher: "Ms. Garcia",
    message: "Reminder: Mag-prepare para sa quiz sa darating na Lunes. Study the lessons on derivatives and integrals."
  },
  {
    subject: "Science",
    teacher: "Mr. Reyes",
    message: "Please check your grades on the recent lab report. If you have any questions, don't hesitate to ask."
  }
]);

const schoolAnnouncements = ref([
  {
    subject: "General Reminder",
    teacher: "Admin",
    message: "School is closed on May 15th in observance of a national holiday. Enjoy the break!"
  },
  {
    subject: "Upcoming Event",
    teacher: "Admin",
    message: "The annual school sports fest will be held on June 5th. Prepare your team and join the fun!"
  }
]);
</script>

<template>
  <Header />
  <Navbar :role="'student'" />

  <div class="dashboard-container">
    <!-- Sidebar Section -->
    <div class="sidebar">
      <div class="stats-section">
        <!-- <ListItem :progress="progress1" label="Assignment Progress" /> -->
        <ListItem :progress="progress2" label="Attendance" />
      </div>
    </div>

    <!-- Main Content Section -->
    <div class="main-content">
      <h2>📊 Student Dashboard</h2>

       <!-- School Announcements Section -->
      <div class="announcement-section">
        <h3>🏫 School Announcements</h3>
        <div v-for="(announcement, index) in schoolAnnouncements" :key="index" class="announcement-card">
          <div class="announcement-header">
            <span class="announcement-subject">{{ announcement.subject }}</span> - 
            <span class="announcement-teacher">by {{ announcement.teacher }}</span>
          </div>
          <p class="announcement-text">{{ announcement.message }}</p>
        </div>
      </div>

      <!-- Teacher's Announcements Section -->
      <div class="announcement-section">
        <h3>🗒️ Teacher’s Announcements</h3>
        <div v-for="(announcement, index) in teacherAnnouncements" :key="index" class="announcement-card">
          <div class="announcement-header">
            <span class="announcement-subject">{{ announcement.subject }}</span> - 
            <span class="announcement-teacher">by {{ announcement.teacher }}</span>
          </div>
          <p class="announcement-text">{{ announcement.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', sans-serif;
}

.dashboard-container {
  display: flex;
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;
}

.sidebar {
  width: 220px; 
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-right: 20px; /* Reduced margin */
}

.stats-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-content {
  flex-grow: 1;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 900px;
}

h2 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 30px;
  color: #333;
}

.announcement-section {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centering the announcements */
  justify-content: center; /* Centering content vertically */
}

.announcement-section h3 {
  font-size: 22px;
  color: #5498FF;
  margin-bottom: 20px;
  text-align: center;
}

.announcement-card {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px; /* Added max-width to prevent cards from stretching too wide */
}

.announcement-header {
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.announcement-subject {
  font-weight: bold;
  color: #333;
}

.announcement-teacher {
  font-style: italic;
  color: #888;
}

.announcement-text {
  font-size: 16px;
  color: #444;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .dashboard-container {
    flex-direction: column;
    padding: 20px;
  }

  .sidebar {
    width: 100%;
    margin-bottom: 30px;
  }

  .main-content {
    width: 100%;
  }
}
</style>
