<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" :class= "{'active': selectedType===2}" @click= "selectType(2,$event)">{{desc.all}}<span
          class="count">{{ratings.length}}</span></span>
      <span class="block positive" :class= "{'active': selectedType===0}"  @click= "selectType(0,$event)">{{desc.positive}}<span
          class="count">{{positive.length}}</span></span>
      <span class="block negative" :class= "{'active': selectedType===1}"  @click= "selectType(1,$event)">{{desc.negative}}<span
          class="count">{{negative.length}}</span></span>
    </div>
    <div class="switch" :class= "{'on': onlyContent}" @click="toggleContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      },
      onlyContent: {
        default: false
      },
      selectedType: {
        type: Number,
        default: ALL
      }
    },
    data() {
      return {};
    },
    methods: {
      selectType(type, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedType = type;
        this.$emit('ratingsfilter', type);
      },
      toggleContent() {
        if (!event._constructed) {
          return;
        }
        this.$emit('toggle');
      }
    },
    computed: {
      positive() {
       return this.ratings.filter((rating) => {
          return rating.rateType === 0;
        });
      },
      negative() {
       return this.ratings.filter((rating) => {
          return rating.rateType === 1;
        });
      }
    }
  };
</script>

<style>
  .ratingselect{}
  .ratingselect .rating-type{
    padding: 18px 0;
    margin: 0 18px;
    border-bottom:rgba(7, 17, 27, 0.1) solid 1px;
    font-size: 0;
  }
  .ratingselect .rating-type .block{
    display: inline-block;
    padding: 8px 12px;
    margin-right: 8px;
    line-height: 16px;
    border-radius: 1px;
    font-size: 12px;
    color: rgb(77, 85, 93);
  }
  .ratingselect .rating-type .block.active{
    color: #fff;
  }
  .ratingselect .rating-type .block.positive{
    background: rgba(0, 160, 220, 0.2);
  }
  .ratingselect .rating-type .block.negative{
    background: rgba(77, 85, 93, 0.2);
  }
  .ratingselect .rating-type .positive.active{
    background: rgb(0, 160, 220);
  }
  .ratingselect .rating-type .negative.active{
    background: rgb(77, 85, 93);
  }
  .ratingselect .rating-type .block .count{
    margin-left: 2px;
    font-size: 8px;
  }
  .ratingselect .switch{
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    color: rgb(147, 153, 159);
    font-size: 0;
  }
  .ratingselect .switch.on .icon-check_circle{
    color: #00c850;
  }
  .ratingselect .switch .icon-check_circle{
    display: inline-block;
    vertical-align: top;
    margin-right: 4px;
    font-size: 24px;
  }
  .ratingselect .switch .text{
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
  }

</style>