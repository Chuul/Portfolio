import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from '@/components/LoginView';
import NotFoundView from '@/components/NotFoundView.vue';

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
			component: () => import('@/components/CreateView'),
			name: 'creating',
		},
		{
			path: '/list',
			component: () => import('@/components/ListView'),
			name: 'list',
		},
		{
			path: '/last',
			component: () => import('@/components/LastView'),
			name: 'last',
		},
		{
			path: '/start',
			component: () => import('@/components/StartView'),
			name: 'start',
		},
		{
			path: '*',
			component: NotFoundView,
		},
	],
});
