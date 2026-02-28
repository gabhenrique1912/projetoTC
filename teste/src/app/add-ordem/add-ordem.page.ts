import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Adicione IonSelect e IonSelectOption aqui
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonInput, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-ordem',
  templateUrl: './add-ordem.page.html',
  styleUrls: ['./add-ordem.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonButton, IonInput, IonSelect, IonSelectOption]
})
export class AddOrdemPage implements OnInit {

  nome_consumidor: string = '';
  cpf_consumidor: string = '';
  produto_id: number | null = null;
  produtos: any[] = []; 

  constructor(private http: HttpClient, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.carregarProdutos(); 
  }

  carregarProdutos() {
    
    this.http.get<any[]>('http://localhost:80/meu_backend/listar_produtos.php')
      .subscribe({
        next: (res) => {
          this.produtos = res;
        },
        error: (err) => console.error("Erro ao carregar produtos", err)
      });
  }

  

  cadastrarOrdem() {
    if (!this.nome_consumidor || !this.cpf_consumidor || !this.produto_id) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    this.http.post<any>('http://localhost:80/meu_backend/add_ordem.php', {
      nome_consumidor: this.nome_consumidor,
      cpf_consumidor: this.cpf_consumidor,
      produto_id: this.produto_id
    }).subscribe({
      next: (res) => {
        if (res.success) {
          alert("Ordem de Serviço cadastrada!");
          this.modalCtrl.dismiss(true);
        }
      }
    });
  }
}