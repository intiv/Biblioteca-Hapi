// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import App from './App.vue'
import Hello from './components/Hello.vue'
import Tabla from './components/Tabla.vue'
import Form from './components/Form.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'



Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
	routes : [
		{
			name: 'Home',
			path: '/books',
			component: Tabla,
			props: {prestados:false}
		},
		{
			name: 'Borrowed',
			path: '/books/borrowed',
			component: Tabla,
			props: {prestados:true}
		},
		{
			name: 'Create',
			path: '/books/create',
			component: Form
		}
	]
});

new Vue({ // eslint-disable-line no-new
  router,
  render: (h) => h(App)
}).$mount('#app');