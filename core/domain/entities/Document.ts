import { Entity } from "../abstracts";
import { documentType } from "../../index.js";

type DocumentProps = {
  number: string;
  type: documentType;
  expeditionDate: Date;
};

export class Document extends Entity<DocumentProps> {
  get number(): string {
    return this.props.number;
  }
  set number(value: string) {
    this.props.number = value;
  }

  get type(): documentType {
    return this.props.type;
  }
  set type(value: documentType) {
    this.props.type = value;
  }

  get expeditionDate(): Date {
    return this.props.expeditionDate;
  }
  set expeditionDate(value: Date) {
    this.props.expeditionDate = value;
  }

  get formattedNumber(): string {
    switch (this.type) {
      case documentType.RG:
        return `RG: ${this.number.slice(0, 2)}.${this.number.slice(3, 6)}.${this.number.slice(6, 9)}-${this.number[8]}`;
      case documentType.CPF:
        return `CPF: ${this.number.slice(0, 3)}.${this.number.slice(3, 6)}.${this.number.slice(6, 9)}-${this.number.slice(9)}`;
      case documentType.Passaporte:
        return `Passaporte: ${this.number.slice(0, 3)}.${this.number.slice(3, 6)}.${this.number.slice(6, 9)}-${this.number.slice(9)}`;
      default:
        return this.number;
    }
  }
}

