<template>
	<section id="wrapper" class="error-page">
        <div class="error-box">
            <div class="error-body text-center">
                <h1>404</h1>
                <h3 class="text-uppercase">Oops! There is something wrong!</h3>
                <p class="text-muted m-t-30 m-b-30">The page you have requested is either moved away or doesn't exist.</p>
                <router-link to="/home" class="btn btn-info btn-rounded waves-effect waves-light m-b-40">Back to home</router-link> </div>
        </div>
    </section>
</template>

<script>
    export default {
        mounted() {
        }
    }
</script>