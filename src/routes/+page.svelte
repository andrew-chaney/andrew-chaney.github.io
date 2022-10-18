<script>
    import Center from '$lib/components/Center.svelte';
    import image from '$lib/images/me.jpg';
</script>

<title>Andrew Chaney</title>

<Center>
    <div class="hero bg-base">
        <div class="hero-content flex-col lg:flex-row-reverse">
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img src={image} class="max-w-sm rounded-lg shadow-2xl" alt="Looks like my picture isn't here right now... sorry." />
            <div>
                <h1 class="text-4xl md:text-5xl font-bold">Hi there, I'm Andrew.</h1>
                <p class="py-6">
                    I am a student pursuing a Bachelor's in Computer Science with a focus on systems and security at CU Boulder.
                    In my free time you can find me working on personal projects, riding the local trails, or spending time with my
                    wife, cats, and friends.
                    <br/><br/>
                    Want to get to know me more? Check out my blog or reach out with the button below.
                </p>
                <a class="btn btn-outline" href="/contact">Get in touch</a>
            </div>
        </div>
    </div>
</Center>