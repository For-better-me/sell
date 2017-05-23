<template>
    <div :class="starType">
        <span v-for= 'item in itemClass' :class = 'item'></span>
    </div>
</template>
<script type="text/javascript">
    const length = 5;
    const CLS_ON = 'on';
    const CLS_OFF = 'off';
    const CLS_HALF = 'half';
    export default {
        props: ['score', 'size'],
        computed: {
            itemClass: function(argument) {
                let score = Math.floor(this.score * 2) / 2;
                let itemClassA = [];
                let hasDecimal = Math.floor(score) % 1;
                for (let i = 0; i < Math.floor(score); i++) {
                        itemClassA.push(CLS_ON);
                    }
                if (hasDecimal) {
                        itemClassA.push(CLS_HALF);
                    }
                while (itemClassA.length < length) {
                        itemClassA.push(CLS_OFF);
                    }
                return itemClassA;
            },
            starType() {
                return 'star-' + this.size;
            }
        }
    };
</script>
<style type="text/css">
    .star-48,.star-24,.star-32{
        font-size: 0;
        display: inline-block;
    }
    .star-48>span,.star-24>span,.star-32>span{
        display: inline-block;
        margin-right: 6px;
    }
    .star-48>span{
        width: 24px;
        height: 24px;
    }
    .star-32>span{
        width:16px;
        height:16px;
    }
    .star-24>span{
        width: 12px;
        height: 12px;
    }
    .star-48{
        height: 24px;
    }
    .star-32{
        height:16px;
    }
    .star-24{
        height: 12px;
    }
    .star-48>span.on,.star-32>span.on,.star-24>span.on{
        background: url(./star_on.png) no-repeat;
        background-size: 100%;
    }
    .star-48>span.half,.star-32>span.half,.star-24>span.half{
        background: url(./star_half.png) no-repeat;
        background-size: 100%;
    }
    .star-48>span.off,.star-32>span.off,.star-24>span.off{
        background: url(./star_off.png) no-repeat;
        background-size: 100%;
    }
</style>