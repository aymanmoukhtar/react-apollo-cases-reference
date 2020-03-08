import React, { useEffect } from 'react';
import { gql, NetworkStatus } from 'apollo-boost';
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks';
import Books from './Books';

const HOME_QUERY = gql`
query {
  clientState @client {
    extendedTitle
    newlyAddedBook
  }
  allBooks {
    id
    title
  }
}
`;

const ADD_BOOK_MUTATION = gql`
    mutation AddBookMutation($book: AddBookInput) {
        addBook(book: $book) {
          id
          title
        }
    }
`;

const BOOK_ADDED_SUBSCRIPTION = gql`
  subscription onBookAddedSubscription {
    onBookAdded {
      id
      title
      }
    }
`;

const Home = () => {
  const { data, networkStatus, subscribeToMore } = useQuery(HOME_QUERY);
  const [addBook] = useMutation(ADD_BOOK_MUTATION);

  useEffect(
    () => {
      // This have a very specific common usecase which is updating a query on the UI based on subscription data
      // Pretty useful and it doesn't require dealing with the store
      // Just return the data needed based on the previous passed data
      subscribeToMore({
        document: BOOK_ADDED_SUBSCRIPTION,
        updateQuery: ({ allBooks }, { subscriptionData: { data: { onBookAdded: newBook } } }) => ({
          allBooks: [...allBooks, newBook]
        })
      })
    },
    []
  );

  useSubscription(
    BOOK_ADDED_SUBSCRIPTION,
    {
      onSubscriptionData: ({ client, subscriptionData: { data: { onBookAdded } } }) => {
        client.writeData({
          data: {
            clientState: {
              __typename: 'ClientState',
              newlyAddedBook: `
              {
                id: ${onBookAdded.id}
                title: ${onBookAdded.title}
              }
              `
            }
          }
        });
        /* 
          The below code also could be used to update the store based on subscription data 
          but it requires dealing with the store directly, so it's better used for updating local state
          or real-time updates than are unrelated to the notification data
        */
        // const { allBooks } = client.readQuery({ query: HOME_QUERY });
        // client.writeQuery({
        //   query: HOME_QUERY,
        //   data: {
        //     allBooks: [...allBooks, onBookAdded]
        //   }
        // });
      }
    }
  );

  if (networkStatus === NetworkStatus.refetch || networkStatus === NetworkStatus.loading) {
    return <div>Loading</div>;
  }

  return (
    <div style={{ marginLeft: -60, width: 1252, display: 'flex', justifyContent: 'space-around', alignContent: 'center' }}>
      <div>
        <h1>Hello, GraphQL! {data.clientState.extendedTitle}</h1>
        <Books books={data.allBooks} />
      </div>
      {data.clientState.newlyAddedBook && <pre>
        {data.clientState.newlyAddedBook}
      </pre>}
      <button onClick={() => addBook({ variables: { book: { title: "Added!" } } })} style={{ height: 30 }}>Add Book</button>
    </div>
  );
};

export default Home;