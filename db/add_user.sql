INSERT INTO bird_users
(email, username, password)
VALUES
($1, $2, $3)
RETURNING *;