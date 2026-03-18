export function cn(...inputs: (string | undefined | null | false | (string | undefined | null | false)[])[]): string {
  const flat: (string | undefined | null | false)[] = [];
  for (const input of inputs) {
    if (Array.isArray(input)) {
      for (const v of input) flat.push(v);
    } else {
      flat.push(input);
    }
  }
  return flat.filter(Boolean).join(" ");
}
