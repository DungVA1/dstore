export type Result<T, E extends Error = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export const ok = <T>(v: T): Result<T, never> => ({ ok: true, value: v });
export const err = <E extends Error>(e: E): Result<never, E> => ({
  ok: false,
  error: e,
});

export class DomainError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly httpStatus = 400,
  ) {
    super(message);
  }
}
