# Smart Predictive Maintenance

Predicting machine failures and scheduling maintenance to minimize downtime and costs. The project uses machine learning models to analyze sensor data and predict when a machine is likely to fail. The frontend of the project is built using Reactjs, the backend using FastAPI and the machine learning model training is done using Jupyter Notebook. All the services are containerized using Docker. With this solution, businesses can improve the efficiency of their operations, reduce costs, and avoid unplanned downtime.

## Project Structure

- `services`: Contains all of the sub-projects (services) that make up the project.
  - `client`: Contains the frontend of the project, which is a Reactjs app.
  - `models`: Contains the trained models used by the project.
  - `server`: Contains the backend of the project, which is a FastAPI app.
- `docker-compose.yaml`: Contains the configuration used to run all of the services with one inline command.
- `machine-failure-model.ipynb`: A Jupyter notebook used for training the machine failure model.

## Running the Services

To run the services using `docker-compose`, make sure you have `docker` and `docker-compose` installed on your machine. Then, navigate to the root of the project and run the following command:

```
cd docker-compose up
```

## Accessing the Services

Once the services are running, you can access them by navigating to the hosts listed below.

| Service | Host                  |
| ------- | --------------------- |
| Client  | http://localhost:5173 |
| Server  | http://localhost:8000 |

## Prediction

Make a request to a the machine learning model `machine-failure` endpoint that takes in sensor data as input, and returns a prediction about the likelihood of machine failure.

```bash
curl --location --request POST 'http://localhost:8000/machine-failure/predict' \
--header 'Content-Type: application/json' \
--data-raw '{
    "instances": [
        {
            "Type": "L",
            "Air_temperature": 24.85,
            "Process_temperature": 35.65,
            "Rotational_speed": 1385,
            "Torque": 56.4,
            "Tool_wear": 202,
            "Temperature_difference": 10.8
        }
    ]
}'
```

Output:

```bash
[
    [
        0.736666083 # this machine will fail (73% confidence)
    ]
]
```

## Stopping the Services

To stop the services and remove the containers created, you can use the following command:

```
cd docker-compose down
```

## Links

- [Google Colab Notebook](https://colab.research.google.com/drive/1USiqZ2b8EhBezCuTjfOLUL5mzrDuZugx)
