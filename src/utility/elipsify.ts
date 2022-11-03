export function elipsify(value: string, elpsifyThreshold: number = 15): string {
    if (value.length < 15) return value;
    return value.slice(0, elpsifyThreshold) + "...";
}