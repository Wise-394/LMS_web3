<template>
  <div 
    class="card"
    :class="[
      `elevation-${elevation}`,
      { 'hoverable': hoverable }
    ]"
  >
    <div v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>
    
    <div class="card-content">
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  elevation: {
    type: Number,
    default: 1,
    validator: (value) => value >= 0 && value <= 3
  },
  hoverable: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss">
.card {
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  
  &.elevation-0 {
    border: 1px solid #E5E7EB;
  }
  
  &.elevation-1 {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  }
  
  &.elevation-2 {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  &.elevation-3 {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  &.hoverable {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
  }
}

.card-header {
  padding: 1.25rem;
  border-bottom: 1px solid #E5E7EB;
}

.card-content {
  padding: 1.25rem;
}

.card-footer {
  padding: 1.25rem;
  border-top: 1px solid #E5E7EB;
  background-color: #F9FAFB;
}
</style> 