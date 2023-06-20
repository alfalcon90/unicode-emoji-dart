import { writeFile } from "fs";
import _keywordData from "emojilib";
import emojiData from "unicode-emoji-json";
import { toDartType, toCamelCase } from "./utils";
import { Fields } from "./types";
import { generateEmojiClass, generateEmojiGroupEnum } from "./generators";

const keywordData: { [key: string]: string[] } = _keywordData;

function exportToDart(): void {
  const emojis: { [key: string]: any } = {};
  const fields: Fields = {
    char: { formattedName: "char", dartType: "String" },
  };
  const groups: string[] = [];

  for (const [emoji, data] of Object.entries(emojiData)) {
    // Merge keywords with emoji data
    const keywords: undefined | string[] = keywordData[emoji];

    // Filters out other data that is not keywords
    if (Array.isArray(keywords)) {
      emojis[emoji] = { ...data, keywords: keywords };
    }

    // Transform emoji data to Dart class fields
    for (const [k, v] of Object.entries(data)) {
      fields[k] = {
        formattedName: toCamelCase(k),
        dartType: toDartType(k, v),
      };
    }

    // Add emojiGroup to list
    if (groups.indexOf(data.group) === -1) groups.push(data.group);
  }

  writeFile(
    "./export/emoji.dart",
    `${generateEmojiGroupEnum(groups)}\n\n${generateEmojiClass(fields)}`,
    () => {}
  );
  return;
}

exportToDart();
