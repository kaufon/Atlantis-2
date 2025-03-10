import { TypeRegisterClientMenu } from "@/menus";
import { Process } from "@core";
import RegisterGuardianClient from "../register/RegisterGuardianClient";
import RegisterDependentClient from "../register/RegisterDependentClient";

export class TypeRegisterClientProcess extends Process {
  constructor() {
    super();
    this.menu = new TypeRegisterClientMenu(this.input);
  }
  async execute(): Promise<void> {
    const option = await this.menu.display();
    switch (option) {
      case "holder":
        this.process = new RegisterGuardianClient();
        break;
      case "dependent":
        this.process = new RegisterDependentClient();
        this.process;
        break;
      case "back":
        this.execution = false;
        return;
    }
    await this.process.execute();
  }
}
