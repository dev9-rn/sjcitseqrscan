import React from "react";
import { icons, LucideIcon as LucideIconType } from "lucide-react-native";

type IconProps = {
  name: keyof typeof icons; // restrict to valid icon names
  color?: string;
  size?: number;
};

const Icon: React.FC<IconProps> = ({ name, color = "black", size = 24 }) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    // Optionally handle missing icon gracefully
    return null;
  }

  return <LucideIcon color={color} size={size} />;
};

export default Icon;
