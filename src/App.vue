<template>
  <div class="main">
    <Top :seller = 'seller'></Top>
    <div class="body">
        <div class="menuTab">
            <router-link to="/goods">商品</router-link>
            <router-link to="/ratings">评价</router-link>
            <router-link to="/seller">商家</router-link>
        </div>
        <keep-alive>
          <router-view :seller = 'seller'></router-view>
        </keep-alive>
    </div>
  </div>
</template>
<script>
  import goods from './components/goods/goods';
  import seller from './components/seller/seller';
  import ratings from './components/ratings/ratings';
  import Top from './components/header/header';

  // Vue.use(Router);
  export default{
    name: 'app',
    data() {
      return {
        seller: {}
      };
    },
    components: {
        goods, seller, ratings, Top
    },
    mounted: function() {
      this.$nextTick(function() {
        this.$http.get('/api/seller').then((res) => {
            this.seller = res.body.data;
        });
      });
    }

 };
</script>

<style>
  @import './common/stylus/base.css';
  @import './common/stylus/style.css';
  .menuTab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: rgba(7,17,27,0.1) solid 1px;
  }
  .menuTab>a{
    flex-grow:1;
    font-size: 14px;
    color:rgb(77,85,93);
    text-align: center;
  }
   .menuTab>a.active{
    color: #ff0000
   }
</style>
