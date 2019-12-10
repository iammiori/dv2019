var width = 1500,
    height = 1000,
    weight = 1;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.csv("./data/rh_clean_cnt.csv", function (data) {
    showCloud(data)
});
//scale.linear: 선형적인 스케일로 표준화를 시킨다.
//domain: 데이터의 범위, 입력 크기
//range: 표시할 범위, 출력 크기
//clamp: domain의 범위를 넘어간 값에 대하여 domain의 최대값으로 고정시킨다.
wordScale = d3.scale.linear().domain([0, 248]).range([0, 200]).clamp(false);
var fill = d3.scale.category20();
var svg = d3.select("svg")
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")



function showCloud(data) {
    d3.layout.cloud().size([width, height])
        //클라우드 레이아웃에 데이터 전달
        .words(data)
        .padding(1)
        //.rotate(funcion(d){return 0;})
        //.rotate(0)
        .rotate(function (d) {
            return d.text.length > 4 ? 0 : 0;
        })
        //스케일로 각 단어의 크기를 설정
        .fontSize(function (d) {
          //console.log(wordScale(d.frequency * weight ));
            return (d.freq * weight );
        })
        //클라우드 레이아웃을 초기화 > end이벤트 발생 > 연결된 함수 작동
        .on("end", draw)
        .start();

    function draw(words) {
        var cloud = svg.selectAll("text").data(words)
        //Entering words
        cloud.enter()
            .append("text")
            .style("font-family", "sans-serif")
            .style("fill-opacity", .5)
            .style("fill",function(d,i){return fill(i)})
            .attr("text-anchor", "middle")
            .attr('font-size', 1)
            .text(function (d) {
                return d.text;
            });

        cloud
            .transition()
            .style("font-size", function (d) {
                return d.size + "px";
            })
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("fill-opacity", 1);

    }
}
