import type { Client } from "@core";

export class Storage {
  private static singleton: Storage = new Storage();
  private clients: Client[] = [];

  private constructor() {
    this.clients = [];
  }

  static getInstance(): Storage {
    return Storage.singleton;
  }

  public get getClients() {
    return this.clients;
  }

  addClient(client: Client) {
    this.clients.push(client);
  }

  updateClient(updatedClient: Client) {
    this.clients = this.clients.map((client) =>
      updatedClient.isEqualTo(client) ? updatedClient : client,
    );
  }

  deleteClient(client: Client) {
    this.clients = this.clients.filter(
      (currentClient) => !currentClient.isEqualTo(client),
    );
  }
}
