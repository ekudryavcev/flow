# Flow

**Flow** is an online kanban board with an emphasis on bug reporting.
This is a portfolio project and the coursework for the MIPT full-stack development course.


## Functionality

In the current stage the project has the frontend and the backend completely separated.
To take a look at the kanban board, you can [run a NodeJS server](#npm-start) and test a randomly generated board.

You'll see a five-column board with a number of cards already in it. Cards will have:
- Name
- Description (optional)
- Tasklist (optional)
- Tags (optional)
- Assignees (optional)
- Creator and creation date

![Board view demo](demos/board.jpg?raw=true)

You can move the cards by dragging them into columns. New cards can be added with the plus buttons at the top and the bottom of each column.

To see more details about a card and edit it, click on it to display it full-screen. Now you can manage its properties, move it to another column, archive and delete it.

![Card view demo](demos/displayed_card.jpg?raw=true)

Things that need to be added in the near future: integration with the backend, authorisation, adding new tags and assignees.



## Frameworks

This frontend-heavy project builds on the latest development trends, making use of the following tools:

- [React](https://reactjs.org) for a responsive UI
    - [React Router](https://reactrouter.com) for client-side URL routing
    - Several React components, such as [Drag & drop](https://www.npmjs.com/package/react-drag-and-drop) and [React Select](https://react-select.com/home)
- [Bootstrap](https://getbootstrap.com) for flexibility
- [Django](https://www.djangoproject.com) for a simple but functional back-end
    - [SQLite](https://www.sqlite.org/index.html) in development
    - [PostgreSQL](https://www.postgresql.org) in production
- [Babel](https://babeljs.io) for JS (and JSX) compiling
- [ShortcutJS](https://github.com/coosto/ShortcutJS) for hotkey actions
- [Docker](https://www.docker.com/get-started) for hassle-free deployment


## Project structure

The project is divided into two directories - `flow_backend` and `flow_frontend`. The former contains everything server-related, including the database and, in production - packed frontend code. The latter has all the frontend source files, and also is the Node.JS project home.

### Frontend

The major frontend subfolders are `src` and `public`.
`public` contains CSS styles, linked JS scripts, image files and fonts. It also has the app's `index.html` file.

`src` has the source JavaScript files. These include the React components in separate folders under `src/components`, a binary heap implementstion, a User class and the ShortcutJS source files. It also contains a file with "lorem ipsum" generated placeholders for testing purposes.

After built, the project has the frontend code packed into the `flow_frontend/build` directory.

### Backend

In Django, the app has the name "flow" and keeps the app-specific database-related files, such as `models.py` or migrations, in `flow_backend/flow`.
Other files, such as `settings.py`, are in `flow_backend/flow_backend`.
The database itself and the `manage.py` are in `flow_backend`.
<br/>

These two folders will be packed into separate Docker containers.

### Database

The models are described in `flow_backend/flow/models.py`, and consist of the following:
- Card - individual cards, with lists of tags and users assigned to them
- Column - columns of a board, with lists of cards
- Board - a single board, with lists of columns, cards, tags and users that have access to it
- Tag - tags that are used in the boards
- User - a derivative of the Django User model
- BoardsToUsers - relations between users and boards they have access to


## Test and build


### Frontend

In the `flow_frontend` directory, you can run:

#### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000/board) to view it in the browser.

Right now you can open URLs such as:
- http://localhost:3000/board - for a randomly generated board
- http://localhost:3000/board/card=:id - for a random board with a card displayed
- http://localhost:3000/login - for a login form placeholder
![Sign in demo](demos/sign_in.jpg?raw=true)

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.


### Backend

In the `flow_backend` directory, you can run:

#### `manage.py runserver`

Runs the Django appserver.
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

Right now you can open URLs such as:
- http://127.0.0.1:8000/admin/ - to administer the server
- http://127.0.0.1:8000/api/ - to view and work with the database, in particular - the following tables:
  - [Cards](http://127.0.0.1:8000/api/cards/)
  - [Columns](http://127.0.0.1:8000/api/columns/)
  - [Boards](http://127.0.0.1:8000/api/boards/)
  - [Tags](http://127.0.0.1:8000/api/tags/)
  - [Users](http://127.0.0.1:8000/api/users/)


#### `manage.py shell`

Runs an interactive Python console to administer the server

