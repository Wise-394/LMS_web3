<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => router.back()
</script>

<template>
<button class="back-button" @click="goBack">← Back</button>
  <div class="classroom-container">
    <div class="classroom-header">

      <h1>📘 Filipino</h1>
      <p>Section 10 - Mabini | School Year 2024–2025</p>
    </div>

    <div class="announcement-section">
      <h2>📚 Modules</h2>

      <div class="post">
        <h3 class="post-author">Chapter 1: Wika at Lipunan</h3>
        <p class="post-date">📅 Posted May 10, 2025</p>
        <p class="post-content">
          Sa modyul na ito, tatalakayin natin ang papel ng wika sa lipunan at kung paano ito ginagamit bilang instrumento ng komunikasyon at kultura.
        </p>
        <button class="view-button">📄 View Module</button>
      </div>

      <div class="post">
        <h3 class="post-author">Chapter 2: Kasaysayan ng Wikang Filipino</h3>
        <p class="post-date">📅 Posted May 8, 2025</p>
        <p class="post-content">
          Ang kabanatang ito ay sumasaklaw sa ebolusyon ng wikang Filipino mula sa katutubong wika hanggang sa kasalukuyang anyo nito bilang pambansang wika.
        </p>
        <button class="view-button">📄 View Module</button>
      </div>

      <div class="post">
        <h3 class="post-author">Chapter 3: Mga Barayti ng Wika</h3>
        <p class="post-date">📅 Posted May 6, 2025</p>
        <p class="post-content">
          Tatalakayin dito ang iba't ibang barayti ng wika tulad ng idyolek, sosyolek, at dayalek, at ang kahalagahan ng mga ito sa pang-araw-araw na pakikipagkomunikasyon.
        </p>
        <button class="view-button">📄 View Module</button>
      </div>

      <div class="post">
        <h3 class="post-author">Chapter 4: Wika at Kultura</h3>
        <p class="post-date">📅 Posted May 4, 2025</p>
        <p class="post-content">
          Ang ugnayan ng wika at kultura, at kung paano pinapanday ng wika ang ating identidad bilang mga Pilipino.
        </p>
        <button class="view-button">📄 View Module</button>
      </div>
    </div>

    <div class="resources-section">
      <h2>📎 Resources</h2>
      <ul>
        <li>📘 Filipino Grammar PDF</li>
        <li>🎥 Video Lecture: Kasaysayan ng Wikang Filipino</li>
        <li>📝 Quiz Reviewer (Ch. 1–2)</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.classroom-container {
  max-width: 850px;
  margin: 40px auto;
  background-color: #f4f9fc;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.06);
  font-family: 'Segoe UI', sans-serif;
}

.classroom-header {
  background-color: #5498FF;
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

.post {
  background-color: #ffffff;
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
  background-color: #5498FF;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

.view-button:hover {
  background-color: #3f7be0;
}

.resources-section ul {
  list-style-type: none;
  padding: 0;
}

.resources-section li {
  background-color: #e9f2ff;
  padding: 12px 16px;
  margin-bottom: 10px;
  border-radius: 8px;
  color: #333;
  font-size: 15px;
}
</style>
