import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonItem, IonLabel, IonButton]
})
export class AddUsuarioPage implements OnInit {

  nome: string = '';
  email: string = '';
  senha: string = '';
  erro: string = '';

  constructor(private http: HttpClient, private modalCtrl: ModalController) {}

  cadastrarUsuario() {

  if (!this.nome || !this.email || !this.senha) {
    alert("Preencha todos os campos!");
    return;
  }

  this.http.post<any>('http://localhost:80/meu_backend/add_usuario.php', {
    nome: this.nome,
    email: this.email,
    senha: this.senha
  }).subscribe({
    next: (res) => {

      console.log("Resposta:", res);

      if (res.success) {
        alert("Usuário cadastrado com sucesso!");

        this.nome = '';
        this.email = '';
        this.senha = '';

      } else {
        alert(res.message);
      }
    },
    error: (err) => {
      console.error("Erro:", err);
      alert("Erro ao conectar com o servidor.");
    }
  });
}

  

  fechar() {
    this.modalCtrl.dismiss();
  }

  salvar() {
    this.modalCtrl.dismiss(true);
  }

  ngOnInit() {
  }

}
