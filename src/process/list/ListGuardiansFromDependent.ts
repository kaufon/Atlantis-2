import { Client, Process } from "@core";
import { Storage } from "core/utils/Storage";
import { ListClientsProcess } from "./ListClients";
import { SearchClientProcess } from "../search/SearchClient";

export class ListGuardiansFromDependentProcess extends Process {
  private guardians: Client[];
  constructor() {
    super();
    this.guardians = Storage.getInstance().getClients;
    this.process = new ListClientsProcess(this.guardians);
  }
  async execute(): Promise<void> {
    if (!this.guardians.length) {
      console.log("Nenhum cliente cadastrado");
      return;
    }
    const allDependents: Client[] = [];
    for (const holder of this.guardians) {
      for (const dependent of holder.dependents) {
        allDependents.push(dependent);
      }
    }
    const subcommand = new SearchClientProcess(allDependents);
    const dependent = await subcommand.execute();
    if (!dependent) {
      return;
    }
    const holder = this.guardians.find((holder) =>
      holder.hasDependent(dependent),
    );

    if (holder) this.process = new ListClientsProcess([holder]);
    await this.process.execute();
  }
}
