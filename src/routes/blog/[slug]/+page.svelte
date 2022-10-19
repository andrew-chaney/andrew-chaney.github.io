<script>
    export let data;
</script>

<title>Blog - {data.title}</title>
<article class="prose container">
    <h1 class="text-4xl md:text-5xl">{data.title}</h1>
    <p class="post-date">Published: {data.date}</p>
    <svelte:component this={data.content}/>
</article>

<style>
    article {
        margin-left: 5%;
        margin-right: 5%;
        margin-bottom: 4em;
        max-width: 95vw;
        width: fit-content;
        overflow-x: hidden;
        overflow-wrap: normal;
    }

    h1 {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        font-weight: bold;
        line-height: 1.25;
        color: #313131;
    }
    
    .post-date {
        display:block;
        margin-top:-.5rem;
        margin-bottom:1rem;
        color:#9a9a9a
    }
</style>