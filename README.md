
  
 <p align="center">


<br />
<div align="center">
<img src="https://i.pinimg.com/originals/8d/29/ef/8d29ef579d2a0b86886f53673a5324da.jpg" >


Horizon Health

An application where users can shop for OTC healthcare items, find local healthcare facilities near them and chat with medical professionals regarding any health concerns.
    <br />
    <br />
    <a href="https://horizon-health.onrender.com/"> Live Link </a>
    |
     <a href="https://github.com/jeremiahlu/Horizon-Health/wiki/Features">Features</a>
    |
    <a href="https://github.com/jeremiahlu/Horizon-Health/wiki/Database-Schema">Database Schema</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">Preview</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>

## Preview

Dashboard
![Screen Shot 2023-01-17 at 07 14 59 AM](https://user-images.githubusercontent.com/96208179/212896616-d354b678-5460-4d3a-a863-10defe2e03c8.png)
Search nearby healthcare facilities
![Screen Shot 2023-02-09 at 19 54 08 PM](https://user-images.githubusercontent.com/96208179/217972864-bb2fe833-1916-49b6-822a-5d9627628d57.png)
List of all items in the shop
![Screen Shot 2023-01-17 at 07 15 15 AM](https://user-images.githubusercontent.com/96208179/212896632-821e41b2-7c4b-48fd-b260-76b6fe949390.png)
Items in the cart
![Screen Shot 2023-01-21 at 14 30 18 PM](https://user-images.githubusercontent.com/96208179/213883956-d438c071-3d38-4175-a5fc-f4b7faedc28f.png)

### Built With

![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge&logoWidth=30)
![Javascript](https://img.shields.io/badge/-Javascript-F7DF1E?logo=javascript&logoColor=white&style=for-the-badge&logoWidth=30)
![Python](https://img.shields.io/badge/-Python-366D9C?logo=Python&logoColor=white&style=for-the-badge&logoWidth=30)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white&style=for-the-badge&logoWidth=30)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white&style=for-the-badge&logoWidth=30)
![Flask](https://img.shields.io/badge/-Flask-020202?logo=flask&logoColor=white&style=for-the-badge&logoWidth=30)
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge&logoWidth=30)
![Sequelize](https://img.shields.io/badge/-Sequelize-52B0E7?logo=sequelize&logoColor=white&style=for-the-badge&logoWidth=30)
![SQLITE](https://img.shields.io/badge/-Sqlite-003B57?logo=sqlite&logoColor=white&style=for-the-badge&logoWidth=30)
![Render](https://img.shields.io/badge/-Render-4351E8?logo=Render&logoColor=white&style=for-the-badge&logoWidth=30)
![NPM](https://img.shields.io/badge/-NPM-CB3837?logo=npm&logoColor=white&style=for-the-badge&logoWidth=30)
![Git](https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white&style=for-the-badge&logoWidth=30)
![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white&style=for-the-badge&logoWidth=30)


# Flask React Project

This is the starter for the Flask React project.

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

