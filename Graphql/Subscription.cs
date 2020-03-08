using Graphql_Dotnet_React_Relay.Domain.Model;
using HotChocolate.Subscriptions;

namespace Graphql_Dotnet_React_Relay.Graphql
{
    public class Subscription
    {
        public Book OnBookAdded(
            IEventMessage message
            )
        {
            return (Book)message.Payload;
        }
    }

    public class OnBookAddedMessage
    : EventMessage
    {
        public OnBookAddedMessage(Book book)
            : base("onBookAdded", book)
        {
        }

    }
}
