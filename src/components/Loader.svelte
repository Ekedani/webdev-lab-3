<script>
    import {Circle} from 'svelte-loading-spinners'
</script>
<div class="loader">
    <Circle color="#f44336"/>
</div>

<style>
    .loader {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: var(--overlay-color);
    }
</style>
