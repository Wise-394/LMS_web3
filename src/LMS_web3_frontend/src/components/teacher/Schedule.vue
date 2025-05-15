<script setup>
import { ref } from 'vue'
import Header from '../Header.vue'
import Navbar from '../Navbar.vue'

const timeSlots = ref([
  '7:30–8:30 AM',
  '8:30–9:30 AM',
  '9:30–10:00 AM',
  '10:00–11:00 AM',
  '11:00–12:00 PM',
  '1:00–2:00 PM',
  '2:00–3:00 PM',
  '3:00–4:00 PM',
])

const weekSchedule = ref([
  ['Math 101', 'Science 102', 'break', 'History 104', 'PE 105', 'Math 101', 'Science 102', 'Science 102', 'History 104', 'PE 105'],
  ['Math 101', 'Science 102', 'break', 'History 104', 'PE 105', 'Math 101', 'Science 102', 'Science 102', 'History 104', 'PE 105'],
  ['Math 101', 'Science 102', 'break', 'History 104', 'PE 105', 'Math 101', 'Science 102', 'Science 102', 'History 104', 'PE 105'],
  ['Math 101', 'Science 102', 'break', 'History 104', 'PE 105', 'Math 101', 'Science 102', 'Science 102', 'History 104', 'PE 105'],
  ['Math 101', 'Science 102', 'break', 'History 104', 'PE 105', 'Math 101', 'Science 102', 'Science 102', 'History 104', 'PE 105'],
])
</script>

<template>
  <Header />
  <Navbar :role="'teacher'" />
  <div class="schedule-container">
    <h1 class="schedule-header">📚 Teacher Weekly Schedule</h1>
    <div class="table-wrapper">
      <table class="schedule-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(timeSlot, index) in timeSlots" :key="index">
            <td>{{ timeSlot }}</td>
            <td v-for="(daySchedule, dayIndex) in weekSchedule" :key="dayIndex">
              <div v-if="daySchedule[index]">{{ daySchedule[index] }}</div>
              <div v-else>-</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.schedule-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}

.schedule-header {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.table-wrapper {
  overflow-x: auto; /* enables horizontal scrolling on smaller screens */
  -webkit-overflow-scrolling: touch; /* smooth scrolling on iOS */
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  min-width: 600px; /* ensures some minimum width for table */
}

.schedule-table thead th {
  position: sticky;
  top: 0;
  background-color: #f4f4f4;
  z-index: 5;
  border: 1px solid #ddd;
  padding: 12px;
  font-weight: bold;
  text-align: center;
}

.schedule-table th,
.schedule-table td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
}

.schedule-table td {
  background-color: #fafafa;
}

.schedule-table td div {
  padding: 6px;
  background-color: #e9f7ef;
  border-radius: 4px;
  font-size: 14px;
}

/* Responsive tweaks */
@media (max-width: 768px) {
  .schedule-table th,
  .schedule-table td {
    padding: 8px 6px;
    font-size: 12px;
  }

  .schedule-header {
    font-size: 20px;
  }
}
</style>
