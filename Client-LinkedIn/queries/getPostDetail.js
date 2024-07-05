import { gql } from "@apollo/client";

export const GET_POSTDETAIL = gql`
  query FindPostById($findPostByIdId: ID!) {
    findPostById(id: $findPostByIdId) {
      _id
      content
      tags
      imgUrl
      authorId
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
`;

