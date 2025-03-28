
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/angular-todo-app/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/angular-todo-app/todos/all",
    "route": "/angular-todo-app"
  },
  {
    "renderMode": 2,
    "route": "/angular-todo-app/todos/all"
  },
  {
    "renderMode": 2,
    "route": "/angular-todo-app/todos/active"
  },
  {
    "renderMode": 2,
    "route": "/angular-todo-app/todos/completed"
  },
  {
    "renderMode": 0,
    "route": "/angular-todo-app/todos/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-INIOEYD5.js"
    ],
    "route": "/angular-todo-app/about"
  },
  {
    "renderMode": 2,
    "redirectTo": "/angular-todo-app/todos/all",
    "route": "/angular-todo-app/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 123755, hash: '37d847c98df204f08a28e8d0f01a93db25f7507fada071f7257da51558a32e5a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1081, hash: 'a3708683a48224edee0219a874abe80bbc34acb64ac109ff7b884b1ad4493a9e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'todos/active/index.html': {size: 156564, hash: 'c316857c18721e4d88c0a969c697d92f6a6f2edab5f9089b3588aed055e4fb4d', text: () => import('./assets-chunks/todos_active_index_html.mjs').then(m => m.default)},
    'todos/all/index.html': {size: 156564, hash: 'c316857c18721e4d88c0a969c697d92f6a6f2edab5f9089b3588aed055e4fb4d', text: () => import('./assets-chunks/todos_all_index_html.mjs').then(m => m.default)},
    'todos/completed/index.html': {size: 156564, hash: 'c316857c18721e4d88c0a969c697d92f6a6f2edab5f9089b3588aed055e4fb4d', text: () => import('./assets-chunks/todos_completed_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 156617, hash: '61650c34e4fec5640da46e21f04cf68266235034dd7e1baf979fe6fdfbec752f', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'styles-EM4JWUCM.css': {size: 770572, hash: 'Bxlr2dq/Qg0', text: () => import('./assets-chunks/styles-EM4JWUCM_css.mjs').then(m => m.default)}
  },
};
