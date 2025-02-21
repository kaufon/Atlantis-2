import { Address, Cellphone, Client, Document } from "../../domain";
import { documentType } from "../../enums";
import { IInput } from "../../interfaces";
import { parseDate } from "../../utils/dateParser";

export class UpdateClientUseCase {
  private input: IInput;
  private clients: Client[];
  constructor(clients: Client[], input: IInput) {
    this.input = input;
    this.clients = clients;
  }
  public async execute(): Promise<void> {
    const id = await this.input.textInput(
      "Digite o id do cliente a ser editado",
    );
    const clientToBeEdited = this.clients.find((client) => client.id === id);
    if (!clientToBeEdited) {
      console.log("Cliente nao encontrado,tente novamente");
      return;
    }
    clientToBeEdited.name = await this.input.textInput("Digite o nome:");
    clientToBeEdited.socialName = await this.input.textInput(
      "Digite o  nome social:",
    );
    const birthDate = await this.input.textInput(
      "Digite a data de nasciment (DD/MM/YYYY):",
    );
    clientToBeEdited.birthDate = parseDate(birthDate);
    const registrationDate = await this.input.textInput(
      "Digite a nova data de registro (DD/MM/YYYY):",
    );
    clientToBeEdited.registrationDate = parseDate(registrationDate);
    const street = await this.input.textInput(
      "Insira o nome da rua de moradia:",
    );
    const neighborhood = await this.input.textInput("Insira o bairro:");
    const city = await this.input.textInput("Insira a cidade:");
    const state = await this.input.textInput("Insira o estado:");
    const postalCode = await this.input.textInput("Insira o CEP:");
    clientToBeEdited.address = new Address({
      street,
      neighborhood,
      city,
      state,
      postalCode,
    });
    let updatedCellphones = clientToBeEdited.cellphones;
    const cellphoneArray = new Array<Cellphone>();
    for (let index = 0; index < updatedCellphones.length; index++) {
      const newPhoneDDD = await this.input.textInput(
        `Insira o novo ddd do ${index + 1} telefone`,
      );
      const newPhoneNumber = await this.input.textInput(
        `Insira o novo numer do ${index + 1} telefone`,
      );
      const cellphone = new Cellphone({
        number: newPhoneNumber,
        ddd: newPhoneDDD,
      });
      cellphoneArray.push(cellphone);
    }
    let updatedDocuments = clientToBeEdited.documents;
    const documentArray = new Array<Document>();
    for (let index = 0; index < updatedCellphones.length; index++) {
      const DocumentType = await this.input.selectInput(
        "Selecione o tipo do documento: ",
        [
          ["RG", documentType.RG],
          ["CPF", documentType.CPF],
          ["Passaporte", documentType.Passaporte],
        ],
      );

      const newDocumentValue = await this.input.textInput(
        `Insira o novo valor do ${index + 1} documento`,
      );
      const dateInput = await this.input.textInput(
        `Insira a nova data de emissao do ${index + 1} documento`,
      );
      const newEmissiondate = parseDate(dateInput);
      const newDocument = new Document({
        expeditionDate: newEmissiondate,
        number: newDocumentValue,
        type: DocumentType as documentType,
      });
      documentArray.push(newDocument);
    }
    clientToBeEdited.documents = documentArray;
    clientToBeEdited.cellphones = cellphoneArray;
    console.log("Cliente atualizado com sucesso");
  }
}
