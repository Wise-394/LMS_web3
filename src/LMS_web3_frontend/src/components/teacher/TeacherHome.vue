<script setup>
import { ref } from 'vue';
import Header from '../Header.vue';
import Navbar from '../Navbar.vue';

const role = 'teacher'; 

const teacherAnnouncements = ref([
  {
    subject: "Filipino",
    teacher: "G. Santos",
    message: "📢 Paalala: Ang deadline ng assignment ay sa Biyernes, 5:00 PM."
  },
  {
    subject: "Mathematics",
    teacher: "Ms. Garcia",
    message: "Reminder: Prepare for the quiz on derivatives and integrals."
  }
]);

const schoolAnnouncements = ref([
  {
    subject: "Holiday",
    teacher: "Admin",
    message: "School will be closed on May 15th. Enjoy your break!"
  }
]);

const newSubject = ref('');
const newMessage = ref('');
const selectedSubject = ref('');

function addAnnouncement() {
  if (!selectedSubject.value.trim() || !newMessage.value.trim()) {
    alert("Please fill out both fields.");
    return;
  }

  teacherAnnouncements.value.unshift({
    subject: selectedSubject.value,
    teacher: "You", // Replace with actual teacher name dynamically if available
    message: newMessage.value
  });

  newSubject.value = '';
  newMessage.value = '';
  selectedSubject.value = '';
}

const subjects = ref([
  'Filipino 101',
  'Science 102',
  'History 104',
  'PE 105',
  'Math 101',
  'Science 102',
]);
</script>

<template>
  <Header />
  <Navbar :role="role" />

  <div class="dashboard-container">

    <main class="main-content">
      <h2>📊 Teacher's Dashboard</h2>

      <!-- School Announcements -->
      <section class="announcement-section">
        <h3>🏫 School Announcements</h3>
        <div
          v-for="(announcement, index) in schoolAnnouncements"
          :key="index"
          class="announcement-card"
          role="article"
          aria-label="School announcement"
        >
          <header class="announcement-header">
            <span class="announcement-subject">{{ announcement.subject }}</span>
            <span class="announcement-teacher">by {{ announcement.teacher }}</span>
          </header>
          <p class="announcement-text">{{ announcement.message }}</p>
        </div>
      </section>

      <!-- Add Announcement (teacher only) -->
      <section v-if="role === 'teacher'" class="add-post-section">
        <h3>➕ Add New Class Announcement</h3>
        <form
          @submit.prevent="addAnnouncement"
          class="add-post-form"
          aria-label="Add class announcement form"
        >
          <label for="subject-select" class="form-label">Select class:</label>
          <select
            v-model="selectedSubject"
            id="subject-select"
            required
            class="input-field"
            aria-required="true"
          >
            <option value="" disabled>Select a subject</option>
            <option v-for="subject in subjects" :key="subject" :value="subject">
              {{ subject }}
            </option>
          </select>

          <label for="message-input" class="form-label">Message:</label>
          <textarea
            v-model="newMessage"
            id="message-input"
            placeholder="Enter announcement message..."
            rows="3"
            class="input-field textarea-field"
            required
            aria-required="true"
          ></textarea>

          <button
            type="submit"
            class="post-button"
            :disabled="!selectedSubject || !newMessage.trim()"
          >
            📤 Post Announcement
          </button>
        </form>
      </section>

      <!-- Teacher Announcements -->
      <section class="announcement-section">
        <h3>🗒️ Class Announcements</h3>
        <div
          v-for="(announcement, index) in teacherAnnouncements"
          :key="index"
          class="announcement-card"
          role="article"
          aria-label="Class announcement"
        >
          <header class="announcement-header">
            <span class="announcement-subject">{{ announcement.subject }}</span>
          </header>
          <p class="announcement-text">{{ announcement.message }}</p>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #f5f7ff; /* subtle background */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #222;
}

/* Centered container */
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  margin: 20px auto;
  padding: 0 15px;
  box-sizing: border-box;
  gap: 20px;
}

.main-content {
  width: 100%;
  background-color: #fff;
  border-radius: 12px;
  padding: 25px 30px;
  box-shadow: 0 6px 12px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* Headings */
h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 0;
  text-align: center;
  color: #1a1a1a;
}

h3 {
  font-size: 22px;
  margin-bottom: 15px;
  color: #333;
}

/* Announcements */
.announcement-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.announcement-card {
  background-color: #fefefe;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.05);
  transition: box-shadow 0.3s ease;
}

.announcement-card:hover {
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
}

.announcement-header {
  font-weight: 600;
  font-size: 16px;
  color: #0366d6;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.announcement-subject {
  font-weight: 700;
}

.announcement-teacher {
  color: #555;
  font-style: italic;
  font-size: 14px;
}

.announcement-text {
  font-size: 15px;
  line-height: 1.5;
  color: #444;
  white-space: pre-wrap;
}

/* Add post section */
.add-post-section {
  background-color: #f9faff;
  border: 1px solid #d0d7ff;
  padding: 20px;
  border-radius: 12px;
}

.add-post-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-label {
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.input-field {
  font-size: 15px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1.8px solid #c5c9f1;
  background-color: white;
  outline-offset: 2px;
  transition: border-color 0.25s ease;
  resize: vertical;
}

.input-field:focus {
  border-color: #3a49e0;
  box-shadow: 0 0 6px #b1b8ff;
}

.textarea-field {
  min-height: 60px;
  max-height: 150px;
  font-family: inherit;
}

.post-button {
  background-color: #3a49e0;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 14px 0;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.25s ease;
  user-select: none;
  width: 180px;
  align-self: flex-start;
}

.post-button:disabled {
  background-color: #a2a8f8;
  cursor: not-allowed;
}

.post-button:not(:disabled):hover {
  background-color: #2a36b8;
}

/* Responsive */
@media (max-width: 900px) {
  .dashboard-container {
    max-width: 100%;
    padding: 10px 15px;
  }

  .main-content {
    padding: 20px 15px;
    gap: 20px;
  }

  h2 {
    font-size: 22px;
  }

  h3 {
    font-size: 16px;
  }

  .post-button {
    width: 100%;
    padding: 12px 0;
    font-size: 15px;
  }

  .input-field,
  select,
  textarea {
    width: 100%;
    box-sizing: border-box;
  }

  .announcement-card {
    padding: 12px 15px;
  }

  .announcement-header {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
