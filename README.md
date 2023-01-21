
  
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

![Screen Shot 2023-01-17 at 07 14 59 AM](https://user-images.githubusercontent.com/96208179/212896616-d354b678-5460-4d3a-a863-10defe2e03c8.png)
![Screen Shot 2023-01-17 at 07 15 15 AM](https://user-images.githubusercontent.com/96208179/212896632-821e41b2-7c4b-48fd-b260-76b6fe949390.png)
![Screen Shot 2023-01-21 at 14 30 18 PM](https://user-images.githubusercontent.com/96208179/213883956-d438c071-3d38-4175-a5fc-f4b7faedc28f.png)

### Built With

* ![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge&logoWidth=30)
* ![Javascript](https://img.shields.io/badge/-Javascript-F7DF1E?logo=javascript&logoColor=white&style=for-the-badge&logoWidth=30)
* ![Python](https://img.shields.io/badge/-Python-366D9C?logo=Python&logoColor=white&style=for-the-badge&logoWidth=30)
* ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white&style=for-the-badge&logoWidth=30)
* ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white&style=for-the-badge&logoWidth=30)
* ![Flask](https://img.shields.io/badge/-Flask-020202?logo=flask&logoColor=white&style=for-the-badge&logoWidth=30)
* ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge&logoWidth=30)
* ![Sequelize](https://img.shields.io/badge/-Sequelize-52B0E7?logo=sequelize&logoColor=white&style=for-the-badge&logoWidth=30)
* ![SQLITE](https://img.shields.io/badge/-Sqlite-003B57?logo=sqlite&logoColor=white&style=for-the-badge&logoWidth=30)
* ![Render](https://img.shields.io/badge/-Render-4351E8?logo=Render&logoColor=white&style=for-the-badge&logoWidth=30)
* ![NPM](https://img.shields.io/badge/-NPM-CB3837?logo=npm&logoColor=white&style=for-the-badge&logoWidth=30)
* ![Git](https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white&style=for-the-badge&logoWidth=30)
* ![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white&style=for-the-badge&logoWidth=30)


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


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/
