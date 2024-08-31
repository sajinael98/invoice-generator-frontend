export enum TaskStatus {
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    PAUSED = 'PAUSED',
    COMPLETED = 'COMPLETED'
}

export interface Task {
    id: number;
    counter: number;
    missionTitle: string;
    workerId?: number;
    workerName?: string;
    note?: String;
    estimatedTime: number;
    status: TaskStatus
}