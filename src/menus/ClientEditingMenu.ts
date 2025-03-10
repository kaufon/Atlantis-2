import { IInput, IMenu } from "@core";

export class ClientEditingMenu implements IMenu {
  constructor(private input: IInput) {}

  async display(): Promise<string> {
    return await this.input.selectInput('Selecione um valor para editar', [
      ['Nome', 'name'],
      ['Nome social', 'socialName'],
      ['Data de nascimento', 'birthDate'],
      ['Documentos', 'documents'],
      ['Endereço', 'address'],
      ['Telefones', 'cellphones'],
    ])
  }
}
