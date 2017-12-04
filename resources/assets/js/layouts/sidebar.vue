<template>
	<aside class="left-sidebar">
        <div class="scroll-sidebar">
            <div class="user-profile">
                <div class="profile-img"> <img :src="getAvatar" alt="user" /> </div>
                <div class="profile-text"> <a href="#" class="dropdown-toggle link u-dropdown" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">{{getAuthUserFullName()}}<span class="caret"></span></a>
                    <div class="dropdown-menu">
                        <router-link to="/profile" class="dropdown-item"><i class="fa fa-user"></i> Profile</router-link>
                        <div class="dropdown-divider"></div> <router-link to="/configuration" class="dropdown-item"><i class="fa fa-cogs"></i> Configuration</router-link>
                        <div class="dropdown-divider"></div> <a href="#" class="dropdown-item" @click.prevent="logout"><i class="fa fa-power-off"></i> Logout</a>
                    </div>
                </div>
            </div>
            <nav class="sidebar-nav">
                <ul id="sidebarnav">
                    <li>
                        <router-link to="/home" exact><i class="fa fa-home"></i> <span class="hide-menu">Home</span></router-link>
                    </li>
                    <li>
                        <router-link to="/blank" exact><i class="fa fa-user"></i> <span class="hide-menu">Blank Page</span></router-link>
                    </li>
                    <li>
                        <router-link to="/user" exact><i class="fa fa-users"></i> <span class="hide-menu">User</span></router-link>
                    </li>
                    <li>
                        <router-link to="/task" exact><i class="fa fa-tasks"></i> <span class="hide-menu">Task</span></router-link>
                    </li>
                    <li>
                        <router-link to="/anything" exact><i class="fa fa-exclamation-triangle"></i> <span class="hide-menu">Error Page</span></router-link>
                    </li>
                    <li>
                        <a href="#" @click.prevent="logout"><i class="fa fa-power-off"></i> <span class="hide-menu">Logout</span></a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="sidebar-footer">
            <router-link to="/configuration" class="link" data-toggle="tooltip" title="Configuration"><i class="fa fa-cogs"></i></router-link>
            <router-link to="/profile" class="link" data-toggle="tooltip" title="Profile"><i class="fa fa-user"></i></router-link>
            <a href="#" class="link" data-toggle="tooltip" title="Logout" @click.prevent="logout"><i class="fa fa-power-off"></i></a>
        </div>
    </aside>
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
                    this.$router.replace('/login')
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
