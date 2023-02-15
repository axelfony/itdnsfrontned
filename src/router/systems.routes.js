import { Layout, List, AddEdit } from '@/views/systems';

export default {
    path: '/systems',
    component: Layout,
    children: [
        { path: '', component: List },
        { path: 'add', component: AddEdit },
        { path: 'edit/:id', component: AddEdit }
    ]
};
