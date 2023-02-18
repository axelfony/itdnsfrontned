import { Layout, Calendar, AddEdit } from '@/views/events';

export default {
    path: '/events',
    component: Layout,
    children: [
        { path: '', component: Calendar },
        { path: 'add', component: AddEdit },
        { path: 'edit/:id', component: AddEdit }
    ]
};
