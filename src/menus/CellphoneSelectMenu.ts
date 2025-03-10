import { Cellphone, IInput, IMenu } from "@core";

export class CellphoneSelectMenu implements IMenu {
  constructor(
    private input: IInput,
    private cellphones: Cellphone[],
  ) {}

  async display(): Promise<string> {
    return await this.input.selectInput(
      'Qual telefone você quer atualizar?',
      this.cellphones.map((document, index) => [
        document.formattedValue,
        String(index + 1),
      ]),
    )
  }
}
