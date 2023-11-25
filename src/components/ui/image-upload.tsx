"use client";

import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  label: string;
  images: string[];
  disable: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: FC<ImageUploadProps> = ({
  label,
  images,
  disable,
  onChange,
  onRemove,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = (result: any) => {
    onChange(result.info.url);
  };

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {images.map((image) => (
          <div
            key={image}
            className="relative w-[225px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(image)}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={image} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="uo1ka5i5">
        {({ open }) => (
          <Button
            type="button"
            disabled={disable}
            variant="secondary"
            onClick={() => open()}
          >
            <ImagePlus className="h-4 w-4 mr-2" />
            {label}
          </Button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default ImageUpload;
