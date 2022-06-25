import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginActivate } from './providers/loginActivate';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),canActivate:[LoginActivate]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),canActivate:[LoginActivate]
  },
  {
    path: 'task',
    loadChildren: () => import('./pages/task/task.module').then( m => m.TaskPageModule),canActivate:[LoginActivate]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),canActivate:[LoginActivate]
  },
  {
    path: 'noti',
    loadChildren: () => import('./pages/noti/noti.module').then( m => m.NotiPageModule),canActivate:[LoginActivate]
  },
  {
    path: 'attendance',
    loadChildren: () => import('./pages/attendance/attendance.module').then( m => m.AttendancePageModule),canActivate:[LoginActivate]
  },
  {
    path: 'leave',
    loadChildren: () => import('./pages/leave/leave.module').then( m => m.LeavePageModule),canActivate:[LoginActivate]
  },
  {
    path: 'email',
    loadChildren: () => import('./pages/email/email.module').then( m => m.EmailPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
