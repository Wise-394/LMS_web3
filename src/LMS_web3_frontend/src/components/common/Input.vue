<template>
  <div class="input-wrapper">
    <label v-if="label" :for="id" class="input-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    
    <div class="input-container">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        class="custom-input"
        :class="{ 'error': error, 'with-icon': icon }"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <font-awesome-icon v-if="icon" :icon="icon" class="input-icon" />
    </div>

    <span v-if="error" class="error-message">{{ error }}</span>
    <span v-if="hint" class="hint-text">{{ hint }}</span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    required: true
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.input-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;

  .required {
    color: #EF4444;
    margin-left: 0.25rem;
  }
}

.input-container {
  position: relative;
  width: 100%;
}

.custom-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: white;
  color: #1F2937;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    background-color: #F3F4F6;
    cursor: not-allowed;
  }

  &.error {
    border-color: #EF4444;
    &:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  }

  &.with-icon {
    padding-right: 2.5rem;
  }
}

.input-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7280;
  font-size: 1.25rem;
}

.error-message {
  font-size: 0.875rem;
  color: #EF4444;
}

.hint-text {
  font-size: 0.875rem;
  color: #6B7280;
}
</style> 