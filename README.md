# WR6 FULLSTACK REVIEW

## MVP
- Users can add bird pictures to database
- Users can create an account
- Users can login to website
- Users can view bird pictures from our database
- Users can edit/delete their own posts

## Icebox 
- Users can comment on other users' posts
- Users can upvote/like posts
- Users can view locations of bird sighting using Google Maps API
- Can create friendslist
- Can view individual profiles

### Database

-- Schemas (Blueprint/Structure for Tables):
users
```SQL
CREATE TABLE bird_users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(60) NOT NULL,
    username VARCHAR(20) NOT NULL,
    password TEXT NOT NULL
);
```
posts
```SQL
CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    img TEXT,
    species_name VARCHAR(32),
    locations TEXT,
    user_id INT REFERENCES bird_users(user_id)
);
```
comments
```SQL
CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY
    body TEXT,
    user_id INT REFERENCES bird_users(user_id),
    post_id INT REFERENCES posts(post_id)
);
```
### Server
- Dependencies:
    - express
    - massive
    - dotenv
    - express-session
    - bcrypt
    - moment.js (dates)


- File Structure:
    - server/
        - index.js
        - controllers/
            - authController.js
            - postController.js (endpoints for post)
            - commentController.js (endpoints for comments)
    - dotenv
    
- Endpoints:
    - authController Endpoints:
        - register => '/auth/register'
        - login => '/auth/login'
        - logout => '/auth/logout'
        - getUserSession => '/api/get_user'
    -Post Endpoints:
        - readPosts => '/api/posts'
        - delete => '/api/post/:id'
        - edit => '/api/post/:id'
        - createPost => '/api/post'

## Frontend/Client Side
- Dependencies: 
    - axios
    - react-router-dom
    - redux
    - react-redux
    - redux-promise-middleware

- File Structure:
    - src/
        - App.js
        - App.css
        - reset.css
        - routes.js
            -'/' => Auth.js
            -'/createpost' => Form.js
            -'/feed' => Feed.js
            - no need to makea  route for Post bc that lives in Feed.js
        - redux/
            - store.js
            - reducer.js
        - components/
            - Header.js
            - Auth.js
            - Form.js
            - Feed.js
            - Post.js

<a href='link to wireframe'>My Figma Wireframe</a>