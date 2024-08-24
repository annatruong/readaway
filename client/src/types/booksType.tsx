export type BookListItem = {
  id: string;
  selfLink: string;
  title: string;
  authors: string;
  publisher: string;
  publishedDate: string | null;
  shortDescription: string;
  thumbnailImage: string | null;
};
