import { DocumentTypeMenu } from "@/menus/DocumentType";
import { Client, documentType, Process } from "@core";
import RegisterCpfProcess from "./RegisterCpf";
import RegisterRgProcess from "./RegisterRg";
import RegisterPassportProcess from "./RegisterPassport";

export default class RegisterClientDocuments extends Process {
  private client: Client;
  constructor(client: Client) {
    super();
    this.client = client;
    this.menu = new DocumentTypeMenu(this.input);
    this.execution = true;
  }

  async execute(): Promise<void> {
    console.log("Inciando o cadastro de documentos...");
    while (this.execution) {
      const option = await this.menu.display();
      switch (option) {
        case documentType.CPF:
          this.process = new RegisterCpfProcess(this.client);
          break;
        case documentType.RG:
          this.process = new RegisterRgProcess(this.client);
          break;
        case documentType.Passaporte:
          this.process = new RegisterPassportProcess(this.client);
          break;
        case "exit":
          this.execution = false;
          return;
        default:
          console.log("Nao entendi :(");
          continue;
      }
      await this.process.execute();
    }
  }
}
