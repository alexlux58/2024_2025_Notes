import pika
import sys
import os


def main():
    # Create a connection to RabbitMQ server
    connection = pika.BlockingConnection(
        pika.ConnectionParameters('localhost'))
    # Create a channel in CN, say CH
    channel = connection.channel()

    # Declare the queue from which to consume messages
    channel.queue_declare(queue='hello')

    # Define the callback function to handle messages
    def callback(ch, method, properties, body):
        print(f" [x] Received {body.decode()}")
        ch.basic_ack(delivery_tag=method.delivery_tag)

    # Set up subscription on the queue
    channel.basic_consume(
        queue='hello', on_message_callback=callback, auto_ack=False)

    print(' [*] Waiting for messages. To exit press CTRL+C')

    try:
        # Start consuming messages
        channel.start_consuming()
    except KeyboardInterrupt:
        print(" [*] Exiting...")
        channel.stop_consuming()

    # Close the connection
    connection.close()


if __name__ == "__main__":
    main()
# This script consumes messages from a RabbitMQ queue named 'hello'.
# It prints the received messages to the console and acknowledges them.
# The script will continue to run until interrupted by the user (CTRL+C).
# Make sure RabbitMQ server is running before executing this script.
# To run this script, ensure that you have the pika library installed:
# pip install pika
