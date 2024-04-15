## Backend CRUD Project used technologies Mysql, nodeJS expressJS and Postman for API calling

APIs to perform operations on the table todo, with the following columns

## API 1 Endpoints to get the muiltple End points
### Scenario 1 Sample API /todos/?status=TO%20DO
### Scenario 2 Sample API /todos/?priority=HIGH
### Scenario 3 Sample API /todos/?priority=HIGH&status=IN%20PROGRESS
### Scenario 4 Sample API /todos/?search_q=Buy
### Scenario 5 Sample API /todos/?category=WORK&status=DONE
### Scenario 6 Sample API /todos/?category=HOME
### Scenario 7 Sample API /todos/?category=LEARNING&priority=HIGH

![1](https://github.com/jeelam25/backend_todo_CRUD/assets/92732742/366de0ca-492a-4d2e-a2d9-0fedd4d86f64)

## API 2 Endpoints to get the ID
### Path: /todos/:todoId/

![id](https://github.com/jeelam25/backend_todo_CRUD/assets/92732742/1926975f-8981-42e0-892e-8dcdc4a47edf)

## API 3 Endpoint to get the Date
### Path: /agenda/

![date](https://github.com/jeelam25/backend_todo_CRUD/assets/92732742/bc605d51-25e7-4347-b711-9c140cb49617)

## API 4 to Update Data
### Path: /todos/
Method: POST

![3](https://github.com/jeelam25/backend_todo_CRUD/assets/92732742/7f182b6e-4acd-4f02-b512-f6eb279d48d3)

## API 5 to modified Data 
Path: /todos/:todoId/
Method: PUT

Scenario 1  Request { "status": "DONE" }
Scenario 2  Request { "priority": "HIGH" }
Scenario 3  Request{"todo": "Clean the garden"}
Scenario 4  Request { "category": "LEARNING" }
Scenario 5  Request { "dueDate": "2021-01-12" }

![Screenshot 2024-04-16 014232](https://github.com/jeelam25/backend_todo_CRUD/assets/92732742/ca61283a-2674-4baa-a273-eb4a92b2b60e)

## API 6 to delete data 
Path: /todos/:todoId/
Method: DELETE

![5](https://github.com/jeelam25/backend_todo_CRUD/assets/92732742/bc4f30d8-e100-46c8-9cc5-e9cc0e772f4c)









