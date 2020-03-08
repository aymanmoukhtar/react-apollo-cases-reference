using Graphql_Dotnet_React_Relay.Domain.Model;
using Graphql_Dotnet_React_Relay.Domain.Service;
using HotChocolate;
using HotChocolate.Subscriptions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Graphql_Dotnet_React_Relay.Graphql
{
    public class Mutation
    {
        private IBookService _bookService;

        public Mutation(IBookService bookService)
        {
            _bookService = bookService;
        }

        public async Task<Book> AddBook(AddBookInput book, [Service] IEventSender eventSender)
        {
            var newBook = _bookService.Add(book);
            await eventSender.SendAsync(new OnBookAddedMessage(newBook));
            return newBook;
        }
        public List<Book> DeleteById(string id) => _bookService.DeleteById(id);

        public Book UpdateBook(UpdateBookInput book) => _bookService.Update(book);
    }
}
