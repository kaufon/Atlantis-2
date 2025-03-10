import { Address, IInput, IMenu } from "@core";

export class AddressEditingMenu implements IMenu {
  constructor(
    private input: IInput,
    private address: Address,
  ) {}

  async display(): Promise<string> {
    return await this.input.selectInput('Qual valor do endereço você quer atualizar?', [
      [`Rua (${this.address.street})`, 'street'],
      [`Bairro (${this.address.neighborhood})`, 'neighborhood'],
      [`Cidade (${this.address.city})`, 'city'],
      [`Estado (${this.address.state})`, 'state'],
      [`País (${this.address.country})`, 'country'],
      [`CEP (${this.address.postalCode})`, 'postalCode'],
    ])
  }
}
