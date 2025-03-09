import { Process } from "@core";
import { MainMenu, TypeRegisterClientMenu } from "@/menus";
import { TypeRegisterClientProcess } from "./TypeRegisterClient";

export class MainProcess extends Process {
  constructor() {
    super();
    this.execution = true;
    this.menu = new MainMenu(this.input);
  }
  async execute(): Promise<void> {
    console.log("Bem vindo a Atlantis!");
    while (this.execution) {
      const option = await this.menu.display();
      switch (option) {
        case "register-customer":
          this.process = new TypeRegisterClientProcess();
          break;
        case "list-customers":
          break;
        case "edit-customer":
          break;
        case "remove-customer":
          break;
        case "exit":
          console.log("Obrigado por usar!");
          this.execution = false;
          return
        default:
          console.log("Nao entendi");
          break;
      }
      await this.process.execute();
    }
  }
}
