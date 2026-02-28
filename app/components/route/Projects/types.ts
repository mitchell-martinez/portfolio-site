export interface Project {
  id: string;
  name: string;
  url: string;
  description: string;
  longDescription: string;
  tags: string[];
  highlight: string;
  fullWidth?: boolean;
  image?: {
    src: string;
    alt: string;
  };
}
