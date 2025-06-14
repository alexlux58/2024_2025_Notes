import pika

# Create a connection to RabbitMQ server
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
# Create a channel in CN, say CH
channel = connection.channel()

# [optional] Create an exchange and specify the bindings

# If the queue does not exist, it will be created
channel.queue_declare(queue='hello')

# Publish a message to the queue
channel.basic_publish(exchange='',
                      routing_key='hello',
                      body='Hello World!')

print(" [x] Sent 'Hello World!'")

# Close the connection
connection.close()
