import { logging } from 'protractor';

export interface Book {
  id: number;
  name: string;
  desciption: string;
  imageUrl: string;
  deletedAt: string;
  lastUpdatedAt: string;
}
