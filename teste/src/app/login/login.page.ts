import { Component } from '@angular/core';
import { 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { AddUsuarioPage } from '../add-usuario/add-usuario.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    CommonModule,
    FormsModule
  ]
})
export class LoginPage {

  nome: string = '';
  email: string = '';
  senha: string = '';
  erro: string = '';

  constructor(private http: HttpClient, private modalCtrl: ModalController, private router: Router) {}

  fazerLogin() {

  this.http.post<any>('http://localhost:80/meu_backend/login.php', {
    email: this.email,
    senha: this.senha
  }).subscribe({
        next: (res) => {
      console.log("RESPOSTA:", res);

      if (res.success === true) {
        this.router.navigateByUrl('/tabs/tab1');
      } else {
        alert("E-mail ou senha incorretos!");
      }
    }
  });

}



  async abrirModal() {
    console.log("Abrindo modal...");
    const modal = await this.modalCtrl.create({
      component: AddUsuarioPage
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
  }


}