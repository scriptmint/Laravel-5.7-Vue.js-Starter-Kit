<template>
    <section id="wrapper">
        <div class="login-register" style="background-image:url(/images/background/background.jpg);">        
            <div class="login-box card">
            <div class="card-body">
                <h3 class="box-title m-b-20 text-center">Account Activation</h3>
                <h4 v-text="message" class="text-center m-t-20 m-b-20 alert alert-success" v-if="status"></h4>
                <h4 v-text="message" class="text-center m-t-20 m-b-20 alert alert-danger" v-else></h4>

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
            return {
                token:this.$route.params.token,
                message: 'Processing...',
                status: true
            }
        },
        components: {
            GuestFooter
        },
        mounted(){
            axios.get('/api/auth/activate/'+this.token).then(response =>  {
                this.message = response.data.message;
            }).catch(error => {
                this.message = error.response.data.message;
                this.status = false;
            });
        }
    }
</script>