CREATE TABLE post (
    id        VARCHAR PRIMARY KEY,
    userId    VARCHAR NOT NULL,
    url       VARCHAR UNIQUE NOT NULL,
    title     VARCHAR NOT NULL,
    content   VARCHAR NOT NULL,
    poastedAt INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id)
);
