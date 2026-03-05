export function waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
            const element = await document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                resolve();
            }
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            reject(new Error(`Element ${selector} not found within ${timeout}ms`));
        }, timeout);
    });
}

export function formatData(data: any): string {
    return JSON.stringify(data, null, 2);
}