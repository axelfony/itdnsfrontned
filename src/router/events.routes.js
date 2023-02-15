import { Layout, List, AddEdit } from '@/views/events';

export default {
    path: '/events',
    component: Layout,
    children: [
        { path: '', component: List },
        { path: 'add', component: AddEdit },
        { path: 'edit/:id', component: AddEdit }
    ]
};
