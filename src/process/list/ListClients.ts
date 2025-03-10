import { Client, Process } from "@core";

export class ListClientsProcess extends Process {
  private clients: Client[];
  constructor(clients: Client[]) {
    super();
    this.clients = clients;
  }
  async execute(): Promise<void> {
    this.output.table(
      this.clients.map((client) => ({
        ID: client.id,
        Nome: client.name,
        "Nome Social": client.socialName,
        Endereco: client.address?.formattedValue,
        Documentos: client.documents
          .map((document) => document.formattedNumber)
          .join(", "),
        Telefones: client.cellphones
          .map((cellphone) => cellphone.formattedValue)
          .join(", "),
      })),
    );
  }
}
