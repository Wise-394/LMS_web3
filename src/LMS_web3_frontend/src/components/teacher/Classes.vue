<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../Header.vue';
import Navbar from '../Navbar.vue';

const router = useRouter();

const subjects = ref([
  {
    code: 'FIL101',
    name: 'Filipino',
    icon: '📚',
    students: 62,
    nextClass: '10:00 AM Today',
    progress: 85
  },
  {
    code: 'MATH101',
    name: 'Mathematics',
    icon: '🔢',
    students: 55,
    nextClass: '8:30 AM Tomorrow',
    progress: 90
  },
  {
    code: 'PF101',
    name: 'PathFit',
    icon: '⚽',
    students: 60,
    nextClass: '3:00 PM Tomorrow',
    progress: 70
  }
]);

const searchQuery = ref('');
const selectedSort = ref('name');
const sortOrder = ref('asc');

const filteredSubjects = computed(() => {
  let filtered = subjects.value.filter(subject => 
    subject.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  filtered.sort((a, b) => {
    let comparison = 0;
    switch (selectedSort.value) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'students':
        comparison = a.students - b.students;
        break;
      case 'progress':
        comparison = a.progress - b.progress;
        break;
    }
    return sortOrder.value === 'asc' ? comparison : -comparison;
  });

  return filtered;
});

const navigateToSubject = (subject) => {
  router.push(`/teacher/subject/${subject.name.toLowerCase()}`);
};
</script>

<template>
  <div>
    <Header />
    <Navbar :role="'teacher'" />
    <div class="subjects-page">
      <div class="page-header">
        <h1 class="page-title">📚 Your Classes</h1>
        <p class="subtitle">Manage and monitor your teaching subjects</p>
      </div>

      <div class="controls">
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search subjects..."
            class="search-input"
          >
          <span class="search-icon">🔍</span>
        </div>

        <div class="sort-controls">
          <select v-model="selectedSort" class="sort-select">
            <option value="name">Sort by Name</option>
            <option value="students">Sort by Students</option>
            <option value="progress">Sort by Progress</option>
          </select>
          <button 
            @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
            class="sort-button"
          >
            {{ sortOrder === 'asc' ? '↑' : '↓' }}
          </button>
        </div>
      </div>

      <div class="subjects-grid">
        <div 
          v-for="subject in filteredSubjects" 
          :key="subject.code"
          class="subject-card"
          @click="navigateToSubject(subject)"
        >
          <div class="subject-header">
            <div class="subject-icon">{{ subject.icon }}</div>
            <div class="subject-info">
              <h3>{{ subject.name }}</h3>
              <span class="subject-code">{{ subject.code }}</span>
            </div>
          </div>

          <div class="subject-stats">
            <div class="stat">
              <span class="stat-label">Students</span>
              <span class="stat-value">{{ subject.students }}</span>
            </div>
          </div>

          <div class="progress-section">
            <div class="progress-info">
              <span>Course Progress</span>
              <span>{{ subject.progress }}%</span>
            </div>
            <div class="progress-bar">
              <div 
                class="progress-fill"
                :style="{ width: `${subject.progress}%` }"
              ></div>
            </div>
          </div>

          <div class="next-class">
            <span class="next-class-label">Next Class:</span>
            <span class="next-class-time">{{ subject.nextClass }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subjects-page {
  padding: 40px;
  background: linear-gradient(135deg, #f0f4f8, #e8f1ff);
  min-height: calc(100vh - 60px);
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2a7cf7;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 1.1rem;
  color: #64748b;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #2a7cf7;
  box-shadow: 0 0 0 3px rgba(42, 124, 247, 0.1);
}

.search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.sort-controls {
  display: flex;
  gap: 8px;
}

.sort-select {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  font-size: 0.9rem;
}

.sort-button {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sort-button:hover {
  background: #f8fafc;
}

.subjects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.subject-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.subject-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.subject-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.subject-icon {
  width: 48px;
  height: 48px;
  background: #f0f7ff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.subject-info h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px;
}

.subject-code {
  font-size: 0.9rem;
  color: #64748b;
}

.subject-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 0.9rem;
  color: #64748b;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.progress-section {
  margin-bottom: 16px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.progress-bar {
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #2a7cf7;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.next-class {
  font-size: 0.9rem;
  color: #64748b;
  display: flex;
  gap: 8px;
}

.next-class-time {
  color: #2a7cf7;
  font-weight: 500;
}

@media (max-width: 768px) {
  .subjects-page {
    padding: 20px;
  }

  .controls {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    max-width: none;
  }

  .sort-controls {
    width: 100%;
  }

  .sort-select {
    flex: 1;
  }

  .subjects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
