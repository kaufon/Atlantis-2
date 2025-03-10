import { IInput, IMenu } from "@core";

export class DocumentEditMenu implements IMenu {
  constructor(private input: IInput) {}

  async display(): Promise<string> {
    return await this.input.selectInput('Escolha uma das opções:', [
      ['Editar um documento', 'edit'],
      ['Adicionar um documento', 'register'],
      ['Remover um documento', 'remove'],
    ])
  }
}
