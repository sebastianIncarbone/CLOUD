export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) { Object.setPrototypeOf(this, actualProto); }
    else { (this as any).__proto__ = actualProto; }
  }

}
