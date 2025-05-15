<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../Header.vue';
import Navbar from '../Navbar.vue';

const router = useRouter();
const goBack = () => router.back();

// Course information
const courseInfo = ref({
  title: 'Filipino',
  code: 'FIL101',
  section: '10 - Mabini',
  teacher: 'G. Santos',
  schedule: 'MWF 7:30-8:30 AM',
  room: 'Room 101',
  schoolYear: '2024-2025'
});

// Course progress
const progress = ref({
  completedModules: 2,
  totalModules: 4,
  currentGrade: 88.5,
  attendance: '95%'
});

// Modules data with expanded information
const modules = ref([
  {
    id: 1,
    title: 'Wika at Lipunan',
    description: 'Sa modyul na ito, tatalakayin natin ang papel ng wika sa lipunan at kung paano ito ginagamit bilang instrumento ng komunikasyon at kultura.',
    date: '2025-05-10',
    status: 'completed',
    progress: 100,
    type: 'module',
    resources: [
      { name: 'Module PDF', type: 'pdf', size: '2.3 MB' },
      { name: 'Lecture Slides', type: 'pptx', size: '4.1 MB' },
      { name: 'Additional Readings', type: 'pdf', size: '1.5 MB' }
    ],
    activities: [
      { name: 'Quiz 1', status: 'completed', score: '90%' },
      { name: 'Assignment 1', status: 'completed', score: '85%' }
    ]
  },
  {
    id: 2,
    title: 'Kasaysayan ng Wikang Filipino',
    description: 'Ang kabanatang ito ay sumasaklaw sa ebolusyon ng wikang Filipino mula sa katutubong wika hanggang sa kasalukuyang anyo nito bilang pambansang wika.',
    date: '2025-05-08',
    status: 'completed',
    progress: 100,
    type: 'module',
    resources: [
      { name: 'Module PDF', type: 'pdf', size: '3.1 MB' },
      { name: 'Video Lecture', type: 'mp4', size: '156 MB' }
    ],
    activities: [
      { name: 'Quiz 2', status: 'completed', score: '88%' },
      { name: 'Group Activity', status: 'completed', score: '92%' }
    ]
  },
  {
    id: 3,
    title: 'Mga Barayti ng Wika',
    description: 'Tatalakayin dito ang iba\'t ibang barayti ng wika tulad ng idyolek, sosyolek, at dayalek, at ang kahalagahan ng mga ito sa pang-araw-araw na pakikipagkomunikasyon.',
    date: '2025-05-06',
    status: 'in_progress',
    progress: 45,
    type: 'module',
    resources: [
      { name: 'Module PDF', type: 'pdf', size: '2.8 MB' },
      { name: 'Audio Examples', type: 'mp3', size: '25 MB' }
    ],
    activities: [
      { name: 'Quiz 3', status: 'pending', score: null },
      { name: 'Research Paper', status: 'in_progress', score: null }
    ]
  },
  {
    id: 4,
    title: 'Wika at Kultura',
    description: 'Ang ugnayan ng wika at kultura, at kung paano pinapanday ng wika ang ating identidad bilang mga Pilipino.',
    date: '2025-05-04',
    status: 'locked',
    progress: 0,
    type: 'module',
    resources: [
      { name: 'Module PDF', type: 'pdf', size: '2.5 MB' }
    ],
    activities: [
      { name: 'Final Project', status: 'locked', score: null }
    ]
  }
]);

// Get status icon
const getStatusIcon = (status) => {
  const icons = {
    completed: '✅',
    in_progress: '🔄',
    pending: '⏳',
    locked: '🔒'
  };
  return icons[status] || '📄';
};

// Get file icon
const getFileIcon = (type) => {
  const icons = {
    pdf: '📄',
    pptx: '📊',
    mp4: '🎥',
    mp3: '🔊'
  };
  return icons[type] || '📎';
};
</script>

<template>
  <Header />
  <Navbar :role="'student'" />
  
  <div class="course-container">
    <!-- Course Header -->
    <div class="course-header">
      <button class="back-button" @click="goBack">← Back</button>
      <div class="header-content">
        <div class="course-title">
          <h1>{{ courseInfo.title }}</h1>
          <span class="course-code">{{ courseInfo.code }}</span>
        </div>
        <div class="course-details">
          <div class="detail-item">
            <span class="icon">👨‍🏫</span>
            <span>{{ courseInfo.teacher }}</span>
          </div>
          <div class="detail-item">
            <span class="icon">👥</span>
            <span>{{ courseInfo.section }}</span>
          </div>
          <div class="detail-item">
            <span class="icon">🕒</span>
            <span>{{ courseInfo.schedule }}</span>
          </div>
          <div class="detail-item">
            <span class="icon">🏛️</span>
            <span>{{ courseInfo.room }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Overview -->
    <div class="progress-overview">
      <div class="progress-card">
        <div class="progress-title">Module Progress</div>
        <div class="progress-bar">
          <div 
            class="progress-fill"
            :style="{ width: `${(progress.completedModules / progress.totalModules) * 100}%` }"
          ></div>
        </div>
        <div class="progress-stats">
          {{ progress.completedModules }}/{{ progress.totalModules }} Modules Completed
        </div>
      </div>
      <div class="progress-card">
        <div class="progress-title">Current Grade</div>
        <div class="grade">{{ progress.currentGrade }}%</div>
      </div>
      <div class="progress-card">
        <div class="progress-title">Attendance</div>
        <div class="attendance">{{ progress.attendance }}</div>
      </div>
    </div>

    <!-- Modules Section -->
    <div class="modules-section">
      <h2>📚 Course Modules</h2>
      
      <div class="modules-grid">
        <div 
          v-for="module in modules" 
          :key="module.id"
          class="module-card"
          :class="module.status"
        >
          <div class="module-header">
            <span class="module-status">{{ getStatusIcon(module.status) }}</span>
            <h3>{{ module.title }}</h3>
          </div>
          
          <p class="module-description">{{ module.description }}</p>
          
          <div class="module-progress" v-if="module.status !== 'locked'">
            <div class="progress-bar">
              <div 
                class="progress-fill"
                :style="{ width: `${module.progress}%` }"
              ></div>
            </div>
            <span class="progress-text">{{ module.progress }}% Complete</span>
          </div>

          <div class="module-resources">
            <h4>Resources</h4>
            <ul>
              <li v-for="resource in module.resources" :key="resource.name">
                <span class="resource-icon">{{ getFileIcon(resource.type) }}</span>
                <span class="resource-name">{{ resource.name }}</span>
                <span class="resource-size">{{ resource.size }}</span>
              </li>
            </ul>
          </div>

          <div class="module-activities" v-if="module.status !== 'locked'">
            <h4>Activities</h4>
            <ul>
              <li 
                v-for="activity in module.activities" 
                :key="activity.name"
                :class="activity.status"
              >
                <span class="activity-name">{{ activity.name }}</span>
                <span v-if="activity.score" class="activity-score">{{ activity.score }}</span>
                <span v-else class="activity-status">{{ getStatusIcon(activity.status) }}</span>
              </li>
            </ul>
          </div>

          <button 
            class="module-button"
            :disabled="module.status === 'locked'"
          >
            {{ module.status === 'completed' ? 'Review Module' : 
               module.status === 'in_progress' ? 'Continue Module' :
               module.status === 'locked' ? 'Locked' : 'Start Module' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.course-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.course-header {
  background: linear-gradient(135deg, #5498FF, #3a7bd5);
  border-radius: 20px;
  padding: 2rem;
  color: white;
  position: relative;
  margin-bottom: 2rem;
  box-shadow: 0 8px 20px rgba(84, 152, 255, 0.2);
}

.back-button {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-weight: 500;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(-2px);
}

.header-content {
  margin-left: 3rem;
}

.course-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.course-title h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 600;
}

.course-code {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-size: 1rem;
  backdrop-filter: blur(10px);
}

.course-details {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-item .icon {
  font-size: 1.2rem;
}

.progress-overview {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.progress-card {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.progress-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.progress-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: #5498FF;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-stats {
  font-size: 0.9rem;
  color: #666;
}

.grade, .attendance {
  font-size: 2rem;
  font-weight: 600;
  color: #5498FF;
}

.modules-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.modules-section h2 {
  margin: 0 0 1.5rem;
  color: #333;
  font-size: 1.5rem;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.module-card {
  background: #f8fafc;
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.module-card:hover:not(.locked) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.module-card.completed {
  border-color: #10b981;
}

.module-card.in_progress {
  border-color: #f59e0b;
}

.module-card.locked {
  opacity: 0.7;
  cursor: not-allowed;
}

.module-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.module-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.module-description {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.module-resources, .module-activities {
  margin-top: 1.5rem;
}

.module-resources h4, .module-activities h4 {
  font-size: 1rem;
  color: #333;
  margin: 0 0 0.8rem;
}

.module-resources ul, .module-activities ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.module-resources li, .module-activities li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.resource-icon {
  font-size: 1.2rem;
}

.resource-size {
  margin-left: auto;
  color: #888;
}

.activity-score {
  margin-left: auto;
  color: #10b981;
  font-weight: 500;
}

.module-button {
  width: 100%;
  padding: 0.8rem;
  margin-top: 1.5rem;
  border: none;
  border-radius: 8px;
  background: #5498FF;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.module-button:hover:not(:disabled) {
  background: #4a89e8;
}

.module-button:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
}

@media (max-width: 1024px) {
  .course-container {
    padding: 1rem;
  }

  .progress-overview {
    grid-template-columns: 1fr;
  }

  .modules-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .course-header {
    padding: 1.5rem;
  }

  .course-title h1 {
    font-size: 2rem;
  }

  .course-details {
    gap: 1rem;
  }

  .detail-item {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .course-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .course-title h1 {
    font-size: 1.8rem;
  }

  .module-card {
    padding: 1rem;
  }
}
</style>
