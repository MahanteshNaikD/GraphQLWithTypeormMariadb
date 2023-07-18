
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AddBookArgs {
    title: string;
    price: number;
}

export interface UpdateBookArgs {
    id: number;
    title: string;
    price: number;
}

export interface BookSchema {
    id: number;
    title: string;
    price: number;
}

export interface IQuery {
    index(): string | Promise<string>;
    securedResource(): string | Promise<string>;
    logIn(email: string, password: string): string | Promise<string>;
    indexBook(): string | Promise<string>;
    books(): BookSchema[] | Promise<BookSchema[]>;
    getBookById(bookId: number): BookSchema | Promise<BookSchema>;
}

export interface IMutation {
    deleteBook(bookId: number): string | Promise<string>;
    addBook(addBook: AddBookArgs): string | Promise<string>;
    updateBook(updateBook: UpdateBookArgs): string | Promise<string>;
}

type Nullable<T> = T | null;
