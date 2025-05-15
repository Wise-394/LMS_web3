<script setup>
import { ref, computed } from 'vue'
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
  [
    { subject: 'Filipino', section: '10 - Mabini', room: 'Room 101' },
    { subject: 'English', section: '10 - Rizal', room: 'Room 102' },
    { subject: 'Break' },
    { subject: 'Math', section: '10 - Einstein', room: 'Room 103' },
    { subject: 'PathFit', section: '10 - Alpha', room: 'Gym' },
    { subject: 'Filipino', section: '10 - Bonifacio', room: 'Room 101' },
    { subject: 'English', section: '10 - Del Pilar', room: 'Room 102' },
    { subject: 'Math', section: '10 - Newton', room: 'Room 103' }
  ],
  [
    { subject: 'Math', section: '10 - Einstein', room: 'Room 103' },
    { subject: 'Filipino', section: '10 - Mabini', room: 'Room 101' },
    { subject: 'Break' },
    { subject: 'English', section: '10 - Rizal', room: 'Room 102' },
    { subject: 'PathFit', section: '10 - Beta', room: 'Gym' },
    { subject: 'Math', section: '10 - Newton', room: 'Room 103' },
    { subject: 'Filipino', section: '10 - Bonifacio', room: 'Room 101' },
    { subject: 'English', section: '10 - Del Pilar', room: 'Room 102' }
  ],
  [
    { subject: 'English', section: '10 - Del Pilar', room: 'Room 102' },
    { subject: 'Math', section: '10 - Einstein', room: 'Room 103' },
    { subject: 'Break' },
    { subject: 'Filipino', section: '10 - Mabini', room: 'Room 101' },
    { subject: 'PathFit', section: '10 - Alpha', room: 'Gym' },
    { subject: 'English', section: '10 - Rizal', room: 'Room 102' },
    { subject: 'Math', section: '10 - Newton', room: 'Room 103' },
    { subject: 'Filipino', section: '10 - Bonifacio', room: 'Room 101' }
  ],
  [
    { subject: 'Filipino', section: '10 - Bonifacio', room: 'Room 101' },
    { subject: 'English', section: '10 - Del Pilar', room: 'Room 102' },
    { subject: 'Break' },
    { subject: 'Math', section: '10 - Newton', room: 'Room 103' },
    { subject: 'PathFit', section: '10 - Beta', room: 'Gym' },
    { subject: 'Filipino', section: '10 - Mabini', room: 'Room 101' },
    { subject: 'English', section: '10 - Rizal', room: 'Room 102' },
    { subject: 'Math', section: '10 - Einstein', room: 'Room 103' }
  ],
  [
    { subject: 'Math', section: '10 - Newton', room: 'Room 103' },
    { subject: 'Filipino', section: '10 - Bonifacio', room: 'Room 101' },
    { subject: 'Break' },
    { subject: 'English', section: '10 - Del Pilar', room: 'Room 102' },
    { subject: 'PathFit', section: '10 - Alpha', room: 'Gym' },
    { subject: 'Math', section: '10 - Einstein', room: 'Room 103' },
    { subject: 'Filipino', section: '10 - Mabini', room: 'Room 101' },
    { subject: 'English', section: '10 - Rizal', room: 'Room 102' }
  ]
])

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const currentDay = ref(new Date().getDay() - 1) // 0 = Monday, 4 = Friday
const currentTime = ref(new Date().toLocaleTimeString())

// Update current time every minute
setInterval(() => {
  currentTime.value = new Date().toLocaleTimeString()
}, 60000)

const getCurrentTimeSlot = computed(() => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const time = hours * 60 + minutes

  const timeSlotRanges = [
    { start: 7 * 60 + 30, end: 8 * 60 + 30 }, // 7:30-8:30
    { start: 8 * 60 + 30, end: 9 * 60 + 30 }, // 8:30-9:30
    { start: 9 * 60 + 30, end: 10 * 60 }, // 9:30-10:00
    { start: 10 * 60, end: 11 * 60 }, // 10:00-11:00
    { start: 11 * 60, end: 12 * 60 }, // 11:00-12:00
    { start: 13 * 60, end: 14 * 60 }, // 1:00-2:00
    { start: 14 * 60, end: 15 * 60 }, // 2:00-3:00
    { start: 15 * 60, end: 16 * 60 }, // 3:00-4:00
  ]

  return timeSlotRanges.findIndex(slot => time >= slot.start && time < slot.end)
})

const isCurrentTimeSlot = (dayIndex, timeSlotIndex) => {
  return dayIndex === currentDay.value && timeSlotIndex === getCurrentTimeSlot.value
}
</script>

<template>
  <Header />
  <Navbar :role="'teacher'" />
  <div class="schedule-container">
    <div class="schedule-header">
      <h1>📅 Weekly Schedule</h1>
      <div class="current-time">
        <span class="time">{{ currentTime }}</span>
        <span class="day">{{ days[currentDay] }}</span>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="schedule-table">
        <thead>
          <tr>
            <th class="time-header">Time</th>
            <th 
              v-for="(day, index) in days" 
              :key="day"
              :class="{ 'current-day': index === currentDay }"
            >
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(timeSlot, timeIndex) in timeSlots" :key="timeSlot">
            <td class="time-slot">{{ timeSlot }}</td>
            <td 
              v-for="(daySchedule, dayIndex) in weekSchedule" 
              :key="dayIndex"
              :class="{ 'current-slot': isCurrentTimeSlot(dayIndex, timeIndex) }"
            >
              <div 
                v-if="daySchedule[timeIndex]"
                class="class-block"
              >
                <h4>{{ daySchedule[timeIndex].subject }}</h4>
                <div v-if="daySchedule[timeIndex].subject !== 'Break'" class="class-details">
                  <span class="section">{{ daySchedule[timeIndex].section }}</span>
                  <span class="room">{{ daySchedule[timeIndex].room }}</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.schedule-container {
  max-width: 1400px;
  margin: 40px auto;
  padding: 0 20px;
}

.schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.schedule-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
}

.current-time {
  text-align: right;
}

.time {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2563eb;
  display: block;
}

.day {
  font-size: 1rem;
  color: #64748b;
}

.table-wrapper {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: auto;
  margin-bottom: 24px;
}

.schedule-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 1000px;
}

.schedule-table th {
  background: #f8fafc;
  padding: 16px;
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
  color: #1a1a1a;
}

.time-header {
  width: 150px;
}

.current-day {
  background: #dbeafe !important;
  color: #1d4ed8;
}

.schedule-table td {
  padding: 12px;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: top;
  color: #334155;
}

.time-slot {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
  text-align: center;
}

.current-slot {
  background: #f0f9ff;
}

.class-block {
  background: white;
  border-radius: 8px;
  padding: 12px;
  height: 100%;
  transition: all 0.2s ease;
  border: 1px solid #e2e8f0;
  color: #1a1a1a;
}

.class-block h4 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 8px;
  color: #1a1a1a;
}

.class-details {
  font-size: 0.85rem;
  color: #64748b;
}

.section {
  display: block;
  margin-bottom: 4px;
}

.room {
  display: block;
  font-weight: 500;
}

/* Responsive Enhancements */
@media (max-width: 1024px) {
  .schedule-table {
    min-width: 800px;
  }

  .schedule-header h1 {
    font-size: 1.75rem;
  }

  .time {
    font-size: 1.25rem;
  }

  .day {
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
  .schedule-container {
    margin: 20px auto;
    padding: 0 16px;
  }

  .schedule-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .current-time {
    text-align: left;
  }

  .schedule-table {
    min-width: 600px;
  }

  .schedule-header h1 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .schedule-table {
    min-width: 100%;
  }

  .schedule-header h1 {
    font-size: 1.25rem;
  }

  .time {
    font-size: 1.1rem;
  }

  .day {
    font-size: 0.9rem;
  }

  .class-block h4 {
    font-size: 0.95rem;
  }

  .class-details {
    font-size: 0.8rem;
  }
}
</style>

