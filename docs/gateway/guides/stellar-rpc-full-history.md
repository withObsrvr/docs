---
sidebar_position: 1
title: Stellar RPC with Full History (Testnet)
description: Run Stellar RPC on testnet with external datastore for complete historical ledger access
---

# Running Stellar RPC with Full History Access on Testnet

This guide explains how to deploy a Stellar RPC node on testnet with access to complete historical ledger data using Google Cloud Storage as an external datastore. This setup allows you to query any point in Stellar's testnet history without storing the entire ledger locally.

## Overview

Stellar RPC nodes typically store only recent ledger data due to storage constraints. By integrating with an external datastore (like Google Cloud Storage), you can:

- Access the complete history of the Stellar testnet
- Minimize local storage requirements
- Query historical transactions and ledger states
- Scale your infrastructure efficiently

## Available Datastores

Obsrvr provides public access to testnet ledger data through Google Cloud Storage:

- **Bucket**: `obsrvr-stellar-ledger-data-testnet-data`
- **Path**: `landing/ledgers/testnet`
- **Billing**: Requester pays (you'll need your own GCP billing account)

## Prerequisites

Before starting, ensure you have:

- Docker installed and running
- Google Cloud SDK installed (for authentication)
- A Google Cloud account with billing enabled (for requester pays)
- Basic familiarity with command line operations

## Step 1: Install Google Cloud SDK

Install the Google Cloud SDK to handle authentication:

### macOS
```bash
brew install google-cloud-sdk
```

### Ubuntu/Debian
```bash
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
sudo apt-get update && sudo apt-get install google-cloud-sdk
```

### Other Systems
Visit the [official Google Cloud SDK documentation](https://cloud.google.com/sdk/docs/install) for installation instructions.

## Step 2: Configure Authentication

Since the Obsrvr public bucket uses "requester pays", you must authenticate with Google Cloud:

### Option A: Application Default Credentials (Development)

Best for local development and testing:

```bash
gcloud auth application-default login
```

This opens a browser for authentication and stores credentials locally.

### Option B: Service Account (Production)

Recommended for production deployments:

1. Create a service account in Google Cloud Console
2. Download the JSON key file
3. Ensure the service account has billing enabled
4. Use the key file in your Docker deployment (see Step 4)

**Note**: The requester pays model means your Google Cloud account will be billed for data egress charges when accessing the bucket.

## Step 3: Create Configuration Files

### Stellar RPC Configuration

Create `stellar-rpc-datastore.toml`:

```toml
# Stellar RPC configuration with external datastore
# For stellar/stellar-rpc:23.0.0

# Basic configuration
ENDPOINT = "0.0.0.0:8000"
ADMIN_ENDPOINT = "0.0.0.0:8001"
NETWORK_PASSPHRASE = "Test SDF Network ; September 2015"
HISTORY_ARCHIVE_URLS = ["https://history.stellar.org/prd/core-testnet/core_testnet_001"]
STELLAR_CORE_BINARY_PATH = "/usr/bin/stellar-core"
CAPTIVE_CORE_CONFIG_PATH = "/config/stellar-core.cfg"
CAPTIVE_CORE_STORAGE_PATH = "/data/captive-core"
DB_PATH = "/data/stellar_rpc.sqlite"

# Logging
LOG_LEVEL = "info"
LOG_FORMAT = "text"

# Set retention to minimum value (1 ledger) to minimize local storage
# The datastore will handle historical queries beyond this
HISTORY_RETENTION_WINDOW = 1

# Fee stats windows must be <= history retention window
SOROBAN_FEE_STATS_RETENTION_WINDOW = 1
CLASSIC_FEE_STATS_RETENTION_WINDOW = 1

# Enable external datastore for historical ledgers
SERVE_LEDGERS_FROM_DATASTORE = true

# Datastore configuration
[datastore_config]
type = "GCS"

[datastore_config.params]
# Obsrvr testnet ledger data bucket
destination_bucket_path = "obsrvr-stellar-ledger-data-testnet-data/landing/ledgers/testnet"

[datastore_config.schema]
ledgers_per_file = 1
files_per_partition = 64000

# Buffered storage backend configuration
[buffered_storage_backend_config]
buffer_size = 100
num_workers = 10
retry_limit = 3
retry_wait = "5s"


```

### Stellar Core Configuration

Create `stellar-core.cfg`:

```toml
# Stellar Core configuration for testnet
NETWORK_PASSPHRASE="Test SDF Network ; September 2015"

DATABASE="sqlite3:///data/stellar.db"

UNSAFE_QUORUM=true
FAILURE_SAFETY=0

[[HOME_DOMAINS]]
HOME_DOMAIN="testnet.stellar.org"
QUALITY="HIGH"

[[VALIDATORS]]
NAME="sdf_testnet_1"
HOME_DOMAIN="testnet.stellar.org"
PUBLIC_KEY="GDKXE2OZMJIPOSLNA6N6F2BVCI3O777I2OOC4BV7VOYUEHYX7RTRYA7Y"
ADDRESS="core-testnet1.stellar.org"
HISTORY="curl -sf https://history.stellar.org/prd/core-testnet/core_testnet_001/{0} -o {1}"

[[VALIDATORS]]
NAME="sdf_testnet_2"
HOME_DOMAIN="testnet.stellar.org"
PUBLIC_KEY="GCUCJTIYXSOXKBSNFGNFWW5MUQ54HKRPGJUTQFJ5RQXZXNOLNXYDHRAP"
ADDRESS="core-testnet2.stellar.org"
HISTORY="curl -sf https://history.stellar.org/prd/core-testnet/core_testnet_002/{0} -o {1}"

[[VALIDATORS]]
NAME="sdf_testnet_3"
HOME_DOMAIN="testnet.stellar.org"
PUBLIC_KEY="GC2V2EFSXN6SQTWVYA5EPJPBWWIMSD2XQNKUOHGEKB535AQE2I6IXV2Z"
ADDRESS="core-testnet3.stellar.org"
HISTORY="curl -sf https://history.stellar.org/prd/core-testnet/core_testnet_003/{0} -o {1}"
```

## Step 4: Deploy with Docker

### With Application Default Credentials

```bash
docker run -d \
  --name stellar-rpc \
  -p 8000:8000 \
  -v ~/.config/gcloud:/root/.config/gcloud:ro \
  -v $(pwd)/stellar-rpc-datastore.toml:/config/stellar-rpc.toml \
  -v $(pwd)/stellar-core.cfg:/config/stellar-core.cfg \
  -v stellar-rpc-data:/ledgers \
  -e GOOGLE_APPLICATION_CREDENTIALS=/root/.config/gcloud/application_default_credentials.json \
  stellar/stellar-rpc:latest \
  --config-path /config/stellar-rpc.toml
```

### With Service Account Key

```bash
docker run -d \
  --name stellar-rpc \
  -p 8000:8000 \
  -v $(pwd)/service-account-key.json:/config/gcp-key.json:ro \
  -v $(pwd)/stellar-rpc-datastore.toml:/config/stellar-rpc.toml \
  -v $(pwd)/stellar-core.cfg:/config/stellar-core.cfg \
  -v stellar-rpc-data:/ledgers \
  -e GOOGLE_APPLICATION_CREDENTIALS=/config/gcp-key.json \
  stellar/stellar-rpc:latest \
  --config-path /config/stellar-rpc.toml
```


## Step 5: Verify Your Setup

### Check Container Logs

Monitor the startup process:

```bash
docker logs -f stellar-rpc
```

Look for messages indicating successful datastore connection and ledger retrieval.

### Test RPC Endpoint

Once running, test the health endpoint:

```bash
curl http://localhost:8000/health
```

### Test RPC Methods

#### 1. Get Latest Ledger

Verify the RPC is syncing with the network:

```bash
curl -X POST http://localhost:8000 \
  -H 'Content-Type: application/json' \
  -d '{
    "jsonrpc": "2.0",
    "method": "getLatestLedger",
    "id": 1
  }'
```

Expected response:
```json
{
  "id": "1",
  "jsonrpc": "2.0",
  "result": {
    "id": "...",
    "protocolVersion": 21,
    "sequence": 502464
  }
}
```

#### 2. Query Historical Ledgers

Test retrieval of historical ledgers from the datastore:

```bash
# Get a very old ledger (ledger 10000)
curl -X POST http://localhost:8000 \
  -H 'Content-Type: application/json' \
  -d '{
    "jsonrpc": "2.0",
    "method": "getLedgers",
    "params": {
      "startLedger": 10000,
      "pagination": {
        "limit": 1
      }
    },
    "id": 1
  }' | jq
```

#### 3. Test Recent Ledgers

Verify recent ledgers are accessible:

```bash
# Get a recent ledger
curl -X POST http://localhost:8000 \
  -H 'Content-Type: application/json' \
  -d '{
    "jsonrpc": "2.0",
    "method": "getLedgers",
    "params": {
      "startLedger": 500000,
      "pagination": {
        "limit": 1
      }
    },
    "id": 1
  }' | jq
```

#### 4. Pagination Test

Test pagination through multiple ledgers:

```bash
# Get 5 ledgers starting from ledger 10000
curl -X POST http://localhost:8000 \
  -H 'Content-Type: application/json' \
  -d '{
    "jsonrpc": "2.0",
    "method": "getLedgers",
    "params": {
      "startLedger": 10000,
      "pagination": {
        "limit": 5
      }
    },
    "id": 1
  }' | jq '.result.ledgers[].sequence'
```

#### 5. Get Transactions from Historical Ledger

Retrieve transactions from a specific historical ledger:

```bash
# Get transactions from ledger 50000
curl -X POST http://localhost:8000 \
  -H 'Content-Type: application/json' \
  -d '{
    "jsonrpc": "2.0",
    "method": "getTransactions",
    "params": {
      "startLedger": 50000,
      "pagination": {
        "limit": 10
      }
    },
    "id": 1
  }' | jq
```

#### 6. Test Very Early Ledger

Verify access to genesis or early ledgers:

```bash
# Get one of the first ledgers
curl -X POST http://localhost:8000 \
  -H 'Content-Type: application/json' \
  -d '{
    "jsonrpc": "2.0",
    "method": "getLedgers",
    "params": {
      "startLedger": 2,
      "pagination": {
        "limit": 1
      }
    },
    "id": 1
  }' | jq
```

### Monitor Datastore Access

Check logs for datastore-related messages:

```bash
# View datastore operations
docker logs stellar-rpc 2>&1 | grep -i datastore

# Check for successful ledger retrievals
docker logs stellar-rpc 2>&1 | grep -i "fetched ledger"

# Monitor any datastore errors
docker logs stellar-rpc 2>&1 | grep -i "error.*datastore"
```

You should see messages like:
- "Successfully connected to datastore"
- "Fetched ledger X from datastore"
- "Datastore buffer size: Y"

### Performance Testing

Test the response time for different ledger ranges:

```bash
# Time a historical query
time curl -X POST http://localhost:8000 \
  -H 'Content-Type: application/json' \
  -d '{
    "jsonrpc": "2.0",
    "method": "getLedgers",
    "params": {
      "startLedger": 100000,
      "pagination": {
        "limit": 1
      }
    },
    "id": 1
  }' > /dev/null
```

### Verify Full History Access

Run this script to test access across different ledger ranges:

```bash
#!/bin/bash
# test-history.sh

echo "Testing Stellar RPC historical data access..."

# Array of test ledgers spanning testnet history
test_ledgers=(100 1000 10000 50000 100000 200000 300000 400000 500000)

for ledger in "${test_ledgers[@]}"; do
    echo -n "Testing ledger $ledger: "
    
    response=$(curl -s -X POST http://localhost:8000 \
      -H 'Content-Type: application/json' \
      -d "{
        \"jsonrpc\": \"2.0\",
        \"method\": \"getLedgers\",
        \"params\": {
          \"startLedger\": $ledger,
          \"pagination\": {
            \"limit\": 1
          }
        },
        \"id\": 1
      }")
    
    if echo "$response" | jq -e '.result.ledgers[0]' > /dev/null 2>&1; then
        echo "✓ Success"
    else
        echo "✗ Failed"
        echo "$response" | jq
    fi
done
```

Make the script executable and run it:

```bash
chmod +x test-history.sh
./test-history.sh
```

## Performance Tuning

### Optimize Datastore Access

Adjust these parameters in your configuration based on your needs:

- `DATASTORE_WORKERS`: Number of parallel workers (default: 16)
- `DATASTORE_LEDGER_BUFFER_SIZE`: Ledger prefetch buffer (default: 5)
- `INGESTION_BUFFER_SIZE`: Ingestion pipeline buffer (default: 128)

### Resource Allocation

For production deployments, ensure adequate resources:

```bash
docker run -d \
  --name stellar-rpc \
  --memory="8g" \
  --cpus="4" \
  -p 8000:8000 \
  # ... other parameters
```

## Understanding Requester Pays

The Obsrvr public bucket uses Google Cloud's "requester pays" model:

- **You pay for data egress**: Charges apply when downloading ledger data
- **Typical costs**: ~$0.12 per GB for most regions
- **Billing requirement**: Your GCP account must have billing enabled
- **Usage tracking**: Monitor costs in your GCP billing dashboard

To estimate costs:
- Initial sync: May download several GB depending on the ledger range
- Ongoing operation: Minimal costs for recent ledgers
- Historical queries: Costs depend on frequency and data volume

## Troubleshooting

### Authentication Errors

If you see authentication errors:

1. Verify your credentials are properly mounted
2. Ensure your GCP account has billing enabled
3. Check that you're authenticated: `gcloud auth list`
4. Verify the bucket and path are correct

### Performance Issues

For slow historical queries:

1. Increase `DATASTORE_WORKERS`
2. Check network connectivity to Google Cloud
3. Monitor container resource usage

### Storage Issues

The `HISTORY_RETENTION_WINDOW = 1` setting minimizes local storage. If you need more recent ledgers cached locally, increase this value.

## Production Considerations

### Security

1. Use service account authentication with minimal permissions
2. Run the container with a non-root user
3. Implement SSL termination with a reverse proxy
4. Restrict network access to the RPC endpoint

### Monitoring

Set up monitoring for:

- Container health and resource usage
- RPC endpoint availability
- Query performance metrics
- Datastore access patterns

### Backup Strategy

While the datastore provides historical data, consider:

- Regular configuration backups
- Database snapshots for quick recovery
- Disaster recovery procedures

## Alternative Datastores

Stellar RPC currently supports two datastore types:

### Google Cloud Storage (GCS)
This guide uses GCS with Obsrvr's public testnet bucket.

### AWS S3
For S3-based datastores, use this configuration:

```json
{
  "type": "S3",
  "params": {
    "destination_bucket_path": "your-s3-bucket",
    "region": "us-east-1",
    "endpoint_url": "endpoint url optional"
  }
}
```

You'll need to configure AWS credentials similarly to the GCS setup.

## Next Steps

- Explore [Stellar RPC API documentation](https://developers.stellar.org/docs/data/rpc)
- Learn about [Obsrvr's managed RPC services](/docs/intro)
- Set up [monitoring and alerting](https://prometheus.io/) for your node

## Need Help?

If you prefer a managed solution without infrastructure complexity, consider [Obsrvr's Gateway Services](/docs/intro) which provide:

- Instant access to full history
- No infrastructure management
- Enterprise-grade reliability
- Simple API integration

Contact us at support@withobsrvr.com for more information.