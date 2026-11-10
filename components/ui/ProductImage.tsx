"use client";

import { useState } from "react";
import StationIcon from "./StationIcon";
import type { StationIconKey } from "@/lib/types";

interface ProductImageProps {
  src?: string;
  alt: string;
  stationIcon: StationIconKey;
  className?: string;
  iconSize?: number;
}

export default function ProductImage({
  src,
  alt,
  stationIcon,
  className = "",
  iconSize = 30,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-lowest ${className}`}
      >
        <StationIcon
          name={stationIcon}
          size={iconSize}
          className="text-outline/50"
        />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
