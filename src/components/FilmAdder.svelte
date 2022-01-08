<script>
    import GraphQLHelper from "../helpers/GraphQLHelper";
    import {GraphQLRequests} from "../helpers/GraphQLRequests";
    import Message from "./Message.svelte";
    import {getContext} from "svelte";
    import { isLoading, modal } from '../store';
    import { bind } from 'svelte-simple-modal';
    import MessageBox from './Message.svelte';

    const {open} = getContext('simple-modal');

    const defaultValue = '';

    let title = defaultValue;
    let country = defaultValue;
    let year = defaultValue;

    function resetValues(){
        title = defaultValue;
        country = defaultValue;
        year = defaultValue;
    }

    async function handleClick() {
        try {
            isLoading.update(n => n + 1);
            // I also have these check on hasura, it's just additional safety for not sending invalid requests
            if(!title || !year){
                throw Error("Title and year fields must be filled!");
            }
            if(!Number.isInteger(+year) || +year <= 0 || +year >= 10000){
                throw Error("Year must be integer from 1 to 9999!");
            }
            await GraphQLHelper.startExecuteMyMutation(GraphQLRequests.MUTATION_InsertFilm(title, country, year));
            open(Message, {message: "Success!"})
            resetValues();
        } catch (exception) {
            modal.set(bind(MessageBox, { message: ("Error: " + exception.message)}));
        } finally {
            console.log("Done!");
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
