<template>
    <div>
         <div class="goods">
            <div class="menu-wrapper" ref = 'menuwrapper'>
                <ul>
                    <li v-for = '(item,index) in goods' :class="{'current':currentIndex===index}" @click="chooseMenu(index, $event)">
                        <span>
                            <b v-show = 'item.type>0' :class = 'supportType[item.type]'></b>
                        {{item.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="good-wrapper" ref = 'goodwrapper'>
                <ul>
                    <li v-for = 'item in goods' class="food-list-hook" ref = 'goodList'>
                        <h1>{{item.name}}</h1>
                        <ul>
                            <li v-for= 'food in item.foods'  @click="chooseFood(food,$event)">
                                <img :src="food.icon" alt="">
                                <div class="food-info">
                                    <h2>{{food.name}}</h2>
                                    <p v-if = 'food.description'>{{food.description}}</p>
                                    <p><span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span></p>
                                    <div class="price">
                                        <strong><b>￥</b>{{food.price}}</strong>
                                        <del v-if = 'food.oldPrice'>￥{{food.oldPrice}}</del>
                                    </div>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cart-control :food = 'food'></cart-control>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <shop-cart :seller = 'seller'  :cartFoods = 'selectFood'></shop-cart>
        </div>
        <food :chooseFood= "choosedFood" ref= "food"></food>
    </div>

</template>
<script>
    import BScroll from 'better-scroll';
    import cartControl from '@/components/cartControl/cartControl';
    import food from '../food/food';
    import shopCart from '../shopCart/shopCart';
    export default{
        name: 'goods',
        components: {cartControl, shopCart, food},
        props: ['seller'],
        data: function() {
            return {
                goods: [],
                supportType: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
                listHeight: [],
                posY: 0,
                choosedFood: {}
            };
        },
        mounted: function() {
          this.$nextTick(function() {
            this.$http.get('/api/goods').then((res) => {
                this.goods = res.body.data;
                this.$nextTick(function() {
                   this._initScroll();
                   this.calcHeight();
                });
            });
          });
        },
        methods: {
            _initScroll() {
                this.menuScroll = new BScroll(this.$refs.menuwrapper, {
                    click: true
                });
                this.foodScroll = new BScroll(this.$refs.goodwrapper, {
                    click: true,
                    probeType: 3
                });
                this.foodScroll.on('scroll', (pos) => {
                  this.posY = Math.abs(Math.round(pos.y));
                });
            },
            calcHeight() {
                let foodList = this.$refs.goodwrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < foodList.length; i++) {
                    height += foodList[i].clientHeight;
                    this.listHeight.push(height);
                }
            },
            chooseMenu(index, event) {
                if (!event._constructed) {
                    return;
                }
                let goodList = this.$refs.goodList;
                let el = goodList[index];
                this.foodScroll.scrollToElement(el, 300);
            },
            chooseFood(food, event) {
                if (!event._constructed) {
                    return;
                }
                this.choosedFood = food;
                this.$refs.food.show();
            }
        },
        computed: {
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if (!height2 || (this.posY >= height1 && this.posY < height2)) {
                        return i;
                    }
                }
                return 0;
            },
            selectFood() {
                let selectedFood = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            selectedFood.push(food);
                        }
                    });
                });
                return selectedFood;
            }
        }
    };
</script>
<style type="text/stylus">
    @import '../../common/stylus/goods.css';
</style>