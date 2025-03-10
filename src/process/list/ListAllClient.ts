import { Client, Process } from "@core";
import { Storage } from "core/utils/Storage";
import { ListClientsProcess } from "./ListClients";

export class ListAllGuardiansProcess extends Process {
  private clients: Client[];
  constructor() {
    super();
    this.clients = Storage.getInstance().getClients;
  }
  async execute(): Promise<void> {
    if (!this.clients.length) {
      console.log("Nenhum cliente cadastrado");
      return;
    }
    const guardians = this.clients.filter(
      (client) => client.guardian === undefined,
    );
    this.process = new ListClientsProcess(guardians);
    await this.process.execute();
    return
  }
}
