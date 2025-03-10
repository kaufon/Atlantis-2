import { ClientEditingMenu } from "@/menus/ClientEditingMenu";
import { Client, Process } from "@core";
import { Storage } from "core/utils/Storage";
import { SearchClientProcess } from "../search/SearchClient";
import { EditAddressProcess } from "./EditAddressProcess";
import { EditCellphoneProcess } from "./EditCellphoneProcess";
import { EditDocumentsProcess } from "./EditDocumentProcess";

export class EditClientProcess extends Process {
  constructor() {
    super();
    this.menu = new ClientEditingMenu(this.input);
  }

  async execute() {
    console.log("Selecione um titular para editar");

    const subcommand = new SearchClientProcess(
      Storage.getInstance().getClients,
    );
    const client = await subcommand.execute();
    if (!client) {
      return;
    }

    const option = await this.menu.display();
    switch (option) {
      case "name":
        await this.editName(client);
        break;
      case "socialName":
        await this.editSocialName(client);
        break;
      case "birthDate":
        await this.editBirthDate(client);
        break;
      case "address":
        await this.editAddress(client);
        break;
      case "cellphones":
        await this.editCellphones(client);
        break;
      case "documents":
        await this.editDocuments(client);
        break;
    }

    const storage = Storage.getInstance();
    if (!client) {
      return;
    }
    storage.updateClient(client);
  }

  private async editName(client: Client) {
    const newName = await this.input.textInput("Qual o novo nome do cliente?");
    client.name = newName;
  }

  private async editSocialName(client: Client) {
    const newSocialName = await this.input.textInput(
      "Qual o novo nome social do cliente?",
    );
    client.socialName = newSocialName;
  }

  private async editBirthDate(client: Client) {
    const newbirthDate = await this.input.dateInput(
      "Qual a nova data de nascimento do cliente?",
    );
    client.birthDate = newbirthDate;
  }

  private async editAddress(client: Client) {
    this.process = new EditAddressProcess(client);
    await this.process.execute();
  }

  private async editCellphones(client: Client) {
    this.process = new EditCellphoneProcess(client);
    await this.process.execute();
  }

  private async editDocuments(client: Client) {
    this.process = new EditDocumentsProcess(client);
    await this.process.execute();
  }
}
