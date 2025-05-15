<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Import Vue Router for navigation
import Navbar from '../Navbar.vue';
import Header from '../Header.vue';
// Sample Activities Array with Subjects
const activities = ref([
  {
    subject: "Filipino",
    items: [
      { title: "Oral Presentation", date: "2025-05-20" },
    ]
  },
  {
    subject: "Mathematics",
    items: [
      { title: "Quiz on Algebra", date: "2025-05-20" },
    ]
  },
  {
    subject: "Science",
    items: [
      { title: "Lab Experiment", date: "2025-05-20" },
    ]
  }
]);

const router = useRouter(); // Initialize router


</script>

<template>
  <Header /> 
  <Navbar :role="'student'"/>
  <div class="activities-page">
    <h2>📚 Activities List</h2>
    
    <div v-for="(subject, index) in activities" :key="index" class="subject-section">
      <h3>{{ subject.subject }}</h3>
      
      <div v-for="(activity, idx) in subject.items" :key="idx" class="activity-card">
        <h4>{{ activity.title }}</h4>
        <p>Date: {{ activity.date }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activities-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  text-align: center;
  font-size: 32px;
  color: #333;
  margin-bottom: 40px;
}

.subject-section {
  margin-bottom: 40px;
}

.subject-section h3 {
  font-size: 26px;
  color: #5498FF;
  margin-bottom: 10px;
}

.activity-card {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.activity-card h4 {
  font-size: 20px;
  color: #333;
  margin-bottom: 8px;
}

.activity-card p {
  font-size: 16px;
  color: #666;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: white;
  color: #5498FF;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.back-button:hover {
  background-color: #e4ecff;
}

@media (max-width: 768px) {
  h2 {
    font-size: 28px;
  }

  .subject-section h3 {
    font-size: 22px;
  }

  .activity-card {
    padding: 15px;
  }

  .activity-card h4 {
    font-size: 18px;
  }
}
</style>
