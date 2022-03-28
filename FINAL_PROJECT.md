# Final Project

The final project is a group project with individual components. 
1. Due dates:
    1. Pick your group by April 1 (5% of total grade).
    2. Turn in short video April 22 (5% of total grade) demonstrating progress.
    3. The entire project is due the day of your final project presentation, i.e., May 9 or May 10.
2. The grading is broken down as (1) individual portion is worth 75% of your total grade and (2) group portion is worth 25% of your total grade.
3. Group logistics:
    1. You should work in groups of 4. You can pick team-members across sections. Fill out [https://forms.gle/JUy162YRAaLynk4K8](https://forms.gle/JUy162YRAaLynk4K8) with your final project group members by April 1.
    2. Only 1 person in the group needs to turn in the group project for the entire group. We will only grade that project.
    3. You must give a 5 minute final group presentation the final week of class demonstrating the final project. Failure to do so will result in a 0% for the final project grade. Sign up for a time slot here [https://docs.google.com/spreadsheets/d/1Lm85tcutBzYwECyv_FMOZy1R23YBVSnoCFOdpf6WbX8/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1Lm85tcutBzYwECyv_FMOZy1R23YBVSnoCFOdpf6WbX8/edit?usp=sharing)
    4. You are allowed to share code within your group and use online resources. You are **not** allowed to share code across groups. Of course, you can ask for help and help other groups out with high-level ideas, code understanding, etc.
4. Final project clarifications [https://docs.google.com/document/d/10cONvKD-vrrHwGii77zIpaElSAiPP43sVPvqcPK4KDU/edit?usp=sharing](https://docs.google.com/document/d/10cONvKD-vrrHwGii77zIpaElSAiPP43sVPvqcPK4KDU/edit?usp=sharing)



## Individual Component (75%)

**Each** person in the group will be required to:
1. Add a **unique** (i.e., different from other group members) visualizer (i.e., add code under `client/src/visualizers/`) worth 30% of total grade.
2. Add a **unique** (i.e., different from other group members) instrument (i.e., add code under `client/src/instruments/`) worth 45% of total grade.


### Visualizer (30%)

One component we will add is a music visualizer [https://en.wikipedia.org/wiki/Music_visualization](https://en.wikipedia.org/wiki/Music_visualization). The base template provides a simple waveform visualizer.

1. You are each required to add a new visualizer that is different from the other group members. Thus, if your group has 4 members, you must have 4 new visualizers.
2. Display your visualizer in the visualizer panel and make it selectable from the side panel using your github handle as the name of the visualizer.
    * `client/src/visualizers/<github-handle-1>.tsx` (the code for group member 1's visualizer goes here)
    * `client/src/visualizers/<github-handle-2>.tsx` (the code for group member 2's visualizer goes here)
    * etc.
3. You can use the visualizer in the `client/src/visualizers/` as a starting point for your visualization. The current visualizer creates a 1D waveform as a function of time.
    * A small modification will result in a maximum of 5%. A small modification would mean that the visualization is a waveform based visualization similar to the one given in the template.
    * Medium modification will 15%: A medium modification would mean that the visualization takes a waveform based visualization and adds some different dimensions, e.g., a display of a waveform not as a curve but as a series of bars.
    * Major modification will result in a maximum of 30%. A major modification will look nothing like the base visualization. For example, we might have 2D shape visualizations.


### Instrument (45%)

1. You are each required to add a new instrument that is different from the other group members. Thus, if your group has 4 members, you must have 4 new instruments.
2. Display your instrument in the instrument panel and make it selectable from the side panel using your github handle as the name of the instrument.
    * `client/src/instruments/<github-handle-1>.tsx` (the code for group member 1's instrument goes here)
    * `client/src/instruments/<github-handle-2>.tsx` (the code for group member 2's instrument goes here)
    * etc.
3. You can use the instrument in the `client/src/instruments/` as a starting point for your instrument. The current instrument is a piano.
    * A small modification will result in a maximum of 5%. A small modification would mean that you made some small modification of a piano (e.g., more keys).
    * Major modification will result in a maximum of 45%. A major modification will involve adding a completely new instrument such as a guitar, flute, etc.


## Group Component (25% + 25% Bonus)

You must give a 5 minute group final presentation the final week of class demonstrating the final project worth 25% of total grade. Failure to do so will result in a 0% for the final project grade.

### Turn in Group Selections (5%)

1. Select your group by April 1.


### Video (5%) 

1. As a group, turn in 1 video by April 22 demonstrating the application so far.


### Playlist Database (15%)

1. As a group, you are required to build out the playlist database (`server`).
    * A small modification will result in a maximum of 5%. A small modification would mean that you have made minor updates to the SQL song database and no UI improvements.
    * Major modification will result in a maximum of 25%. A major modification will involve modifying the SQL database by adding meta-data for songs, albums, and artists, as well as the corresponding UI elements for searching for songs.



### Bonus (25%)

2. Bonus: add any feature not included in the individual component and describe it in the final presentation, worth up to 25% bonus points. Some ideas include:
    * Try out new sound libraries
    * Playlist management dashboard
