![](http://imgur.com/t3teAxi.png)

Welcome to my ecommerce project! This project consists of two parts: the frontend and the backend.

# MyKart

**MyKart: ** it's an open source (test scenario) software made to create a easy and simple "Shop" API, where you have two micro services, one the **Products API** that stores and handles everything Related to Stock and Products. And the **Purchase API** where you can create orders (cart's) and checkout items.

The purpose of this repository it's for education and test. But the code it's being coded in a proper way.
### Instructions to Run Frontend:

1. Clone [myapp-fronted](https://github.com/Dharmendra2567/myapp-frontend-/) repository and follow the following instructions.
2. Navigate to the `myapp-frontend` directory.
3. Create a `.env` file in the root directory of `myapp-backend` with the necessary environment variables. (See below for details)
4. Install dependencies using `npm install`.
5. Start the development server using `npm start`.
6. Access the frontend at [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

The following environment variables are required for the backend to run:

- `REACT_APP_BACKEND_URL`: The backend URL should be placed here either localhost or live url.
- 
**Note:** Ensure that you do not push your `.env` file to GitHub for security reasons. Add it to your `.gitignore` file to prevent accidental commits.


## Features

<b>Admin Dashboard</b>

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Manage Users Details | &#10004; | Ability of Edit and Delete Users Details |
| Manage Orders | &#10004; | Ability of Managing Order Details |
| Login & Logout | &#10004; | Admin can login and logout successfully |
| Product Features | &#10004; | Only Admin can manage all Product Features Mentioned Below|
| Selective Routes | &#10004; | Admims are restricted to surf some url such as place order,add to cart etc|

<b>Products Features</b>

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Add a Product | &#10004; | Ability of Add a Product on the System |
| List Products | &#10004; | Ability of List Products |
| Edit a Product | &#10004; | Ability of Edit a Product |
| Delete a Product | &#10004; | Ability of Delete a Product |
| Stock | &#10004; | Ability of Update the Stock |
| Stock History | &#10004; | Ability to see the Stock History |

<b>User Dashboard</b>

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Login & Logout | &#10004; | Admin can login and logout successfully |
| Purchase Features | &#10004; | Only normal user can access all mentioned Purchase Features below such as placing order|
| Selective Routes | &#10004; | Normal Users are restricted to surf some url which are for Admin only|

<b>Purchase Features</b>

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Create a Cart | &#10004; | Ability of Create a new Cart |
| See Cart | &#10004; | Ability to see the Cart and it items |
| Remove a Cart | &#10004; | Ability of Remove a Cart |
| Add Item | &#10004; | Ability of add a new Item on the Cart |
| Remove a Item | &#10004; | Ability of Remove a Item from the Cart |
| Checkout | &#10004; | Ability to Checkout |


## MyKart (myapp-backend)

The backend of the project handles data management and business logic. It is built using [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/), and runs on port 5000.

### Instructions to Run Backend:

1. Clone this repository.
2. Navigate to the `myapp_backend` directory.
3. Install dependencies using `npm install`.
4. Create a `.env` file in the root directory of `myapp_backend` with the necessary environment variables. (See below for details)
5. Start the server using `npm start`.
6. The backend will be accessible at [http://localhost:5000](http://localhost:5000).

### Environment Variables

The following environment variables are required for the backend to run:

- `PORT`: Port number for the backend server (default is 5000).
- `DATABASE` : Link of the database server
- SMTP infromation are provided to your dashboard when you sign up at [mailtrap.io](https://www.mailtrap.io) which is email delivery platform.
- `SMTP_HOST` : Place smtp host address
- `SMTP_PORT` : place smtp port address
- `SMTP_USER` : place smtp username
- `SMTP_PASS` : place smtp password
- `JWT_SECRET` : It is secret key to provide security. Just place any randrom string you want.
- `FRONTEND_URL` : place url of your frontend server
- Ensure you have created account at stripe payment gateway.you will get following key from [Stripe Dashboard](https://www.stripe.dashboard.com) only
- `STRIPE_SECRET_KEY` : place the stipe secret key
- `STRIPE_API_KEY`: place the stripe api key provided to your dashboard
-
**Note:** Ensure that you do not push your `.env` file to GitHub for security reasons. Add it to your `.gitignore` file to prevent accidental commits.

## Preview

![Website Preview](path_to_your_image)

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, feel free to create a pull request or open an issue.

## License

This project is licensed under the [MIT License](LICENSE).
