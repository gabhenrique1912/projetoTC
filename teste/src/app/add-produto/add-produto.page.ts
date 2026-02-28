import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonInput, IonToggle } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-produto',
  templateUrl: './add-produto.page.html',
  styleUrls: ['./add-produto.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonButton, IonInput, IonToggle]
})
export class AddProdutoPage implements OnInit {

  nome_produto: string = '';
  ativo: boolean = true;
  tempo_garantia: number = 0;
  erro: string = '';

  constructor(private http: HttpClient, private modalCtrl: ModalController) {}

  fechar() {
    this.modalCtrl.dismiss();
  }

  salvar() {
    this.modalCtrl.dismiss(true);
  }

  ngOnInit() {
  }

  cadastrarProduto() {

  

  console.log("Nome:", this.nome_produto);
  console.log("Garantia:", this.tempo_garantia);

  if (!this.nome_produto || this.tempo_garantia <= 0) {
    alert("Preencha todos os campos!");
    return;
  }


  this.http.post<any>('http://localhost:80/meu_backend/add_produto.php', {
    nome_produto: this.nome_produto,
    tempo_garantia: this.tempo_garantia,
    ativo: this.ativo
  }).subscribe({
    next: (res) => {

      console.log("Resposta:", res);

      if (res.success) {
        alert("Produto cadastrado com sucesso!");

        this.nome_produto = '';
        this.ativo = true;
        this.tempo_garantia = 0;

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

}
