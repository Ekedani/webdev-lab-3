import {gql} from "@apollo/client";

export class GraphQLRequests {
  static SUBSCRIPTION_AllFilms = gql`
  subscription AllFilms {
    Films {
      title
      country
      release_year
    }
  }`;

}