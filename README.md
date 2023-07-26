# Unicode Emoji Dart

This library takes the latest available emoji dataset ([v15.1](https://www.unicode.org/reports/tr51/proposed.html#emoji_data)) from Unicode and generates Dart objects from it. It uses the following libraries to compile the dataset:

- [`emojilib`](https://github.com/muan/emojilib): provides a list of keywords for every emoji
- [`unicode-emoji-json`](https://github.com/muan/unicode-emoji-json): provides emoji data in JSON format
- [`emoji-regex`](https://github.com/mathiasbynens/emoji-regex): a regular expression to match all emoji symbols and sequences

## Generate Dart files

### As repo clone

1. `git clone https://github.com/alfalcon90/unicode-emoji-dart.git` Clone this repo.

2. `npm install` Install dependencies.

3. `npm run generate` Check the`/export` folder once the script is done.

### As npm dependency

1. `npm add unicode-emoji-dart` Add this package.

2. `npm add -D @types/node typescript` Add Typescript devDependencies if not done already.

3. `npm explore unicode-emoji-dart -- npm run generate` Check the`node_modules/unicode-emoji-dart/export` folder once the script is done.

## Usage

```dart
  // Emoji Map
  emojis.length; // 1870 emojis

  // Emoji class
  final emoji = emojis['🇨🇺']!;

  emoji.char; // '🇨🇺'
  emoji
      .keywords; // ['flag_cuba','cu','flag','nation','country','banner','cuba']
  emoji.name; // 'flag Cuba'
  emoji.slug; // 'flag_cuba'
  emoji.group; // EmojiGroup.flags
  emoji.emojiVersion; // 2.0
  emoji.unicodeVersion; // 2.0
  emoji.skinToneSupport; // false
  emoji.skinToneSupportUnicodeVersion; // null

  // Equality
  final other = emojis['🇺🇸']!;
  emoji == other; // false

  // Regex
  regex.hasMatch('Loud noises! 📣'); // true
```

## Unicode License Agreement

https://www.unicode.org/license.html
