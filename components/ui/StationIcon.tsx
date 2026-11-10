import {
  Coffee,
  GlassWater,
  Snowflake,
  Wine,
  type LucideIcon,
} from "lucide-react";
import type { StationIconKey } from "@/lib/types";

const ICONS: Record<StationIconKey, LucideIcon> = {
  coffee: Coffee,
  tea: Coffee,
  snowflake: Snowflake,
  wine: Wine,
  glass: GlassWater,
  cocktail: GlassWater,
};

export default function StationIcon({
  name,
  size = 15,
  className,
}: {
  name: StationIconKey;
  size?: number;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Coffee;
  return <Icon size={size} className={className} aria-hidden="true" />;
}
