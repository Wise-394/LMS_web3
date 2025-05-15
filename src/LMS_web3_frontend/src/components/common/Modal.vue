<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click="closeOnBackdrop && $emit('update:modelValue', false)">
        <div class="modal-container" :class="size" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">
              <slot name="header">{{ title }}</slot>
            </h3>
            <button v-if="showClose" class="close-button" @click="$emit('update:modelValue', false)">
              ×
            </button>
          </div>

          <div class="modal-content">
            <slot></slot>
          </div>

          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  showClose: {
    type: Boolean,
    default: true
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue'])

const handleEscape = (e) => {
  if (e.key === 'Escape' && props.modelValue) {
    emit('update:modelValue', false)
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  
  &.small {
    width: 95%;
    max-width: 400px;
  }
  
  &.medium {
    width: 95%;
    max-width: 600px;
  }
  
  &.large {
    width: 95%;
    max-width: 800px;
  }
}

.modal-header {
  padding: 1.25rem;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6B7280;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
  
  &:hover {
    color: #374151;
  }
}

.modal-content {
  padding: 1.25rem;
  overflow-y: auto;
}

.modal-footer {
  padding: 1.25rem;
  border-top: 1px solid #E5E7EB;
  background-color: #F9FAFB;
}

// Transitions
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container {
  animation: modal-in 0.3s ease-out;
}

.modal-leave-active .modal-container {
  animation: modal-out 0.3s ease-in;
}

@keyframes modal-in {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes modal-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-50px);
    opacity: 0;
  }
}
</style> 