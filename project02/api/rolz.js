export async function rollDamage() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); 

    try {
        const response = await fetch("https://rolz.org/api/?1d10.json", {
            signal: controller.signal
        });
        if (!response.ok) throw new Error("Failed to fetch damage roll");
        const data = await response.json();
        return data.result; 
    } catch (err) {
        console.warn("Dice roll failed, using default damage:", err);
        return 5; // 
    } finally {
        clearTimeout(timeout);
    }
}