## React Interview (DeckGL)

Welcome to the Synmax Frontend take home assessment! Take your time to explore the repository to familiarize yourself with it. In this interview, we will be asking you to accomplish to 2 tasks and 1 custom feature of your liking outside of those 2 tasks.

This assessment should take you 2 - 5 hours.

### Backstory

You are trying to create a map that allows the user to view all the charging stations and grocery stores in Washington, D.C. It seems like the application is only showing a blank map. Could you help me fix this?

### Rules and Restrictions

- You are free to add any MIT licensed libraries on the public npm registry
- You can change or add any files in this repository
- You're given a open-sourced GeoJSON Object. You must use the one provided.
  - `./src/data/groceryStores.js`
  - `./src/data/gasStations.js`
    - Source: catalog.data.gov
- You CANNOT use private repositories

## Tasks

- Create 1 Map Layer (Pick either Gas Stations or Grocery Stores)
  - Populate the geojson provided onto a map layer
  - Use `pointType: "circle"` is more than acceptable for this task
    - SVGs provided as icons (Free source: svgrepo.com)
- On clicking an individual gas station or grocery store on the map, the application should display a container on top of the map that gives the details of the selected individual point.
  - Could the application display multiple containers?
- Ability to toggle on/off for the map layer (Gas Station/Grocery Store)
- Free style: Add 1 additional feature/component of your liking that is relevant to this project

### Considerations

- Look into the library of `DeckGL` and `react-map-gl`
- At what point do you consider using a component library?
- Can I open multiple containers?
- If I wanted to add more map layers, would you code this differently?
- `pointType: "circle"` is <b>acceptable</b>

### Submission

- Two Options on submission:
  - ##### Github:
    - Add <a>ahinh@synmax.com</a> as a contributor to your completed GitHub repository of this project
    - Email your Github repository URL back to Synmax's recruiter (Preferred)
  - ##### Email & Zip:
    - Remove ./node_modules before submitting the repository
    - Once you are ready for submission, please zip your file and name it `{Your First Name}{Your Last Name}_DeckGL_Interview.zip`
