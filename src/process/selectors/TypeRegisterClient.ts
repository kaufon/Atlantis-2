import { TypeRegisterClientMenu } from "@/menus";
import { Process } from "@core";
import RegisterGuardianClient from "../register/RegisterGuardianClient";

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
        break;
      case "back":
        this.execution = false;
        return;
    }
    await this.process.execute();
  }
}
