import { DartType, Fields, GenericObject } from "./types";
import { toCamelCase } from "./utils";
import emojiRegex from "emoji-regex";

export function generateEmojiRegex(): string {
  const regex = emojiRegex();

  return `final regex = RegExp(
  r"${regex.source}",
  unicode: true,
);`;
}

export function generateEmojiClass(fields: Fields): string {
  var fieldStr = "";
  var constructorStr = "";

  for (const [_, value] of Object.entries(fields)) {
    fieldStr += `  final ${value.dartType}${value.required ? "" : "?"} ${
      value.formattedName
    };\n`;
    constructorStr += `    ${value.required ? "required " : ""}this.${
      value.formattedName
    },\n`;
  }

  return `class Emoji {
${fieldStr}
  Emoji({
${constructorStr}  });
}`;
}

export function generateEmojiGroupEnum(groups: string[]): string {
  const formatted = groups.map((v) => toCamelCase(v));
  const str = formatted.join(",\n  ");
  return `enum ${DartType.emojiGroup} {
  ${str.trimEnd()},
}`;
}

export function generateEmojiInstance(
  fields: Fields,
  data: GenericObject
): string {
  var str = "";

  for (const [key, field] of Object.entries(fields)) {
    var value = data[key];

    switch (field.dartType) {
      case DartType.string:
        value = `"${value}"`;
        break;
      case DartType.emojiGroup:
        value = `${DartType.emojiGroup}.${toCamelCase(value)}`;
        break;
      case DartType.list:
        value = `[${(value as string[]).map((v) => `"${v}"`)}]`;
        break;
    }

    if (value == undefined) continue;

    str += `    ${field.formattedName}: ${value},\n`;
  }

  return `"${data["char"]}": Emoji(
${str}  )`;
}

export function generateEmojiList(
  fields: Fields,
  emojis: GenericObject
): string {
  var str = "";

  for (const [key, value] of Object.entries(emojis)) {
    str += `  ${generateEmojiInstance(fields, value)},\n`;
  }

  return `final emojis = {
${str}
  };`;
}
