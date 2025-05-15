<template>
  <button 
    :class="[
      'custom-button',
      variant,
      { 'loading': loading }
    ]"
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
    <span v-if="loading" class="spinner"></span>
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'success'].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped lang="scss">
.custom-button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &.primary {
    background-color: #3B82F6;
    color: white;
    &:hover:not(:disabled) {
      background-color: #2563EB;
    }
  }

  &.secondary {
    background-color: #9CA3AF;
    color: white;
    &:hover:not(:disabled) {
      background-color: #6B7280;
    }
  }

  &.danger {
    background-color: #EF4444;
    color: white;
    &:hover:not(:disabled) {
      background-color: #DC2626;
    }
  }

  &.success {
    background-color: #10B981;
    color: white;
    &:hover:not(:disabled) {
      background-color: #059669;
    }
  }

  .spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 