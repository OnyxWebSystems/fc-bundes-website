import fs from "fs";
import path from "path";
import zlib from "zlib";
import sharp from "sharp";

const root = process.cwd();

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next" || entry.name === "public") continue;
      walk(full, acc);
    } else if (entry.name.toLowerCase().endsWith(".pdf") && fs.statSync(full).size > 0) {
      acc.push(full);
    }
  }
  return acc;
}

function extractJpeg(file) {
  const buf = fs.readFileSync(file);
  let best = null;
  for (let i = 0; i < buf.length - 1; i++) {
    if (buf[i] === 0xff && buf[i + 1] === 0xd8) {
      let j = i + 2;
      while (j < buf.length - 1) {
        if (buf[j] === 0xff && buf[j + 1] === 0xd9) {
          j += 2;
          break;
        }
        j++;
      }
      const slice = buf.subarray(i, j);
      if (!best || slice.length > best.length) best = slice;
      i = j;
    }
  }
  return best;
}

function outputFor(file) {
  const base = path.basename(file).toLowerCase();
  if (base.includes("logo")) return path.join(root, "public", "brand", "crest.webp");
  if (base.includes("about")) return path.join(root, "public", "media", "match-pitch.webp");
  const match = base.match(/pic\s*(\d+)/i);
  if (match) {
    return path.join(root, "public", "media", `pic-${match[1].padStart(2, "0")}.webp`);
  }
  return null;
}

function isBackdrop(data, index) {
  const offset = index * 4;
  const r = data[offset];
  const g = data[offset + 1];
  const b = data[offset + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return min > 186 && max - min < 22;
}

async function knockOutWhite(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const seen = new Uint8Array(width * height);
  const stack = [];

  const seed = (index) => {
    if (index < 0 || index >= seen.length || seen[index] || !isBackdrop(data, index)) return;
    seen[index] = 1;
    stack.push(index);
  };

  for (let x = 0; x < width; x++) {
    seed(x);
    seed((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    seed(y * width);
    seed(y * width + width - 1);
  }

  while (stack.length) {
    const index = stack.pop();
    data[index * 4 + 3] = 0;
    const x = index % width;
    const y = (index - x) / width;
    if (x > 0) seed(index - 1);
    if (x < width - 1) seed(index + 1);
    if (y > 0) seed(index - width);
    if (y < height - 1) seed(index + width);
  }

  return sharp(data, {
    raw: { width, height, channels: 4 },
  });
}

fs.mkdirSync(path.join(root, "public", "brand"), { recursive: true });
fs.mkdirSync(path.join(root, "public", "media"), { recursive: true });

const files = walk(root);
let crestBuffer = null;

for (const file of files) {
  const dest = outputFor(file);
  if (!dest) continue;
  const jpeg = extractJpeg(file);
  if (!jpeg || jpeg.length < 5000) {
    console.log("skip", file);
    continue;
  }

  const isLogo = dest.endsWith(`${path.sep}crest.webp`);
  if (isLogo) {
    const image = await knockOutWhite(jpeg);
    crestBuffer = await image.webp({ quality: 92 }).toBuffer();
    await fs.promises.writeFile(dest, crestBuffer);
  } else {
    await sharp(jpeg)
      .rotate()
      .resize({ width: 2000, withoutEnlargement: true })
      .webp({ quality: 76 })
      .toFile(dest);
  }
  console.log("wrote", path.relative(root, dest));
}

if (crestBuffer) {
  await sharp(crestBuffer)
    .resize(256, 256, {
      fit: "contain",
      background: { r: 8, g: 9, b: 11, alpha: 1 },
    })
    .png()
    .toFile(path.join(root, "src", "app", "icon.png"));
  console.log("wrote src/app/icon.png");
}

const playerFolders = [
  ["elvis-presley", "ELVIS PRESLEY"],
  ["wycliffe-ochieng", "WYCLIFFE OCHIENG"],
  ["paul-ochuoga", "PAUL OCHUOGA"],
  ["daniel-odhiambo", "DANIEL ODHIAMBO"],
  ["dwang-jackson", "DWANG JACKSON"],
  ["evra-barongo", "EVRA BARONGO"],
];

function fileSlug(name) {
  return name
    .toLowerCase()
    .replace(/\.pdf$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function jpegSlices(buf) {
  const slices = [];
  for (let i = 0; i < buf.length - 1; i++) {
    if (buf[i] === 0xff && buf[i + 1] === 0xd8) {
      let j = i + 2;
      while (j < buf.length - 1) {
        if (buf[j] === 0xff && buf[j + 1] === 0xd9) {
          j += 2;
          break;
        }
        j++;
      }
      slices.push(buf.subarray(i, j));
      i = j;
    }
  }
  return slices;
}

async function largestValidJpeg(buf) {
  let best = null;
  for (const slice of jpegSlices(buf)) {
    try {
      const meta = await sharp(slice).metadata();
      if (!meta.width || !meta.height) continue;
      if (!best || slice.length > best.length) best = slice;
    } catch {
      // False JPEG markers inside compressed PDF streams.
    }
  }
  return best;
}

function inflateFlateImage(buf) {
  const header = buf.indexOf(Buffer.from("/Subtype/Image"));
  if (header < 0) return null;
  const dictEnd = buf.indexOf(Buffer.from("stream"), header);
  if (dictEnd < 0) return null;
  const dict = buf.subarray(header, dictEnd).toString("latin1");
  const width = Number(dict.match(/\/Width\s+(\d+)/)?.[1]);
  const height = Number(dict.match(/\/Height\s+(\d+)/)?.[1]);
  const length = Number(dict.match(/\/Length\s+(\d+)/)?.[1]);
  if (!width || !height || !length || !dict.includes("/FlateDecode")) return null;
  if (!dict.includes("/DeviceRGB")) return null;

  let dataStart = dictEnd + 6;
  if (buf[dataStart] === 0x0d && buf[dataStart + 1] === 0x0a) dataStart += 2;
  else if (buf[dataStart] === 0x0a || buf[dataStart] === 0x0d) dataStart += 1;

  const expected = width * height * 3;
  const chunks = [];
  let got = 0;
  const inflator = zlib.createInflate();
  inflator.on("data", (chunk) => {
    chunks.push(chunk);
    got += chunk.length;
  });

  return new Promise((resolve) => {
    const finish = () => {
      if (got < expected) {
        resolve(null);
        return;
      }
      resolve({
        raw: Buffer.concat(chunks).subarray(0, expected),
        width,
        height,
      });
    };
    inflator.on("end", finish);
    inflator.on("error", finish);
    inflator.end(buf.subarray(dataStart, dataStart + length));
  });
}

for (const [slug, dir] of playerFolders) {
  const folder = path.join(root, dir);
  if (!fs.existsSync(folder)) {
    console.log("missing player folder", dir);
    continue;
  }
  const outDir = path.join(root, "public", "players", slug);
  fs.mkdirSync(outDir, { recursive: true });
  for (const entry of fs.readdirSync(folder)) {
    if (!entry.toLowerCase().endsWith(".pdf")) continue;
    const file = path.join(folder, entry);
    if (fs.statSync(file).size < 1000) {
      console.log("skip", file);
      continue;
    }
    const dest = path.join(outDir, `${fileSlug(entry)}.webp`);
    const source = fs.readFileSync(file);
    const jpeg = await largestValidJpeg(source);
    try {
      if (jpeg) {
        await sharp(jpeg)
          .rotate()
          .resize({ width: 1600, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(dest);
      } else {
        const image = await inflateFlateImage(source);
        if (!image) {
          console.log("skip", file);
          continue;
        }
        await sharp(image.raw, {
          raw: { width: image.width, height: image.height, channels: 3 },
        })
          .resize({ width: 1600, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(dest);
      }
    } catch (error) {
      console.log("skip", file, error instanceof Error ? error.message : error);
      continue;
    }
    console.log("wrote", path.relative(root, dest));
  }
}
