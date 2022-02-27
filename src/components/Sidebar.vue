<template>
  <div id="sidebar">
    <avatar></avatar>
    <div class="icons">
      <router-link to="/note" title="笔记"
        ><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-a-jibijilianxibianji"></use></svg
      ></router-link>
      <router-link to="/notebooks" title="笔记本"
        ><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-a-bijibenbiji"></use></svg
      ></router-link>
      <router-link to="/trash" title="回收站"
        ><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-huishouzhan"></use></svg
      ></router-link>
    </div>
    <div class="logout">
      <svg class="icon" aria-hidden="true" @click="onLogout">
        <use xlink:href="#icon-logout"></use>
      </svg>
    </div>
  </div>
</template>

<script scoped>
import avatar from "./Avatar.vue";
import { mapActions } from "vuex";
export default {
  components: {
    avatar,
  },
  methods: {
    ...mapActions(["logout"]),

    onLogout() {
      this.logout({ path: "/login" });
    },
  },
};
</script>

<style scoped>
.icon {
  width: 4em;
  height: 4em;
  margin: 15px 0 15px 0;
}
#sidebar {
  position: relative;
  min-width: 66px;
  text-align: center;
  background-color: #2c333c;
}

a {
  padding: 16px 0;
  display: block;
}

.icons .router-link-active {
  background-color: #9dcaf8;
}

.logout {
  position: absolute;
  margin-top: 400px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}
</style>
