<script>
    let title;
    let film;
    let year;
</script>

<div>
    <label>
        Title <input bind:value={title}>
    </label>
    <label>
        Film <input bind:value={film}>
    </label>
    <label>
        Year <input bind:value={year}>
    </label>
    <button>Add Film</button>
</div>

<style>
    div{
        align-self: center;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 75%;
    }
    button {
        background-color: white;
        color: black;
        border: 2px solid #f44336;
    }

    button:hover {
        background-color: #f44336;
        color: white;
    }

    @media (max-width: 900px) {
        div {
            flex-direction: column;
            align-items: stretch;
        }
    }
</style>
