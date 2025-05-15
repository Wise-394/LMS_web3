<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '../Navbar.vue';
import Header from '../Header.vue';

// Enhanced Activities Data
const activities = ref([
  {
    subject: "Filipino",
    items: [
      { 
        id: 1,
        title: "Oral Presentation",
        date: "2025-05-20",
        type: "presentation",
        status: "pending",
        description: "Present a 10-minute speech about Philippine culture",
        points: 100,
        dueTime: "23:59",
        progress: 0
      }
    ]
  },
  {
    subject: "Mathematics",
    items: [
      {
        id: 2,
        title: "Quiz on Algebra",
        date: "2025-05-20",
        type: "quiz",
        status: "completed",
        description: "Online quiz covering basic algebraic operations",
        points: 50,
        dueTime: "15:00",
        progress: 100
      }
    ]
  },
  {
    subject: "Science",
    items: [
      {
        id: 3,
        title: "Lab Experiment",
        date: "2025-05-20",
        type: "lab",
        status: "ongoing",
        description: "Virtual lab simulation on chemical reactions",
        points: 75,
        dueTime: "17:30",
        progress: 60
      }
    ]
  }
]);

const router = useRouter();

// Filter states
const selectedFilter = ref('all');
const searchQuery = ref('');

// Sorting options
const sortBy = ref('dueDate');
const sortOrder = ref('asc');

// Quick actions
const quickActions = [
  { label: 'Start Activity', action: 'start', icon: '▶️' },
  { label: 'Mark as Complete', action: 'complete', icon: '✅' },
  { label: 'View Details', action: 'view', icon: 'ℹ️' },
];

// Activity type icons
const typeIcons = {
  quiz: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
        </svg>`,
  presentation: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/>
                </svg>`,
  lab: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 7h-6l-1-7z"/>
          <path d="M7.5 11h9M10 4L9 4M15 4L14 4"/>
        </svg>`
};

// Status badges
const statusBadges = {
  pending: { class: 'badge-warning', label: 'Pending' },
  completed: { class: 'badge-success', label: 'Completed' },
  ongoing: { class: 'badge-info', label: 'In Progress' }
};

// Progress overview computed property
const progressOverview = computed(() => {
  let total = 0;
  let completed = 0;
  let pending = 0;
  let ongoing = 0;

  activities.value.forEach(subject => {
    subject.items.forEach(activity => {
      total++;
      if (activity.status === 'completed') completed++;
      else if (activity.status === 'pending') pending++;
      else if (activity.status === 'ongoing') ongoing++;
    });
  });

  return {
    total,
    completed,
    pending,
    ongoing,
    completionRate: total ? Math.round((completed / total) * 100) : 0
  };
});

// Sort activities
const sortedActivities = computed(() => {
  return activities.value.map(subject => ({
    ...subject,
    items: [...subject.items].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy.value) {
        case 'dueDate':
          comparison = new Date(a.date + ' ' + a.dueTime) - new Date(b.date + ' ' + b.dueTime);
          break;
        case 'points':
          comparison = a.points - b.points;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
      }
      
      return sortOrder.value === 'asc' ? comparison : -comparison;
    })
  }));
});

// Handle quick actions
const handleQuickAction = (action, activity) => {
  switch (action) {
    case 'start':
      if (activity.status === 'pending') {
        activity.status = 'ongoing';
        activity.progress = 0;
      }
      break;
    case 'complete':
      activity.status = 'completed';
      activity.progress = 100;
      break;
    case 'view':
      // Navigate to activity details (to be implemented)
      break;
  }
};

// Computed filtered activities
const filteredActivities = computed(() => {
  return activities.value.map(subject => ({
    ...subject,
    items: subject.items.filter(activity => {
      const matchesSearch = activity.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          activity.description.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesFilter = selectedFilter.value === 'all' || activity.status === selectedFilter.value;
      return matchesSearch && matchesFilter;
    })
  })).filter(subject => subject.items.length > 0);
});

// Format date
const formatDate = (date, time) => {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return `${new Date(date).toLocaleDateString('en-US', options)} at ${time}`;
};
</script>

<template>
  <Header />
  <Navbar :role="'student'" />
  
  <div class="activities-page">
    <div class="page-header">
      <h2 class = "white">Activities Dashboard</h2>
      <p class="subtitle white">Track and manage your academic tasks</p>
    </div>

    <div class="filters-section">
      <div class="search-box">
        <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
        <input 
          type="text"
          v-model="searchQuery"
          placeholder="Search activities..."
          class="search-input"
        >
      </div>

      <div class="filter-buttons">
        <button 
          v-for="filter in ['all', 'pending', 'ongoing', 'completed']"
          :key="filter"
          @click="selectedFilter = filter"
          :class="['filter-btn', { active: selectedFilter === filter }]"
        >
          {{ filter.charAt(0).toUpperCase() + filter.slice(1) }}
        </button>
      </div>
    </div>

    <div class="activities-grid">
      <div v-for="subject in filteredActivities" :key="subject.subject" class="subject-section glass-card">
        <div class="subject-header">
          <h3>{{ subject.subject }}</h3>
          <span class="activity-count">{{ subject.items.length }} activities</span>
        </div>
        
        <div class="activities-list">
          <div v-for="activity in subject.items" :key="activity.id" 
               class="activity-card" :class="statusBadges[activity.status].class">
            <div class="activity-header">
              <div class="activity-type" v-html="typeIcons[activity.type]"></div>
              <span class="activity-badge" :class="statusBadges[activity.status].class">
                {{ statusBadges[activity.status].label }}
              </span>
            </div>
            
            <div class="activity-content">
              <h4>{{ activity.title }}</h4>
              <p class="activity-description">{{ activity.description }}</p>
              <div class="activity-meta">
                <div class="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>Due: {{ formatDate(activity.date, activity.dueTime) }}</span>
                </div>
                <div class="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>Points: {{ activity.points }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activities-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
}

.filters-section {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
  justify-content: space-between;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  font-size: 0.95rem;
  background: white;
  color: #0f172a;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #0ea5e9;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #94a3b8;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  background: white;
  color: #64748b;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: #f8fafc;
  color: #0f172a;
}

.filter-btn.active {
  background: #0ea5e9;
  color: white;
  border-color: #0ea5e9;
}

.activities-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}

.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.subject-section {
  padding: 1.5rem;
}

.subject-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.subject-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
}

.activity-count {
  font-size: 0.9rem;
  color: #64748b;
  background: #f1f5f9;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

.activities-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.activity-card:hover {
  transform: translateY(-2px);
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.activity-type {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: #f1f5f9;
  border-radius: 0.75rem;
  color: #0ea5e9;
}

.activity-type .icon {
  width: 1.5rem;
  height: 1.5rem;
  stroke-width: 2;
}

.activity-badge {
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

.badge-warning {
  background: #fef3c7;
  color: #d97706;
}

.badge-success {
  background: #dcfce7;
  color: #15803d;
}

.badge-info {
  background: #dbeafe;
  color: #2563eb;
}

.activity-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.5rem;
}
.white{
  color : white;
}

.activity-description {
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.activity-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #64748b;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-icon {
  width: 1rem;
  height: 1rem;
  stroke-width: 2;
}

@media (max-width: 768px) {
  .activities-page {
    padding: 1rem;
  }

  .page-header h2 {
    font-size: 1.75rem;
  }

  .filters-section {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    max-width: none;
  }

  .filter-buttons {
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .activities-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .activity-card {
    transform: none !important;
  }
}
</style>
