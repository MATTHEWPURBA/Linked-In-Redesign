// queries/getUserProfile.js

import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query FindUserById($findUserByIdId: ID!) {
    findUserById(id: $findUserByIdId) {
      _id
      name
      username
      email
      password
      profilePicture
      posts {
        _id
        content
        tags
        imgUrl
        authorId
        createdAt
        updatedAt
        author {
          _id
          name
          username
          email
          profilePicture
        }
      }
    }
  }
`;
