import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginActivate } from '../providers/loginActivate';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule),canActivate:[LoginActivate]
      },
      {
        path: 'task',
        loadChildren: () => import('../pages/task/task.module').then(m => m.TaskPageModule),canActivate:[LoginActivate]
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule),canActivate:[LoginActivate]
      },
      {
        path: 'attendance',
        loadChildren: () => import('../pages/attendance/attendance.module').then(m => m.AttendancePageModule),canActivate:[LoginActivate]
      },
      {
        path: 'noti',
        loadChildren: () => import('../pages/noti/noti.module').then(m => m.NotiPageModule),canActivate:[LoginActivate]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
