<template>
  <RouterView></RouterView>
</template>
<script lang="ts" setup>

import {useUsersStore} from "@/store/user.ts";

const store = useUsersStore()
console.log(store)
</script>
<style>
html, body, #app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  min-width: 1000px;
}

.bg-white {
  background-color: #fff;
}

.search {

}

.search
.el-input__wrapper {
  background-color: #efefef;
}

.button-ok {
  background-color: #02bc77;
  color: #fff;
}

</style>
<style scoped>

</style>
