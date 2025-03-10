import { Client, Process } from "@core";
import RegisterCellphone from "./RegisterCellphone";
import { Storage } from "core/utils/Storage";
import RegisterGuardianAddress from "./RegisterGuardianAdress";
import RegisterClientDocuments from "./RegisterClientDocuments";
import { SearchClientProcess } from "../search/SearchClient";

export default class RegisterDependentClient extends Process {
  async execute(): Promise<void> {
    const process = new SearchClientProcess(Storage.getInstance().getClients);
    const guardian = await process.execute();
    if (guardian.guardian) {
      console.log("Esse cliente ja possui um titular ");
      return;
    }
    const name = await this.input.textInput("Qual o nome do novo cliente?");
    const socialName = await this.input.textInput(
      "Qual o nome social do novo cliente?",
    );
    const birthDate = await this.input.dateInput("Qual a data de nascimento?");
    const client = new Client({
      name,
      socialName,
      birthDate,
      registrationDate: new Date(),
      cellphones: [],
      documents: [],
      dependents: [],
    });

    this.process = new RegisterGuardianAddress(client);
    await this.process.execute();

    this.process = new RegisterClientDocuments(client);
    await this.process.execute();

    this.process = new RegisterCellphone(client);
    await this.process.execute();

    guardian.addDependent(client);
    const storage = Storage.getInstance();
    storage.updateClient(guardian);
    storage.addClient(client);
    console.log("Finalizando o cadastro do cliente...");
  }
}
