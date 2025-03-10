import { IInput, IMenu } from "@core";

export class TypeDeleteClientMenu implements IMenu {
  constructor(private input: IInput) {}

  async display(): Promise<string> {
    return await this.input.selectInput('Qual o tipo de listagem desejada?', [
      ['Remover titular', 'guardian'],
      ['Remover dependente de um titular específico', 'dependent'],
      ['Voltar', 'back'],
    ])
  }
}
