import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from '@/components/LoginView';
import NotFound from '@/components/common/NotFound.vue';
import store from '@/store/index.js';

Vue.use(VueRouter);

const router = new VueRouter({
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
			meta: { auth: true },
		},
		{
			path: '/list',
			component: () => import('@/components/CourseList'),
			name: 'list',
			meta: { auth: true },
		},
		{
			path: '/last',
			component: () => import('@/components/CourseLast'),
			name: 'last',
			meta: { auth: true },
		},
		{
			path: '/start',
			component: () => import('@/components/CourseStart'),
			name: 'start',
			meta: { auth: true },
		},
		{
			path: '*',
			component: NotFound,
		},
	],
});

router.beforeEach((to, from, next) => {
	if (to.meta.auth && store.getters.isLogin) {
		console.log('로그인이 필요합니다.');
		next('/login');
		return;
	}
	next();
});

export default router;
