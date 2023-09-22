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
        let data1 = [{
            x: data.samples[0].otu_ids,
            y: data.samples[0].sample_values,
            mode: 'markers',
            marker: {
                color: data.samples[0].otu_ids,
                size: data.samples[0].sample_values
            },
            hovertemplate: '<i>OTU ID</i>: %{x}<br>' +
                        '<b>Value</b>: %{y}<br>' +
                        '<b>%{text}</b>',
            text: data.samples[0].otu_labels,
            type: 'scatter'
        }];
        
        //Format the graph
        let layout1 ={
            width: 700
        }
        
        //Plot Question 1 Graph
        Plotly.newPlot("maleVsFemale", data1, layout1);

        //Data for question 2 popular professions (Below is a sample of needed values for a horizontal bar chart)
        let data2 = [{
            
            x: count_of_professional,
            y: professional,
            hovertemplate: '<b>OTU ID</b>: %{y}<br>' +
                        '<b>Value</b>: %{x}<br>' +
                        '<b>%{text}</b>',           
            text: otu_labels,
            type: "bar",
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

