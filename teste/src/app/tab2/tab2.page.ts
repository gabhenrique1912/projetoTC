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
import { AddOrdemPage } from '../add-ordem/add-ordem.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
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
export class Tab2Page {

  ordem: any[] = [];
  constructor(
  private http: HttpClient,
  private modalCtrl: ModalController
) {}


carregarOrdem() {
  this.http.get<any[]>('http://localhost:80/meu_backend/listar_ordem.php')
    .subscribe(res => {
      this.ordem = res;
    });
}


async abrirModal() {
  
  const modal = await this.modalCtrl.create({
    component: AddOrdemPage
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data) {
    this.carregarOrdem(); 
  }
}


ionViewDidEnter() {
  this.http.get<any[]>('http://localhost:80/meu_backend/listar_ordem.php')
    .subscribe(res => {
      console.log(res);
      this.ordem = res;
    });
}
}