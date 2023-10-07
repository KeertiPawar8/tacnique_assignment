# tacnique_assignment

for running the api ,firstly we have to register ourserlves with the following data 
1. name
2. email
3. password
we can achieve this by hitting the endpoint `/register`

After registering we have to login with the following credentials,
1. email
2. password
we can achieve this by hitting the endpoint `/login`
As a response to this we get a token which we can use to access the protected routes.
Firstly in the headers of the postman we have to choose `Authorization` and as a value of it we have to give `Bearer received_token`.We are using  `Bearer` in Authorization to make it more protected. 

Task Managing routes:-

1. `POST /tasks` route - To add a new task.
2. `GET /tasks` route - To retrieve list of all tasks.
3. `GET /tasks/:id` route -  To retrieve a specific task by ID.
4. `PUT /tasks/:id` route - To update a specific task by ID.
5. `DELETE /tasks/:id` route - To delete a specific task by ID.







