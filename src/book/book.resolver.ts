import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { BookSchema } from './schema/book.schema';
import { AddBookArgs } from './Args/AddBook.args';
import { UpdateBookArgs } from './Args/UpdateBook.args';

@Resolver((of) => BookSchema)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => String)
  indexBook(): string {
    return 'GraphQl Is Running in Book Resolver';
  }

  @Query(() => [BookSchema], { name: 'books' })
  getAllBooks() {
    return this.bookService.findAllBooks();
  }

  @Query(() => BookSchema, { name: 'getBookById' })
  getBookById(@Args({ name: 'bookId', type: () => Int }) id: number) {
    return this.bookService.findBookById(id);
  }

  @Mutation(() => String, { name: 'deleteBook' })
  deleteBookById(@Args({ name: 'bookId', type: () => Int }) id: number) {
    return this.bookService.deleteBookById(id);
  }

  @Mutation(() => String, { name: 'addBook' })
  addBook(
    @Args({ name: 'addBook', type: () => AddBookArgs }) addbook: AddBookArgs,
  ) {
    return this.bookService.addBook(addbook);
  }

  @Mutation(() => String, { name: 'updateBook' })
  updateBook(
    @Args({ name: 'updateBook', type: () => UpdateBookArgs })
    updatebook: UpdateBookArgs,
  ) {
    return this.bookService.addBook(updatebook);
  }
}
