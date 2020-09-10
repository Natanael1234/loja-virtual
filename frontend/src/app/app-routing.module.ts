import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'produto/:produtoId', loadChildren: () => import('./pages/produto/produto.module').then(m => m.ProdutoModule) },
  { path: 'produtos', loadChildren: () => import('./pages/produtos/produtos.module').then(m => m.ProdutosModule) },
  { path: 'carrinho', loadChildren: () => import('./pages/carrinho/carrinho.module').then(m => m.CarrinhoModule) },
  { path: '', redirectTo: 'produtos', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
