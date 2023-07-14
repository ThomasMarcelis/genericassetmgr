import { Routes } from '@angular/router';

import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';

import { NotificationsComponent } from '../../pages/notifications/notifications.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'user',           component: UserComponent },
    { path: 'messages',          component: TableComponent },

    { path: 'home',  component: NotificationsComponent },

];
