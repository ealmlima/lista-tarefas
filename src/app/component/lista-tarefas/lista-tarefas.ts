import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarefa } from '../../models/tarefa';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-lista-tarefas',
  styleUrl: './lista-tarefas.css',
  templateUrl: './lista-tarefas.html',
})
export class ListaTarefas implements OnInit {

  novaTarefa: string = '';
  tarefas: Tarefa[] = [];
  mensagem: string = '';
  tipoMensagem: 'sucesso' | 'erro' = 'sucesso';

  ngOnInit(): void {
    this.tarefas = [
      { descricao: 'Estudar Angular', concluida: false },
      { descricao: 'Fazer exercício de programação', concluida: false },
      { descricao: 'Estudar conteúdo da aula', concluida: false },
    ];
  }

  adicionarTarefa(): void {
    const descricao = this.novaTarefa.trim();

    if (descricao === '') {
      this.exibirMensagem('A descrição da tarefa não pode estar vazia.', 'erro');
      return;
    }

    if (this.tarefas.some(tarefa => tarefa.descricao === descricao)) {
      this.exibirMensagem('Essa tarefa já existe na lista.', 'erro');
      return;
    }

    this.tarefas.push({ descricao, concluida: false });
    this.novaTarefa = '';
    this.exibirMensagem('Tarefa adicionada com sucesso!', 'sucesso');
  }

  removerTarefa(index: number): void {
    this.tarefas.splice(index, 1);
    this.exibirMensagem('Tarefa removida com sucesso!', 'sucesso');
  }

  marcarComoConcluida(index: number): void {
    this.tarefas[index].concluida = !this.tarefas[index].concluida;
    this.exibirMensagem(`Tarefa "${this.tarefas[index].descricao}" ${this.tarefas[index].concluida ? 'marcada como concluída' : 'marcada como não concluída'}.`, 'sucesso');
  }

  get tarefasConcluidas(): Tarefa[] {
    return this.tarefas.filter(tarefa => tarefa.concluida);
  }
  
  private exibirMensagem(mensagem: string, tipo: 'sucesso' | 'erro'): void {
    this.mensagem = mensagem;
    this.tipoMensagem = tipo;

    setTimeout(() => {
      this.mensagem = '';
    }, 1000);
  }
}