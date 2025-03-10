import type { IInput, IMenu } from "@core";

export class MainMenu implements IMenu {
  constructor(private input: IInput) { }

  async display(): Promise<string> {
    return await this.input.selectInput("Por favor selecione", [
      ["Cadastrar clientes", "register-customer"],
      ["Listar clientes", "list-customers"],
      ["Editar cliente", "edit-customer"],
      ["Remover cliente", "remove-customer"],
      ["Sair", "exit"],
    ]);
  }
}
