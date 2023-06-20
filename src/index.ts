import { writeFile } from "fs";

function exportToDart(): void {
  writeFile("./test.txt", "lol", () => {});
  return;
}

exportToDart();
