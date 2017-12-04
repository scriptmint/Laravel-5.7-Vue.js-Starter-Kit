<template>
    <div id="main-wrapper">
        <app-header></app-header>
        <app-sidebar></app-sidebar>

        <div class="page-wrapper">
            <div class="container-fluid">
                <router-view></router-view>
                <app-right-sidebar></app-right-sidebar>
            </div>
        	<app-footer></app-footer>
        </div>
    </div>
</template>


<script>
    import AppHeader from './header.vue'
    import AppSidebar from './sidebar.vue'
    import AppFooter from './footer.vue'
    import AppRightSidebar from './right-sidebar.vue'
    import helper from '../services/helper'
    export default {
        methods : {
            notification(){
                toastr.options = {
                    "positionClass": "toast-top-right"
                };

                $('[data-toastr]').on('click',function(){
                    var type = $(this).data('toastr'),message = $(this).data('message'),title = $(this).data('title');
                    toastr[type](message, title);
                });
            },
            getAuthUser(name){
                return this.$store.getters.getAuthUser(name);
            }
        },
        components: {
            AppHeader, AppSidebar, AppFooter, AppRightSidebar
        },
        mounted() {
            $('body').addClass("fix-header fix-sidebar card-no-border");
            $("body").trigger("resize");
            $(".fix-header .topbar").stick_in_parent();
            $('.scroll-sidebar').slimScroll({
                position: 'left'
                , size: "5px"
                , height: '100%'
                , color: '#dcdcdc'
            });
            $('.message-scroll').slimScroll({
                position: 'right'
                , size: "5px"
                , height: '570'
                , color: '#dcdcdc'
            });

            if(!this.getAuthUser('email')){
                helper.authUser().then(response => {
                    this.$store.dispatch('setAuthUserDetail',{
                        first_name: response.profile.first_name,
                        last_name: response.profile.last_name,
                        email: response.user.email,
                        avatar:response.profile.avatar
                    });
                });
            }
        }
    }
</script>
