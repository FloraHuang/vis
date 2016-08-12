        var color_fill = d3.scale.category10();

        var w = 500, h = 500;
        var force=d3.layout.force()
        .size([w,h])
        .linkDistance(3000)
        .charge(-1000)
        .on("tick",tick);
        ;

        var drag = force.drag()
        .on("dragstart", dragstart);

        var svg = d3.select("body").append("svg")
        .attr("width", w)
        .attr("height", h);

        var link = svg.selectAll(".link"),
        node = svg.selectAll(".node");

        d3.json("JsonData/151-2013/151-2013 Cost/Changelog_JUNITCost.json",function(error, data)
        {
            if (error) throw error;

            var author_list = [];
            var author_relation =[];
            var segmentsArray = [];
            var currentSegID = 0;

            var changelog_text = data.changelog;

            console.log(changelog_text.length);

            var authorID = null, 
                command = null;

            for (var i=0; i <changelog_text.length; i++)
            {
                author_list =  check_new_author_assign_color(author_list,changelog_text[i][2]);
            }
            //changelog_text是一个数组，每个元素是一个数组，代表一个edit。
            //每个edit也都是一个数组，...[0]表示操作，...[1]表示时间戳，...[2]表示author
            // async.eachSeries(changelog_text, function (entry)
            // async.eachSeries(changelog_text, function()
            //     {
            //         console.log("hi~");
            //     });

            _.each(changelog_text, function(entry)
            	{
            		authorID = entry[2];
            		command = entry[0];
            		segmentsArray = analyzeEachEditInChangelog(command, authorID, currentSegID, segmentsArray, author_list, author_relation);
            	});

            //double check whether the segmentsArray is right
            for (var i = 0; i < segmentsArray.length; i++)            
            {
                if (segmentsArray[i].sindex > segmentsArray[i].eindex)
                    console.log("ERROR!!!");
                
                // if (segmentsArray[i].segStr.length > normalization)
                //     normalization = segmentsArray[i].segStr.length;
            }

            for(var i = 0; i<author_list.length; i++)
            {
                if (author_list[i].only_as === 1)
                    author_list.splice(i,1);
            }

            force.nodes(author_list).links(author_relation).start();

            link = link.data(author_relation)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width",function(d){return Math.floor(2*Math.log(1+d.count));})
            ;

            node = node.data(author_list)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", function(d){return d.other_edit;})
            .style("fill",function(d){return d.color;})
            .on("dblclick", dblclick)
            .call(drag);
        }); 

        function tick() {
          link.attr("x1", function(d) { 
            var temp =_.find(author_list, function(each)
            {
                return each.id === d.source;
            }
            );
            if (temp != "undefined")
                return temp.x; })
          .attr("y1", function(d) { var temp =_.find(author_list, function(each)
            {
                return each.id === d.source;
            }
            );
          if (temp != "undefined")
            return temp.y;})
          .attr("x2", function(d) { var temp =_.find(author_list, function(each)
            {
                return each.id === d.target;
            }
            );
          if (temp != "undefined")
            return temp.x; })
          .attr("y2", function(d) { var temp =_.find(author_list, function(each)
            {
                return each.id === d.target;
            }
            );
          if (temp != "undefined")
            return temp.y; });

          node.attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
      }

      function dblclick(d) {
          d3.select(this).classed("fixed", d.fixed = false);
      }

      function dragstart(d) {
          d3.select(this).classed("fixed", d.fixed = true);
      }