import { Client, Process } from "@core";
import { ListClientsProcess } from "../list/ListClients";

export class SearchClientProcess extends Process {
  private clients: Client[];
  constructor(clients: Client[]) {
    super();
    this.clients = clients;
    this.process = new ListClientsProcess(this.clients);
  }
  async execute(): Promise<Client | undefined> {
    if (this.clients.length === 0) {
      console.log("Nenhum cliente cadastrado");
      return;
    }
    await this.process.execute();
    while (true) {
      const clientId = await this.input.textInput("Insira o id do cliente");
      const client = this.clients.find((client) => client.id === clientId);
      if (!client) {
        console.log(`Cliente com ID ${clientId} inexistente,tente novamente`);
      } else {
        return client;
      }
    }
  }
}
