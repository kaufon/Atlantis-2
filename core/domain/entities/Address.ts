type AddressProps = {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};
import type { IPrototype } from "../../interfaces/Prototype.ts";
import { Entity } from "../index";
export class Address extends Entity<AddressProps> implements IPrototype {
  get street(): string {
    return this.props.street;
  }
  get neighborhood(): string {
    return this.props.neighborhood;
  }
  get city(): string {
    return this.props.city;
  }
  get state(): string {
    return this.props.state;
  }
  get country(): string {
    return this.props.country;
  }
  get postalCode(): string {
    return this.props.postalCode;
  }
  get formattedValue(): string {
    return `${this.street}, ${this.neighborhood}, ${this.city}, ${this.state} - ${this.postalCode}. ${this.country.toUpperCase()}`;
  }
  public clone(): IPrototype {
    return new Address(this.props);
  }
}
