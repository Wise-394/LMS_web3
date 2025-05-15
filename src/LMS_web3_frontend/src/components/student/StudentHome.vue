<script setup>
import { ref, computed } from 'vue';
import Header from '../Header.vue';
import Navbar from '../Navbar.vue';

// Time-based greeting
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

// Student data
const student = ref({
  name: 'Juan Dela Cruz',
  course: 'TVL',
  year: 'Grade 12',
  section: 'A',
});

// Quick stats
const stats = ref({
  tasks: { count: 5, label: 'Pending Tasks' },
  attendance: { count: '95%', label: 'Attendance Rate' },
  grades: { count: '88.5', label: 'Average Grade' },
});

// Upcoming deadlines
const deadlines = ref([
  {
    subject: 'Filipino',
    task: 'Essay Submission',
    due: '2025-05-20',
    priority: 'high'
  },
  {
    subject: 'Mathematics',
    task: 'Problem Set 3',
    due: '2025-05-22',
    priority: 'medium'
  },
  {
    subject: 'Science',
    task: 'Lab Report',
    due: '2025-05-25',
    priority: 'low'
  }
]);

// Recent activities
const activities = ref([
  {
    type: 'submission',
    subject: 'English',
    description: 'Submitted Book Report',
    time: '2 hours ago'
  },
  {
    type: 'quiz',
    subject: 'Mathematics',
    description: 'Completed Quiz on Calculus',
    time: '5 hours ago'
  },
  {
    type: 'attendance',
    subject: 'Science',
    description: 'Attended Laboratory Class',
    time: '1 day ago'
  }
]);

// School announcements
const announcements = ref([
  {
    title: 'Midterm Examination Schedule',
    content: 'Midterm examinations will be held from May 25-29, 2025. Please check your student portal for the detailed schedule.',
    date: '2025-05-15',
    teacher: 'Ms. Rodriguez'
  },
  {
    title: 'System Maintenance Notice',
    content: 'The LMS will undergo maintenance on May 20, 2025, from 12 AM to 4 AM.',
    date: '2025-05-14',
    teacher: 'System Admin'
  }
]);

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Computed properties
const sortedDeadlines = computed(() => {
  return [...deadlines.value].sort((a, b) => new Date(a.due) - new Date(b.due));
});
</script>

<template>
  <Header />
  <Navbar :role="'student'" />
  
  <div class="dashboard">
    <!-- Welcome Section -->
    <section class="welcome-section">
      <div class="welcome-text">
        <h1>{{ getGreeting() }}, {{ student.name }}! 👋</h1>
        <p>{{ student.course }} | {{ student.year }} - Section {{ student.section }}</p>
      </div>
    </section>

    <!-- Quick Stats -->
    <section class="stats-grid">
      <div v-for="(stat, key) in stats" :key="key" class="stat-card">
        <div class="stat-content">
          <h3>{{ stat.count }}</h3>
          <p>{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- Main Content Grid -->
    <div class="content-grid">
      <!-- Left Column -->
      <div class="left-column">
        <!-- Upcoming Deadlines -->
        <section class="deadlines-section">
          <h2>📅 Upcoming Deadlines</h2>
          <div class="deadlines-list">
            <div v-for="deadline in sortedDeadlines" :key="deadline.due" 
                 class="deadline-card" :class="deadline.priority">
              <div class="deadline-info">
                <h4>{{ deadline.subject }}</h4>
                <p>{{ deadline.task }}</p>
                <span class="due-date">Due: {{ formatDate(deadline.due) }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Recent Activities -->
        <section class="activities-section">
          <h2>🔔 Recent Activities</h2>
          <div class="activity-timeline">
            <div v-for="(activity, index) in activities" :key="index" class="activity-item">
              <div class="activity-content">
                <h4>{{ activity.subject }}</h4>
                <p>{{ activity.description }}</p>
                <span class="activity-time">{{ activity.time }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <!-- Announcements -->
        <section class="announcements-section">
          <h2>📢 Announcements</h2>
          <div class="announcements-list">
            <div v-for="(announcement, index) in announcements" :key="index" class="announcement-card">
              <h4>{{ announcement.title }}</h4>
              <p>{{ announcement.content }}</p>
              <div class="announcement-meta">
                <span class="announcement-date">Posted: {{ formatDate(announcement.date) }}</span>
                <span class="announcement-teacher">by {{ announcement.teacher }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

/* Welcome Section */
.welcome-section {
  background: linear-gradient(135deg, #5498FF, #3a7bd5);
  border-radius: 20px;
  padding: 2rem;
  color: white;
  margin-bottom: 2rem;
  box-shadow: 0 8px 20px rgba(84, 152, 255, 0.2);
}

.welcome-text h1 {
  font-size: 2rem;
  margin: 0;
  font-weight: 600;
}

.welcome-text p {
  margin-top: 0.5rem;
  opacity: 0.9;
  font-size: 1.1rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-content h3 {
  font-size: 1.8rem;
  color: #5498FF;
  margin: 0;
}

.stat-content p {
  margin: 0.5rem 0 0;
  color: #666;
  font-size: 0.9rem;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

/* Common Section Styles */
section {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.3rem;
  color: #333;
  margin: 0 0 1.5rem;
}

/* Deadlines Section */
.deadline-card {
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  border-left: 4px solid;
  background: #f8fafc;
}

.deadline-card.high { border-left-color: #ef4444; }
.deadline-card.medium { border-left-color: #f59e0b; }
.deadline-card.low { border-left-color: #10b981; }

.deadline-info h4 {
  margin: 0;
  color: #333;
}

.deadline-info p {
  margin: 0.3rem 0;
  color: #666;
}

.due-date {
  font-size: 0.85rem;
  color: #888;
}

/* Activities Section */
.activity-item {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-content h4 {
  margin: 0;
  color: #333;
}

.activity-content p {
  margin: 0.3rem 0;
  color: #666;
}

.activity-time {
  font-size: 0.85rem;
  color: #888;
}

/* Announcements Section */
.announcement-card {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.announcement-card:last-child {
  border-bottom: none;
}

.announcement-card h4 {
  margin: 0;
  color: #333;
}

.announcement-card p {
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.95rem;
}

.announcement-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #888;
}

.announcement-date {
  font-size: 0.85rem;
  color: #888;
}

.announcement-teacher {
  color: #555;
  font-style: italic;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .dashboard {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .welcome-text h1 {
    font-size: 1.5rem;
  }
  
  section {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    padding: 1rem;
  }
}
</style>
