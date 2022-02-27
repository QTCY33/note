<template>
  <span :title="username">{{ slug }}</span>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data() {
      return {}
    },

    created() {
      this.setUser()
    },

    methods: {
      ...mapActions({
        'setUser': 'checkLogin'
      })
    },

    computed: {
      ...mapGetters([
        'username',
        'slug'
        ])
    }
  }
</script>

<style scoped>
span {
  display: inline-block;
  width: 35px;
  height: 35px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin: 15px 0 15px 0;
}
</style>
