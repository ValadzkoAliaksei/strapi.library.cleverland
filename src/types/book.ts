import { CategoryDataType } from "./categories";

export type BooksDataResponseType = {
  data: BookDataType[];
};

export type BookDataResponseType = {
  data: BookDataType;
};

type BookDataType = {
  id: number;
  attributes: {
    title: string;
    rating: number;
    issueYear: string | null;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    description: string | null;
    publish: string | null;
    cover: string | null;
    weight: string | null;
    pages: string | null;
    format: string | null;
    ISBN: string | null;
    producer: string | null;
    authors: AuthorType;
    images: ImageType;
    categories: CategoryDataType;
    comments: any;
    booking: any;
    delivery: any;
    histories: any;
  };
};

type ImageType = {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
      formats: {
        thumbnail: FormatType;
        small: FormatType;
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
};

type FormatType = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
};

type AuthorType = {
  data: {
    id: number;
    attributes: {
      name: string;
      createdAt: Date;
      updatedAt: Date;
      publishedAt: Date;
    };
  }[];
};
