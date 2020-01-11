// tslint:disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($email: String!) {
  getUser(email: $email) {
    uid
    email
    username
    bio
    ethAddress1
    ethAddress2
    ethAddress3
  }
}
`;
export const listUsers = `query ListUsers(
  $email: String
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUsers(
    email: $email
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      uid
      email
      username
      bio
      ethAddress1
      ethAddress2
      ethAddress3
    }
    nextToken
  }
}
`;
export const byUsername = `query ByUsername(
  $username: String
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  byUsername(
    username: $username
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      uid
      email
      username
      bio
      ethAddress1
      ethAddress2
      ethAddress3
    }
    nextToken
  }
}
`;
