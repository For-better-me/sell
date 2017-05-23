<template>
    <div>
        <div class="shopcart">
            <div class="content">
                <div class="shopcart-l"   @click = "toggleList">
                    <div class="logo-wrapper">
                        <span class="icon-shopping_cart" :class = "{'highlight': totalCount > 0}"></span>
                        <b class="count" v-show= "totalCount > 0">{{totalCount}}</b>
                    </div>
                    <h1 class="price" :class = "{'highlight': totalPrice > 0}">￥{{totalPrice}}</h1>
                    <div class="line"></div>
                    <p>另需配送费￥{{seller.deliveryPrice}}</p>

                </div>
                <div class="shopcart-r" :class= "{'highlight': totalPrice >= seller.minPrice}">
                    <p  v-if= "totalPrice === 0">￥{{seller.minPrice}}起送</p>
                    <p  v-else-if= "totalPrice < seller.minPrice">还差￥{{seller.minPrice - totalPrice}}起送</p>
                    <p v-else @click= "pay">去结算</p>
                </div>
            </div>
            <transition name= "fold">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h1>购物车</h1>
                        <span @click= "empty">清空</span>
                    </div>
                    <div class="shopcart-list-wrapper" ref="cartList">
                        <ul>
                            <li v-for= "cartfood in cartFoods">
                                <p>{{cartfood.name}}</p>
                                <h2><b>￥</b>{{cartfood.price * cartfood.count}}</h2>
                                <div class="cartcontrol-wrapper">
                                    <cart-control :food = 'cartfood'></cart-control>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
            <transition name = "fade">
                <div class="bg_mask" v-show="listShow" @click= "listShow = false"></div>
            </transition>
        </div>
        
    </div>
</template>
<script type="text/javascript">
import cartControl from '../cartControl/cartControl';
import BScroll from 'better-scroll';
    export default{
        name: 'shopcart',
        components: {cartControl},
        props: {
            seller: {
                type: Object
            },
            cartFoods: {
                type: Array,
                default() {
                    return [
                    {
                        price: 10,
                        count: 3
                    }
                    ];
                }
            }

        },
        mounted() {
            this.$nextTick(() => {
                this.cartScroll = new BScroll(this.$refs.cartList, {
                    click: true
                });
            });
        },
        data() {
            return {
                listShow: false
            };
        },
        watch: {
            totalCount: function(val) {
                if (val === 0) {
                    this.listShow = false;
                }
                this.cartScroll.refresh();
            }
        },
        computed: {
            totalCount() {
                let num = 0;
                this.cartFoods.forEach((cartfood) => {
                    if (cartfood.count) {
                      num += cartfood.count;
                    }
                });
                return num;
            },
            totalPrice() {
                let price = 0;
                this.cartFoods.forEach((cartfood) => {
                    price = price + (cartfood.price * cartfood.count);
                });
                return price;
            }
        },
        methods: {
            toggleList() {
                if (this.totalCount === 0) {
                    return;
                } else {
                    this.listShow = !this.listShow;
                }
                this.$nextTick(() => {
                    this.cartScroll.refresh();
                });
            },
            empty() {
                this.cartFoods.forEach((cartfood) => {
                    cartfood.count = 0;
                });
            },
            pay() {
                window.alert('一共' + this.totalPrice + '元，你确定钱够？');
            }
        }
    };
</script>
<style type="text/css">
    .shopcart{
        position: fixed;
        left: 0;
        bottom: 0;
        height: 46px;
        width: 100%;
        color: rgba(255,255,255,0.4);
        z-index: 50;
    }
    .shopcart .content{
        display: flex;
        background: #141d27;
    }
    .shopcart .shopcart-l{
        flex-grow: 1;
        display: flex;
        align-content: center;
        line-height: 44px;
       
    }
    .shopcart .shopcart-l .logo-wrapper{
        width: 56px;
        height: 56px;
        border-radius: 50%;
        margin-left: 12px;
        margin-right: 12px;
        position: relative;
        top: -12px;
        z-index: 99;
        background: #141d27;
    }
    .shopcart .shopcart-l .logo-wrapper>span.icon-shopping_cart{
        font-size: 24px;
        width: 44px;
        height: 44px;
        background:#353b42;
        color: rgba(255,255,255,0.4);
        border-radius: 50%;
        display: block;
        line-height: 44px;
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin:auto;
    }
    .shopcart .shopcart-l .logo-wrapper>span.highlight{
        background: #00a0dc;
        color: #fff;
    }
    .shopcart .shopcart-l .logo-wrapper>b{
        position: absolute;
        font-size: 10px;
        color: #fff;
        height: 16px;
        border-radius: 16px;
        background: #ff0000;
        line-height: 16px;
        right: 0px;
        top:0px;
        min-width: 24px;
        text-align: center;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
    }
    .shopcart .shopcart-l .logo-wrapper .count{}
    .shopcart .shopcart-l .price{
        font-size: 16px;
        font-weight: 700;
    }
    .shopcart .shopcart-l .price.highlight{
        color: #fff;
    }
    .shopcart .shopcart-l .line{
        height: 20px;
        width: 1px;
        background: rgba(255,255,255,0.4);
        margin: 12px;
    }
    .shopcart .shopcart-l>p{
        font-size: 12px;
        font-weight: 200;
    }
    .shopcart .shopcart-r{
        width: 105px;
        background:#353b42;
    }
    .shopcart .shopcart-r.highlight{
        background: #00b43c;
    }
    .shopcart .shopcart-r>p{
        font-size: 12px;
        color: rgba(255,255,255,0.4);
        text-align: center;
        line-height: 46px;
        font-weight: 700;
        padding: 0 8px;
    }
    .shopcart .shopcart-r.highlight>p{
        color: #fff;
    }
    .shopcart-list{
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        width: 100%;
        transform: translate3d(0, -100%, 0);
    }
    .shopcart-list .list-header{
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7,17,27,0.1);
    }
    .shopcart-list .list-header>h1{
        float: left;
        font-size: 14px;
        color: #07111b;
    }
    .shopcart-list .list-header>span{
        float: right;
        font-size: 12px;
        color: #00a0dc;
    }
    .shopcart-list .shopcart-list-wrapper{
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background: #fff;
    }
    .shopcart-list .shopcart-list-wrapper>ul{}
    .shopcart-list .shopcart-list-wrapper>ul>li{
        padding: 12px 0;
        box-sizing: border-box;
        position: relative;
        border-bottom: #fafafa solid 1px;
    }
    .shopcart-list .shopcart-list-wrapper>ul>li>p{
        line-height: 24px;
        font-size: 14px;
        color: #07111b;
        display: inline-block;
    }
    .shopcart-list .shopcart-list-wrapper>ul>li>h2{
        position: absolute;
        right: 90px;
        bottom: 12px;
        line-height: 24px;
        font-size: 14px;
        font-weight: 700;
        color: #f01414;
    }
    .shopcart-list .shopcart-list-wrapper>ul>li>h2>b{}
    .fold-enter,.fold-leave-active{
        transform: translate3d(0, 0, 0);
    }
    .fold-enter-active,.fold-leave-active{
         transition: all 0.5s linear;
    }
    .shopcart-list .cartcontrol-wrapper{
        position: absolute;
        right: 0;
        bottom: 6px;
    }
    .bg_mask{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: -2;
        background: rgba(7,17,27,0.6);
    }
    .fade-enter,.fade-leave-active{
        opacity: 0
    }
    .fade-enter-active,.fade-leave-active{
        transition: all 0.5s linear;
    }
</style>