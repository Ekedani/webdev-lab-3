<script>
    import { ApolloClient, InMemoryCache } from '@apollo/client';
    import { WebSocketLink } from '@apollo/client/link/ws';
    import { setClient, subscribe } from 'svelte-apollo';
    import { GraphQLRequests } from './helpers/GraphQLRequests';
    import Table from './components/Table.svelte';
    import Modal, { bind } from 'svelte-simple-modal';
    import FilmAdder from './components/FilmAdder.svelte';
    import Loader from './components/Loader.svelte';
    import { isLoading, modal } from './store';
    import MessageBox from './components/Message.svelte';

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

    let films;
    let client;
    try{
        client = createApolloClient();
        setClient(client);
        films = subscribe(GraphQLRequests.SUBSCRIPTION_AllFilms);
    } catch (exception){
        modal.set(bind(MessageBox, { message: ("Error: " + exception.message)}));
    }

</script>

<main>
    <h1>What to Watch</h1>
    <Modal show={$modal}>
        <FilmAdder/>
        <Table films={films}/>
    </Modal>
    {#if $isLoading}
        <Loader/>
    {/if}
</main>

<style>
    :global(:root){
        --main-color: #f44336;
        --button-text: black;
        --button-text-hover: white;
        --element-background: white;
        --table-border-color: #ddd;
        --overlay-color: rgba(255,255,255,0.5);
    }

    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
    }

    h1 {
        color: var(--main-color);
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
