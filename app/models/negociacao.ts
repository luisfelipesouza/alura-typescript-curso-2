export class Negociacao {
  // Se no construtor colocar o modificador private ou public
  // o Typescript irá criar uma propriedade da sua classe
  // com o mesmo nome dos parâmetros do construtor
  constructor(
    private _data: Date,
    public readonly quantidade: number,
    public readonly valor: number
  ) {}

  get data(): Date {
    // Programação defensiva
    // copia o objeto _data em um novo objeto e retorna
    // blinda o acesso direto à propriedade
    const data = new Date(this._data.getTime());
    return data;
  }

  get volume(): number {
    return this.quantidade * this.valor;
  }

  // método fica disponível na classe sem precisa instanciar
  // **método de classe (estático)
  public static criaDe(
    dataString: string,
    quantidadeString: string,
    valorString: string
  ) {
    const exp = /-/g;
    const data = new Date(dataString.replace(exp, ","));
    const quantidade = parseInt(quantidadeString);
    const valor = parseFloat(valorString);
    return new Negociacao(data, quantidade, valor)
  }
}
