<script setup>
import { ref } from 'vue';
import Header from '../Header.vue';
import Navbar from '../Navbar.vue';

// Example student data
const student = ref({
  fullName: 'Juan Dela Cruz',
  studentId: '2025-00123',
  email: 'juan.delacruz@student.vmuf.edu.ph',
  course: 'Bachelor of Science in Information Technology',
  avatarUrl: 'https://ui-avatars.com/api/?name=Juan+Dela+Cruz&background=5498FF&color=fff'
});

// Example certificates data
const certificates = ref([
  {
    title: 'Web Development Bootcamp',
    issuer: 'CodeCamp',
    date: 'March 2024',
    url: '#'
  },
  {
    title: 'AI & Machine Learning Seminar',
    issuer: 'VMUF College of IT',
    date: 'January 2025',
    url: '#'
  }
]);
</script>

<template>
  <Header />
  <Navbar :role="'student'" />

  <div class="profile-page">
    <h1 class="title">Student Profile</h1>

    <div class="profile-card">
      <img class="avatar" :src="student.avatarUrl" alt="Student Avatar" />
      <div class="info">
        <div class="field"><label>Full Name:</label><span>{{ student.fullName }}</span></div>
        <div class="field"><label>Student ID:</label><span>{{ student.studentId }}</span></div>
        <div class="field"><label>Email:</label><span>{{ student.email }}</span></div>
        <div class="field"><label>Course:</label><span>{{ student.course }}</span></div>
      </div>
    </div>

    <!-- Certificates Section -->
    <div class="certificates-section">
      <h2>Certificates</h2>
      <ul class="cert-list">
        <li v-for="(cert, index) in certificates" :key="index" class="cert-item">
          <div>
            <p class="cert-title">{{ cert.title }}</p>
            <p class="cert-meta">Issued by {{ cert.issuer }} – {{ cert.date }}</p>
          </div>
          <a :href="cert.url" class="view-link" target="_blank" rel="noopener">View</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  max-width: 700px;
  margin: 40px auto;
  padding: 24px;
  background-color: #f9fbfe;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #5498FF;
  margin-bottom: 24px;
}

.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 24px;
  border: 4px solid #5498FF;
}

.info {
  width: 100%;
  text-align: left;
}

.field {
  margin-bottom: 16px;
}

label {
  font-weight: 600;
  color: #666;
  margin-right: 8px;
}

span {
  color: #333;
}

/* Certificates Section */
.certificates-section {
  margin-top: 40px;
  text-align: left;
}

.certificates-section h2 {
  color: #333;
  font-size: 22px;
  margin-bottom: 16px;
}

.cert-list {
  list-style: none;
  padding: 0;
}

.cert-item {
  background: #fff;
  border: 1px solid #dce6f0;
  border-left: 5px solid #5498FF;
  padding: 16px 20px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
}

.cert-title {
  font-weight: 600;
  margin: 0;
  color: #333;
}

.cert-meta {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

.view-link {
  color: #5498FF;
  font-weight: 500;
  text-decoration: none;
}

.view-link:hover {
  text-decoration: underline;
}
</style>
