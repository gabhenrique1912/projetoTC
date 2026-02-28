import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () => import('./login/login.page')
      .then(m => m.LoginPage)
  },

  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes')
      .then(m => m.routes)
  },

  {
    path: 'add-produto',
    loadComponent: () => import('./add-produto/add-produto.page')
      .then(m => m.AddProdutoPage)
  },
  {
    path: 'add-usuario',
    loadComponent: () => import('./add-usuario/add-usuario.page')
      .then( m => m.AddUsuarioPage)
  },
  {
    path: 'add-ordem',
    loadComponent: () => import('./add-ordem/add-ordem.page').then( m => m.AddOrdemPage)
  }

];