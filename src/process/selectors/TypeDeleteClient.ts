import { TypeDeleteClientMenu } from "@/menus/TypeDeleteClientMenu";
import { Process } from "@core";
import { DeleteGuardianProcess } from "../delete/DeleteGuardian";
import { DeleteDependentProcess } from "../delete/DeleteDependent";

export class TypeDeleteClientProcess extends Process {
  constructor() {
    super();
    this.menu = new TypeDeleteClientMenu(this.input);
  }
  async execute(): Promise<void> {
    const option = await this.menu.display();
    switch (option) {
      case "guardian":
        this.process = new DeleteGuardianProcess();
        break;
      case "dependent":
        this.process = new DeleteDependentProcess();
        this.process;
        break;
      case "back":
        this.execution = false;
        return;
    }
    await this.process.execute();
  }
}
