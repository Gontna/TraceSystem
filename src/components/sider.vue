<template>
  <div class="w-1/1 h-1/1 flex flex-col justify-center items-start">
    <template v-for="(item) in menuList">
      <div class="w-1/1">
        <router-link :class="
             router.currentRoute.value.path.startsWith(item.route)?'active':'unactive'
          " :to="item.route" class="block w-1/1 h-1/1 p-2 text-center ">
          <i :class="item.icon,{
            'active': router.currentRoute.value.path.startsWith(item.route)
          }"
             class='iconfont mx-2 item-center'/>
          <slot :item="item" name="default">
            {{ item }}
          </slot>
        </router-link>
      </div>
    </template>
    <div class="flex-1"></div>
  </div>

</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {reactive} from "vue";

const router = useRouter()
const menuList = reactive([
  {text: '账号管理', icon: "icon-a-08", route: '/system/account', iconCustom: false},
  {text: '产品管理', icon: "icon-a-02", route: '/system/product', iconCustom: false},
  {text: '上传管理', icon: "icon-a-04", route: '/system/upload', iconCustom: false},
  {text: '仓库管理', icon: "icon-a-05", route: '/system/warehouse', iconCustom: false},
  {text: '运营商管理', icon: "icon-a-06", route: '/system/shop', iconCustom: false},

])
</script>


<style scoped>
.active {
  color: #337ecc;
  background: #d9ecff;
}

.unactive {
  color: #c8cad1;
}
</style>