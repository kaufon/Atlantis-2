import { IInput, IMenu } from "@core";

export class CellphoneEditMenu implements IMenu {
  constructor(private input: IInput) { }

  async display(): Promise<string> {
    return await this.input.selectInput("Escolha uma das opções:", [
      ["Editar um telefone", "edit"],
      ["Adicionar um telefone", "register"],
      ["Remover um telefone", "remove"],
    ]);
  }
}
