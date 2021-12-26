import { gql } from '@apollo/client';

export class GraphQLRequests {
    static SUBSCRIPTION_AllFilms = gql`
        subscription AllFilms {
            Films {
                title
                country
                release_year
                id
            }
        }
    `;

    static MUTATION_DeleteFilmById(id) {
        return `mutation MyMutation{
      delete_Films_by_pk(id: "${id}") {
        country
        id
        release_year
        title
      }
    }`;
    }
}
