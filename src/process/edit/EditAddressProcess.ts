import { AddressEditingMenu } from "@/menus/AddressEditMenu";
import { Address, Client, Process } from "@core";

export class EditAddressProcess extends Process {
  constructor(private customer: Client) {
    super();
  }

  async execute() {
    console.log("Selecione um telefone para editar");
    this.menu = new AddressEditingMenu(this.input, this.customer.address);
    const option = await this.menu.display();

    switch (option) {
      case "street":
        await this.editStreet(this.customer.address);
        break;
      case "neighborhood":
        await this.editNeighborhood(this.customer.address);
        break;
      case "city":
        await this.editCity(this.customer.address);
        break;
      case "state":
        await this.editState(this.customer.address);
        break;
      case "country":
        await this.editCountry(this.customer.address);
        break;
      case "postalCode":
        await this.editPostalCode(this.customer.address);
        break;
    }

    console.log("Endereço atualizado");
  }

  private async editStreet(address: Address) {
    const street = await this.input.textInput("Qual a nova rua?");
    address.street = street;
  }

  private async editNeighborhood(address: Address) {
    const neighborhood = await this.input.textInput("Qual a novo bairro?");
    address.neighborhood = neighborhood;
  }

  private async editCity(address: Address) {
    const city = await this.input.textInput("Qual a nova cidade?");
    address.city = city;
  }

  private async editState(address: Address) {
    const state = await this.input.textInput("Qual a novo  estado?");
    address.state = state;
  }

  private async editCountry(address: Address) {
    const country = await this.input.textInput("Qual a novo país?");
    address.country = country;
  }

  private async editPostalCode(address: Address) {
    const postalCode  = await this.input.textInput("Qual o novo codigo postal?");
    address.postalCode = postalCode;
  }
}
