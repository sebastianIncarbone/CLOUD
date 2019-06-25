export class UniqueIdGenerator {
  static globalCount = 1;

  public static get(): number {
      // tslint:disable-next-line:no-increment-decrement
    this.globalCount++;
    return this.globalCount - 1;
  }
}
