import { Fields } from "./types";
import { toCamelCase } from "./utils";

export function generateEmojiClass(fields: Fields): string {
  var fieldStr = "";
  var constructorStr = "";

  for (const [_, value] of Object.entries(fields)) {
    fieldStr += `  final ${value.dartType} ${value.formattedName};\n`;
    constructorStr += `    required this.${value.formattedName},\n`;
  }

  return `class Emoji {
${fieldStr}
  Emoji({
${constructorStr}  });
}
  `;
}

export function generateEmojiGroupEnum(groups: string[]): string {
  const formatted = groups.map((v) => toCamelCase(v));
  const str = formatted.join(",\n  ");
  return `enum EmojiGroup {
  ${str.trimEnd()},
}`;
}
