"use client";

import { GalleryItem } from "./gallery-item";
import type { GalleryImage, GalleryRow } from "./types";

const LAYOUTS: Array<"1-2" | "2-1" | "3"> = ["1-2", "3", "2-1", "3", "1-2", "2-1"];

function buildRows(images: GalleryImage[]): GalleryRow[] {
  const rows: GalleryRow[] = [];
  let i = 0;
  let rowIndex = 0;

  while (i < images.length) {
    const layout = LAYOUTS[rowIndex % LAYOUTS.length];
    const count = layout === "3" ? 3 : 2;
    const slice = images.slice(i, i + count);
    if (slice.length === 0) break;
    rows.push({ images: slice, layout: slice.length === 1 ? "1" : layout });
    i += slice.length;
    rowIndex++;
  }

  return rows;
}

interface DesktopGridProps {
  images: GalleryImage[];
  onOpen: (index: number) => void;
}

export function DesktopGrid({ images, onOpen }: DesktopGridProps) {
  const rows = buildRows(images);
  let globalIndex = 0;

  return (
    <div className="flex flex-col gap-4">
      {rows.map((row, rowIdx) => {
        const startIndex = globalIndex;
        globalIndex += row.images.length;

        if (row.images.length === 1) {
          return (
            <div key={rowIdx} className="h-[500px]">
              <GalleryItem
                img={row.images[0]}
                index={startIndex}
                onClick={() => onOpen(startIndex)}
                className="w-full h-full"
              />
            </div>
          );
        }

        if (row.images.length === 2) {
          const bigFirst = row.layout === "1-2";
          return (
            <div
              key={rowIdx}
              className="grid gap-4 h-[460px]"
              style={{ gridTemplateColumns: bigFirst ? "2fr 1fr" : "1fr 2fr" }}
            >
              <GalleryItem img={row.images[0]} index={startIndex} onClick={() => onOpen(startIndex)} className="w-full h-full" />
              <GalleryItem img={row.images[1]} index={startIndex + 1} onClick={() => onOpen(startIndex + 1)} className="w-full h-full" />
            </div>
          );
        }

        return (
          <div key={rowIdx} className="grid grid-cols-3 gap-4 h-[360px]">
            {row.images.map((img, j) => (
              <GalleryItem
                key={img.src}
                img={img}
                index={startIndex + j}
                onClick={() => onOpen(startIndex + j)}
                className="w-full h-full"
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
