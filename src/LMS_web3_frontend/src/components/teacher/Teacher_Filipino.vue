<script setup>
import { ref } from 'vue'

// Back button functionality (replace with router if using Vue Router)
const goBack = () => window.history.back()

// New module post inputs
const newPostTitle = ref('')
const newPostContent = ref('')

// List of module posts
const posts = ref([
  {
    title: "Chapter 1: Wika at Lipunan",
    date: "📅 Posted May 10, 2025",
    content: "Sa modyul na ito, tatalakayin natin ang papel ng wika sa lipunan at kung paano ito ginagamit bilang instrumento ng komunikasyon at kultura.",
  },
  {
    title: "Chapter 2: Kasaysayan ng Wikang Filipino",
    date: "📅 Posted May 8, 2025",
    content: "Ang kabanatang ito ay sumasaklaw sa ebolusyon ng wikang Filipino mula sa katutubong wika hanggang sa kasalukuyang anyo nito bilang pambansang wika.",
  },
  {
    title: "Chapter 3: Mga Barayti ng Wika",
    date: "📅 Posted May 6, 2025",
    content: "Tatalakayin dito ang iba't ibang barayti ng wika tulad ng idyolek, sosyolek, at dayalek, at ang kahalagahan ng mga ito sa pang-araw-araw na pakikipagkomunikasyon.",
  },
  {
    title: "Chapter 4: Wika at Kultura",
    date: "📅 Posted May 4, 2025",
    content: "Ang ugnayan ng wika at kultura, at kung paano pinapanday ng wika ang ating identidad bilang mga Pilipino.",
  }
])

// Add new module post
const addPost = () => {
  if (newPostTitle.value.trim() && newPostContent.value.trim()) {
    const today = new Date().toLocaleDateString('en-PH', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
    posts.value.unshift({
      title: newPostTitle.value.trim(),
      date: `📅 Posted ${today}`,
      content: newPostContent.value.trim(),
    })
    newPostTitle.value = ''
    newPostContent.value = ''
  }
}

// Student attendance data
const students = ref([
  { name: 'Juan Dela Cruz', status: '✅ Present' },
  { name: 'Maria Clara', status: '✅ Present' },
  { name: 'Jose Rizal', status: '❌ Absent' },
  { name: 'Andres Bonifacio', status: '✅ Present' },
  { name: 'Emilio Aguinaldo', status: '✅ Present' },
])

// Today's activities
const activities = ref([
  { name: 'Group Discussion', time: '10:00 AM' },
  { name: 'Quiz: Kasaysayan ng Wika', time: '11:30 AM' },
  { name: 'Project Presentation', time: '1:30 PM' },
  { name: 'Class Reflection', time: '3:00 PM' },
])
</script>

<template>
  <div class="classroom-layout">
    <!-- Left Sidebar: Attendance -->
    <aside class="sidebar">
      <h2>📋 Attendance</h2>
      <ul>
        <li v-for="(student, index) in students" :key="index">
          <span>{{ student.name }}</span>
          <span :class="['status', student.status === '✅ Present' ? 'present' : 'absent']">
            {{ student.status }}
          </span>
        </li>
      </ul>
    </aside>

    <!-- Main Content -->
    <main class="classroom-container">
      <button class="back-button" @click="goBack">← Back</button>

      <div class="classroom-header">
        <h1>📘 Filipino</h1>
        <p>Section 10 - Mabini | School Year 2024–2025</p>
      </div>

      <section class="announcement-section">
        <h2>📚 Modules</h2>

        <!-- Add new post form -->
        <div class="create-post">
          <input
            v-model="newPostTitle"
            type="text"
            placeholder="Enter module title"
            class="post-input"
          />
          <textarea
            v-model="newPostContent"
            placeholder="Enter module description"
            class="post-textarea"
          ></textarea>
          <button class="add-button" @click="addPost">➕ Add Post</button>
        </div>

        <!-- Module posts -->
        <div class="post" v-for="(post, idx) in posts" :key="idx">
          <h3 class="post-author">{{ post.title }}</h3>
          <p class="post-date">{{ post.date }}</p>
          <p class="post-content">{{ post.content }}</p>
          <button class="view-button">📄 View Module</button>
        </div>
      </section>

      <section class="resources-section">
        <h2>📎 Resources</h2>
        <ul>
          <li>📘 Filipino Grammar PDF</li>
          <li>🎥 Video Lecture: Kasaysayan ng Wikang Filipino</li>
          <li>📝 Quiz Reviewer (Ch. 1–2)</li>
        </ul>
      </section>
    </main>

    <!-- Right Sidebar: Activity List -->
    <aside class="activity-list">
      <h2>🗓️ Today's Activities</h2>
      <ul>
        <li v-for="(activity, idx) in activities" :key="idx">
          <span class="activity-name">{{ activity.name }}</span>
          <span class="activity-time">{{ activity.time }}</span>
        </li>
      </ul>
    </aside>
  </div>
</template>

<style scoped>
.classroom-layout {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  gap: 20px;
  max-width: 1200px;
  margin: 40px auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Sidebar styles */
.sidebar,
.activity-list {
  background-color: #f4f9fc;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.06);
}

.sidebar h2,
.activity-list h2 {
  font-size: 20px;
  margin-bottom: 15px;
}

.sidebar ul,
.activity-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar li,
.activity-list li {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
}

.status {
  font-weight: 700;
}

.present {
  color: green;
}

.absent {
  color: red;
}

/* Main container */
.classroom-container {
  background-color: #fff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.06);
  position: relative;
}

.classroom-header {
  background-color: #5498ff;
  color: white;
  padding: 24px 20px;
  border-radius: 12px;
  margin-bottom: 35px;
  position: relative;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: white;
  color: #5498ff;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  z-index: 2;
}

.back-button:hover {
  background-color: #e4ecff;
}

.classroom-header h1 {
  font-size: 34px;
  margin: 0 0 5px;
}

.classroom-header p {
  font-size: 15px;
  opacity: 0.95;
}

.announcement-section,
.resources-section {
  margin-bottom: 40px;
}

.announcement-section h2,
.resources-section h2 {
  font-size: 26px;
  color: #333;
  margin-bottom: 20px;
}

/* Create Post Form */
.create-post {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.post-input,
.post-textarea {
  width: 100%;
  margin-bottom: 12px;
  padding: 12px;
  border: 1px solid #cfd9e4;
  border-radius: 8px;
  font-size: 14px;
  resize: none;
}

.post-textarea {
  min-height: 90px;
}

.add-button {
  background-color: #5498ff;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

.add-button:hover {
  background-color: #3f7be0;
}

/* Posts */
.post {
  background-color: #fff;
  border-radius: 10px;
  padding: 22px;
  margin-bottom: 20px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease;
}

.post:hover {
  transform: translateY(-2px);
}

.post-author {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 6px;
  color: #222;
}

.post-date {
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
}

.post-content {
  font-size: 15.5px;
  color: #444;
  margin-bottom: 15px;
}

.view-button {
  background-color: #5498ff;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

.view-button:hover {
  background-color: #3f7be0;
}

/* Activity List */
.activity-list ul li {
  padding: 10px 0;
  border-bottom: 1px solid #d4dce6;
}

.activity-list ul li:last-child {
  border-bottom: none;
}

.activity-name {
  font-weight: 600;
  font-size: 15px;
  color: #333;
}

.activity-time {
  font-size: 13px;
  color: #777;
}
</style>
