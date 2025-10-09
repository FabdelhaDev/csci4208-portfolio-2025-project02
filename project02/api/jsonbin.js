const BIN_ID = "68e6fce2ae596e708f0b286b";
const ACCESS_KEY = "$2a$10$X2zJFWLK3sgBrYgpH.IuGe/ztUO8K0DMNgrJbzYrzp8xVq3zRs3u2"; 

export async function saveBestRun(runData) {
    const url = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
    const headers = {
        "Content-Type": "application/json",
        "X-Master-Key": ACCESS_KEY
    };

    try {
        await fetch(url, { method: "PUT", headers, body: JSON.stringify(runData) });
        console.log("Best run saved to JSONBin");
    } catch (err) {
        console.error("JSONBin PUT failed:", err);
    }
}

export async function loadBestRun() {
    const url = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`;
    const headers = { "X-Master-Key": ACCESS_KEY };

    try {
        const res = await fetch(url, { headers });
        const data = await res.json();
        return data.record;
    } catch (err) {
        console.error("JSONBin GET failed:", err);
        return null;
    }
}
