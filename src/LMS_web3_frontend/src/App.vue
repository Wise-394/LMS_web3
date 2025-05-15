<!-- src/App.vue -->
<template>
  <div id="app">
    <BackgroundEffect />
    <router-view />
  </div>
</template>

<script setup>
import BackgroundEffect from './components/common/BackgroundEffect.vue';
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

/* Reset and base styles */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  min-height: 100vh;
  color: #0f172a;
  background: transparent;
}

#app {
  min-height: 100vh;
  position: relative;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(241, 245, 249, 0.8);
}

::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.5);
  border-radius: 5px;
  transition: background 0.2s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.8);
}

/* Selection styling */
::selection {
  background: rgba(14, 165, 233, 0.2);
  color: #0f172a;
}

/* Focus outline */
:focus {
  outline: 2px solid rgba(14, 165, 233, 0.5);
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  body {
    color: #f8fafc;
  }

  ::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.8);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.3);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(148, 163, 184, 0.5);
  }

  ::selection {
    background: rgba(14, 165, 233, 0.3);
    color: #f8fafc;
  }
}
</style>
