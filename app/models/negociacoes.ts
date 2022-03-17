import { Negociacao } from "./negociacao.js";

export class Negociacoes {
  // private negociacoes: Array<Negociacao> = [];
  // Array<Negociacao> = Negociacao[]
  private negociacoes: Negociacao[] = [];

    public adiciona(negociacao: Negociacao): void {
        this.negociacoes.push(negociacao)
    }

    // Readonly do TypeScript não posso modificar a lista

    // lista(): ReadonlyArray<Negociacao> {
    // ReadonlyArray<Negociacao> = readonly Negociacao[]
    public lista(): readonly Negociacao[] {
        // Poderia usar um spread operator e retornar uma nova lista com todos os elementos da lista "negociacoes"
        // return [...this.negociaoes]
        return this.negociacoes
    }

}
