<script setup>
import { defineProps } from 'vue';

// Accept progress and label as props
const props = defineProps({
  progress: {
    type: Number,
    required: true,
    validator(value) {
      return value >= 0 && value <= 100; // Ensure progress is between 0 and 100
    }
  },
  label: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="container">
    <p>{{ label }}: {{ progress }}%</p>
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

p {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.progress-bar-container {
  background-color: #ddd;
  border-radius: 10px;
  height: 20px;
  width: 100%;
  overflow: hidden;
  margin-bottom: 15px;
}

.progress-bar {
  background-color: #5498FF;
  height: 100%;
  transition: width 0.3s ease-in-out;
}
</style>
