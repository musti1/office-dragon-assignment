# User Product Wish List Api
This project is build in Javascript (NodeJs). Using Domain Driven Design Pattern And Postgres as Database. It is a basic backend project to store and retrieve products, wishlist and user info. 
# Available Scripts
In the project directory, you can run:

```ln -s .env.development .env```

This command will link the .env.development file with .env after this command set the .env file according to your details.

```npm i```

To install the require packages for this project.

```npm run start```

This command will start the server on port `3000` by default.

# Routes

`http://localhost:3000/auth/login`

`http://localhost:3000/product/list`

`http://localhost:3000/product/{{:productId}}`

`http://localhost:3000/product/delete/{{:productId}}`

`http://localhost:3000/wishList/create`

`http://localhost:3000/wishList/list`

`http://localhost:3000/wishList/wish-list/{{:wishListId}}`

`http://localhost:3000/wishList/delete/{{:wishListId}}`

