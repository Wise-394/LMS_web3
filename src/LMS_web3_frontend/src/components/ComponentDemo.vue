<template>
  <div class="demo-container">
    <h1>Component Demo</h1>

    <!-- Button Demo -->
    <BaseCard>
      <template #header>
        <h2>Buttons</h2>
      </template>
      
      <div class="button-group">
        <BaseButton variant="primary">Primary</BaseButton>
        <BaseButton variant="secondary">Secondary</BaseButton>
        <BaseButton variant="danger">Danger</BaseButton>
        <BaseButton variant="success">Success</BaseButton>
        <BaseButton variant="primary" loading>Loading</BaseButton>
        <BaseButton variant="primary" disabled>Disabled</BaseButton>
      </div>
    </BaseCard>

    <!-- Input Demo -->
    <BaseCard>
      <template #header>
        <h2>Inputs</h2>
      </template>
      
      <div class="input-group">
        <BaseInput
          v-model="inputDemo.text"
          label="Text Input"
          placeholder="Enter some text"
          id="text-input"
        />
        
        <BaseInput
          v-model="inputDemo.required"
          label="Required Input"
          placeholder="This field is required"
          required
          id="required-input"
        />
        
        <BaseInput
          v-model="inputDemo.error"
          label="Input with Error"
          error="This field has an error"
          id="error-input"
        />
        
        <BaseInput
          v-model="inputDemo.withIcon"
          label="Input with Icon"
          icon="fas fa-search"
          placeholder="Search..."
          id="icon-input"
        />
      </div>
    </BaseCard>

    <!-- Modal Demo -->
    <BaseCard>
      <template #header>
        <h2>Modal</h2>
      </template>
      
      <BaseButton @click="showModal = true">Open Modal</BaseButton>
      
      <BaseModal v-model="showModal" title="Demo Modal">
        <p>This is a modal dialog. You can close it by:</p>
        <ul>
          <li>Clicking the close button</li>
          <li>Clicking outside the modal</li>
          <li>Pressing the Escape key</li>
        </ul>
        
        <template #footer>
          <div class="modal-actions">
            <BaseButton variant="secondary" @click="showModal = false">Cancel</BaseButton>
            <BaseButton variant="primary" @click="showModal = false">Confirm</BaseButton>
          </div>
        </template>
      </BaseModal>
    </BaseCard>

    <!-- Toast Demo -->
    <BaseCard>
      <template #header>
        <h2>Toasts</h2>
      </template>
      
      <div class="button-group">
        <BaseButton variant="primary" @click="showToast('info')">Info Toast</BaseButton>
        <BaseButton variant="success" @click="showToast('success')">Success Toast</BaseButton>
        <BaseButton variant="danger" @click="showToast('error')">Error Toast</BaseButton>
        <BaseButton variant="secondary" @click="showToast('warning')">Warning Toast</BaseButton>
      </div>
    </BaseCard>

    <!-- Loading Demo -->
    <BaseCard>
      <template #header>
        <h2>Loading States</h2>
      </template>
      
      <div class="button-group">
        <BaseButton @click="startLoadingDemo">Start Loading</BaseButton>
      </div>
      
      <BaseLoading :show="isLoading" text="Loading..." />
    </BaseCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLoading } from '../composables/useLoading'

const inputDemo = ref({
  text: '',
  required: '',
  error: '',
  withIcon: ''
})

const showModal = ref(false)
const { isLoading, withLoading } = useLoading()

const showToast = (type) => {
  const messages = {
    info: 'This is an info message',
    success: 'Operation completed successfully!',
    error: 'Something went wrong!',
    warning: 'Please be careful!'
  }
  
  const toast = getCurrentInstance().proxy.$toast
  toast[type](messages[type])
}

const startLoadingDemo = () => {
  withLoading(async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))
  }, 'Loading...')
}
</script>

<style scoped lang="scss">
.demo-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

h1 {
  text-align: center;
  color: #111827;
  margin-bottom: 2rem;
}

h2 {
  margin: 0;
  color: #374151;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style> 