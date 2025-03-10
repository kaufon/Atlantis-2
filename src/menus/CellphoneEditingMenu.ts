import { IInput, IMenu } from "@core";

export class CellphoneEditingMenu implements IMenu {
  constructor(private input: IInput) { }

  async display(): Promise<string> {
    return await this.input.selectInput(
      "Qual valor do telefone você quer atualizar?",
      [
        ["DDD", "ddd"],
        ["Número", "number"],
      ],
    );
  }
}
