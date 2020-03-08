using Graphql_Dotnet_React_Relay.Domain.Model;
using System.Collections.Generic;

namespace Graphql_Dotnet_React_Relay.Domain.Service
{
    public interface IBookService
    {
        List<Book> GetAll();
        Book GetById(string id);
        List<Book> DeleteById(string id);
        Book Update(UpdateBookInput book);
        Book Add(AddBookInput book);
    }
}
