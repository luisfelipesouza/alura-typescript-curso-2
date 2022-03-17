// classe abstract and generic <T>
export abstract class View<T> {
  //private element: HTMLElement;
  // modificador protected pode ser acessado por quem herdar a classe
  protected element: HTMLElement;
  private escape = false;

  // parâmetro opcional adiciona "?"
  // ATENCÃO: não funciona no primeiro parâmetro e precisa ser o(s) último(s)
  constructor(selector: string, escape?: boolean) {
    const element = document.querySelector(selector);
    if (element) {
      this.element = element as HTMLElement;
    } else {
      throw Error(`Seletor ${selector} não existe no DOM.`);
    }
    if (escape) {
      this.escape = escape;
    }
  }

  public update(model: T): void {
    let template = this.template(model);
    // remove <script> do template para evitar código malicioso
    if (this.escape) {
      template = template.replace(/<script>[\s\S]*?<\/script>/, "");
    }
    this.element.innerHTML = template;
  }

  // abstract para que a classe filha precisa implementar o método
  protected abstract template(model: T): string;
}
