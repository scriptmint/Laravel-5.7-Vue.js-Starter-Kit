<template>
    <div>
    	<router-view></router-view>
    </div>
</template>

<script>
    export default {
        mounted() {
            $('body').removeClass('fix-header fix-sidebar card-no-border');
            $('body').addClass('fix-header card-no-border');
        },
        destroyed(){
        }
    }
</script>