CREATE TABLE comment (
    id          VARCHAR PRIMARY KEY,
    postId      VARCHAR NOT NULL ,
    userId      VARCHAR NOT NULL,
    content     VARCHAR NOT NULL,
    commentedAt INTEGER NOT NULL,
    FOREIGN KEY (postId) REFERENCES post(id),
    FOREIGN KEY (userId) REFERENCES user(id)
);