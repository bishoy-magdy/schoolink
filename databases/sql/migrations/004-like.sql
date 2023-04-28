CREATE TABLE like (
    postId      VARCHAR NOT NULL,
    userId      VARCHAR NOT NULL,
    FOREIGN KEY (postId) REFERENCES post(id),
    FOREIGN KEY (userId) REFERENCES user(id),
    UNIQUE (postId, userId)
);