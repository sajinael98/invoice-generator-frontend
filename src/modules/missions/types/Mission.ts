export interface MissionResponse {
    id: number;
    title: string;
    description?: string;
    hourlyRate: number;
    estimatedMins: number;
}