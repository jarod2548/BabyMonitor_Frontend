export const HeartbeatSimulation = (
    adjustAmount: number,
    timeCost: number,
    onUpdate: React.Dispatch<React.SetStateAction<number>>
    ) => {
    const intervalMs = 1000;
    const steps = timeCost;

    let count = 0;
    let startValue = 0;

    onUpdate(prev => {
    startValue = prev;
    return prev;
    });


    const interval = setInterval(() => {
         
        count++;
        const progress = count / steps;
        const value = startValue + adjustAmount * progress;

        onUpdate(Math.round(value));

        if (count >= steps) {
        clearInterval(interval);
        }
    }, intervalMs);
    };
