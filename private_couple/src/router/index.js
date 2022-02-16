import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from '@/components/LoginView';
import NotFound from '@/components/common/NotFound.vue';

Vue.use(VueRouter);

export const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/login',
		},
		{
			path: '/login',
			component: LoginView,
			name: 'login',
		},
		{
			path: '/creating',
			component: () => import('@/components/CourseCreating'),
			name: 'creating',
		},
		{
			path: '/list',
			component: () => import('@/components/CourseList'),
			name: 'list',
		},
		{
			path: '/last',
			component: () => import('@/components/CourseLast'),
			name: 'last',
		},
		{
			path: '/start',
			component: () => import('@/components/CourseStart'),
			name: 'start',
		},
		{
			path: '*',
			component: NotFound,
		},
	],
});
