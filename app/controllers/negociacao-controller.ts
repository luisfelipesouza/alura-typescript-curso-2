import { WeekDays } from "../enums/weekdays.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociaoes-view.js";

export class NegociacaoController {
  private inputData: HTMLInputElement;
  private inputQuantidade: HTMLInputElement;
  private inputValor: HTMLInputElement;
  // Posso remover a tipagem porque o TypeScript infere o tipo Negociacoes
  private negociacoes = new Negociacoes();
  // receber um seletor CSS do DOM
  private negociacoesView = new NegociacoesView("#negociacoesView", true);
  private mensagemView = new MensagemView("#mensagemView");
  private readonly DOMINGO = 0;
  private readonly SABADO = 6;

  constructor() {
    // casting -> estou falando que eu, como dev, garanto que irá 
    // retornar HTMLInputElement e não NULL
    // Pode utilizar também: this.inputData = <HTMLInputElement>document.querySelector("#data");
    this.inputData = document.querySelector("#data") as HTMLInputElement;
    this.inputQuantidade = <HTMLInputElement>document.querySelector("#quantidade");
    this.inputValor = document.querySelector("#valor") as HTMLInputElement;
    this.negociacoesView.update(this.negociacoes);
  }

  public adiciona(): void {
    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );
    // return true/false from isDiaUtil
    if (!this.isDiaUtil(negociacao.data)) {
      this.mensagemView.update("Apenas dias úteis são aceitos");
      return;
    }
    this.negociacoes.adiciona(negociacao);
    this.limparFormulario();
    this.atualizaView();
  }

  private isDiaUtil(data: Date) {
    return data.getDay() > WeekDays.DOMINGO && data.getDay() < WeekDays.SABADO;
  }

  private limparFormulario(): void {
    this.inputData.value = "";
    this.inputQuantidade.value = "";
    this.inputValor.value = "";
    this.inputData.focus();
  }

  private atualizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update("Negociação adicionada com sucesso");
  }
}
