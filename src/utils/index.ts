export function printBox(textArray: string[]): void {
  const maxLength = Math.max(...textArray.map((text) => text.length));
  const width = maxLength + 4;
  const horizontalLine = "-".repeat(width);
  const emptyLine = `|${" ".repeat(width - 2)}|`;

  console.log(horizontalLine);
  console.log(emptyLine);
  textArray.forEach((text) => {
    const padding = " ".repeat((maxLength - text.length) / 2);
    const centeredText = `${padding}${text}${padding}`;
    const remainingSpaces = width - centeredText.length - 2;
    const leftPadding = " ".repeat(Math.floor(remainingSpaces / 2));
    const rightPadding = " ".repeat(Math.ceil(remainingSpaces / 2));
    console.log(`| ${leftPadding}${centeredText}${rightPadding} |`);
  });
  console.log(emptyLine);
  console.log(horizontalLine);
}
