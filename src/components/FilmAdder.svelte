<script>
    import GraphQLHelper from "../helpers/GraphQLHelper";
    import {GraphQLRequests} from "../helpers/GraphQLRequests";
    import Message from "./Message.svelte";
    import {getContext} from "svelte";
    import { isLoading, modal } from '../store';
    import { bind } from 'svelte-simple-modal';
    import MessageBox from './Message.svelte';

    const {open} = getContext('simple-modal');

    let title = '';
    let country = '';
    let year = '';

    function resetValues(){
        title = '';
        country = '';
        year = '';
    }

    async function handleClick() {
        try {
            isLoading.update(n => n + 1);
            await GraphQLHelper.startExecuteMyMutation(GraphQLRequests.MUTATION_InsertFilm(title, country, year));
            open(Message, {message: "Success!"})
            resetValues();
        } catch (exception) {
            modal.set(bind(MessageBox, { message: ("Error: " + exception.message)}));
        } finally {
            isLoading.update(n => n - 1);
        }
    }
</script>

<div>
    <label>
        Title <input bind:value={title}>
    </label>
    <label>
        Country <input bind:value={country}>
    </label>
    <label>
        Year <input bind:value={year}>
    </label>
    <button on:click={handleClick}>Add Film</button>
</div>

<style>
    div {
        align-self: center;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 75%;
    }

    button {
        background-color: var(--element-background);
        color: var(--button-text);
        border: 2px solid var(--main-color);
    }

    button:hover {
        background-color: var(--main-color);
        color: var(--button-text-hover);
    }

    @media (max-width: 640px) {
        div {
            flex-direction: column;
            align-items: stretch;
        }
        button, input{
            width: 100%;
        }
    }
</style>
