import { Book } from './Book';


export interface BookResponse {
  status: string;
  message: string;
  body: Array<Book>;
}
