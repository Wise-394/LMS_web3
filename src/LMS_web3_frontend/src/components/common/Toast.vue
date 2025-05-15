<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast"
          :class="[toast.type, { 'with-action': toast.action }]"
        >
          <div class="toast-content">
            <div class="toast-icon" v-if="toast.type">
              <i :class="getIcon(toast.type)"></i>
            </div>
            <div class="toast-message">{{ toast.message }}</div>
            <button
              v-if="toast.action"
              class="toast-action"
              @click="toast.action.handler"
            >
              {{ toast.action.text }}
            </button>
          </div>
          <div class="toast-progress" :style="{ width: `${toast.progress}%` }"></div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const toasts = ref([])
let nextId = 0

const getIcon = (type) => {
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-times-circle',
    warning: 'fas fa-exclamation-circle',
    info: 'fas fa-info-circle'
  }
  return icons[type] || icons.info
}

const showToast = (message, options = {}) => {
  const id = nextId++
  const toast = {
    id,
    message,
    type: options.type || 'info',
    duration: options.duration || 3000,
    action: options.action,
    progress: 100
  }

  toasts.value.push(toast)

  const startTime = Date.now()
  const timer = setInterval(() => {
    const elapsed = Date.now() - startTime
    const remaining = toast.duration - elapsed
    toast.progress = (remaining / toast.duration) * 100

    if (remaining <= 0) {
      clearInterval(timer)
      removeToast(id)
    }
  }, 10)

  return id
}

const removeToast = (id) => {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index !== -1) {
    toasts.value.splice(index, 1)
  }
}

defineExpose({
  show: showToast,
  success: (message, options = {}) => showToast(message, { ...options, type: 'success' }),
  error: (message, options = {}) => showToast(message, { ...options, type: 'error' }),
  warning: (message, options = {}) => showToast(message, { ...options, type: 'warning' }),
  info: (message, options = {}) => showToast(message, { ...options, type: 'info' })
})
</script>

<style scoped lang="scss">
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
}

.toast {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  position: relative;
  
  &.success {
    border-left: 4px solid #10B981;
    .toast-icon { color: #10B981; }
  }
  
  &.error {
    border-left: 4px solid #EF4444;
    .toast-icon { color: #EF4444; }
  }
  
  &.warning {
    border-left: 4px solid #F59E0B;
    .toast-icon { color: #F59E0B; }
  }
  
  &.info {
    border-left: 4px solid #3B82F6;
    .toast-icon { color: #3B82F6; }
  }
}

.toast-content {
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.toast-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.toast-message {
  flex-grow: 1;
  font-size: 0.875rem;
  color: #1F2937;
}

.toast-action {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #4B5563;
  background: #F3F4F6;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  
  &:hover {
    background: #E5E7EB;
  }
}

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: currentColor;
  opacity: 0.2;
  transition: width 10ms linear;
}

// Transitions
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style> 