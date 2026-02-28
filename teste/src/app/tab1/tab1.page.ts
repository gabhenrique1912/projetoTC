import { Component } from '@angular/core';
import { 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular/standalone';
import { AddProdutoPage } from '../add-produto/add-produto.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,      
    IonItem,
    IonLabel,     
    CommonModule  
  ],
})
export class Tab1Page {

  produtos: any[] = [];
  constructor(
  private http: HttpClient,
  private modalCtrl: ModalController
) {}


carregarProdutos() {
  this.http.get<any[]>('http://localhost:80/meu_backend/listar_produtos.php')
    .subscribe(res => {
      this.produtos = res;
    });
}


async abrirModal() {
  const modal = await this.modalCtrl.create({
    component: AddProdutoPage
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data) {
    this.carregarProdutos(); 
  }
}


ionViewDidEnter() {
  this.http.get<any[]>('http://localhost:80/meu_backend/listar_produtos.php')
    .subscribe(res => {
      console.log(res);
      this.produtos = res;
    });
}
}