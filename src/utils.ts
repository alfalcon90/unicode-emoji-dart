export function toCamelCase(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

export function toDartType(key: string, value: any): string {
  switch (typeof value) {
    case "string":
      if (key === "group") {
        return "EmojiGroup";
      } else if (isNaN(Number(value))) {
        return "String";
      } else {
        return "double";
      }
    case "boolean":
      return "bool";
    case "number":
      return "double";
    case "object": {
      if (Array.isArray(value)) {
        return "List<String>";
      } else {
        console.log(value);
        throw Error(`Unsupported type of ${typeof value}`);
      }
    }
    default: {
      console.log(value);
      throw Error(`Unsupported type of ${typeof value}`);
    }
  }
}
