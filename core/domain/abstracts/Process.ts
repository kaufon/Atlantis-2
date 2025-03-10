import { OutPut } from "@/libs";
import { Input } from "../../../src/libs/Input";
import type { IInput, IMenu, IOutput } from "../../interfaces";

export abstract class Process {
  protected option!: number;
  protected menu!: IMenu;
  protected input: IInput = new Input();
  protected output: IOutput = new OutPut();
  protected process!: Process;
  protected execution!: boolean;
  public get Execution(): boolean {
    return this.execution;
  }
  abstract execute(): void;
}
