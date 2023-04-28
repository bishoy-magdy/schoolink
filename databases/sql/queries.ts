export const createUserQuery = `
INSERT INTO
  user (
    id,
    firstName,
    lastName,
    username,
    email,
    authType,
    authValue
  )
VALUES
  (?, ?, ?, ?, ?, ?, ?)
`;

export const getUserByUsernameQuery = `
SELECT
  id,
  firstName,
  lastName,
  username,
  email,
  authType,
  authValue
FROM
  user
WHERE
  username = ?
`;

export const getUserByIdQuery = `
SELECT
  id,
  firstName,
  lastName,
  username,
  email,
  authType,
  authValue
FROM
  user
WHERE
  id = ?
`;

export const getUserByEmailQuery = `
SELECT
  id,
  firstName,
  lastName,
  username,
  email,
  authType,
  authValue
FROM
  user
WHERE
  email = ?
`;

export const createPostQuery = `
INSERT INTO
  post (id, userId, url, title, content, poastedAt)
VALUES
  (?, ?, ?, ?, ?, ?)
`;

export const getPostByIdQuery = `
SELECT
  username,
  title,
  content,
  poastedAt
FROM
  post
  INNER JOIN user ON post.userId = user.id
WHERE
  post.id = ?
`;

export const getPostsNumberQuery = `
SELECT
  MAX(ROWID) as postsNumber
FROM
  postDescription
`;

export const postPaginationQuery = `
SELECT
    username,
    url,
    title,
    poastedAt
  FROM
    postDescription
    INNER JOIN user ON postDescription.userId = user.id
  WHERE
    postDescription.ROWID <= (SELECT MAX(ROWID) FROM postDescription) - ? * ?
  ORDER BY
    postDescription.ROWID DESC LIMIT ?;
`;

export const addLikeQuery = `
INSERT INTO 
    like (userId, postId) 
    VALUES (?, ?)
`;

export const getLikesQuery = `
SELECT
  COUNT(userId) AS likes
FROM
  like
WHERE
  postId = ?
`;

export const addCommentsQuery = `
INSERT INTO
  comment (id, postId, userId, content, commentedAt)
VALUES
  (?, ?, ?, ?, ?)
`;

export const getCommentsQuery = `
SELECT
  comment.id,
  comment.content,
  comment.commentedAt,
  user.username
FROM
  (
    comment
    INNER JOIN user ON comment.postId = ?
    AND comment.userId = user.id
  )
`;

export const getAdminsQuery = `
SELECT
  username,
  userId
FROM
  admin
  INNER JOIN user ON admin.userId = user.id
`;

export const isAdminQuery = `
SELECT
  EXISTS(
    SELECT
      1
    FROM
      admin
    WHERE
      userId = ?
  ) as isAdmin
`;

export const addAdminQuery = `
INSERT INTO
  admin(userId)
VALUES
  (?)
`;

export const removeAdminQuery = `
DELETE FROM
  admin
WHERE
  userId = ?
`;
