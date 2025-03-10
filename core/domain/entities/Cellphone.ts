import type { IPrototype } from "../../interfaces/Prototype";
import { Entity } from "../abstracts";

type CellphoneProps = {
  ddd: string;
  number: string;
};

export class Cellphone extends Entity<CellphoneProps> implements IPrototype {
  get ddd(): string {
    return this.props.ddd;
  }
  set ddd(value: string) {
    this.props.ddd = value;
  }

  get number(): string {
    return this.props.number;
  }
  set number(value: string) {
    this.props.number = value;
  }

  public clone(): IPrototype {
    return new Cellphone(this.props);
  }

  get formattedValue(): string {
    return `(${this.props.ddd}) ${this.props.number}`;
  }
}

