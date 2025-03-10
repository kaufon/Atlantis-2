import { TypeEditClientMenu } from "@/menus/TypeEditClientMenu";
import { Process } from "@core";
import { EditClientProcess } from "../edit/EditClientProcess";

export class TypeEditClientProcess extends Process {
  constructor() {
    super();
    this.menu = new TypeEditClientMenu(this.input);
  }
  async execute(): Promise<void> {
    const option = await this.menu.display();
      switch (option) {
        case "holder":
          this.process = new EditClientProcess();
          break;
        case "leave":
          this.execution = false;
          return;
        default:
          return;
      }
      await this.process.execute();
  }
}
