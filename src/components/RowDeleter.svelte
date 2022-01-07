<script>
    import {GraphQLRequests} from '../helpers/GraphQLRequests'
    import GraphQLHelper from '../helpers/GraphQLHelper'
    import {getContext} from 'svelte';
    import Message from "./Message.svelte";
    import { isLoading, modal } from '../store';
    import { bind } from 'svelte-simple-modal';
    import MessageBox from './Message.svelte';

    const {open} = getContext('simple-modal');

    export let filmID;

    async function handleClick() {
        isLoading.set(true);
        try {
            await GraphQLHelper.startExecuteMyMutation(GraphQLRequests.MUTATION_DeleteFilmById(filmID));
            open(Message, {message: "Success!"})
        } catch (exception) {
            modal.set(bind(MessageBox, { message: ("Error: " + exception.message)}));
        }finally {
            isLoading.set(false);
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
