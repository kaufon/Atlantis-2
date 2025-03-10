import { Document, IInput, IMenu } from "@core";

export class DocumentEditingMenu implements IMenu {
  constructor(
    private input: IInput,
    private document: Document,
  ) {}

  async display(): Promise<string> {
    return await this.input.selectInput('Qual valor do documento você quer atualizar?', [
      [`número (${this.document.number})`, 'number'],
      ['Data de expedição', 'expeditionDate'],
    ])
  }
}
