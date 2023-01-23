FROM tensorflow/serving:latest

# Add the models
ADD machine-failure /models/machine-failure

# Add the config file
ADD models.config /etc/models/models.config

# Set the working directory to the models directory
WORKDIR /models

# Expose the default TensorFlow Serving port
EXPOSE 8500
EXPOSE 8501

# Run TensorFlow Serving with the models.config file as the configuration file
CMD ["tensorflow_model_server", "--model_config_file=/etc/models/models.config", "--model_config_file_poll_wait_seconds=60"]