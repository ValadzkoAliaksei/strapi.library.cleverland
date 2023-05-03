export type CategoryDataType = {
  data: {
    id: number;
    attributes: {
      name: string;
      path: string;
      createdAt: Date;
      updatedAt: Date;
      publishedAt: Date;
    };
  }[];
};

export type CategoryType = {
  name: string;
  path: string;
  id: number;
};
