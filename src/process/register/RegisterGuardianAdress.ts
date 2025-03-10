import { Address, Client, Process } from "@core";

export default class RegisterGuardianAddress extends Process {
  private client: Client;

  constructor(cliente: Client) {
    super();
    this.client = cliente;
  }

  async execute(): Promise<void> {
    console.log("Comecando registro de endereco do usuario...")

    const street = await this.input.textInput("Qual a rua?");
    const neighborhood = await this.input.textInput("Qual o bairro?");
    const city = await this.input.textInput("Qual a cidade?");
    const state = await this.input.textInput("Qual o estado?");
    const country = await this.input.textInput("Qual o país?");
    const postalCode = await this.input.textInput("Qual o código postal?");
    const address = new Address({
      street,
      neighborhood,
      city,
      state,
      country,
      postalCode,
    });
    this.client.address = address;
  }
}
