using Graphql_Dotnet_React_Relay.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Graphql_Dotnet_React_Relay.Domain.Service
{
    public class BookService : IBookService
    {
        private List<Book> _books = new List<Book>
        {
            new Book {Id = Guid.NewGuid().ToString(), Title = "The Order Of the Pheonix"},
            new Book {Id = Guid.NewGuid().ToString(), Title = "Sorcerer's Stone"},
            new Book {Id = Guid.NewGuid().ToString(), Title = "Prisoner Of Azkaban"},
            new Book {Id = Guid.NewGuid().ToString(), Title = "Half Blood Prince"},
            new Book {Id = Guid.NewGuid().ToString(), Title = "Deathly Hallows"}
        };

        public List<Book> GetAll() => _books;

        public Book GetById(string id) => _books.FirstOrDefault(_ => _.Id == id);
        public List<Book> DeleteById(string id)
        {
            _books.Remove(
                _books.FirstOrDefault(_ => _.Id == id)
                );

            return _books;
        }

        public Book Update(UpdateBookInput book)
        {
            Book currentBook = null;
            for (int i = 0; i < _books.Count; i++)
            {
                currentBook = _books[i];

                if (currentBook.Id != book.Id)
                {
                    continue;
                }

                currentBook.Title = book.Title;
                break;
            }

            return currentBook;
        }

        public Book Add(AddBookInput book)
        {
            var newBook = new Book { Id = Guid.NewGuid().ToString(), Title = book.Title };

            _books.Add(newBook);
            return newBook;
        }
    }
}
