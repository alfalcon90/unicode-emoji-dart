import { existsSync, mkdirSync, writeFile } from "fs";
import _keywordData from "emojilib";
import emojiData from "unicode-emoji-json";
import { toDartType, toCamelCase } from "./utils";
import { DartType, Fields, GenericObject } from "./types";
import {
  generateEmojiClass,
  generateEmojiGroupEnum,
  generateEmojiList,
  generateEmojiRegex,
} from "./generators";

const keywordData: { [key: string]: string[] } = _keywordData;
const dir = "./export";
const path = `${dir}/emoji.dart`;

function exportToDart(): void {
  const emojis: GenericObject = {};
  const fields: Fields = {
    char: {
      formattedName: "char",
      dartType: DartType.string,
      required: true,
    },
    keywords: {
      formattedName: "keywords",
      dartType: DartType.list,
      required: true,
    },
  };
  const groups: string[] = [];

  for (const [emoji, data] of Object.entries(emojiData)) {
    // Merge keywords with emoji data and add char field
    emojis[emoji] = { ...data, keywords: keywordData[emoji], char: emoji };

    // Transform emoji data to Dart class fields
    for (const [k, v] of Object.entries(data)) {
      const required = Object.entries(emojiData).every(
        ([_, data]) => (data as GenericObject)[k] != undefined
      );

      fields[k] = {
        formattedName: toCamelCase(k),
        dartType: toDartType(k, v),
        required: required,
      };
    }

    // Add emojiGroup to list
    if (groups.indexOf(data.group) === -1) groups.push(data.group);
  }

  // Create export dir if not done already
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  // Create dart file
  writeFile(
    path,
    `${generateEmojiRegex()}

${generateEmojiGroupEnum(groups)}
    
${generateEmojiClass(fields)}
    
${generateEmojiList(fields, emojis)}`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`✅ Dart file created successfully: ${path}`);
      }
    }
  );

  return;
}

exportToDart();
