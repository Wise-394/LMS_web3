<script>
import Header from '../Header.vue';
import Navbar from '../Navbar.vue';

export default {
  name: 'SubjectsPage',
  components: {
    Header,
    Navbar
  },
  data() {
    return {
      subjects: ['Filipino', 'English', 'Math', 'PathFit']
    };
  }
}
</script>

<template>
  <Header /> 
  <Navbar :role="'student'" />
  <div class="subjects-page">
    <h1 class="page-title">📚 Your Subjects</h1>
    <div class="subjects-list">
      <router-link
        v-for="subject in subjects"
        :key="subject"
        :to="`subject/${subject.toLowerCase()}`"
        class="subject-item"
      >
        <div class="icon-circle">
          <span class="subject-icon">📘</span>
        </div>
        <p class="subject-name">{{ subject }}</p>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.subjects-page {
  padding: 50px 20px;
  background: linear-gradient(to bottom right, #e8f1ff, #ffffff);
  min-height: 100vh;
  text-align: center;
}

.page-title {
  font-size: 36px;
  font-weight: bold;
  color: #2a7cf7;
  margin-bottom: 40px;
}

.subjects-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 30px;
  max-width: 900px;
  margin: 0 auto;
}

.subject-item {
  background-color: #fff;
  border-radius: 16px;
  padding: 30px 20px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.subject-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

.icon-circle {
  width: 60px;
  height: 60px;
  background-color: #5498FF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.subject-icon {
  font-size: 28px;
  color: #fff;
}

.subject-name {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}
</style>
