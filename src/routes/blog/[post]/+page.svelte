<script>
    export let data;
</script>

<article>
    <title>Blog - {data.title}</title>
    <h1>{data.title}</h1>
    <p>Published: {data.date}</p>
    <svelte:component this={data.content}/>
</article>