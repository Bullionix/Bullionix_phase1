/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  uid: string,
  email: string,
  username?: string | null,
  bio?: string | null,
  ethAddress1?: string | null,
  ethAddress2?: string | null,
  ethAddress3?: string | null,
};

export type ModelUserConditionInput = {
  uid?: ModelStringInput | null,
  username?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  ethAddress1?: ModelStringInput | null,
  ethAddress2?: ModelStringInput | null,
  ethAddress3?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateUserInput = {
  uid?: string | null,
  email: string,
  username?: string | null,
  bio?: string | null,
  ethAddress1?: string | null,
  ethAddress2?: string | null,
  ethAddress3?: string | null,
};

export type DeleteUserInput = {
  email: string,
};

export type ModelUserFilterInput = {
  uid?: ModelStringInput | null,
  email?: ModelStringInput | null,
  username?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  ethAddress1?: ModelStringInput | null,
  ethAddress2?: ModelStringInput | null,
  ethAddress3?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    uid: string,
    email: string,
    username: string | null,
    bio: string | null,
    ethAddress1: string | null,
    ethAddress2: string | null,
    ethAddress3: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    uid: string,
    email: string,
    username: string | null,
    bio: string | null,
    ethAddress1: string | null,
    ethAddress2: string | null,
    ethAddress3: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    uid: string,
    email: string,
    username: string | null,
    bio: string | null,
    ethAddress1: string | null,
    ethAddress2: string | null,
    ethAddress3: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  email: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    uid: string,
    email: string,
    username: string | null,
    bio: string | null,
    ethAddress1: string | null,
    ethAddress2: string | null,
    ethAddress3: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  email?: string | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      uid: string,
      email: string,
      username: string | null,
      bio: string | null,
      ethAddress1: string | null,
      ethAddress2: string | null,
      ethAddress3: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ByUsernameQueryVariables = {
  username?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ByUsernameQuery = {
  byUsername:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      uid: string,
      email: string,
      username: string | null,
      bio: string | null,
      ethAddress1: string | null,
      ethAddress2: string | null,
      ethAddress3: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    uid: string,
    email: string,
    username: string | null,
    bio: string | null,
    ethAddress1: string | null,
    ethAddress2: string | null,
    ethAddress3: string | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    uid: string,
    email: string,
    username: string | null,
    bio: string | null,
    ethAddress1: string | null,
    ethAddress2: string | null,
    ethAddress3: string | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    uid: string,
    email: string,
    username: string | null,
    bio: string | null,
    ethAddress1: string | null,
    ethAddress2: string | null,
    ethAddress3: string | null,
  } | null,
};
