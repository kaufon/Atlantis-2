export interface IInput {
  textInput(message: string): Promise<string>;
  dateInput(message: string): Promise<Date>;
  numberInput(message: string): Promise<number>;
  selectInput(message: string, choices: string[][]): Promise<string>;
}
