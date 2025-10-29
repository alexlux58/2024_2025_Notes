# Elasticsearch Architecture

- Nodes store the data that we add to Elasticsearch.
- A cluster is a collection of nodes that work together to provide a single view of the data.
- Data is stored as documents, which are JSON objects.
- Documents are grouped together with indices.

# How does replication work?

- Replication is configured at the index level
- Replication works by creating copies of shard, referred to as replica shards
- A shard that has been replicated, is called a primary shard
- A primary shard and its replica shards are referred to as a replication group
- Replica shards are a complete copy of a shard
- A replica shard can serve search requests, exactly like its primary shard
- The number of replicas can be configured at index creation

# Master-eligible nodes (node.master: true|false)

- The node may be elected as the cluster's master node
- A master node is responsible for creating and deleting indices, among others
- A node with this role will not automatically become the master node
  - unless there are no other master-eligible nodes
- May be used for having dedicated master nodes
  - Useful for large clusters

# Data (node.data: true|false)

- Enables a node to store data
- Storing data includes performing queries related to that data, such as search queries
- For relatively small clusters, this role is almost always enabled
- Useful for having dedicated master nodes
- Used as part of configuring a dedicated master node

# Ingest (node.ingest: true|false)

- Enables a node to perform pre-processing of documents before indexing
- Pre-processing is done through ingest pipelines
- Ingest pipelines are a series of processors that are executed in order that are performed when indexing a document
- Useful for having dedicated ingest nodes

# Machine learning (node.ml: true|false, xpack.ml.enabled: true|false)

- node.ml identifies whether a node is eligible to run machine learning jobs
- xpack.ml.enabled enables or disables the machine learning feature on a node

# Coordination

- Coordination refers to the distribution of queries and the aggregation of results
- Useful for coordination-only nodes (for large clusters)
- Configured by disabling all other roles

# Voting-only (node.voting_only: true|false)

- Rarely used, and you almost certainly won't use it either
- A node with this role, will participate in the voting for a new master node
- The node cannot be elected as the master node itself, though
- Only used for large clusters
