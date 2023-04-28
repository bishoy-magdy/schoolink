CREATE TABLE postDescription(
    userId      VARCHAR NOT NULL,
    url         VARCHAR UNIQUE NOT NULL,
    title       VARCHAR NOT NULL,
    poastedAt   INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id)
);