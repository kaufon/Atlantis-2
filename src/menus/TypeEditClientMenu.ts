import { IInput, IMenu } from "@core";

export class TypeEditClientMenu implements IMenu {
  constructor(private input: IInput) {}

  async display(): Promise<string> {
    return await this.input.selectInput('Qual o cliente para edição?', [
      ['Cliente', 'holder'],
      ['Voltar', 'back'],
    ])
  }
}
