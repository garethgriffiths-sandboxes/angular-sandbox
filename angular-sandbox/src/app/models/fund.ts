export class Fund {
  public name: string;
  public symbol: string;
  public exchange: string;

  public constructor(init?: Partial<Fund>) {
    Object.assign(this, init);
  }
}
