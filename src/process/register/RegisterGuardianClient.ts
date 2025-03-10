import { Client, Process } from "@core";
import RegisterCellphone from "./RegisterCellphone";
import { Storage } from "core/utils/Storage";
import RegisterGuardianAddress from "./RegisterGuardianAdress";
import RegisterClientDocuments from "./RegisterClientDocuments";

export default class RegisterGuardianClient extends Process {
  async execute(): Promise<void> {
    console.log("Iniciando o cadastro de um novo cliente...");
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

    const storage = Storage.getInstance();
    storage.addClient(client);
    console.log("Finalizando o cadastro do cliente...");
  }
}
