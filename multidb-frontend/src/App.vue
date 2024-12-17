<script>
import Header from "./components/HeaderComponent.vue";
export default{
    components:{
        Header,
    }
}

</script>

<template>
    <Header></Header>
    <router-view>

    </router-view>
</template>