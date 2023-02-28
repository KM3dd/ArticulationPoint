//Width and height
var svgWidth = 800;
var svgHeight = 300;
var circleRadius = 10;
//Original data
// var dataset = {
//     nodes: [
//         { name: "Adam" },
//         { name: "Bob" },
//         { name: "Carrie" },
//         { name: "Donovan" },
//         { name: "Edward" },
//         { name: "Felicity" },
//         { name: "George" },
//         { name: "Hannah" },
//         { name: "Iris" },
//         { name: "Jerry" }
//     ],
//     edges: [
//         { source: 0, target: 1 },
//         { source: 0, target: 2 },
//         { source: 0, target: 3 },
//         { source: 0, target: 4 },
//         { source: 1, target: 5 },
//         { source: 2, target: 5 },
//         { source: 2, target: 5 },
//         { source: 3, target: 4 },
//         { source: 5, target: 8 },
//         { source: 5, target: 9 },
//         { source: 6, target: 7 },
//         { source: 7, target: 8 },
//         { source: 8, target: 9 }
//     ]
// };
var edges
var nodes
var nodes_text


 function startSimulation(dataset){
    console.log(dataset.edges)
    var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d,i) {
        return i;
    }).distance(50))
    .force("charge", d3.forceManyBody().strength(-100 ))
    .force("center", d3.forceCenter(svgWidth / 2,svgHeight / 2));

    var colors = d3.scaleOrdinal(d3.schemeCategory10);

//Create SVG element
var svg = d3.select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


 edges = svg.append('g')
    .attr('class','links')
    .selectAll("line")
    .data(dataset.edges)
    .enter()
    .append("line");


 node = svg.append('g')
    .attr('class','nodes')
    .selectAll('circle')
    .data(dataset.nodes)
    .enter()
    .append("circle")
    .attr("r", circleRadius)
    .attr('fill',function (d,i) {
        return colors(i)
    })
    .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

 nodes_text = svg.selectAll(".nodetext")
    .data(dataset.nodes)
    .enter()
    .append("text")
    .attr("class", "nodetext slds-text-heading--label")
    .attr("text-anchor", "middle")
    .attr("dx", -20)
    .attr("dy", 20)
    .text(function(d) {
        return  d.name;
    });
//    });
simulation
    .nodes(dataset.nodes)
    .on("tick", ticked);
simulation
    .force("link")
    .links(dataset.edges);
     }
function ticked() {
    edges
            .attr("x1", function (d) {
                var xPos = d.source.x;
                if (xPos < 0) return 0;
                if (xPos > (svgWidth - circleRadius)) return (svgWidth - circleRadius);
                return xPos;
            })
            .attr("y1", function (d) {
                var yPos = d.source.y;
                if (yPos < 0) return 0;
                if (yPos > (svgHeight - circleRadius)) return (svgHeight - circleRadius);
                return yPos;
            })
            .attr("x2", function (d) {
                var xPos = d.target.x;
                if (xPos < 0) return 0;
                if (xPos > (svgWidth - circleRadius)) return (svgWidth - circleRadius);
                return xPos;
            })
            .attr("y2", function (d) {
                var yPos = d.target.y;
                if (yPos < 0) return 0;
                if (yPos > (svgHeight - circleRadius)) return (svgHeight - circleRadius);
                return yPos;
            });

    node
            .attr("cx", function (d) {
                var xPos = d.x;
                if (xPos < 0) return 0;
                if (xPos > (svgWidth - circleRadius)) return (svgWidth - circleRadius);
                return xPos;
            })
            .attr("cy", function (d) {
                var yPos = d.y;
                if (yPos < 0) return 0;
                if (yPos > (svgHeight - circleRadius)) return (svgHeight - circleRadius);
                return yPos;
            });

    nodes_text
            .attr("x", function(d) {
                var xPos = d.x;
                if (xPos < 0) return 0;
                if (xPos > (svgWidth - circleRadius)) return (svgWidth - circleRadius);
                return xPos;
            })
            .attr("y", function(d) {
                var yPos = d.y;
                if (yPos < 0) return 0;
                if (yPos > (svgHeight - circleRadius)) return (svgHeight - circleRadius);
                return yPos;
            });
}
function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}