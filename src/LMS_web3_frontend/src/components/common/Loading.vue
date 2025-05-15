<template>
  <div v-if="show" class="loading-overlay" :class="{ 'full-page': fullPage }">
    <div class="loading-content">
      <div class="spinner"></div>
      <div v-if="text" class="loading-text">{{ text }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: ''
  },
  fullPage: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss">
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  &.full-page {
    position: fixed;
    z-index: 9999;
  }
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid #E5E7EB;
  border-top-color: #3B82F6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: #4B5563;
  font-size: 0.875rem;
  font-weight: 500;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 