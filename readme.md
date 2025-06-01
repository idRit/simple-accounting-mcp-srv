# Simple Accounting MCP Server

A lightweight Model Context Protocol (MCP) server for basic accounting operations, providing transaction management capabilities through a simple API.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **Docker** (for containerized deployment)

## Quick Start

### 1. Start the API Server

Run the following command to start the API server:

```bash
./run.sh
```

This script will handle the initial setup and start the server with the necessary configurations.

### 2. Build the MCP Server

Navigate to the MCP server directory and build the project:

```bash
cd mcp_server
npm run build
```

### 3. Configure Your MCP Client

Add the following configuration to your MCP client's configuration JSON file:

```json
{
    "mcpServers": {
        "accounting": {
            "command": "node",
            "args": [
                "/ABSOLUTE/PATH/TO/FOLDER/mcp_server/build/index.js"
            ]
        }
    }
}
```

**Important:** Replace `/ABSOLUTE/PATH/TO/FOLDER/` with the actual absolute path to your project directory.

## Features

- **Transaction Management**: Add, view, and manage accounting transactions
- **MCP Integration**: Seamless integration with MCP-compatible clients
- **Docker Support**: Containerized deployment option
- **RESTful API**: Standard HTTP API for external integrations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source. Please refer to the LICENSE file for details.

---

For more information about the Model Context Protocol, visit the [official MCP documentation](https://modelcontextprotocol.io/).