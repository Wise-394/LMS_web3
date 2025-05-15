<template>
  <div class="background-wrapper">
    <!-- Animated gradient background -->
    <div class="gradient-bg"></div>
    
    <!-- Grid pattern overlay -->
    <div class="grid-pattern"></div>
    
    <!-- Animated shapes -->
    <div class="shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
      <div class="shape shape-5"></div>
      <div class="shape shape-6"></div>
    </div>
    
    <!-- Light beam effects -->
    <div class="light-beams">
      <div class="beam beam-1"></div>
      <div class="beam beam-2"></div>
      <div class="beam beam-3"></div>
    </div>
    
    <!-- Noise texture overlay -->
    <div class="noise-overlay"></div>
  </div>
</template>

<style scoped>
.background-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

/* Gradient Background */
.gradient-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 0% 0%, rgba(14, 165, 233, 0.15), transparent 50%),
    radial-gradient(circle at 100% 0%, rgba(37, 99, 235, 0.1), transparent 50%),
    radial-gradient(circle at 100% 100%, rgba(14, 165, 233, 0.15), transparent 50%),
    radial-gradient(circle at 0% 100%, rgba(37, 99, 235, 0.1), transparent 50%),
    linear-gradient(135deg, rgba(248, 250, 252, 0.8), rgba(241, 245, 249, 0.8));
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Grid Pattern */
.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(226, 232, 240, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(226, 232, 240, 0.3) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.5;
}

/* Animated Shapes */
.shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  background: linear-gradient(135deg, #0ea5e9, #2563eb);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  filter: blur(30px);
  opacity: 0.07;
  animation: floatAnimation 20s infinite alternate ease-in-out;
}

.shape-1 {
  width: 400px;
  height: 400px;
  top: -200px;
  left: -200px;
}

.shape-2 {
  width: 300px;
  height: 300px;
  top: 40%;
  right: -150px;
  animation-delay: 5s;
}

.shape-3 {
  width: 250px;
  height: 250px;
  bottom: 10%;
  left: 10%;
  animation-delay: 10s;
}

.shape-4 {
  width: 200px;
  height: 200px;
  top: 20%;
  left: 30%;
  animation-delay: 15s;
}

.shape-5 {
  width: 350px;
  height: 350px;
  bottom: -175px;
  right: 10%;
  animation-delay: 7s;
}

.shape-6 {
  width: 225px;
  height: 225px;
  top: 40%;
  left: 50%;
  animation-delay: 12s;
}

@keyframes floatAnimation {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  100% {
    transform: translate(30px, 30px) rotate(60deg) scale(1.1);
  }
}

/* Light Beams */
.light-beams {
  position: absolute;
  width: 100%;
  height: 100%;
  mix-blend-mode: soft-light;
}

.beam {
  position: absolute;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent);
  transform-origin: 0 0;
}

.beam-1 {
  width: 150%;
  height: 150px;
  top: 20%;
  left: -25%;
  transform: rotate(45deg);
  animation: beamMove 8s infinite alternate ease-in-out;
}

.beam-2 {
  width: 150%;
  height: 100px;
  top: 45%;
  left: -25%;
  transform: rotate(-45deg);
  animation: beamMove 12s infinite alternate-reverse ease-in-out;
}

.beam-3 {
  width: 150%;
  height: 75px;
  top: 70%;
  left: -25%;
  transform: rotate(45deg);
  animation: beamMove 10s infinite alternate ease-in-out;
}

@keyframes beamMove {
  0% { transform: rotate(45deg) translateX(0); opacity: 0.3; }
  100% { transform: rotate(45deg) translateX(50px); opacity: 0.7; }
}

/* Noise Texture */
.noise-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.02;
  mix-blend-mode: overlay;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .gradient-bg {
    background: 
      radial-gradient(circle at 0% 0%, rgba(14, 165, 233, 0.2), transparent 50%),
      radial-gradient(circle at 100% 0%, rgba(37, 99, 235, 0.15), transparent 50%),
      radial-gradient(circle at 100% 100%, rgba(14, 165, 233, 0.2), transparent 50%),
      radial-gradient(circle at 0% 100%, rgba(37, 99, 235, 0.15), transparent 50%),
      linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9));
  }

  .grid-pattern {
    background-image: 
      linear-gradient(rgba(226, 232, 240, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(226, 232, 240, 0.1) 1px, transparent 1px);
  }

  .shape {
    opacity: 0.1;
  }

  .beam {
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.05), transparent);
  }

  .noise-overlay {
    opacity: 0.03;
  }
}
</style> 