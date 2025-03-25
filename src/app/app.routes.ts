import { Routes } from '@angular/router';
import { TodosPageComponent } from './pages/todos-pages/todos-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'todos/all', pathMatch: 'full' },
  { path: 'todos/:status', component: TodosPageComponent },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutModule),
  },
  { path: '**', redirectTo: 'todos/all', pathMatch: 'full' },
];
