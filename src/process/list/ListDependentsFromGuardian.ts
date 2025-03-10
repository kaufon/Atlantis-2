import { Process } from "@core";
import { Storage } from "core/utils/Storage";
import { SearchClientProcess } from "../search/SearchClient";
import { ListClientsProcess } from "./ListClients";

export class ListDependentsFromGuardianProcess extends Process {
  async execute(): Promise<void> {
    const process = new SearchClientProcess(Storage.getInstance().getClients);
    const guardian = await process.execute();
    if (!guardian) {
      return;
    }
    if (guardian.dependents.length === 0) {
      console.log("Esse cliente nao possui dependentes");
      return;
    }
    this.process = new ListClientsProcess(guardian.dependents);
    await this.process.execute();
  }
}
