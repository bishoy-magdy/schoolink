CREATE TABLE admin (
    userId   VARCHAR PRIMARY KEY,
    FOREIGN KEY (userId) REFERENCES user(id)
);
