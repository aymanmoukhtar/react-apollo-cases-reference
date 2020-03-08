import React, { memo } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const UPDATE_BOOK = gql`
  mutation UpdateBookMutation($book: UpdateBookInput!) {
    updateBook(book: $book) {
      id
      title
    }
  }
`;

const Book = ({ book }) => {
    const [updateBook] = useMutation(UPDATE_BOOK);
    return (
        <li>
            <div style={{ margin: 10 }}>
                <div style={{ width: 500, display: 'flex', justifyContent: 'space-between', height: 30 }}>
                    <span>{book.title}</span>
                    <button
                        onClick={() => updateBook({ variables: { book: { id: book.id, title: `${book.title} Updated!` } } })}
                    >
                        Update
                    </button>
                </div>
            </div>
        </li>
    );
};

export default memo(Book);