CREATE TABLE user (
    id        VARCHAR PRIMARY KEY,
    firstName VARCHAR NOT NULL,
    lastName  VARCHAR NOT NULL,
    username  VARCHAR UNIQUE NOT NULL,
    email     VARCHAR UNIQUE NOT NULL,
    authType  VARCHAR NOT NULL CHECK(authType in ('password', 'token')),
    authValue VARCHAR NOT NULL
);
