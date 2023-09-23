const url = "/templates/data/HPCharactersDataRaw.json";

//const url = "http://127.0.0.1:5000/jsonify/";

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


         // graph for question 3 
 
        let muggle = [];
        let muggleborn = [];
        let halfblood = [];
        let pureblood = [];
        let unknown = [];
        let other = [];
      
        for (let i = 0;i < gryffindor.length; i++){
            if (gryffindor[i].Blood === "Muggle"){
               muggle.push(gryffindor[i].Blood);
             }
             else if (gryffindor[i].Blood === "Muggle-born"){
              muggleborn.push(gryffindor[i].Blood);
             }
             else if (gryffindor[i].Blood === "Half-blood"){
                 halfblood.push(gryffindor[i].Blood);
             }
             else if (gryffindor[i].Blood === "Pure blood"){
                 pureblood.push(gryffindor[i].Blood);
             }
             else if (gryffindor[i].Blood === "Unknown"){
                 unknown.push(gryffindor[i].Blood);
             }
             else {
                 other.push(gryffindor[i].Blood);
             }
        }
        var statusBubble = {
            x: [1, 2, 3, 4, 5, 6],
            y: [muggle.length, muggleborn.length, halfblood.length, pureblood.length, unknown.length, other.length],
            text: ['Muggles', 'Muggle-borns', 'Half-bloods', 'Pure bloods', 'Unknown', 'Other'], 
            mode: 'markers',
            marker: {
                size: [muggle.length, muggleborn.length, halfblood.length, pureblood.length, unknown.length, other.length], 
                color: [muggle.length, muggleborn.length, halfblood.length, pureblood.length, unknown.length, other.length],
                sizeref: 0.37
            }
       };
       
       var data = [statusBubble];
       
       var bubbleLayout = {
         title: 'Blood Status',
         showlegend: false,
         height: 600,
         width: 600, 
         xaxis: {
             tickmode: Array,
             tickvals: [1, 2, 3, 4, 5, 6], 
             ticktext: ['Muggles', 'Muggleborns', 'Half-Bloods', 'Pure-bloods', 'Unknowns', 'Others'], 
             tickangle: -45
         },
         yaxis: {title: "Number of Students"}
       };
       
       Plotly.newPlot('bloodStatus', data, bubbleLayout);

    };

    d3.selectAll("#selDataset").on("change", updatePlotly);

    // This function is called when a dropdown menu item is selected
    function updatePlotly() {
        // Use D3 to select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        let value = dropdownMenu.property("value");        
        
        //blank array for containing house data
        let house_data = [];

        //assign correct users
        for(let i = 0; i < data.length; i++){
            if(data[i].School == value){
                house_data.push(data[i]);
            }
        }

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

