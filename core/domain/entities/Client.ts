import type { Document } from "./Document";
import type { Address } from "./Address";
import type { Cellphone } from "./Cellphone";
import { Entity } from "../abstracts";

type ClientProps = {
  name: string;
  socialName: string;
  birthDate: Date;
  registrationDate: Date;
  cellphones: Cellphone[];
  address: Address;
  documents: Document[];
  dependents?: Client[];
  guardian?: Client;
};
export class Client extends Entity<ClientProps> {
  get name(): string {
    return this.props.name;
  }

  get socialName(): string {
    return this.props.socialName;
  }

  get birthDate(): Date {
    return this.props.birthDate;
  }

  get registrationDate(): Date {
    return this.props.registrationDate;
  }

  get cellphones(): Cellphone[] {
    return this.props.cellphones;
  }

  get address(): Address {
    return this.props.address;
  }

  get documents(): Document[] {
    return this.props.documents;
  }
  get guardian(): Client | undefined {
    return this.props.guardian;
  }
  get dependents(): Client[] | undefined {
    return this.props.dependents;
  }
  public addDependent(dependent: Client): void {
    if (!this.props.dependents) {
      this.props.dependents = [];
    }
    this.props.dependents?.push(dependent);
  }
}
