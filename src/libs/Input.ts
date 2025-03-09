import inquirer from "inquirer";
import type { IInput } from "@core";
import { Validation } from "core/utils";

export class Input implements IInput {
  public async textInput(message: string): Promise<string> {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: message,
      },
    ]);
    return answer.value;
  }
  public async numberInput(message: string): Promise<number> {
    const answer = await inquirer.prompt([
      {
        type: "number",
        name: "value",
        message: message,
      },
    ]);
    return answer.value;
  }
  public async dateInput(message: string): Promise<Date> {
    const validator = new Validation();
    while (true) {
      const answer = await inquirer.prompt([
        {
          type: "input",
          name: "value",
          message: `${message},no valor DD/MM/YYYY`,
        },
      ]);
      if (!validator.validateIssueDate(answer.value)) {
        continue;
      }
      const parts = answer.value.split("/");
      const year = new Number(parts[2]);
      const month = new Number(parts[1]);
      const day = new Number(parts[0]);
      const date = new Date(year.valueOf(), month.valueOf() - 1, day.valueOf());
      return date;
    }
  }
  public async selectInput(
    message: string,
    choices: string[][],
  ): Promise<string> {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "value",
        message: message,
        choices: choices.map((choice) => ({
          name: choice[0],
          value: choice[1] ?? choice[0],
        })),
      },
    ]);
    return answer.value;
  }
}
