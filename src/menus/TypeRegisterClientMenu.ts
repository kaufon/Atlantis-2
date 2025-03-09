import type { IInput, IMenu } from "@core";

export class TypeRegisterClientMenu implements IMenu {
  constructor(private input: IInput) { }

  async display(): Promise<string> {
    return await this.input.selectInput(
      "Qual o tipo do cliente para cadastro?",
      [
        ["Titular", "holder"],
        ["Dependente", "dependent"],
        ["Voltar", "back"],
      ],
    );
  }
}
