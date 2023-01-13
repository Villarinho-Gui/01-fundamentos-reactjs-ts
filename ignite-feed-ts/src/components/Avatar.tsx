import styles from "./Avatar.module.css";
import { ImgHTMLAttributes } from "react";

interface IAvatarProp extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
}

export function Avatar({ hasBorder = true, ...props }: IAvatarProp) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      {...props}
    />
  );
}
