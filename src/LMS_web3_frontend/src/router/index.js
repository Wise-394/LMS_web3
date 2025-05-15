// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';

import StudentHome from '../components/student/StudentHome.vue';
import SubjectsPage from '../components/student/SubjectsPage.vue';

import TeacherHome from '../components/teacher/TeacherHome.vue';
import Filipino from '../components/student/Filipino.vue';
import Activities from '../components/student/Activities.vue';
import Profile from '../components/student/Profile.vue';
import Classes from '../components/teacher/Classes.vue';
import Teacher_Filipino from '../components/teacher/Teacher_Filipino.vue';
import Schedule from '../components/teacher/Schedule.vue';
import Login from '../components/Login.vue';


const routes = [
  { path: '/', name: 'index', component: HomePage},
  { path: '/login', name: 'login', component: Login},


  { path: '/student', name: 'student', component: StudentHome },
  { path: '/student/subject/filipino', name: 'filipino', component: Filipino},
  { path: '/student/subject', name: 'student-subject', component: SubjectsPage },
  { path: '/student/activities', name: 'activities', component: Activities },
{ path: '/student/profile', name: 'profile', component: Profile },

  { path: '/teacher', name: 'teacher', component: TeacherHome },
  { path: '/teacher/classes', name: 'teacher-classes', component: Classes },
  { path: '/teacher/subject/filipino', name: 'teacher-filipino', component: Teacher_Filipino},
  { path: '/teacher/schedule', name: 'schedule', component: Schedule  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
