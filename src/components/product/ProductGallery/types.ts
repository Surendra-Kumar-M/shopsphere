export interface ProductGalleryProps {
  images: string[];
  selectedIndex: number;
  onSelectImage: (index: number) => void;
}

export const GALLERY_HEIGHT = 360;

export const THUMBNAIL_SIZE = 64;
