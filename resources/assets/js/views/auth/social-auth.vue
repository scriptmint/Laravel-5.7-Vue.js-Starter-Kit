<template>
    <section id="wrapper">
        <div class="login-register" style="background-image:url(/images/background/background.jpg);">
            <div class="login-box card">
            <div class="card-body">
                <h3 class="box-title m-b-20 text-center">Loging in...</h3>
                <div class="form-group m-b-0">
                    <div class="col-sm-12 text-center">
                    <p>Back to Login? <router-link to="/login" class="text-info m-l-5"><b>Sign In</b></router-link></p>
                    </div>
                </div>
            </div>
            <guest-footer></guest-footer>
          </div>
        </div>

    </section>
</template>

<script>
    import GuestFooter from '../../layouts/guest-footer.vue'
    export default {
        data() {
            return {}
        },
        components: {
            GuestFooter
        },
        mounted(){
            axios.post('/api/auth/social/token').then(response => {
                localStorage.setItem('auth_token',response.data.token);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('auth_token');
                toastr['success'](response.data.message);
                this.$router.push('/home')
            }).catch(error => {
                this.$router.push('/login');
            });
        },
        methods: {
        }
    }
</script>
