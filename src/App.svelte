<script>
    import {ApolloClient, InMemoryCache} from '@apollo/client';
    import {WebSocketLink} from "@apollo/client/link/ws";
    import {setClient, subscribe} from "svelte-apollo";
    import {GraphQLRequests} from "./helpers/GraphQLRequests";
    import Table from './components/Table.svelte'


    function createApolloClient() {
        const wsLink = new WebSocketLink({
            uri: "wss://webdev-labs.herokuapp.com/v1/graphql",
            options: {
                reconnect: true,
            },
        });
        const cache = new InMemoryCache();
        return new ApolloClient({
            link: wsLink,
            cache,
        });
    }

    const client = createApolloClient();
    setClient(client);
    const films = subscribe(GraphQLRequests.SUBSCRIPTION_AllFilms);

</script>

<main>
    <h1>What to Watch</h1>
    <Table films={films}/>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #f44336;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>