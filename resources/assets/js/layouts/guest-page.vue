<template>
    <div>
    	<router-view></router-view>
    </div>
</template>

<script>
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
            }
        },
        mounted() {
        	$('body').removeClass('fix-header fix-sidebar card-no-border');
            this.notification();
        },
        destroyed(){
        }
    }
</script>