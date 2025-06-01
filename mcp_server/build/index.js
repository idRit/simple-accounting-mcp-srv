import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as transactionClient from './api_client.js';
// Create server instance
const server = new McpServer({
    name: "simple-accounting",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
const currencySchema = z.union([
    z.string().transform(x => x.replace(/[^0-9.-]+/g, '')),
    z.number(),
]).pipe(z.coerce.number().min(0.0001).max(999999999));
server.tool("add-transaction-entry", "Add a Transaction", {
    origin: z.string().describe("From where did this entry originate from?"),
    amount: currencySchema.describe("Transaction Amount"),
    type: z.enum(['credit', 'debit']).describe("Type of transaction"),
}, async ({ origin, amount, type }) => {
    const data = await transactionClient.addTransaction({
        origin,
        amount,
        type,
    });
    if (!data)
        return {
            content: [
                {
                    type: "text",
                    text: "Failed to create transaction entry",
                },
            ],
        };
    return {
        content: [
            {
                type: "text",
                text: "Transaction entry created",
            },
        ],
    };
});
server.tool("get-all-transaction-entries", "Get all Transaction Entries", {}, async () => {
    const data = await transactionClient.getAllTransactions();
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(data),
            },
        ],
    };
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Simple Accounting MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
