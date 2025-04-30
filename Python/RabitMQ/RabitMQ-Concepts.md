# Queues

- In computer science, queue is a collection of entities maintained in a sequence. Sequence can be modified by
  - adding entities to the beginning or to the end
  - removing from the beginning or from the end

## Queues - asynchronous communication

- Synchronous (i.e. HTTP)
  RESTful API, WebServices, RPC etc.

- Asynchronous (i.e. AMQP)
  Queues

## Queue attributes

- Most important queue attributes for monitoring

1. Queue size

- Number of messages in the queue

2. Queue age (time)

- Age of the oldest message in the queue

Queues - system architecture

Queues is such architecture play three important roles:

1. Send market rates asynchronously

- The system that sends market rates doesn't care about calculation results, it only requires confirmation that message been accepted and queued for further calculation.

2. System autoscaling

- Market rates volume can be unpredictable. Sometimes number of incoming rates per second is small, but sometimes it suddenly grows and more servers are
  needed to calculate recommendations and meet the SLA. Market rates are stored in queues = system has the ability to autoscale itself based on queues size and age.

3. Reliability

- When computing cloud went down, queues will continue to accumulate incoming traffic, and any failure of computing cloud is fully transparent for publishers. When
  computing cloud is up and running again, message rates accumulated in the queues allow calculations to continue from where they were interrupted
  and send recommendations to clients without losing any single message. Reliable system should meet the Single Data Responsibility principle, commonly
  known as a System Component Reliability to guarantee that we won't lose any single message in case of any component failure.

### Use Cases for Queues

Among others, queues are mostly used to:
(not necessarily in order below)

1. Decompose two systems

- Integrate systems written in different technologies

2. Estimate desired system performance

- Throttle or speed up data flows

3. Increase fault tolerance level (not the same as high availability)

- Persistent queues, "packet lost" issues, single data Responsibility principle

4. Increases loose coupling and scalability (horizontal scaling, autoscaling)

- Many consumers for the same publisher, components don't know each-other (scale-in and scale-out components)

5. Increase system's inbound traffic

- Asynchronous communication, "fire-and-forget" scenarios

6. Buffer system's outbound bytes

- Video streaming, ppv data streaming, notifications

# RabbitMQ

- RabbitMQ is an open-source message-broker software (sometimes just called queuing software) that originally implemented the Advanced Message Queuing Protocol (AMQP) and has since been extended to support other protocols.
- RabbitMQ supports plugins - standard distribution contains plugins to support protocols like Streaming Text Oriented Messaging Protocol (STOMP), Message Queuing Telemetry Transport (MQTT), and HTTP, etc.
- RabbitMQ 1.0.0 was released in 2007.
- Written in Erlang Programming Language. Erlang is a functional programming language used to build massively scalable soft real-time systems with requirements on high availability. Mainly used in telecommunications, banking, e-commerce, computer telephony and instant messaging. Erlang's runtime system has built-in support for concurrency, distribution and fault tolerance. Erlang is a garbage-collected language. It has a built-in mechanism for detecting run-time errors and supports hot swapping (changing code without stopping a system). Erlang is a functional programming language, which means that it treats computation as the evaluation of mathematical functions and avoids changing state and mutable data. Erlang is a general-purpose programming language, but it is not widely used outside of its niche.

- The concurrency in Erlang is performed by lightweight processes, which are managed by the Erlang runtime system. These processes are not operating system processes, but rather lightweight threads that are managed by the Erlang runtime system. This allows for a large number of concurrent processes to be created and managed without the overhead of creating and managing operating system processes.
- Erlang's concurrency model is based on the Actor model, which is a mathematical model of concurrent computation. In the Actor model, each actor is an independent entity that can send and receive messages to and from other actors. This allows for a high degree of concurrency and parallelism in Erlang programs.

# AMQP Protocol

- AMQP is an open standard application layer protocol for message-oriented middleware. It defines a wire-level protocol for message-oriented middleware, which allows for the exchange of messages between different systems and applications. AMQP is designed to be a flexible and extensible protocol that can be used in a variety of messaging scenarios, including point-to-point messaging, publish/subscribe messaging, and request/reply messaging.
- AMQP is designed to be a reliable and secure protocol that can be used in a variety of environments, including cloud-based environments, on-premises environments, and hybrid environments. It is designed to be a lightweight protocol that can be used in resource-constrained environments, such as embedded systems and IoT devices.
- AMQP is designed to be a platform-independent protocol that can be used in a variety of programming languages and environments. It is designed to be a language-agnostic protocol that can be used in a variety of programming languages, including Java, C#, Python, and Ruby.

## AMQP Message

- An AMQP message consists of a header, properties, and a body. The header contains metadata about the message, such as the message ID, timestamp, and priority. The properties contain additional metadata about the message, such as the content type and encoding. The body contains the actual message data.
- The header and properties are optional, and the body is required. The body can be any type of data, including text, binary data, or a serialized object. The header and properties are used to provide additional information about the message, such as the message ID, timestamp, and priority.
- The header and properties are used to provide additional information about the message, such as the message ID, timestamp, and priority. The body is used to contain the actual message data.
