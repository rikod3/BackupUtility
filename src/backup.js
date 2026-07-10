#!/usr/bin/env node

import { Command } from "commander";
import fs from "node:fs/promises";
import path from "node:path";

const program = new Command();

// Info
program
  .name("Backup Utility")
  .description("A simple backup utility written in javascript")
  .version("1.0");

// Argumetns and Options
program
  .argument("<source>", "Path of the file")
  .option("--to <destination>", "Path of the destination")
  .action(async (source, options) => {
    if (!(await exists(source))) {
      console.log("Source file doesn't exist!");
      process.exit(1);
    }

    if (!(await exists(options.to))) {
      console.log("Destination doesn't exist");
      await fs.mkdir(options.to, { recursive: true });
      console.log("Folder created!");
    }
    try {
      await checkMime(source, options.to);
    } catch (err) {
      console.log("Error message", err.message);
      process.exit(1);
    }
  });

program.parse();

async function exists(src) {
  try {
    await fs.access(src);
    return true;
  } catch {
    return false;
  }
}
// Copies files recursively

async function checkMime(src, dest) {
  const mimeType = await fs.stat(src);

  if (mimeType.isFile()) {
    const newDest = path.join(dest, path.basename(src));
    await fs.copyFile(src, newDest);
    console.log(`${src} copied to -> ${dest}`);
  }

  if (mimeType.isDirectory()) {
    const files = (await fs.readdir(src)).map((value) => path.join(src, value));
    const newDest = path.join(dest, path.basename(src));
    await fs.mkdir(newDest, {
      recursive: true,
    });
    for (const file of files) {
      checkMime(file, newDest);
    }
  }
}
