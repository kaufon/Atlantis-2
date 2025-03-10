import { Process } from "@core";
import { SearchClientProcess } from "../search/SearchClient";
import { Storage } from "core/utils/Storage";

export class DeleteDependentProcess extends Process {
  async execute() {
    console.log("Selecione um cliente titular");
    let process = new SearchClientProcess(Storage.getInstance().getClients);
    const guardian = await process.execute();
    if (!guardian) {
      return;
    }
    if (guardian.dependents.length === 0) {
      console.log("Nenhum dependente para esse titular");
      return;
    }

    console.log(`Selecione um dependente do(a) titular ${guardian.name}`);
    process = new SearchClientProcess(guardian.dependents);
    const dependent = await process.execute();
    if (!dependent) {
      return;
    }
    guardian.removeDependent(dependent);
    Storage.getInstance().updateClient(guardian);

    console.log(`Cliente dependente ${dependent.name} deletado do sistema`);
  }
}
