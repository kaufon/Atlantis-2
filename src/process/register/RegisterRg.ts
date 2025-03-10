import { Client, Document, documentType, Process } from "@core";

export default class RegisterRgProcess extends Process {
  private client: Client;

  constructor(client: Client) {
    super();
    this.client = client;
  }

  async execute(): Promise<void> {
    if (this.client.documents.some((d) => d.type === documentType.RG)) {
      console.log("Client ja possui um rg");
      return;
    }

    const number = await this.input.textInput("Qual o valor do documento");
    const expeditionDate = await this.input.dateInput(
      "Qual a data de expedicao do documento",
    );
    const rg = new Document({
      number,
      expeditionDate,
      type: documentType.RG,
    });
    this.client.documents.push(rg);
  }
}
