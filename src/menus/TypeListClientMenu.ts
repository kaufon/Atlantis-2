import { IInput, IMenu } from "@core";

export class TypeListClientMenu implements IMenu {
  constructor(private input: IInput) { }

  async display(): Promise<string> {
    return await this.input.selectInput("Qual o tipo de listagem desejada?", [
      ["Todos os titulares", "all-guardians"],
      ["Todos os dependentes de um titular específico", "dependents"],
      ["Titular de um dependente específico", "dependent-guardian"],
      ["Voltar", "back"],
    ]);
  }
}
