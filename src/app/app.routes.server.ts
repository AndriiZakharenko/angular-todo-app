import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'todos/:status',
    renderMode: RenderMode.Prerender,
    getPrerenderParams() {
      return Promise.resolve([
        { status: 'all' },
        { status: 'active' },
        { status: 'completed' }
      ]);
    }
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
