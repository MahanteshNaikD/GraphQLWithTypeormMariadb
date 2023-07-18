import { Injectable } from '@nestjs/common';
import { BookEntity } from './entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddBookArgs } from './Args/AddBook.args';
import { UpdateBookArgs } from './Args/UpdateBook.args';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private bookEntity: Repository<BookEntity>,
  ) {}

  async findAllBooks(): Promise<BookEntity[]> {
    const books = await this.bookEntity.find();
    return books;
  }

  async findBookById(id: number): Promise<BookEntity> {
    const books = await this.bookEntity.findOne({
      where: [
        {
          id: id,
        },
      ],
    });
    return books;
  }

  async deleteBookById(id: number): Promise<string> {
    const books = await this.bookEntity.delete(id);
    return 'Delete Successfully';
  }

  async addBook(addBookArgs: AddBookArgs): Promise<string> {
    const book: BookEntity = new BookEntity();
    book.price = addBookArgs.price;
    book.title = addBookArgs.title;

    await this.bookEntity.save(book);

    return 'Book Saved Succesffully';
  }

  async updateBook(
    id: number,
    updateBookArgs: UpdateBookArgs,
  ): Promise<string> {
    const book = await this.bookEntity.findOne({
      where: [
        {
          id: updateBookArgs.id,
        },
      ],
    });
    book.price = updateBookArgs.price;
    book.title = updateBookArgs.title;

    await this.bookEntity.save(book);

    return 'Book Saved Succesffully';
  }
}
