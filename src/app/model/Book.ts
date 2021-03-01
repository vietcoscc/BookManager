import { logging } from 'protractor';

export class Book {
  id: number | null = null;
  name: string = '';
  description: string = '';
  author: string | null = '';
  imageUrl: string | null = '';
  deletedAt: string | null = '';
  lastUpdatedAt: string | null = '';
}
