const url = "/data/HPCharactersDataRaw.json";

d3.json(url).then(function(data) {
    console.log(data);

    //Initialize Gryffindor Students List
    let gryffindor = [data[0]];
    
    //Add Students to the empty list wwho are listed as in Gryffindor
    for(let i = 0; i < data.length; i++){
        if(data[i].School == "Hogwarts - Gryffindor"){
            gryffindor.push(data[i]);
        }
    }
    //Display Array
    console.log(gryffindor);
    

    //Intialize plots
    function init() {

        //Table Creation
        for(let i = 0;i < 10; i++){
            let row = d3.select("#people_count_body").append('tr');
            row.attr('class', 'row_'+ String(i));
            row.append('th').text(gryffindor[i].Name);
            row.append('th').text(gryffindor[i].Gender);
            row.append('th').text(gryffindor[i].Profession);
        };

        //Data for question 1 male vs female (Below is sample of needed values for bubble)
        let male = gryffindor.filter(d => d.Gender == "Male");
        let female = gryffindor.filter(d => d.Gender == "Female");

        let trace1 = {
        x: ["Male", "Female"],
        y: [male.length, female.length],
        type: "bar",
        name: "Gryffindor",
        marker: {
            color: "red"
        }
        };

        
        //Format the graph
        let layout = {
            title: "Gender Distribution in Gryffindor",
            xaxis: {
              title: "Gender"
            },
            yaxis: {
              title: "Number of Students"
            },
            showlegend: true
          };
          
        
        //Plot Question 1 Graph
        Plotly.newPlot("maleVsFemale", [trace1], layout);

        //Data for question 2 popular professions (Below is a sample of needed values for a horizontal bar chart)
        let data2 = [{
            //x-values
            x: sample_values,
            //y-values
            y: otu_ids,
            //what data you want displayed and the format when hovering over bars in the graph
            hovertemplate: '<b>OTU ID</b>: %{y}<br>' +
                        '<b>Value</b>: %{x}<br>' +
                        '<b>%{text}</b>',
            //Text to display on hover over            
            text: otu_labels,
            //Type of graph
            type: "bar",
            //makes it horizontal
            orientation:"h"
        }];
        //Format the graph
        let layout2 ={
            width: 700
        }
        //Plot Professions Graph
        Plotly.newPlot("professions", data2, layout2);

    };

    d3.selectAll("#selDataset").on("change", updatePlotly);

    // This function is called when a dropdown menu item is selected
    function updatePlotly() {
        // Use D3 to select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        let dataset = dropdownMenu.property("value");        
    
        // restyle horizontal bar
        Plotly.restyle("bar", "x", [sample_values]);
        Plotly.restyle("bar", "y", [otu_ids]);
        Plotly.restyle("bar", "text", [otu_labels]);

        //restyle bubble graph
        Plotly.restyle("bubble", "x", [data.samples[name_value].otu_ids]);
        Plotly.restyle("bubble", "y", [data.samples[name_value].sample_values]);
        Plotly.restyle("bubble", "marker.size", [data.samples[name_value].sample_values]);
        Plotly.restyle("bubble", "marker.color", [data.samples[name_value].otu_ids]);
        Plotly.restyle("bubble", "text", [data.samples[name_value].otu_labels]);
    }
    
    init();

});

