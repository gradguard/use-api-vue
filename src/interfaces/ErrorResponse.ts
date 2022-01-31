export default class ErrorResponse extends Error {
  constructor(public readonly message: string, public readonly code: string) {
    super();
    Object.setPrototypeOf(this, ErrorResponse.prototype);
  }
}
