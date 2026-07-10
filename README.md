# Backup Utility

A simple command-line backup tool written in Node.js. Recursively copies files and folders from a source directory to a destination.

## Features

- Recursively copies files and folders, preserving directory structure
- Creates the destination folder automatically if it doesn't exist

> Verbose logging, copy summaries (file count, size, time taken), and archive compression are planned but not yet implemented.

## Installation

Clone the repo and install dependencies:

```bash
git clone git@github.com:rikod3/BackupUtility.git
cd BackupUtility
npm install
```

## Usage

```bash
node src/index.js <source> --to <destination>
```

### Example

```bash
node src/index.js ~/Documents --to ~/Backups
```

Copies everything inside `~/Documents` into `~/Backups`, recreating the same folder structure.

## Options

| Flag                 | Description                                      |
| -------------------- | ------------------------------------------------ |
| `<source>`           | Path to the file or folder to back up (required) |
| `--to <destination>` | Path to the backup destination (required)        |
| `-V, --version`      | Show the tool's version                          |
| `-h, --help`         | Show help for all commands and options           |

## Requirements

- Node.js 18.17+ (uses `fs/promises` and `fs.readdir` with recursive options)
- [`commander`](https://www.npmjs.com/package/commander) for CLI argument parsing

## Roadmap

- [ ] Verbose mode for per-file/per-folder logging
- [ ] Print a summary (files copied, total size, time taken)
- [ ] Compress backups into a single `.zip` archive
