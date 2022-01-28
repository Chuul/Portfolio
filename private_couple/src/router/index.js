import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from '@/components/LoginView';
import CreateView from '@/components/CreateView';
import ListView from '@/components/ListView.vue';
import LastView from '@/components/LastView.vue';
import StartView from '@/components/StartView.vue';
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
			component: CreateView,
			name: 'creating',
		},
		{
			path: '/list',
			component: ListView,
			name: 'list',
		},
		{
			path: '/last',
			component: LastView,
			name: 'last',
		},
		{
			path: '/start',
			component: StartView,
			name: 'start',
		},
		{
			path: '*',
			component: NotFoundView,
		},
	],
});
