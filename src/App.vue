<template>

<div>
    <button @click="add">HelloWorld {{acc}}</button>
</div>

</template>

<script setup>import { ref } from '@vue/reactivity';

let acc=ref(0);
function add(){
    acc.value++;
}
</script>