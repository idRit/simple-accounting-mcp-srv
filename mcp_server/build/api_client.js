// apiClient.ts
const BASE_URL = 'http://localhost:4200';
export async function addTransaction(transaction) {
    try {
        const res = await fetch(`${BASE_URL}/transaction/entry`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transaction),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Error ${res.status}: ${errorData.message || res.statusText}`);
        }
        const data = await res.json();
        console.log('Transaction added:', data);
        return data;
    }
    catch (error) {
        console.error('Failed to add transaction:', error);
    }
}
export async function getAllTransactions() {
    try {
        const res = await fetch(`${BASE_URL}/transaction/all-entries`);
        if (!res.ok)
            throw new Error(`Error ${res.status}`);
        const data = await res.json();
        console.log('All transactions:', data);
        return data;
    }
    catch (error) {
        console.error('Failed to fetch transactions:', error);
    }
}
// Example usage
// (async () => {
//   await addTransaction({ origin: 'Freelance', amount: 1200, type: 'credit' });
//   await getAllTransactions();
// })();
