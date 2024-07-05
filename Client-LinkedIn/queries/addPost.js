// queries/addPost.js

import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation AddPost($newPost: NewPost!) {
    addPost(newPost: $newPost) {
      _id
      content
      imgUrl
      authorId
      createdAt
      updatedAt
      tags
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      author {
        _id
        name
        username
        email
        profilePicture
      }
    }
  }
`;
