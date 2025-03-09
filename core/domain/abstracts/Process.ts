import { Input } from "../../../src/libs/Input";
import type { IInput, IMenu } from "../../interfaces";

export abstract class Process {
  protected option!: number;
  protected menu!: IMenu;
  protected input: IInput = new Input();
  protected process!: Process;
  protected execution!: boolean;
  public get Execution(): boolean {
    return this.execution;
  }
  abstract execute(): void;
}
