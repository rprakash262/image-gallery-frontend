export interface User {
  _id: string;
  email: string;
  name?: string;
  gender?: string;
  age?: number;
  image?: string;
}

export interface Album {
  _id: string;
  albumName: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Photo {
  _id: string;
  title: string;
  album: string[];
  description?: string;
  isFavorite: boolean;
  tags: string[];
  urlKey: string;
  createdAt: string;
  updatedAt: string;
}

export interface PresignedDownloadUrl {
  error?: any;
  path: string;
  signedURL: string;
  signedUrl: string;
}
