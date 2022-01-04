<script>
    import {ApolloClient, InMemoryCache} from '@apollo/client';
    import {WebSocketLink} from "@apollo/client/link/ws";
    import {setClient, subscribe} from "svelte-apollo";
    import {GraphQLRequests} from "./helpers/GraphQLRequests";
    import Table from './components/Table.svelte'
    import Modal from 'svelte-simple-modal';
    import FilmAdder from "./components/FilmAdder.svelte";

    function createApolloClient() {
        const wsLink = new WebSocketLink({
            uri: API_WS_ROOT,
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
    <FilmAdder/>
    <Modal>
        <Table films={films}/>
    </Modal>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
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
