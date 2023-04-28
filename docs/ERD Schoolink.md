# ERD: Schoolink

This document explores the design of schoolink that will allow a school to share articles, memos, activities, etc. and allow users to interact with them.

The post's viewer uses markdown rendering with some flavours.

# Features

- There are two authentications methods supported
    - Basic Username / Password Auth
    - OAuth2.0 - Google account
- Create a new post - Only for admins.
- Add a comment to a specific post - for all login users.
- Add a Like to a specific post - for all login users.
- Admins management - (Add or Remove) Admin by username.

# Storage

We'll use a relational database (schema follows) to fast retrieval of posts and comments. A minimal database implementation such as sqlite3 suffices, although we can potentially switch to something with a little more power such as PostgreSQL or MongoDB if necessary. Data will be stored on the server on a separate, backed up volume for resilience. There will be no replication or sharding of data at this early stage.

# Shema

To implement the service, we will require at least the following entities:

## user

| column | type |
| --- | --- |
| id | varchar (PR) |
| username | varchar |
| firstName | varchar |
| lastName | varchar |
| email | varchar |
| authType | varchar |
| authValue | varchar |

## admin

| column | type |
| --- | --- |
| userId | varchar (FR) |

## post

| column | type |
| --- | --- |
| id | varchar (PR) |
| userId | varchar (FR) |
| url | varchar |
| title | varchar |
| content | varchar |
| poastedAt | integer |

## comment

| column | type |
| --- | --- |
| id | varchar (PR) |
| postId | varchar (FR) |
| userId | varchar (FR) |
| content | varchar |
| commentedAt | integer |

## like

| column | type |
| --- | --- |
| postId | varchar (FR) |
| userId | varchar (FR) |

## postDescription

| column | type |
| --- | --- |
| userId | varchar (FR) |
| url | varchar |
| title | varchar |
| poastedAt | integer |

`You might be thinking, "Why don't you use indexes in some tables?" My reply is that I conducted a stress test with around 0.5 million posts and over 200k users, and the response in the worst scenario was less than 30 ms under 2.20 GHZ—so I didn't apply indexes until now. I also try to avoid overengineering wherever possible ;)
`
# Session Mechanism

Using session id as a primary identifier with an expiration of 2 weeks ⏱️ from last login; after that time, relogin is required;
In addition, using the power of JWT with a short age of 5 minutes ⏱️ and the jwt renew from session id, I used JWT beside session id to save effort for checking in a memory session for each request.

# Authorization

Creating posts only for admins but comments for any logged-in users. Anyone, even those not logged in, can see all posts, but comments display only for logged-in users.

# Framework

This is shaping up to be a tiny MVC framework, interesting.


# API

## HTTP - GET 
#### Ascending Order 

| Path |  What Should Do |
| --- | --- |
| `/admin` | List of Admin Members |
| `/auth/v1/g/oauth2url` | get google oauth url |
| `/auth/v1/g/oauth2/code` | get google oauth code |
| `/posts` | List of news posts based on a page number  |
| `/createPost` | Post Creation Page |
| `/get/post` | post content with a specifc **id** |
| `/get/comments` | get comments of specifc post  |
| `/home` | Home page |
| `/login` | Login page|
| `/logout` | Revocation of Cookies and Session |
| `/signup` | Signup page |

## HTTP - POST
#### Ascending Order 

| Path |  What Should Do |
| --- | --- |
| `/add/comment` | create a comment to specifc post  |
| `/add/like` | Crreate a Like to specifc post  |
| `/admin` | Add Admin |
| `/create/post` | Crreate a new post  |

## HTTP - DELETE
#### Ascending Order 

| Path |  What Should Do |
| --- | --- |
| `/admin` | Delete Admin |

Each HTTP method requires its own data to be sent if needed.
eg(HTTP POST Body or parameters, ....)  

# Dependencies

- [sqlite3](https://github.com/TryGhost/node-sqlite3)
- [express](https://www.npmjs.com/package/express)
- [ejs](https://www.npmjs.com/package/ejs)
- [session id](https://github.com/expressjs/session#readme)
- crypt - [RUUID](https://nodejs.org/api/crypto.html#cryptorandomuuidoptions) 
- markdown-it [render](https://github.com/markdown-it/markdown-it)
- katex [render](https://www.npmjs.com/package/markdown-it-katex)
- [jwt](https://www.npmjs.com/package/jsonwebtoken)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- google [OAuth2.0](https://www.npmjs.com/package/google-auth-library) 
