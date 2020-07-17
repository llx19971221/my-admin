<template>
    <!-- <div id="test"></div> -->
	<div id="test2"></div>
</template>
<script>
export default {
    methods: {
        init() {
            const {$d3: d3} = this;
            var width = 300;
        	var height = 300;
        	var svg = d3.select("#test")
        				.append("svg")
        				.attr("width",'100%')
        				.attr("height",'100%');
            console.dir(d3)
        	var index = [0,1,2,3,4];
        	var color = ["red","blue","green","yellow","black"];
        	var ordinal = d3.scaleOrdinal()
        					.domain(index)
        					.range(color);
        					
        	var dataset = [1.2,2.3,0.9,1.5,3.3];

        	var min = d3.min(dataset);
        	var max = d3.max(dataset);
        	var linear = d3.scaleLinear()
        				   .domain([0,max])
        				   .range([0,1600]);
        	var rectHeight = 25;
        	svg.selectAll("rect")
        	   .data(dataset)
        	   .enter()
        	   .append("rect")
        	   .attr("x",20)
        	   .attr("y",function(d,i){
        	   	return i*rectHeight;
        	   })
        	   .attr("width",function(d){
        	   	return linear(d);
        	   })
        	   .attr("height",rectHeight-5)
        	   .attr("fill",function(d,i){
        	   	return ordinal(i);
        	   });

                // console.dir(d3.axisBottom(linear))
            var axis = d3.axisBottom(linear).tickSize(10).ticks(5);//刻度数量
		
            svg.append("g")
        	    .attr("class","axis")
        	    .attr("transform","translate(20,130)")
        	    .call(axis);
        },

		init2() {
			const {$d3: d3} = this;
			let svg = d3.select("#test2").append("svg")
			.attr("width", 1000)
			.attr("height", 400);

			let dataArr = [30, 45, 37, 54, 55, 61, 20];
			
			svg.selectAll("rect")
			.data(dataArr)
			.enter().append("rect")
			.attr("class", 'bar')
			.attr("height", (num) => {
				return num + '%'
			})
			.attr('width', 100)
			.attr("x", (num, idx) => {
				return idx * 100 + 20 * idx
			})
			.attr("y", (num, idx) => {
				return 400 - num / 100 * 400;
			})

			svg.selectAll('text')
			.data(dataArr)
			.enter().append('text')
			.text((n) => n)
			.attr("class", 'test2-text')
			.attr("x", (num, idx) => {
				return idx * 100 + 20 * idx + 40
			})
			.attr("y", (num, idx) => {
				return 400 - num / 100 * 400 + 20;
			})



		}
    },
    mounted() {
        this.init2();
    }
}
</script>
<style lang="less">
.bar {
  fill: #0080FF;
  stroke: black;
  stroke-width: 5;
  &:hover {
	fill: red;
  }
}

.test2-text {
	fill: white;
  	font-family: sans-serif
}
</style>