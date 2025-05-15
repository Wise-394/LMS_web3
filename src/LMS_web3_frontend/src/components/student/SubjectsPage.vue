<script setup>
import { ref } from 'vue';
import Header from '../Header.vue';
import Navbar from '../Navbar.vue';

// Subject categories with their respective subjects
const categories = ref([
  {
    name: 'Core Subjects',
    icon: '📚',
    subjects: [
      { 
        code: 'FIL101',
        name: 'Filipino',
        description: 'Komunikasyon sa Akademikong Filipino',
        progress: 85,
        teacher: 'G. Santos',
        schedule: 'MWF 9:00-10:30 AM'
      },
      {
        code: 'ENG101',
        name: 'English',
        description: 'Academic Writing and Research',
        progress: 72,
        teacher: 'Ms. Smith',
        schedule: 'TTH 1:00-2:30 PM'
      }
    ]
  },
  {
    name: 'Mathematics',
    icon: '🔢',
    subjects: [
      {
        code: 'MATH101',
        name: 'Mathematics',
        description: 'Calculus and Analytical Geometry',
        progress: 78,
        teacher: 'Dr. Garcia',
        schedule: 'MWF 1:00-2:30 PM'
      }
    ]
  },
  {
    name: 'Sciences',
    icon: '🔬',
    subjects: [
      {
        code: 'SCI101',
        name: 'Science',
        description: 'General Chemistry with Laboratory',
        progress: 90,
        teacher: 'Dr. Cruz',
        schedule: 'TTH 9:00-11:00 AM'
      }
    ]
  },
  {
    name: 'Physical Education',
    icon: '⚽',
    subjects: [
      {
        code: 'PE101',
        name: 'PathFit',
        description: 'Physical Fitness and Wellness',
        progress: 95,
        teacher: 'Coach Rivera',
        schedule: 'F 2:00-4:00 PM'
      }
    ]
  }
]);

// Function to get progress color based on percentage
const getProgressColor = (progress) => {
  if (progress >= 90) return '#10b981'; // Green
  if (progress >= 75) return '#3b82f6'; // Blue
  if (progress >= 60) return '#f59e0b'; // Orange
  return '#ef4444'; // Red
};
</script>

<template>
  <Header />
  <Navbar :role="'student'" />

  <div class="subjects-page">
    <div class="page-header">
      <h1>📚 Your Subjects</h1>
      <p>Track your academic progress and access your course materials</p>
    </div>

    <div class="categories-container">
      <div v-for="category in categories" :key="category.name" class="category-section">
        <h2 class="category-title">
          <span class="category-icon">{{ category.icon }}</span>
          {{ category.name }}
        </h2>

        <div class="subjects-grid">
          <router-link
            v-for="subject in category.subjects"
            :key="subject.code"
            :to="`/student/subject/${subject.name.toLowerCase()}`"
            class="subject-card"
          >
            <div class="subject-header">
              <h3>{{ subject.name }}</h3>
              <span class="subject-code">{{ subject.code }}</span>
            </div>

            <p class="subject-description">{{ subject.description }}</p>

            <div class="subject-details">
              <div class="teacher-info">
                <span class="detail-label">👨‍🏫 Teacher:</span>
                <span>{{ subject.teacher }}</span>
              </div>
              <div class="schedule-info">
                <span class="detail-label">🕒 Schedule:</span>
                <span>{{ subject.schedule }}</span>
              </div>
            </div>

            <div class="progress-section">
              <div class="progress-label">
                <span>Progress</span>
                <span>{{ subject.progress }}%</span>
              </div>
              <div class="progress-bar">
                <div 
                  class="progress-fill"
                  :style="{
                    width: `${subject.progress}%`,
                    backgroundColor: getProgressColor(subject.progress)
                  }"
                ></div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subjects-page {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(to bottom right, #f0f4f8, #ffffff);
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #1a1a1a;
  margin: 0;
}

.page-header p {
  font-size: 1.1rem;
  color: #666;
  margin-top: 0.5rem;
}

.categories-container {
  max-width: 1200px;
  margin: 0 auto;
}

.category-section {
  margin-bottom: 2.5rem;
}

.category-title {
  font-size: 1.5rem;
  color: #2a7cf7;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-icon {
  font-size: 1.8rem;
}

.subjects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.subject-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.subject-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.subject-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.subject-header h3 {
  font-size: 1.25rem;
  color: #1a1a1a;
  margin: 0;
}

.subject-code {
  font-size: 0.9rem;
  color: #666;
  background: #f0f4f8;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}

.subject-description {
  color: #666;
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.5;
}

.subject-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.teacher-info,
.schedule-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-label {
  color: #666;
  min-width: 80px;
}

.progress-section {
  margin-top: auto;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .subjects-page {
    padding: 1rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .subjects-grid {
    grid-template-columns: 1fr;
  }

  .subject-card {
    padding: 1.25rem;
  }
}
</style>
