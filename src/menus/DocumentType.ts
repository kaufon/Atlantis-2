import { documentType, IInput, IMenu } from "@core";

export class DocumentTypeMenu implements IMenu {
  constructor(private input: IInput) { }

  async display(): Promise<string> {
    return await this.input.selectInput("Qual o tipo do documento?", [
      ["Cadastro de Pessoas Física", documentType.CPF],
      ["Registro Geral", documentType.RG],
      ["Passaporte", documentType.Passaporte],
      ["Finalizar cadastro de documentos", "exit"],
    ]);
  }
}
