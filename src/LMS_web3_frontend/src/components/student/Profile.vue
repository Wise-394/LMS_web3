<template>
  <Header />
  <Navbar :role="'student'" />

  <div class="dashboard">
    <!-- Welcome Section -->
    <section class="welcome-section">
      <div class="welcome-content">
        <div class="avatar-container">
          <img :src="student.avatar" alt="Student Avatar" class="avatar" />
          <span class="online-indicator"></span>
        </div>
        <div class="welcome-text">
          <h1>{{ student.fullName }}</h1>
          <p>{{ student.strand }} | {{ student.gradeLevel }} - Section {{ student.section }}</p>
          <div class="badges">
            <span v-if="student.honorRoll" class="badge honor-roll">🏅8 Medal Token</span>
            <span v-if="student.perfectAttendance" class="badge attendance">✅ Perfect Attendance</span>
          </div>
        </div>
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
        <!-- Student Info -->
        <section class="card info-card">
          <h2>Student Information</h2>
          <div class="info-grid">
            <div class="info-item" v-for="(value, label) in {
              'LRN': student.lrn,
              'Address': student.address,
              'Guardian': student.guardianName,
              'Guardian Contact': student.guardianContact
            }" :key="label">
              <span class="info-label">{{ label }}</span>
              <span class="info-value">{{ value }}</span>
            </div>
          </div>
        </section>

        <!-- Skills -->
        <section class="card skills-card">
          <h2>Skills & Competencies</h2>
          <div class="skills-grid">
            <div v-for="skill in skills" :key="skill.name" class="skill-item">
              <div class="skill-header">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-level">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <!-- Academic History -->
        <section class="card history-card">
          <h2>Academic History</h2>
          <div class="history-timeline">
            <div v-for="term in academicHistory" :key="term.semester" class="history-item">
              <div class="semester-header">
                <h3>{{ term.semester }}</h3>
                <span :class="['grade-badge', getGradeBadgeColor(term.grade)]">Grade: {{ term.grade }}%</span>
              </div>
              <div class="semester-details">
                <span class="units">{{ term.units }} Units</span>
                <div class="achievements">
                  <span v-for="achievement in term.achievements" :key="achievement" class="achievement-badge">
                    {{ achievement }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Certificates -->
        <section class="card certificates-card">
          <h2>Certificates & Achievements</h2>
          <div class="certificates-list">
            <div v-for="cert in certificates" :key="cert.credential" class="certificate-item">
              <div class="cert-content">
                <h3>{{ cert.title }}</h3>
                <div class="cert-details">
                  <span class="cert-issuer">{{ cert.issuer }}</span>
                  <span class="cert-date">{{ cert.date }}</span>
                </div>
                <span class="cert-type">{{ cert.type }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '../Header.vue';
import Navbar from '../Navbar.vue';

const student = ref({
  fullName: 'Juan Dela Cruz',
  avatar: 'https://ui-avatars.com/api/?name=Juan+Dela+Cruz&background=5498FF&color=fff',
  gradeLevel: 'Grade 12',
  strand: 'STEM',
  lrn: '123456789012',
  section: '12-A',
  address: '123 Main St, Cabanatuan City',
  guardianName: 'Maria Dela Cruz',
  guardianContact: '0917-123-4567',
  honorRoll: true,
  perfectAttendance: false,
});

const stats = ref({
  grades: { count: '88.5', label: 'Current Grade' },
  attendance: { count: '95%', label: 'Attendance Rate' },
  rank: { count: '5th', label: 'Class Ranking' },
});

const skills = ref([
  { name: 'Mathematics', level: 90 },
  { name: 'Science', level: 85 },
  { name: 'English Communication', level: 88 },
  { name: 'Research Writing', level: 92 },
]);

const academicHistory = ref([
  {
    semester: 'Grade 11 - 1st Semester',
    grade: 92,
    units: 20,
    achievements: ['With Honors'],
  },
  {
    semester: 'Grade 11 - 2nd Semester',
    grade: 94,
    units: 22,
    achievements: ['With High Honors'],
  },
]);

const certificates = ref([
  {
    title: 'Science Fair Champion',
    issuer: 'DepEd Region III',
    date: 'March 2024',
    type: 'SoulBound NFT',
    credential: 'SF-2024-001',
  },
  {
    title: 'Best Research Paper',
    issuer: 'School Research Council',
    date: 'February 2024',
    type: 'SouldBound NFT',
    credential: 'BRP-2024-002',
  },
]);

const getGradeBadgeColor = (grade) => {
  if (grade >= 90) return 'badge-excellent';
  if (grade >= 85) return 'badge-good';
  if (grade >= 80) return 'badge-average';
  return 'badge-needs-improvement';
};
</script>


<style scoped>
/**
 * Profile Dashboard Layout
 * Main container for the student profile page
 */
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: var(--font-family, 'Segoe UI, system-ui, sans-serif');
  color: var(--text-color, #1a1a1a);
  background-color: var(--bg-color, #f9fafb);
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

.welcome-content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.avatar-container {
  position: relative;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.online-indicator {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 16px;
  height: 16px;
  background: #10b981;
  border: 3px solid white;
  border-radius: 50%;
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

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.badge {
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.badge.honor-roll {
  background: rgba(16, 185, 129, 0.2);
}

.badge.attendance {
  background: rgba(59, 130, 246, 0.2);
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

/* Card Styles */
.card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
}

.card h2 {
  font-size: 1.3rem;
  color: #333;
  margin: 0 0 1.5rem;
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.info-item {
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.info-label {
  display: block;
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
}

.info-value {
  color: #1a1a1a;
  font-size: 1rem;
  font-weight: 500;
}

/* Skills Section */
.skills-grid {
  display: grid;
  gap: 1.2rem;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-name {
  color: #1a1a1a;
  font-size: 0.95rem;
}

.skill-level {
  color: #64748b;
  font-size: 0.9rem;
}

.skill-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, #5498FF, #3a7bd5);
  border-radius: 4px;
  transition: width 0.3s ease;
}

/* Academic History */
.history-timeline {
  display: grid;
  gap: 1.5rem;
}

.history-item {
  border-left: 3px solid #5498FF;
  padding-left: 1.5rem;
  position: relative;
}

.history-item::before {
  content: '';
  position: absolute;
  left: -8px;
  top: 0;
  width: 13px;
  height: 13px;
  background: #5498FF;
  border: 3px solid white;
  border-radius: 50%;
}

.semester-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.semester-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #1a1a1a;
}

.grade-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.badge-excellent { color: #10b981; background: #10b98120; }
.badge-good { color: #3b82f6; background: #3b82f620; }
.badge-average { color: #f59e0b; background: #f59e0b20; }
.badge-needs-improvement { color: #ef4444; background: #ef444420; }

/* Certificates */
.certificates-list {
  display: grid;
  gap: 1rem;
}

.certificate-item {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.2rem;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease;
}

.certificate-item:hover {
  transform: translateX(5px);
}

.cert-content h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: #1a1a1a;
}

.cert-details {
  display: flex;
  gap: 1rem;
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.cert-type {
  display: inline-block;
  background: #5498FF20;
  color: #5498FF;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
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
  .welcome-content {
    flex-direction: column;
    text-align: center;
  }
  
  .welcome-text {
    text-align: center;
  }
  
  .badges {
    justify-content: center;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .welcome-section {
    padding: 1.5rem;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
  }
}
</style>
