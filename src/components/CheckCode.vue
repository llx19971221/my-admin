<template>
    <canvas 
    @click="draw"
    class="cus-check" 
    ref="canvas">
        您的浏览器不支持canvas
    </canvas>
</template>
<script>
export default {
    name: "checkCode",
    props: {
        checkCode: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            num1: 0,
            num2: 0,
            width: 0,
            height: 0,
            ctx: null
        }
    },
    model: {
       prop: "checkCode",
       event: "changeCode"
    },
    methods: {
        init() {
            const [canvas, {draw}] = [this.$refs['canvas'], this];
            this.width = canvas.width = 150;
            this.height = canvas.height= 40;
            this.ctx = canvas.getContext("2d");
            draw();
        },

        draw() {
            const { randomNum, circleDraw, strokeText, ctx: context, width, height } = this;
            context.clearRect(0, 0, width, height);
            this.num1 = randomNum();
            this.num2 = randomNum();
            circleDraw();
            strokeText();
        },

        circleDraw() {
            const { ctx: context, width, height, randomColor } = this;
            let num = 3;
            let radius = 6;
            for(let i = 0 ;i < num ; i++) {
                let x = Math.random() * (width - 2 * radius) + radius;
                let y = Math.random() * (height - 2 * radius) + radius;
                context.beginPath();
                context.restore();
                
                context.strokeStyle = randomColor();
                context.arc(x, y, radius, 0, Math.PI * 2, false);
                context.stroke();
                context.closePath();
            }
        },

        strokeText() {
            const { ctx: context, randomColor, getResult, width, height, num1, num2 } = this;
            context.beginPath();
            let gradient = context.createLinearGradient(0, 0, width, 0);
            gradient.addColorStop(0, randomColor())
            gradient.addColorStop(0.5, randomColor())
            gradient.addColorStop(1, randomColor())
            context.textAlign='center';
            context.textBaseline='middle';
            context.strokeStyle = gradient;
            context.lineWidth = 2;
            context.font='32px STHeiTi';
            let result = getResult(num1, num2);
            context.strokeText(result + '= ?', width / 2, height / 1.8);
            context.closePath();
        },

        //得到结果，返回字符
        getResult(num1, num2) {
            let flag = ['+', '-', '*'].sort(() => Math.random() - 0.5)[0];
            let str = `${num1} ${flag} ${num2}`;
            this.$emit("changeCode", eval(str));
            return str.replace("*", 'x');
        },

        randomNum() {
            return Math.floor(Math.random() * 10 + 1);
        },

        randomColor() {
            return `rgb(
            ${Math.ceil(Math.random() * 255)}, 
            ${Math.ceil(Math.random() * 255)},
            ${Math.ceil(Math.random() * 255)}
            )`;
        },
    },
    mounted() {
        this.init();
    }
}
</script>
<style lang="less" scoped>
.cus-check {
    margin-left: 5px;
    cursor: pointer;
}
</style>