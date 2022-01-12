<script>
    import {GraphQLRequests} from '../helpers/GraphQLRequests'
    import GraphQLHelper from '../helpers/GraphQLHelper'
    import { isLoading, modal } from '../store';
    import { bind } from 'svelte-simple-modal';
    import Message from './Message.svelte';

    export let filmID;

    async function handleClick() {
        $isLoading++;
        try {
            await GraphQLHelper.startExecuteMyMutation(GraphQLRequests.MUTATION_DeleteFilmById(filmID));
            $modal = bind(Message, {message: "Success!"})
        } catch (exception) {
            $modal = bind(Message, { message: ("Error: " + exception.message)});
        }finally {
            $isLoading--;
        }
    }
</script>

    <button on:click={handleClick}>Delete</button>

<style>
    button {
        background-color: var(--element-background);
        color: var(--button-text);
        border: 2px solid var(--main-color);
    }

    button:hover {
        background-color: var(--main-color);
        color: var(--button-text-hover);
    }
</style>
