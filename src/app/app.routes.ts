import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'intro',
    loadComponent: () => import('./pages/intro/intro.page').then((m) => m.IntroPage),
  },
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full',
  },
  {
    path: 'intro',
    loadComponent: () => import('./pages/intro/intro.page').then( m => m.IntroPage)
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'archivo',
    loadComponent: () => import('./pages/archivo/archivo.page').then( m => m.ArchivoPage)
  },
  {
    path: 'geones',
    loadComponent: () => import('./pages/geones/geones.page').then( m => m.GeonesPage)
  },
  {
    path: 'constelaciones',
    loadComponent: () => import('./pages/constelaciones/constelaciones.page').then( m => m.ConstelacionesPage)
  },
  {
    path: 'entrada-geon/:geon',
    loadComponent: () => import('./pages/entrada-geon/entrada-geon.page').then( m => m.EntradaGeonPage)
  },
  {
    path: 'geografia',
    loadComponent: () => import('./pages/geografia/geografia.page').then( m => m.GeografiaPage)
  },
  {
    path: 'territorios',
    loadComponent: () => import('./pages/territorios/territorios.page').then( m => m.TerritoriosPage)
  },
  {
    path: 'entrada-territorio/:territorio',
    loadComponent: () => import('./pages/entrada-territorio/entrada-territorio.page').then( m => m.EntradaTerritorioPage)
  },
  {
    path: 'entrada-territorio/:territorio/lugares',
    loadComponent: () => import('./pages/lugares/lugares.page').then( m => m.LugaresPage)
  },
  {
    path: 'ferhel',
    loadComponent: () => import('./pages/ferhel/ferhel.page').then( m => m.FerhelPage)
  },
  {
    path: 'ferhel/lista-ferhel',
    loadComponent: () => import('./pages/lista-ferhel/lista-ferhel.page').then( m => m.ListaFerhelPage)
  },

];
