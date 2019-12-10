

var svg1 = d3.select("svg"),
            margin1 = 200,
            width1 = svg.attr("width") - margin1,
            height1 = svg.attr("height") - margin1


var xScale = d3.scaleBand().range([0, width]).padding(0.4),
            yScale = d3.scaleLinear().range([height, 0]);

var g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("data/user_high.csv", function(error, data) {
        if (error) {
            throw error;
        }

        xScale.domain(data.map(function(d) { return d.name; }));
        yScale.domain([0, d3.max(data, function(d) { return d.review_count; })]);

        g.append("g")
         .attr("transform", "translate(0," + height1 + ")")
         .call(d3.axisBottom(xScale))
         .selectAll("text")
           .style("text-anchor","end")
           .attr("dx","-.8em")
           .attr("dy",".15em")
           .attr("transform","rotate(-65)")


        g.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return  d;
         }).ticks(10));



        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.name); })
         .attr("y", function(d) { return yScale(d.review_count); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height1 - yScale(d.review_count); });



    });
