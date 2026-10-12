const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const NAME_MIN = 2;
export const MESSAGE_MIN = 10;

export function isEmail(value: string) {
  return EMAIL.test(value);
}
