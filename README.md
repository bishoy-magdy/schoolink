# Schoolink

The idea is that a Schoolink website allows a school to share articles, memos, activities, etc., and users can interact with these posts.

One of the main goals during the design of the project was to apply best practises in security like CSRF and XSS attacks, sanitise the inputs, prevent SQL injection, etc.

# Demo
For testing, you can login after building the project with `username` = admin and `password` = admin.

https://user-images.githubusercontent.com/58605547/235036854-a1ae268f-46f4-4ad9-9599-b1bcb32fb9ba.mp4


# Documentation
[ERD](/docs/ERD%20Schoolink.md)

# Build and Run
- Manual
  - Install node:v18.16.0
  - Install project dependencies.
  - Create a new .env file using the .env.dist as a template
    - Fill in the missing secrets suitable for your environment
  - Run the following command: `npm start`

- (Optional) if you prefer Docker, run the following commands, Don't forget the .env file :)
```
docker build -t schoolink .

docker run -p 3000:3000 schoolink
```

# Want to Contribute?
All contributions are welcomed, [check here for details](/CONTRIBUTING.md)
