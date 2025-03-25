"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

export default function SafeImage(props: ImageProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return a placeholder div during server-side rendering
    return (
      <div
        style={{
          width: typeof props.width === 'number' ? `${props.width}px` : props.width,
          height: typeof props.height === 'number' ? `${props.height}px` : props.height
        }}
      />
    );
  }

  // Once mounted on client, use the actual Image component with additional props to avoid hydration issues
  return <Image {...props} unoptimized={true} />;
}
