//const url = "/templates/data/HPCharactersDataRaw.json";

const url = "http://127.0.0.1:5000/jsonify/";

d3.json(url).then(function(data) {
    console.log(data);

    //Initialize Gryffindor Students List
    let gryffindor = [];
    
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
            row.append('th').text(gryffindor[i].Name).attr('class','row_'+ String(i)+'_name');
            row.append('th').text(gryffindor[i].Gender).attr('class','row_'+ String(i)+'_gender');
            row.append('th').text(gryffindor[i].Profession).attr('class','row_'+ String(i)+'_profession');
        };

        //Data for question 1 male vs female 
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
              title: "Number of Students",
              range: [0,40]
            },
            showlegend: true,
            paper_bgcolor: "#EDEADE",
            plot_bgcolor:"#EDEADE"
          };
          
        
        //Plot Question 1 Graph
        Plotly.newPlot("maleVsFemale", [trace1], layout);

        // Question 2 Data Setup
        let prof_dict = {};
        let prof_name_list = [];

        for(let i = 0; i<gryffindor.length; i++){
            if(gryffindor[i].Profession in prof_dict){
                prof_dict[gryffindor[i].Profession]=prof_dict[gryffindor[i].Profession]+1;
            }
            else{
                prof_dict[gryffindor[i].Profession] = 1;
                prof_name_list.push(gryffindor[i].Profession);
            }
        }

        let prof_value_list = [];

        for(let i = 0; i<prof_name_list.length;i++){
            let value = prof_dict[prof_name_list[i]];

            prof_value_list.push(value);
        }
        
        //Question 2 Data Input
        let data2 = [{
            x: prof_value_list,
            y: prof_name_list,
            hovertemplate: '<b>Profession</b>: %{y}<br>' +
                          '<b>Value</b>: %{x}<br>',
            type: "bar",
            orientation:"h",
            name: "Gryffindor",
            marker: {
                color: "red"
            }
          }];
          
        //Width and height
        let layout2 ={
            title: "Profession Distribution in Gryffindor",
            yaxis: {
                title: "Profession"
            },
            xaxis: {
                title: "Number of Students"
            },
            paper_bgcolor: "#EDEADE",
            plot_bgcolor:"#EDEADE"
        }
          
        //Plot Horizontal Bar Graph
        Plotly.newPlot("professions", data2, layout2);

        // Question 3 Data Setup 
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
         yaxis: {title: "Number of Students"},
         paper_bgcolor: "#EDEADE",
         plot_bgcolor:"#EDEADE"
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

        //update Table
        for(let i=0;i < 10;i++){
            d3.select('.row_'+ String(i)+'_name').text(house_data[i].Name);
            d3.select('.row_'+ String(i)+'_gender').text(house_data[i].Gender);
            d3.select('.row_'+ String(i)+'_profession').text(house_data[i].Profession);
        };

        //Question 1 Setup
        let male = house_data.filter(d => d.Gender == "Male");
        let female = house_data.filter(d => d.Gender == "Female");

        var updates = {
            "Hogwarts - Gryffindor": {
                "title.text": "Gender Distribution in Gryffindor"
            } ,
            "Hogwarts - Slytherin": {
                "title.text": "Gender Distribution in Slytherin"
            } ,
            "Hogwarts - Hufflepuff": {
                "title.text": "Gender Distribution in Hufflepuff"
            } ,
            "Hogwarts - Ravenclaw": {
                "title.text": "Gender Distribution in Ravenclaw"
            }
        }
        var restyles = {
            "Hogwarts - Gryffindor": {
                "y": [[male.length, female.length]],
                "name": "Gryffindor",
                "marker.color": "red",
                "id.value": "Gryffindor",
            } ,
            "Hogwarts - Slytherin": {
                "y": [[male.length, female.length]],
                "name": "Slytherin",
                "marker.color": "green",
                "id.value": "Slytherin",
            } ,
            "Hogwarts - Hufflepuff": {
                "y": [[male.length, female.length]],
                "name": "Hufflepuff",
                "marker.color": "gold",
                "id.value": "Hufflepuff",
            } ,
            "Hogwarts - Ravenclaw": {
                "y": [[male.length, female.length]],
                "name": "Ravenclaw",
                "marker.color": "blue",
                "id.value": "Ravenclaw",
            }
        }
        
        let plot = document.getElementById("maleVsFemale");
        
        Plotly.restyle(plot, restyles[value], 0);
        Plotly.relayout(plot, updates[value], 0);

        //Question 2 Data Setup
        let prof_dict = {};
        let prof_name_list = [];

        for(let i = 0; i<house_data.length; i++){
            if(house_data[i].Profession in prof_dict){
                prof_dict[house_data[i].Profession]=prof_dict[house_data[i].Profession]+1;
            }
            else{
                prof_dict[house_data[i].Profession] = 1;
                prof_name_list.push(house_data[i].Profession);
            }
        };

        let prof_value_list = [];

        for(let i = 0; i<prof_name_list.length;i++){
            let value = prof_dict[prof_name_list[i]];

            prof_value_list.push(value);
        };
        


        //Question 2 Plotly Data Updates Formatting
        let updates2 = {
            "Hogwarts - Gryffindor": {
                "x": [prof_value_list],
                "y": [prof_name_list],
                "name": "Gryffindor",
                "marker.color": "red",
                "id.value": "Gryffindor",
            } ,
            "Hogwarts - Slytherin": {
                "x": [prof_value_list],
                "y": [prof_name_list],
                "name": "Slytherin",
                "marker.color": "green",
                "id.value": "Slytherin",
            } ,
            "Hogwarts - Hufflepuff": {
                "x": [prof_value_list],
                "y": [prof_name_list],
                "name": "Hufflepuff",
                "marker.color": "gold",
                "id.value": "Hufflepuff",
            } ,
            "Hogwarts - Ravenclaw": {
                "x": [prof_value_list],
                "y": [prof_name_list],
                "name": "Ravenclaw",
                "marker.color": "blue",
                "id.value": "Ravenclaw",
            }


        }
        let plot2 = document.getElementById("professions");
        
        Plotly.restyle(plot2, updates2[value], 0);
        Plotly.relayout(plot2, updates[value], 0);
        // restyle horizontal bar
        // Plotly.restyle("bar", "x", [sample_values]);
        // Plotly.restyle("bar", "y", [otu_ids]);
        // Plotly.restyle("bar", "text", [otu_labels]);

        //restyle bubble graph
        // Plotly.restyle("bubble", "x", [data.samples[name_value].otu_ids]);
        // Plotly.restyle("bubble", "y", [data.samples[name_value].sample_values]);
        // Plotly.restyle("bubble", "marker.size", [data.samples[name_value].sample_values]);
        // Plotly.restyle("bubble", "marker.color", [data.samples[name_value].otu_ids]);
        // Plotly.restyle("bubble", "text", [data.samples[name_value].otu_labels]);

        let muggle = [];
        let muggleborn = [];
        let halfblood = [];
        let pureblood = [];
        let unknown = [];
        let other = [];

        for (let i = 0;i < house_data.length; i++){
            if (house_data[i].Blood === "Muggle"){
               muggle.push(house_data[i].Blood);
             }
             else if (house_data[i].Blood === "Muggle-born"){
              muggleborn.push(house_data[i].Blood);
             }
             else if (house_data[i].Blood === "Half-blood"){
                 halfblood.push(house_data[i].Blood);
             }
             else if (house_data[i].Blood === "Pure blood"){
                 pureblood.push(house_data[i].Blood);
             }
             else if (house_data[i].Blood === "Unknown"){
                 unknown.push(house_data[i].Blood);
             }
             else {
                 other.push(house_data[i].Blood);
             }
        }

        var updateBubble = {
            "Hogwarts - Hufflepuff": { 
                "y": [[muggle.length, muggleborn.length, halfblood.length, pureblood.length, unknown.length, other.length]],
                "id.value": "Hufflepuff",
                "marker.size": [[muggle.length, muggleborn.length, halfblood.length, pureblood.length, unknown.length, other.length]],
                "marker.color": "yellow",
             }, 
            "Hogwarts - Gryffindor": { 
                "y": [[muggle.length, muggleborn.length, halfblood.length, pureblood.length, unknown.length, other.length]],
                "id.value": "Gryffindor",
                "marker.size": [[muggle.length, muggleborn.length, halfblood.length, pureblood.length, unknown.length, other.length]],
                "marker.color": "red",
             },
             "Hogwarts - Slytherin": { 
                "y": [[muggle.length, muggleborn.length, halfblood.length, pureblood.length, unknown.length, other.length]],
                "id.value": "Slytherin",
                "marker.size": [[muggle.length, muggleborn.length, halfblood.length, pureblood.length, unknown.length, other.length]],
                "marker.color": "green",

             },
             "Hogwarts - Ravenclaw": { 
                "y": [[muggle.length, muggleborn.length, halfblood.length, pureblood.length, unknown.length, other.length]],
                "id.value": "Ravenclaw",
                "marker.size": [[muggle.length, muggleborn.length, halfblood.length, pureblood.length, unknown.length, other.length]],
                "marker.color": "blue",
             },

       };

        let bubbleTwo = document.getElementById("bloodStatus")
        Plotly.restyle(bubbleTwo, updateBubble[value], 0);
    }
    
    init();

});

