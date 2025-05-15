<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../Header.vue';
import Navbar from '../Navbar.vue';

const router = useRouter();
const goBack = () => router.back();

// Module management
const newPostTitle = ref('');
const newPostContent = ref('');
const selectedPostType = ref('module');
const postTypes = ['module', 'assignment', 'quiz', 'announcement'];

// List of module posts
const posts = ref([
  {
    id: 1,
    title: "Chapter 1: Wika at Lipunan",
    type: "module",
    date: "2025-05-10",
    content: "Sa modyul na ito, tatalakayin natin ang papel ng wika sa lipunan at kung paano ito ginagamit bilang instrumento ng komunikasyon at kultura.",
    attachments: ['lesson_plan.pdf', 'slides.pptx'],
    status: 'published',
    dueDate: '2025-05-17',
    submissions: 28,
    totalStudents: 31
  },
  {
    id: 2,
    title: "Quiz 1: Kasaysayan ng Wikang Filipino",
    type: "quiz",
    date: "2025-05-08",
    content: "Pagsusulit ukol sa ebolusyon ng wikang Filipino mula sa katutubong wika hanggang sa kasalukuyang anyo nito.",
    status: 'active',
    dueDate: '2025-05-15',
    submissions: 25,
    totalStudents: 31,
    averageScore: 85
  },
  {
    id: 3,
    title: "Assignment: Pagsusuri ng Barayti ng Wika",
    type: "assignment",
    date: "2025-05-06",
    content: "Gumawa ng sanaysay tungkol sa iba't ibang barayti ng wika sa inyong komunidad.",
    status: 'past_due',
    dueDate: '2025-05-13',
    submissions: 30,
    totalStudents: 31,
    averageScore: 88
  },
  {
    id: 4,
    title: "Announcement: Upcoming Guest Speaker",
    type: "announcement",
    date: "2025-05-04",
    content: "Magkakaroon tayo ng panauhing tagapagsalita tungkol sa modernong panitikan sa susunod na linggo.",
    status: 'active'
  }
]);

// Student attendance data
const students = ref([
  { 
    id: 1,
    name: 'Juan Dela Cruz',
    status: 'present',
    attendance: 95,
    grade: 88,
    lastActive: '2 hours ago'
  },
  { 
    id: 2,
    name: 'Maria Clara',
    status: 'present',
    attendance: 98,
    grade: 92,
    lastActive: '1 hour ago'
  },
  { 
    id: 3,
    name: 'Jose Rizal',
    status: 'absent',
    attendance: 85,
    grade: 90,
    lastActive: '1 day ago'
  },
  { 
    id: 4,
    name: 'Andres Bonifacio',
    status: 'present',
    attendance: 92,
    grade: 85,
    lastActive: '30 minutes ago'
  },
  { 
    id: 5,
    name: 'Emilio Aguinaldo',
    status: 'present',
    attendance: 90,
    grade: 87,
    lastActive: '15 minutes ago'
  }
]);

// Today's activities
const activities = ref([
  { 
    name: 'Group Discussion',
    time: '10:00 AM',
    type: 'discussion',
    participants: 15,
    status: 'upcoming'
  },
  { 
    name: 'Quiz: Kasaysayan ng Wika',
    time: '11:30 AM',
    type: 'quiz',
    participants: 31,
    status: 'completed'
  },
  { 
    name: 'Project Presentation',
    time: '1:30 PM',
    type: 'presentation',
    participants: 8,
    status: 'in_progress'
  },
  { 
    name: 'Class Reflection',
    time: '3:00 PM',
    type: 'activity',
    participants: 0,
    status: 'upcoming'
  }
]);

// Computed properties
const attendanceStats = computed(() => {
  const total = students.value.length;
  const present = students.value.filter(s => s.status === 'present').length;
  return {
    total,
    present,
    absent: total - present,
    rate: Math.round((present / total) * 100)
  };
});

const classStats = computed(() => {
  const grades = students.value.map(s => s.grade);
  return {
    averageGrade: Math.round(grades.reduce((a, b) => a + b) / grades.length),
    highestGrade: Math.max(...grades),
    lowestGrade: Math.min(...grades)
  };
});

// Methods
const addPost = () => {
  if (newPostTitle.value.trim() && newPostContent.value.trim()) {
    const today = new Date().toISOString().split('T')[0];
    posts.value.unshift({
      id: posts.value.length + 1,
      title: newPostTitle.value.trim(),
      type: selectedPostType.value,
      date: today,
      content: newPostContent.value.trim(),
      status: 'draft',
      submissions: 0,
      totalStudents: students.value.length
    });
    newPostTitle.value = '';
    newPostContent.value = '';
    selectedPostType.value = 'module';
  }
};

const getStatusClass = (status) => {
  const classes = {
    present: 'status-present',
    absent: 'status-absent',
    published: 'status-published',
    active: 'status-active',
    past_due: 'status-past-due',
    draft: 'status-draft',
    upcoming: 'status-upcoming',
    in_progress: 'status-in-progress',
    completed: 'status-completed'
  };
  return classes[status] || '';
};

const getTypeIcon = (type) => {
  const icons = {
    module: '📚',
    quiz: '📝',
    assignment: '✍️',
    announcement: '📢',
    discussion: '💭',
    presentation: '🎯',
    activity: '🎨'
  };
  return icons[type] || '📄';
};
</script>

<template>
  <div>
    <Header />
    <Navbar :role="'teacher'" />
    
    <div class="classroom-layout">
      <!-- Left Sidebar: Attendance -->
      <aside class="sidebar">
        <div class="attendance-overview">
          <h2>📋 Today's Attendance</h2>
          <div class="attendance-stats">
            <div class="stat-circle">
              <svg viewBox="0 0 36 36" class="circular-chart">
                <path d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
                  stroke-width="3"
                />
                <path d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  :stroke="attendanceStats.rate > 75 ? '#4CAF50' : '#FFC107'"
                  stroke-width="3"
                  :stroke-dasharray="`${attendanceStats.rate}, 100`"
                />
                <text x="18" y="20.35" class="percentage">{{ attendanceStats.rate }}%</text>
              </svg>
            </div>
            <div class="quick-stats">
              <div class="quick-stat">
                <span class="label">Present</span>
                <span class="value">{{ attendanceStats.present }}</span>
              </div>
              <div class="quick-stat">
                <span class="label">Absent</span>
                <span class="value">{{ attendanceStats.absent }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="student-list">
          <h3>Students</h3>
          <div class="student-item" v-for="student in students" :key="student.id">
            <div class="student-info">
              <span class="student-name">{{ student.name }}</span>
              <span :class="['status-badge', getStatusClass(student.status)]">
                {{ student.status }}
              </span>
            </div>
            <div class="student-stats">
              <span class="stat">
                <span class="label">Attendance:</span>
                <span class="value">{{ student.attendance }}%</span>
              </span>
              <span class="stat">
                <span class="label">Grade:</span>
                <span class="value">{{ student.grade }}%</span>
              </span>
              <span class="last-active">Last active: {{ student.lastActive }}</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="classroom-container">
        <button class="back-button" @click="goBack">← Back</button>

        <div class="classroom-header">
          <div class="header-content">
            <h1>📘 Filipino</h1>
            <p>Section 10 - Mabini | School Year 2024–2025</p>
          </div>
          <div class="class-stats">
            <div class="stat-card">
              <span class="stat-title">Average Grade</span>
              <span class="stat-value">{{ classStats.averageGrade }}%</span>
            </div>
            <div class="stat-card">
              <span class="stat-title">Highest Grade</span>
              <span class="stat-value">{{ classStats.highestGrade }}%</span>
            </div>
            <div class="stat-card">
              <span class="stat-title">Lowest Grade</span>
              <span class="stat-value">{{ classStats.lowestGrade }}%</span>
            </div>
          </div>
        </div>

        <section class="content-section">
          <div class="section-header">
            <h2>📚 Course Content</h2>
            <button class="add-content-btn">+ Add Content</button>
          </div>

          <!-- Add new post form -->
          <div class="create-post">
            <div class="form-group">
              <label>Type</label>
              <select v-model="selectedPostType" class="post-type-select">
                <option v-for="type in postTypes" :key="type" :value="type">
                  {{ type.charAt(0).toUpperCase() + type.slice(1) }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Title</label>
              <input
                v-model="newPostTitle"
                type="text"
                placeholder="Enter title"
                class="post-input"
              />
            </div>
            <div class="form-group">
              <label>Content</label>
              <textarea
                v-model="newPostContent"
                placeholder="Enter content"
                class="post-textarea"
              ></textarea>
            </div>
            <div class="form-actions">
              <button class="secondary-btn">Save as Draft</button>
              <button class="primary-btn" @click="addPost">Publish</button>
            </div>
          </div>

          <!-- Content list -->
          <div class="content-list">
            <div 
              v-for="post in posts" 
              :key="post.id"
              class="content-card"
            >
              <div class="content-header">
                <span class="content-type">{{ getTypeIcon(post.type) }}</span>
                <span :class="['status-badge', getStatusClass(post.status)]">
                  {{ post.status }}
                </span>
              </div>
              
              <div class="content-body">
                <h3>{{ post.title }}</h3>
                <p>{{ post.content }}</p>
                
                <div class="content-meta">
                  <span class="date">Posted: {{ post.date }}</span>
                  <span v-if="post.dueDate" class="due-date">Due: {{ post.dueDate }}</span>
                </div>

                <div v-if="post.submissions !== undefined" class="submission-stats">
                  <div class="submission-progress">
                    <div 
                      class="progress-bar"
                      :style="{ width: `${(post.submissions / post.totalStudents) * 100}%` }"
                    ></div>
                  </div>
                  <span class="submission-text">
                    {{ post.submissions }}/{{ post.totalStudents }} submissions
                  </span>
                </div>

                <div v-if="post.averageScore" class="score-info">
                  Average Score: {{ post.averageScore }}%
                </div>

                <div class="content-actions">
                  <button class="action-btn">Edit</button>
                  <button class="action-btn">View Details</button>
                  <button v-if="post.type !== 'announcement'" class="action-btn">
                    Grade
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- Right Sidebar: Activities -->
      <aside class="activity-list">
        <h2>🗓️ Today's Schedule</h2>
        <div class="activities-timeline">
          <div 
            v-for="activity in activities" 
            :key="activity.name"
            class="activity-item"
          >
            <div class="activity-time">{{ activity.time }}</div>
            <div class="activity-content">
              <div class="activity-header">
                <span class="activity-icon">{{ getTypeIcon(activity.type) }}</span>
                <span :class="['status-badge', getStatusClass(activity.status)]">
                  {{ activity.status }}
                </span>
              </div>
              <h4>{{ activity.name }}</h4>
              <div class="activity-meta">
                <span>{{ activity.participants }} participants</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.classroom-layout {
  display: grid;
  grid-template-columns: 300px 1fr 280px;
  gap: 24px;
  max-width: 1600px;
  margin: 24px auto;
  padding: 0 24px;
  font-family: 'Inter', system-ui, sans-serif;
}

/* Sidebar Styles */
.sidebar,
.activity-list {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  height: fit-content;
}

.attendance-overview {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.attendance-overview h2 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.attendance-stats {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-circle {
  width: 100px;
  height: 100px;
}

.circular-chart {
  width: 100%;
  height: 100%;
}

.percentage {
  font-size: 0.5em;
  text-anchor: middle;
  font-weight: 600;
  fill: #333;
}

.quick-stats {
  flex: 1;
}

.quick-stat {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.student-list {
  padding: 20px;
}

.student-list h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.student-item {
  padding: 12px;
  border-radius: 8px;
  background: #f9fafb;
  margin-bottom: 8px;
}

.student-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.student-name {
  font-weight: 500;
}

.student-stats {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.85rem;
}

.stat {
  display: flex;
  justify-content: space-between;
  color: #6b7280;
}

.last-active {
  font-size: 0.8rem;
  color: #9ca3af;
}

/* Main Content Styles */
.classroom-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 24px;
  position: relative;
}

.back-button {
  position: absolute;
  top: 24px;
  left: 24px;
  padding: 8px 16px;
  border: none;
  background: #f3f4f6;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.back-button:hover {
  background: #e5e7eb;
}

.classroom-header {
  padding: 40px 24px 24px;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  border-radius: 12px;
  color: white;
  margin-bottom: 24px;
}

.header-content h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.class-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 24px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 16px;
  border-radius: 8px;
  text-align: center;
}

.stat-title {
  font-size: 0.9rem;
  opacity: 0.9;
  display: block;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
}

.content-section {
  padding: 24px 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.add-content-btn {
  padding: 8px 16px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.add-content-btn:hover {
  background: #1d4ed8;
}

.create-post {
  background: #f9fafb;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
}

.post-type-select,
.post-input,
.post-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.95rem;
}

.post-textarea {
  min-height: 120px;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.primary-btn,
.secondary-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.primary-btn {
  background: #2563eb;
  color: white;
  border: none;
}

.secondary-btn {
  background: white;
  border: 1px solid #d1d5db;
}

.content-list {
  display: grid;
  gap: 16px;
}

.content-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.content-header {
  padding: 16px;
  background: #f9fafb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-type {
  font-size: 1.2rem;
}

.content-body {
  padding: 16px;
}

.content-body h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.content-meta {
  display: flex;
  gap: 16px;
  font-size: 0.9rem;
  color: #6b7280;
  margin: 12px 0;
}

.submission-stats {
  margin: 12px 0;
}

.submission-progress {
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 4px;
}

.progress-bar {
  height: 100%;
  background: #2563eb;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.submission-text {
  font-size: 0.9rem;
  color: #6b7280;
}

.score-info {
  font-weight: 500;
  color: #059669;
  margin: 8px 0;
}

.content-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.action-btn {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

/* Activity List Styles */
.activities-timeline {
  padding: 20px;
}

.activity-item {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.activity-time {
  font-size: 0.9rem;
  color: #6b7280;
  width: 80px;
}

.activity-content {
  flex: 1;
  background: #f9fafb;
  border-radius: 8px;
  padding: 12px;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.activity-icon {
  font-size: 1.2rem;
}

.activity-content h4 {
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 4px;
}

.activity-meta {
  font-size: 0.85rem;
  color: #6b7280;
}

/* Status Badges */
.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-present {
  background: #dcfce7;
  color: #15803d;
}

.status-absent {
  background: #fee2e2;
  color: #b91c1c;
}

.status-published {
  background: #dbeafe;
  color: #1d4ed8;
}

.status-active {
  background: #dcfce7;
  color: #15803d;
}

.status-past-due {
  background: #fee2e2;
  color: #b91c1c;
}

.status-draft {
  background: #f3f4f6;
  color: #4b5563;
}

.status-upcoming {
  background: #dbeafe;
  color: #1d4ed8;
}

.status-in-progress {
  background: #fef3c7;
  color: #b45309;
}

.status-completed {
  background: #dcfce7;
  color: #15803d;
}

@media (max-width: 1400px) {
  .classroom-layout {
    grid-template-columns: 250px 1fr 250px;
  }
}

@media (max-width: 1200px) {
  .classroom-layout {
    grid-template-columns: 1fr;
  }

  .sidebar,
  .activity-list {
    display: none;
  }
}

@media (max-width: 640px) {
  .classroom-layout {
    padding: 0 16px;
    margin: 16px auto;
  }

  .classroom-header {
    padding: 24px 16px;
  }

  .class-stats {
    grid-template-columns: 1fr;
  }

  .content-actions {
    flex-wrap: wrap;
  }

  .action-btn {
    flex: 1;
    text-align: center;
  }
}
</style>
