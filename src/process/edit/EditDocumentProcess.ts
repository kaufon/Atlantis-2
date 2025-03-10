import { DocumentEditingMenu } from "@/menus/DocumentEditingMenu";
import { DocumentEditMenu } from "@/menus/DocumentEditMenu";
import { DocumentSelectingMenu } from "@/menus/DocumentSelectMenu";
import { Client, documentType, Process } from "@core";
import RegisterClientDocuments from "../register/RegisterClientDocuments";
import { EditCpfProcess } from "./EditCpfProcess";

export class EditDocumentsProcess extends Process {
  constructor(private client: Client) {
    super();
  }

  async execute() {
    this.menu = new DocumentEditMenu(this.input);
    const option = await this.menu.display();
    switch (option) {
      case "edit":
        await this.editDocument();
        break;
      case "register":
        await this.registerDocument();
        break;
      case "remove":
        await this.removeDocument();
        break;
    }
  }

  private async selectDocument() {
    this.menu = new DocumentSelectingMenu(this.input, this.client.documents);
    const option = await this.menu.display();
    return this.client.documents.find(
      (_, index) => index + 1 === Number(option),
    );
  }

  private async registerDocument() {
    this.process = new RegisterClientDocuments(this.client);
    await this.process.execute();
  }

  private async removeDocument() {
    const document = await this.selectDocument();
    if (document) this.client.removeDocument(document);
  }

  private async editDocument() {
    const document = await this.selectDocument();

    if (document)
      switch (document.type) {
        case documentType.CPF:
          this.process = new EditCpfProcess(document);
          break;
        case documentType.RG:
          this.process = new EditCpfProcess(document);
          break;
        case documentType.Passaporte:
          this.process = new EditCpfProcess(document);
          break;
      }

    await this.process.execute();
  }
}
