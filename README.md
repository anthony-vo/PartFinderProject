# PartFinderProject

### Database Schema:

- Database schema was created by executing the following:

```sql
CREATE DATABASE part_finder;
USE part_finder;

CREATE TABLE parts (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  make         VARCHAR(100) NOT NULL,
  model        VARCHAR(100) NOT NULL,
  type         VARCHAR(100) NOT NULL,
  part_number  VARCHAR(50)  NOT NULL,
  INDEX idx_make        (make),
  INDEX idx_make_model  (make, model),
  INDEX idx_full        (make, model, type)
);
```

- Indexes scan instead of whole table scan was implemented to speed up the process.
- Test-data excel file was converted to csv file prior importing to the database via phpmyadmin file import.

### config.php:

- This is the central place where secure database connection was setup.
- For security purposes, database credentials were kept out by using vlucas/phpdotenv. .env file was placed in gitignore to keep out of the version control.
- PDO was opted instead of mysqli\_\* API for the following reasons:
  - PDO provides prepared statements with boundaries param => guards against SQL injection.
  - PDO supposts many database engines => enhances scalability and compatibility.

### PHP API layer in api.php:

- All requests go through this entry point => Straightforward process of configuration and handling CORS
- CORS & preflight were configured to ensure seemless connection between the server side and client side.
- `$path` consists `?q=` parameter is the lightweight router connecting to four main cases.
- PDO prepared statements with positional binding (`?`) were used to prevent SQL injection.

### Client-side API wrappers in /api/Wrapers.js:

- Defines four async functions, one per level in the hirearchy then call `fetch()` and return the JSON responses.
- Use `encodeURIComponent` on the supplied parameters to prevent malformed URL or accidental injection.

### State Management via Context.js

- `SET_LOAD` acts as a toggle for the loading boolean for each fetch, in which drives the `<Spinner>` displays.
- `SET_DATA` replace the initialised arrays with the newly fetched data.
- `UPDATE_FILTER` update one of filters and clears any downstream state resulting from cascading filters.
- `FilterProvider` contains four `useEffect` hooks presenting the cascading effects ensuring only fetch data when in the dropdown list when the parent is selected and only contains data belong to the parent:
  - On mount => fetch all makes.
  - On `make` change => fetch all models.
  - On `model` change => fetch all types.
  - On `type` change => fetch all parts.
- each of the useEffect is constructed as : `SET_LOAD(true)` then `SET_DATA` then `SET_LOAD(false)`.
- Due to the amount of states, I opted to use `useReducer` instead of `useState` to centralise all updates in on place instead of having a bunch of setters and effect clean up to keep the downstream filters consistently. This helps with code efficiency and avoids partial state values updates => Scalability.
- `React Context` was implemented to avoid extensive prop drilling as the tree expands. Since we have many components that require the same state and dispatch function, Context provides the `{ state, dispatch }` at the top level so any intermediate components can consume it.
- `Context and Reducer` combine to provide a global store, ensuring every part of the UI is consistent and reflects the same state.
- Can easily add new components => Scalability

**_ Resources _**

# React's useReducer: https://reactjs.org/docs/hooks-reference.html#usereducer

# React's useContext: https://reactjs.org/docs/hooks-reference.html#usecontext

# PHP's PDO: https://www.php.net/manual/en/book.pdo.php
