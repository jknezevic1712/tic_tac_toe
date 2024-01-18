import Image from "next/image";

type ImageProps = {
  src: string;
  height: number;
  width: number;
};
type CustomImageProps = {
  image: ImageProps;
  alt: string;
};
function CustomImage({
  image,
  alt,
  className,
}: Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "height" | "width" | "loading" | "ref" | "alt" | "src" | "srcSet"
> &
  CustomImageProps) {
  const { src, height, width } = image;

  return (
    <Image
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={`${className} h-10 w-10`}
    />
  );
}

export default CustomImage;
