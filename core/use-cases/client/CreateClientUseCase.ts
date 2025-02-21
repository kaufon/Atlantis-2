import { printTable } from "console-table-printer";
import { Address, Cellphone, Client, Document } from "../../domain";
import { documentType } from "../../enums";
import type { IInput } from "../../interfaces";
import { Validation } from "../../utils";
import { parseDate } from "../../utils/dateParser";

export class CreateClientUseCase {
  private clients: Client[];
  private input: IInput;
  constructor(clients: Client[], input: IInput) {
    this.input = input;
    this.clients = clients;
  }
  public async execute(): Promise<void> {
    let birthDate = "";
    let registrationDate = "";
    const validation = new Validation();
    console.log("Criando cliente... bip bop");
    const name = await this.input.textInput("Insira o nome do cliente:");
    const socialName = await this.input.textInput(
      "Insira o nome social do cliente:",
    );
    while (true) {
      const birthDateInput = await this.input.textInput(
        "Insira a data de nascimento,no valor (DD/MM/YYYY):",
      );
      if (!validation.validateIssueDate(birthDateInput)) {
        console.log("Data invalida,tente novamente");
        continue;
      }
      birthDate = birthDateInput;
      break;
    }
    while (true) {
      const registrationDateInput = await this.input.textInput(
        "Insira a data do registramento,no valor (DD/MM/YYYY):",
      );

      if (!validation.validateIssueDate(registrationDateInput)) {
        console.log("Data invalida,tente novamente");
        continue;
      }
      registrationDate = registrationDateInput;
      break;
    }
    const street = await this.input.textInput(
      "Insira o nome da rua de moradia:",
    );
    const neighborhood = await this.input.textInput("Insira o bairro:");
    const city = await this.input.textInput("Insira a cidade:");
    const state = await this.input.textInput("Insira o estado:");
    const postalCode = await this.input.textInput("Insira o CEP:");

    const cellphoneQuantity = await this.input.numberInput(
      "Insira quantos telefones deseja colocar:",
    );
    const cellphoneArray = new Array<Cellphone>();
    for (let index = 0; index < cellphoneQuantity; index++) {
      const phoneDDD = await this.input.textInput("Insira o DDD do telefone:");
      const phoneNumber = await this.input.textInput(
        "Insira o numero do telefone:",
      );

      const cellphone = new Cellphone({ number: phoneNumber, ddd: phoneDDD });
      cellphoneArray.push(cellphone);
    }
    const documentQuantity = await this.input.numberInput(
      "Insira a quantos documentos deseja colocar:",
    );
    const documentArray = new Array<Document>();
    for (let index = 0; index < documentQuantity; index++) {
      const DocumentType = await this.input.selectInput(
        "Selecione o tipo do documento: ",
        [
          ["RG", documentType.RG],
          ["CPF", documentType.CPF],
          ["Passaporte", documentType.Passaporte],
        ],
      );
      const number = await this.input.textInput("Insira o valor do documento:");
      let dateInput = "";
      while (true) {
        const expeditionDateInput = await this.input.textInput(
          "Insira a data de emissao do documento (DD/MM/YYYY):",
        );
        if (!validation.validateIssueDate(expeditionDateInput)) {
          console.log("Data invalida, tente novamente");
          continue;
        }
        dateInput = expeditionDateInput;
        break;
      }
      const emissionDate = await parseDate(dateInput);
      const document = new Document({
        number,
        expeditionDate: emissionDate,
        type: DocumentType as documentType,
      });
      documentArray.push(document);
    }

    const address = new Address({
      state,
      street,
      neighborhood,
      city,
      postalCode,
    });
    const Newclient = new Client({
      name,
      socialName,
      address,
      birthDate: parseDate(birthDate),
      documents: documentArray,
      registrationDate: parseDate(registrationDate),
      cellphones: cellphoneArray,
      dependents: [],
    });

    this.clients.push(Newclient);
    console.log("Cliente cadastrado com sucesso!");
  }
}
