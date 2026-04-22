import { FileSearch, Sparkles, Gauge } from "lucide-react";
import type { Feature } from "@/app/types/ui";

export const FEATURES: Feature[] = [
  {
    icon: FileSearch,
    title: "Extracts everything",
    desc: "Every biomarker from every page, in the order they appear.",
  },
  {
    icon: Sparkles,
    title: "Standardized output",
    desc: "Names and units normalized to English clinical conventions.",
  },
  {
    icon: Gauge,
    title: "Age & sex aware",
    desc: "Classifies results as optimal, normal, or out of range.",
  },
];
