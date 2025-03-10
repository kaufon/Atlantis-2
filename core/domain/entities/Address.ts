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
  set street(value: string) {
    this.props.street = value;
  }

  get neighborhood(): string {
    return this.props.neighborhood;
  }
  set neighborhood(value: string) {
    this.props.neighborhood = value;
  }

  get city(): string {
    return this.props.city;
  }
  set city(value: string) {
    this.props.city = value;
  }

  get state(): string {
    return this.props.state;
  }
  set state(value: string) {
    this.props.state = value;
  }

  get country(): string {
    return this.props.country;
  }
  set country(value: string) {
    this.props.country = value;
  }

  get postalCode(): string {
    return this.props.postalCode;
  }
  set postalCode(value: string) {
    this.props.postalCode = value;
  }

  get formattedValue(): string {
    return `${this.street}, ${this.neighborhood}, ${this.city}, ${this.state} - ${this.postalCode}. ${this.country.toUpperCase()}`;
  }

  public clone(): IPrototype {
    return new Address(this.props);
  }
}
