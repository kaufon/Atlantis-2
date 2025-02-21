import type {IInput,IOutput} from "../core/index.ts"
import { Input } from "./Input.ts"
import { OutPut } from "./Output.ts"
export class App{
  private input: IInput
  private output: IOutput
  constructor(){
    this.output = new OutPut()
    this.input = new Input()
  }
  
}
