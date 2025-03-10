import { Document, IInput, IMenu } from "@core";

export class DocumentSelectingMenu implements IMenu {
  constructor(
    private input: IInput,
    private documents: Document[],
  ) {}

  async display(): Promise<string> {
    return await this.input.selectInput(
      'Selection um documento?',
      this.documents.map((document, index) => [
        document.formattedNumber,
        String(index + 1),
      ]),
    )
  }
}
