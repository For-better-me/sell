<template>
    <div class="header">
       <div class="avatar">
           <img :src="seller.avatar" alt="">
       </div> 
       <div class="content">
           <div class="name">
               <img src="./brand@2x.png" alt="">
               <p>{{seller.name}}</p>
           </div>
           <p class="description">{{seller.description}} / {{seller.deliveryTime}}分钟送达</p>
           <div class="supports" v-if='seller.supports'>
                <span :class="supportType[seller.supports[0].type]"></span>
                <p>{{seller.supports[0].description}}</p>
                <span class="detail" @click='detailShow=true'>{{seller.supports.length}}个></span>
           </div>
       </div>
       <div class="notice">
           <img src="./bulletin@3x.png" alt="">
           <p>{{seller.bulletin}}</p>
           <i class="icon-keyboard_arrow_right" @click='detailShow=true'></i>
       </div>
       <div class="bg">
           <img :src="seller.avatar" alt="">
       </div>
       <transition name= 'fade'>
       <div class="detail-wrapper" v-show="detailShow">
           <div class="detail-content clearfix">
               <div class="detail-main">
                   <h1>{{seller.name}}</h1>
                   <div class="star-wrapper">
                     <star :score='seller.score' size='48'></star>
                   </div>
                   <div class="benefit-wrapper">
                     <div class="title">
                       <div class="line"></div>
                       <p>优惠信息</p>
                       <div class="line"></div>
                     </div>
                     <ul v-if='seller.supports'>
                       <li v-for='item in seller.supports'>
                         <span :class="supportType[item.type]"></span>
                         <p>{{item.description}}</p>
                       </li>
                     </ul>
                   </div>
                   <div class="bulletin-wrapper">
                     <div class="title">
                       <div class="line"></div>
                       <p>商家公告</p>
                       <div class="line"></div>
                     </div>
                     <p>{{seller.bulletin}}</p>
                   </div>
               </div>
           </div>
           <div class="detail-close">
               <i class="icon-close" @click='detailShow=false'></i>
           </div>
       </div>
       </transition>
    </div>
</template>
<script type="text/ecmascript-6">
    import star from '../star/star';
    export default{
        props: ['seller'],
        components: {
          star
        },
        data() {
            return {
                supportType: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
                detailShow: false
            };
        }
    };
</script>
<style>
   .header{
      width: 100%;
      height: 134px;
      position: relative;
      background: rgba(7,17,27,0.5);
      overflow: hidden;
   }
   .header .avatar{
      display: inline-block;
      vertical-align: top;
      width: 64px;
      height: 64px;
      margin:24px 15px auto 24px;
      font-size: 0;
   }
   .header .avatar>img{width: 100%;}
   .header .content{
        display: inline-block;
        vertical-align: top;
   }
   .header .content .name{
        margin-top: 26px;
   }
   .header .content .name>img{
        display: inline-block;
        width: 30px;
        height: 18px;
   }
   .header .content .name>p{
        display: inline-block;
        font-size: 16px;
        color: #fff;
        font-weight: 600;
        vertical-align: top;
        margin-left: 6px;
   }
   .header .content .description{
        font-size: 12px;
        color: #fff;
        line-height: 24px;
        font-weight: 200
   }
   .header .content .supports{}
   .header .content .supports>span{
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: top;
   }
   .header .content .supports>span.decrease{
        background: url(decrease_2@2x.png) no-repeat;
        background-size: 16px 16px;
   }
   .header .content .supports>span.discount{
        background: url(discount_2@2x.png) no-repeat;
        background-size: 16px 16px;
   }
   .header .content .supports>span.invoice{
        background: url(invoice_2@2x.png) no-repeat;
        background-size: 16px 16px;
   }
   .header .content .supports>span.guarantee{
        background: url(guarantee_2@2x.png) no-repeat;
        background-size: 16px 16px;
   }
   .header .content .supports>span.special{
        background: url(special_2@2x.png) no-repeat;
        background-size: 16px 16px;
   }
   .header .content .supports>p{
        font-size: 10px;
        color: #fff;
        display: inline-block;
        vertical-align: top;
        margin-left: 4px;
        line-height: 16px;
   }
   .header .content .supports .detail{
        display: inline-block;
        width: 40px;
        height: 24px;
        border-radius: 7px;
        vertical-align: top;
        font-size: 10px;
        color: #fff;
        line-height: 24px;
        text-align: center;
        background: rgba(0,0,0,0.2);
        position: absolute;
        right: 12px;
   }
   .header .notice{
        width: 100%;
        height: 28px;
        background: rgba(7,17,27,0.2);
        position: absolute;
        left: 0;
        bottom: 0;
   }
   .header .notice>img{
        width: 33px;
        height: 18px;
        margin:5px 4px auto 12px;
   }
   .header .notice>p{
        font-size: 10px;
        line-height: 28px;
        color: #fff;
        white-space: nowrap;
        display: inline-block;
        vertical-align: top;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 78%;
   }
   .header .notice>i{
        font-size: 20px;
       color: #fff;
   }
   .header .bg{
        position: absolute;
        left: 0;
        bottom: 0;
        top: 0;
        right: 0;
        z-index: -1
   }
   .header .bg>img{
        width: 100%;
        height: 100%;
        filter: blur(10px);
   }
   .detail-wrapper{
        position: fixed;
        top: 0;
        width: 100%;
        left: 0;
        height: 100%;
        background: rgba(7,17,27,0.8);
        overflow: auto;
        transition: opacity .5s;
        backdrop-filter: blur(10px);
        z-index: 99;
   }
   .detail-wrapper .detail-main{
        padding-bottom: 64px;
        margin-top: 64px;
   }
   .detail-wrapper .detail-content{
        min-height: 100%;
        width: 100%;
   }
   .detail-wrapper .detail-close{
        margin-top: -64px;
        height: 32px;
        width: 100%;
   }
   .detail-wrapper .detail-close .icon-close{
        font-size: 32px;
        color: #fff;
        text-align: center;
        display: block;
   }
   .detail-main{
      width: 81%;
      margin:0 auto;
      color: #fff;
   }
   .detail-main>h1{
    font-size: 16px;
    text-align: center;
    font-weight: 700;
   }
   .detail-main .benefit-wrapper{
    margin-top: 28px;
   }
   .detail-main .title{
     width: 100%;
     display: flex;
     justify-content: space-between;
   }
   .detail-main .title .line{
      height: 1px;
      background: rgba(255,255,255,0.2);
      flex-grow: 1;
      margin-top: 8px;

      
   }
  
   .detail-main .title>p{
      font-size: 15px;
      font-weight: 700;
      padding: 0 12px;
     
   }
   .detail-main .benefit-wrapper>ul{
    margin-left: 12px;
    margin-top: 24px;
   }
   .detail-main .benefit-wrapper>ul>li{
    margin-bottom: 12px;

   }
   .detail-main .benefit-wrapper>ul>li>span{
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: top;
   }
   .detail-main .benefit-wrapper>ul>li>span.decrease{
        background: url(decrease_2@2x.png) no-repeat;
        background-size: 16px 16px;
   }
   .detail-main .benefit-wrapper>ul>li>span.discount{
        background: url(discount_2@2x.png) no-repeat;
        background-size: 16px 16px;
   }
   .detail-main .benefit-wrapper>ul>li>span.invoice{
        background: url(invoice_2@2x.png) no-repeat;
        background-size: 16px 16px;
   }
   .detail-main .benefit-wrapper>ul>li>span.guarantee{
        background: url(guarantee_2@2x.png) no-repeat;
        background-size: 16px 16px;
   }
   .detail-main .benefit-wrapper>ul>li>span.special{
        background: url(special_2@2x.png) no-repeat;
        background-size: 16px 16px;
   }
   .detail-main .benefit-wrapper>ul>li>p{
       display: inline-block;
       vertical-align: top;
       font-size: 12px;
       line-height: 16px;
   }
   .detail-main .bulletin-wrapper{
      margin-top: 28px;
      margin-bottom: 20px;
   }
   .detail-main .bulletin-wrapper>p{
    font-size: 12px;
    line-height: 24px;
    margin-top: 24px;
    padding: 0 12px;
   }
   .star-wrapper{
    margin-top: 16px;
    text-align: center;
   }
   .fade-enter,.fade-leave-active{
    opacity: 0
   }
   .fade-enter-active, .fade-leave-active {
     transition: opacity .5s
   }
</style>