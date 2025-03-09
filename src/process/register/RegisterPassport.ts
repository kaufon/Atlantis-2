import { Client, Document, documentType, Process } from "@core";

export default class RegisterPassportProcess extends Process {
  private client: Client;

  constructor(client: Client) {
    super();
    this.client = client;
  }

  async execute(): Promise<void> {
    if (this.client.documents.some((d) => d.type === documentType.Passaporte)) {
      console.log("Client ja possui um passaporte");
      return;
    }

    const number = await this.input.textInput("Qual o valor do documento");
    const expeditionDate = await this.input.dateInput(
      "Qual a data de expedicao do documento",
    );
    const passport = new Document({
      number,
      expeditionDate,
      type: documentType.Passaporte,
    });
    this.client.documents.push(passport);
  }
}
