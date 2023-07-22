import { Layout, EventsList, AddEdit, Calendar } from '@/views/events';

export default {
    path: '/events',
    component: Layout,
    children: [
        { path: '', component: EventsList },
        { path: 'add', component: AddEdit },
        { path: 'edit/:id', component: AddEdit },
        { path: 'calendar', component: Calendar }
    ]
};
