import { Process } from "@core";
import { MainMenu, TypeRegisterClientMenu } from "@/menus";
import { TypeRegisterClientProcess } from "./TypeRegisterClient";
import { TypeListClientProcess } from "./TypeListClient";
import { TypeDeleteClientMenu } from "@/menus/TypeDeleteClientMenu";
import { TypeDeleteClientProcess } from "./TypeDeleteClient";
import { TypeEditClientProcess } from "./TypeEditClient";

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
          this.process = new TypeListClientProcess();
          break;
        case "edit-customer":
          this.process = new TypeEditClientProcess();
          break;
        case "remove-customer":
          this.process = new TypeDeleteClientProcess();
          break;
        case "exit":
          console.log("Obrigado por usar!");
          this.execution = false;
          return;
        default:
          console.log("Nao entendi");
          break;
      }
      await this.process.execute();
    }
  }
}
