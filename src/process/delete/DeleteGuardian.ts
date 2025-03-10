import { Process } from "@core";
import { SearchClientProcess } from "../search/SearchClient";
import { Storage } from "core/utils/Storage";

export class DeleteGuardianProcess extends Process {
  async execute(): Promise<void> {
    const process = new SearchClientProcess(Storage.getInstance().getClients);

    console.log("Selecione o titular a ser deletado");
    const guardian = await process.execute();
    if (!guardian) {
      return;
    }
    Storage.getInstance().deleteClient(guardian);
    console.log("Cliente deletado com sucesso");
  }
}
