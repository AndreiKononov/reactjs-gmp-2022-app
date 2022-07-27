import { useState } from 'react';
import Image from 'next/image';

export const NextImageCustom = ({ alt, ...props }) => {
  const [src, setSrc] = useState(props.src);

  return (
    <Image
      {...props}
      alt={alt}
      src={src}
      placeholder="blur"
      blurDataURL="/img/img-placeholder.png"
      onError={() => setSrc('/img/img-placeholder.png')}
    />
  );
};
