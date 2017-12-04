<template>
    <header class="topbar">
        <nav class="navbar top-navbar navbar-expand-md navbar-light">
            <div class="navbar-header">
                <a class="navbar-brand" href="/">
                    <b>
                        <img src="/images/logo-icon.png" alt="home" class="dark-logo" />
                        <img src="/images/logo-light-icon.png" alt="home" class="light-logo" />
                    </b>
                    <span>
                     <img src="/images/logo-text.png" alt="home" class="dark-logo" />
                     <img src="/images/logo-light-text.png" class="light-logo" alt="home" /></span> </a>
            </div>
            <div class="navbar-collapse">
                <ul class="navbar-nav mr-auto mt-md-0 ">
                    <li class="nav-item"> <a class="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark" href="javascript:void(0)"><i class="fa fa-bars"></i></a> </li>
                    <li class="nav-item"> <a class="nav-link sidebartoggler hidden-sm-down text-muted waves-effect waves-dark" href="javascript:void(0)"><i class="icon-arrow-left-circle"></i></a> </li>
                </ul>
                <ul class="navbar-nav my-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-muted waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img :src="getAvatar" alt="user" class="profile-pic" /></a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <ul class="dropdown-user">
                                <li>
                                    <div class="dw-user-box">
                                        <div class="u-img"><img :src="getAvatar" alt="user"></div>
                                        <div class="u-text">
                                            <h4>{{getAuthUserFullName()}}</h4>
                                            <p class="text-muted">{{getAuthUser('email')}}</p><router-link to="/profile" class="btn btn-rounded btn-danger btn-sm">View Profile</router-link></div>
                                    </div>
                                </li>
                                <li role="separator" class="divider"></li>
                                <li><router-link to="/profile"><i class="fa fa-user"></i> My Profile</router-link></li>
                                <li role="separator" class="divider"></li>
                                <li><router-link to="/configuration"><i class="fa fa-cogs"></i> Configuration</router-link></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="#" @click.prevent="logout"><i class="fa fa-power-off"></i> Logout</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>

    import helper from '../services/helper'
    
    export default {
        mounted() {
        },
        methods : {
            logout(){
                helper.logout().then(() => {
                    this.$store.dispatch('resetAuthUserDetail');
                    this.$router.replace('/login');
                })
            },
            getAuthUserFullName(){
                return this.$store.getters.getAuthUserFullName;
            },
            getAuthUser(name){
                return this.$store.getters.getAuthUser(name);
            }
        },
        computed: {
            getAvatar(){
                return '/images/users/'+this.getAuthUser('avatar');
            }
        }
    }
</script>