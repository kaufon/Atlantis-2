import { CellphoneEditMenu } from "@/menus/CellphoneEditMenu";
import { Cellphone, Client, Process } from "@core";
import RegisterCellphone from "../register/RegisterCellphone";
import { CellphoneSelectMenu } from "@/menus/CellphoneSelectMenu";
import { CellphoneEditingMenu } from "@/menus/CellphoneEditingMenu";

export class EditCellphoneProcess extends Process {
  constructor(private client: Client) {
    super();
    this.menu = new CellphoneEditMenu(this.input);
  }

  async execute() {
    while (this.execution) {
      this.menu = new CellphoneEditMenu(this.input);
      const option = await this.menu.display();
      switch (option) {
        case "edit":
          await this.editCellphone();
          break;
        case "register":
          await this.registerCellphone();
          break;
        case "remove":
          await this.removeCellphone();
          break;
      }
    }

    console.log("Telefone(s) atualizado");
  }

  private async selectCellphone() {
    this.menu = new CellphoneSelectMenu(this.input, this.client.cellphones);
    const option = await this.menu.display();
    return this.client.cellphones.find(
      (_, index) => index + 1 === Number(option),
    );
  }

  private async registerCellphone() {
    this.process = new RegisterCellphone(this.client);
    await this.process.execute();
    this.execution = false;
  }

  private async removeCellphone() {
    const cellphone = await this.selectCellphone();
    if (cellphone) this.client.removeCellphone(cellphone);
    this.execution = false;
  }

  private async editCellphone() {
    const cellphone = await this.selectCellphone();
    this.menu = new CellphoneEditingMenu(this.input);
    const option = await this.menu.display();

    if (cellphone)
      switch (option) {
        case "ddd":
          await this.editDdd(cellphone);
          break;
        case "number":
          await this.editNumber(cellphone);
          break;
      }
  }

  private async editDdd(cellphone: Cellphone) {
    let ddd = "";
    ddd = await this.input.textInput("Qual o novo DDD?");
    cellphone.ddd = ddd;
    this.execution = false;
  }

  private async editNumber(cellphone: Cellphone) {
    let number = "";
    number = await this.input.textInput("Qual o novo número?");
    if (this.client.hasCellphone(number)) {
      console.log(
        `Telefone com o número ${number} já cadastrado para essa cliente`,
      );
      return;
    }

    cellphone.number = number;
    this.execution = false;
  }
}
