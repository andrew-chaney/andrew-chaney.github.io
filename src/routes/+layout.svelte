<script>
import Header from '$lib/components/Header.svelte';
import Footer from '$lib/components/Footer.svelte';
import '$lib/styles/style.css';
import '$lib/styles/app.postcss';
</script>

<body>

<Header />

<slot />

<Footer />

</body>

<style>
    body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
</style>