# cf-emoji

[![npm version](https://img.shields.io/npm/v/cf-emoji.svg)](https://www.npmjs.com/package/cf-emoji)
[![npm downloads](https://img.shields.io/npm/dm/cf-emoji.svg)](https://www.npmjs.com/package/cf-emoji)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/cf-emoji)](https://bundlephobia.com/package/cf-emoji)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Ultra-fast country code to flag emoji converter, with locale support. Up to 17x faster than alternatives.

## Features

- 🚀 Ultra-fast performance (~17x faster than country-code-to-flag-emoji)
- 🌐 Supports both country codes (US) and locale codes (en-US)
- 💾 Smart caching for common country codes
- 🔄 Case-insensitive input handling
- 📦 Zero dependencies
- 🧪 100% test coverage
- 💻 Written in TypeScript
- 🛠️ Built with Bun

## Installation

```bash
# Using npm
npm install cf-emoji

# Using yarn
yarn add cf-emoji

# Using pnpm
pnpm add cf-emoji

# Using bun
bun add cf-emoji
```

## Usage

```typescript
import { toFlag } from 'cf-emoji';

// Using country codes
console.log(toFlag('US')); // 🇺🇸
console.log(toFlag('GB')); // 🇬🇧
console.log(toFlag('JP')); // 🇯🇵

// Using locale codes
console.log(toFlag('en-US')); // 🇺🇸
console.log(toFlag('en-GB')); // 🇬🇧
console.log(toFlag('ja-JP')); // 🇯🇵

// Case-insensitive
console.log(toFlag('us')); // 🇺🇸
console.log(toFlag('en-gb')); // 🇬🇧
```

## Performance

Benchmark results comparing `cf-emoji` with `country-code-to-flag-emoji`:

```txt
Benchmark Results:
==================================================
Implementation       Total Time      Avg Time        Ratio
--------------------------------------------------
dalist               48.877ms        0.049µs         1.00x
wojtech              826.424ms       0.826µs         16.91x
```

## API

### toFlag(code: string): string

Converts a country code or locale code to its corresponding flag emoji.

- `code`: A 2-letter country code (ISO 3166-1 alpha-2) or locale code
- Returns: Flag emoji string
- Throws: Error if the code is invalid

## Development

```bash
# Clone the repository
git clone https://github.com/dalist1/cf-emoji.git

# Install dependencies
bun install

# Run tests
bun test

# Run benchmark
bun bench
```

## License

MIT © [Dalist](https://github.com/dalist1)