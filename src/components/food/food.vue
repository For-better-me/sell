<template>
  <transition name="toleft">
    <div class="food" ref="food" v-show="showFood">
      <div class="food-content">
        <div class="image-header">
          <img :src="chooseFood.image" />
          <div class="back" @click = "showFood = false">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{chooseFood.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{chooseFood.sellCount}}份</span>
            <span class="rating">好评率{{chooseFood.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{chooseFood.price}}</span><span class="old" v-show="chooseFood.oldPrice">￥{{chooseFood.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="chooseFood"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy"  v-show="!chooseFood.count || chooseFood.count===0"  @click.stop.prevent= "addFirst">
              加入购物车
            </div>
          </transition>
        </div>
        <split v-show="chooseFood.info"></split>
        <div class="info" v-show="chooseFood.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{chooseFood.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :desc="desc"
                        :ratings="chooseFood.ratings" @ratingsfilter= "ratingsfilter" @toggle= "toggle" :onlyContent= "onlyContent" :selectedType = "selectType"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="chooseFood.ratings && chooseFood.ratings.length">
              <li v-for="rating in chooseFood.ratings"
                  class="rating-item border-1px" v-show = "needShow(rating.rateType,rating.text)">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime |formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show= "!chooseFood.ratings || !chooseFood.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol';
  import ratingselect from '../ratingselect/ratingselect';
  import split from '../split/split';
  import Vue from 'vue';
  export default {
    name: 'food',
    components: {
      cartcontrol, ratingselect, split
    },
    props: {
      chooseFood: {
        type: Object
      }
    },
    data() {
      return {
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        },
        selectType: 2,
        onlyContent: false,
        showFood: false
      };
    },
    destroyed() {
      console.log('00');
    },
    methods: {
      ratingsfilter(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.foodScroll.refresh();
        });
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === 2) {
          return true;
        } else {
          return this.selectType === type;
        }
      },
      toggle() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.foodScroll.refresh();
        });
      },
      show() {
        this.selectType = 2;
        this.onlyContent = false;
        this.showFood = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.foodScroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.foodScroll.refresh();
          }
        });
        console.log(this.selectType, this.onlyContent);
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        Vue.set(this.chooseFood, 'count', 1);
        console.log('click');
      }
    }
  };
</script>

<style>
  .food {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 48px;
      z-index: 30;
      width: 100%;
      background: #fff;
      transform: translate3d(0, 0, 0);
  }
  .food .image-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
  }
  .food .image-header img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
  }
  .food .image-header .back {
      position: absolute;
      top: 10px;
      left: 0;
      color: #fff;
  }
  .food .content {
      position: relative;
      padding: 18px;
  }
  .food .content .title {
      line-height: 14px;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 700;
      color: #07111b;
  }
  .food .content .detail {
      margin-bottom: 18px;
      line-height: 10px;
      height: 10px;
      font-size: 0;
  }
  .food .content .detail .sell-count, .food .content .detail .rating {
    font-size: 10px;
    color: #93999f;
  }
  .food .content .detail .sell-count {
      margin-right: 12px;
  }
  .food .rating {
      padding-top: 18px;
  }
  .food .content .price {
      font-weight: 700;
      line-height: 24px;
  }
  .food .content .price .now {
      margin-right: 8px;
      font-size: 14px;
      color: #f01414;
  }
  .food .content .price .old {
      text-decoration: line-through;
      font-size: 10px;
      color: #93999f;
  }
  .food .content .cartcontrol-wrapper {
      position: absolute;
      right: 12px;
      bottom: 12px;
  }
  .food .content .buy {
      position: absolute;
      right: 18px;
      bottom: 18px;
      z-index: 10;
      height: 24px;
      line-height: 24px;
      padding: 0 12px;
      box-sizing: border-box;
      border-radius: 12px;
      font-size: 10px;
      color: #fff;
      background: #00a0dc;
    }
  .food .info {
      padding: 18px;
  }
  .food .info .title {
      line-height: 14px;
      margin-bottom: 6px;
      font-size: 14px;
      color: #07111b;
  }
  .food .info .text {
      line-height: 24px;
      padding: 0 8px;
      font-size: 12px;
      color: #4d555d;
  }
  .food .rating {
      padding-top: 18px;
  }
  .food .rating .title {
      line-height: 14px;
      margin-left: 18px;
      font-size: 14px;
      color: #07111b;
  }
  .food .rating .rating-wrapper {
      padding: 0 18px;
  }
  .food .rating .rating-wrapper .rating-item {
      position: relative;
      padding: 16px 0;
  }
  .food .rating .rating-wrapper .no-rating {
      padding: 16px 0;
      font-size: 12px;
      color: #93999f;
  }
  .food .rating .rating-wrapper .rating-item .user {
    position: absolute;
    right: 0;
    top: 16px;
    line-height: 12px;
    font-size: 0;
}
.food .rating .rating-wrapper .rating-item .user .name {
    display: inline-block;
    margin-right: 6px;
    vertical-align: top;
    font-size: 10px;
    color: #93999f;
}
.food .rating .rating-wrapper .rating-item .time {
    margin-bottom: 6px;
    line-height: 12px;
    font-size: 10px;
    color: #93999f;
}
.food .rating .rating-wrapper .rating-item .text {
    line-height: 16px;
    font-size: 12px;
    color: #07111b;
}
.food .rating .rating-wrapper .rating-item .text .icon-thumb_up {
    color: #00a0dc;
}
.food .rating .rating-wrapper .rating-item .text .icon-thumb_up, .food .rating .rating-wrapper .rating-item .text .icon-thumb_down {
    margin-right: 4px;
    line-height: 16px;
    font-size: 12px;
}
.food .rating .rating-wrapper .rating-item:after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(7,17,27,0.1);
    content: ' ';
}
.food .rating .rating-wrapper .rating-item .text .icon-thumb_down {
    color: #93999f;
}
.toleft-enter,.toleft-leave-active{
  transform: translate3d(100%, 0, 0)
}
.toleft-enter-active,.toleft-leave-active{
  transition: all 0.2s linear;
}
.food .rating .rating-wrapper .rating-item .user .avatar {
    border-radius: 50%;
}
.food .image-header .back .icon-arrow_lift {
    display: block;
    padding: 10px;
    font-size: 20px;
    color: #fff;
}
</style>