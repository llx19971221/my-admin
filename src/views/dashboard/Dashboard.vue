<template>
    <div id="test"></div>
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
        }
    },
    mounted() {
        this.init();
    }
}
</script>