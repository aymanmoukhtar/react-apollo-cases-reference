using Graphql_Dotnet_React_Relay.Domain.Model;
using Graphql_Dotnet_React_Relay.Domain.Service;
using System.Collections.Generic;

namespace Graphql_Dotnet_React_Relay.Graphql
{
    public class Query
    {
        private IBookService _bookService;

        public Query(IBookService bookService)
        {
            _bookService = bookService;
        }

        public List<Book> AllBooks() => _bookService.GetAll();
        public Book BookById(string id) => _bookService.GetById(id);

    }
}
