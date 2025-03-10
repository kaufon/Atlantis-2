import { DocumentEditingMenu } from "@/menus/DocumentEditingMenu";
import { Document, Process } from "@core";

export class EditCpfProcess extends Process {
  constructor(private document: Document) {
    super();
    this.menu = new DocumentEditingMenu(this.input, document);
  }

  async execute() {
    const option = await this.menu.display();
    while (this.execution) {
      switch (option) {
        case "number":
          await this.editNumber();
          break;
        case "expeditionDate":
          await this.editExpeditionDate();
          break;
        case "exit":
          this.execution = false;
          return;
        default:
          console.log("Error");
          continue;
      }

      this.execution = false;
    }
  }

  private async editNumber() {
    this.document.number = await this.input.textInput("Novo número do Documento:");
  }

  private async editExpeditionDate() {
    this.document.expeditionDate = await this.input.dateInput(
      "Novo data de expedição do CPF, no padrão dd/mm/yyyy:",
    );
  }
}
