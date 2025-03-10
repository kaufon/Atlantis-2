import { Cellphone, Client, Process } from "@core";

export default class RegisterCellphone extends Process {
  private client: Client;
  constructor(client: Client) {
    super();
    this.client = client;
  }

  async execute(): Promise<void> {
    console.log("Comencando registro de telefone");
    const cellphonesQuantity = await this.input.numberInput(
      "Quantos telefones deseja cadastrar",
    );
    for (let i = 0; i < cellphonesQuantity; i++) {
      this.client.cellphones.push(await this.createCellphone());
    }
  }
  private async createCellphone(): Promise<Cellphone> {
    const ddd = await this.input.textInput("Qual o DDD do telefone?");
    const number = await this.input.textInput("Qual o número do telefone?");
    const cellhpone = new Cellphone({ ddd, number });
    return cellhpone;
  }
}
