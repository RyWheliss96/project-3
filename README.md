# project-3
## Table of Contents

- [Project Description/Outline](#project_description)
- [Questions](#questions)
- [Contents of the Repository](#repository_contents)
- [Task Assignments](#task_assignments)
- [Givens](#givens)
- [Conclusion](#conclusion)


## Project_Description
Our group is attempting to look at the differences between the houses at Hogwarts. Using the data of all of the known characters in the movies, we will be investigating the similarities and differences. We will then create a visualization dashboard to help display the data.<br />

![houses](templates/Images/harry-potter-animal-outlines.jpeg)

We then created a PowerPoint to help present what was found. That can be found here: https://docs.google.com/presentation/d/1_9F5unn04Ntu5zw7uiUeS6xLyVfiSmdIajbLp7erzJI/edit?usp=sharing .<br /> 

## Questions
1. What are the percentages of female vs male in each house?
2. What are the most popular professions to come out of each house?
3. What Blood Status lead to each house?
4. Who are the people from the books in each house? Count?

## Repository_Contents
![workflow](templates/Images/Files_Workflow.png)
Python File -> app\_solution.py creates a Flask API which powers the mongoDB database in a json format for access when run locally <br />
Pandas Notebook -> mongodb\_creation.ipynb which creates the mongodb database, removes the duplicates and reenters data to be used. Data is fully manipulated in file and tested.<br />
README.md <br />
### Templates Folder
HTML File-> index.html displays the dashboard as well as pulls from the API and overall brings everything together<br />
#### Data
Conatains 2 data files. 1 is the json which is the original Raw Data. The other is a cleaned csv we used to determine if the dataset was good or not.<br />
JSON File -> HPCharactersDataRaw.json <br />
#### Images
Contains all images used for the background of the dashboard and the README file.<br />
#### Static/js
JavaScript File-> app.js which creates the visualizations and manipulates the dropdown<br />


## Task_Assignments
Ryland - Initial Setup, File Connection, Data Manipulation<br />
Brittney - Question 1, Material Knowledge, PowerPoint Creation, JavaScript Formatting Template<br />
Jonah - Question 2, PowerPoint Improvement<br />
Tiffany - Question 3, Data Finder, PowerPoint Improvement, JavaScript Library Research, Organization<br />


## Givens
Instructions were generated by edX Boot Camps LLC, and is intended for educational purposes only.<br />
Data was provided by: https://www.kaggle.com/datasets/zez000/characters-in-harry-potter-books

## Conclusion
This project was an analysis of Harry Potter character data. This analysis focused primarily on four main questions: what is the percentage of each gender in each of the in each house, what is the most popular profession in each house, what is the most common blood status in each house, as well as who are the people in each house? The dataset utilized within this analysis began as a JSON file, which was then cleaned in a Jupyter notebook file before being stored within a MongoDB database. It was then compiled into a Flask API file, which became the basis for the JavaScript file which contained the visualizations for each question. The data was then filtered down by Hogwarts house, with Gryffindor being the basis for the default opening page in the html file. 

![Gryffindor_filter_coding](https://github.com/RyWheliss96/project-3/assets/133298343/05056c58-f7fc-4a44-b757-8126c04fb606)


For the first question, the data was then filtered down further by listed gender and confirmed status as student. The bar charts created revealed that the majority of the listed students were male, with only Ravenclaw having more female than male students. An example of the Ravenclaw Gender Distribution bar graph is depicted below. 

![Ravenclaw_gender_distributions](https://github.com/RyWheliss96/project-3/assets/133298343/aaae1c9c-7bf3-4010-876c-d5051d18f789)


The second question filtered the data down by pulling and counting the number of reoccurring professions per house. The largest job category per house was the unknown category, with the second largest category overall being students in Gryffindor. The following bar chart is the Professions distributions of Hufflepuff, depicted in one of it's two House colors. 

![Hufflepuff_professions](https://github.com/RyWheliss96/project-3/assets/133298343/b6cde0e6-d332-4b83-a3dd-c6b62ad227ea)


The third question focused on the number of students of each blood type per house. For this question, bubble charts were utilized, with the size of the marker reflecting the number of students in each house with each listed blood status. Slytherin had the most students, as well as the largest number of purebloods out of all four houses. For the other three houses, the largest blood status was actually listed as unknown. 

![Slytherin_blood_status](https://github.com/RyWheliss96/project-3/assets/133298343/2475d206-8d3e-49fa-8972-0ec0ee257591)  


The final question focuses on who was in each house and was depicted through a table displaying the first ten listed characters in each house. These four different visualizations were then imbedded into an html file with a drop-down menu which allows the viewer to choose which house data they are looking at. This is enhanced by the JavaScript library Scroll Reveal, which allows the webpage to slow fade into existence when first opened.  An image of the HTML coding used to create this Scroll Reveal is seen below. 

![Scroll_reveal_code](https://github.com/RyWheliss96/project-3/assets/133298343/fb9c1cc2-a397-4357-9b72-b98ec54ad75c)



