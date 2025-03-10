import { TypeListClientMenu } from "@/menus/TypeListClientMenu";
import { Process } from "@core";
import { ListClientsProcess } from "../list/ListClients";
import { ListAllGuardiansProcess } from "../list/ListAllClient";
import { ListDependentsFromGuardianProcess } from "../list/ListDependentsFromGuardian";
import { ListGuardiansFromDependentProcess } from "../list/ListGuardiansFromDependent";

export class TypeListClientProcess extends Process {
  constructor() {
    super();
    this.menu = new TypeListClientMenu(this.input);
  }
  async execute(): Promise<void> {
    const option = await this.menu.display();
    switch (option) {
      case "all-guardians":
        this.process = new ListAllGuardiansProcess();
        break;
      case "dependents":
        this.process = new ListDependentsFromGuardianProcess();
        break;
      case "dependent-guardian":
        this.process = new ListGuardiansFromDependentProcess();
        break;
      case "back":
        return;
      default:
        console.log("Nao entendi");
        return;
    }
    await this.process.execute();
  }
}
