<template>
    <section id="wrapper">
        <div class="login-register" style="background-image:url(/images/background/background.jpg);">
            <div class="login-box card">
            <div class="card-body">
                <form class="form-horizontal form-material" id="registerform" @submit.prevent="submit">
                    <h3 class="box-title m-b-20">Sign Up</h3>
                    <div class="form-group ">
                        <div class="col-xs-6">
                            <input type="text" name="first_name" class="form-control" placeholder="First Name" v-model="registerForm.first_name">
                        </div>
                    </div>
                    <div class="form-group ">
                        <div class="col-xs-6">
                            <input type="text" name="last_name" class="form-control" placeholder="Last Name" v-model="registerForm.last_name">
                        </div>
                    </div>
                    <div class="form-group ">
                        <div class="col-xs-12">
                            <input type="text" name="email" class="form-control" placeholder="Email" v-model="registerForm.email"> </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-12">
                            <input type="password" name="password" class="form-control" placeholder="Password" v-model="registerForm.password"> </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-12">
                            <input type="password" name="password_confirmation" class="form-control" placeholder="Confirm Password" v-model="registerForm.password_confirmation"> </div>
                    </div>
                    <div class="form-group text-center m-t-20">
                        <div class="col-xs-12">
                            <button class="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" type="submit">Register</button>
                        </div>
                    </div>
                    <div class="form-group m-b-0">
                        <div class="col-sm-12 text-center">
                            <p>Already have an account? <router-link to="/login" class="text-info m-l-5"><b>Sign In</b></router-link></p>
                        </div>
                    </div>
                </form>
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
                registerForm: {
                    email: '',
                    password: '',
                    password_confirmation: '',
                    first_name: '',
                    last_name: ''
                }
            }
        },
        components: {
            GuestFooter
        },
        mounted(){
        },
        methods: {
            submit(e){
                axios.post('/api/auth/register', this.registerForm).then(response =>  {
                    toastr['success'](response.data.message);
                    this.$router.push('/login');
                }).catch(error => {
                    toastr['error'](error.response.data.message);
                });
            }
        }
    }
</script>
