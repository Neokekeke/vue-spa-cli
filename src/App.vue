<template>
  <div class="msg">{{msg}}</div>
</template>

<script>
export default {
  name: "vue-project",
  data() {
    return {
      msg: "this is a vue project"
    };
  }
};
</script>

<style>
@import url('./index.less');
</style>