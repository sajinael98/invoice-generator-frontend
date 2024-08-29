export enum TaskStatus {
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    PAUSESD = 'PAUSESD',
    COMPLETED = 'COMPLETED'
}

export interface ITask {
    id: number;
    counter: number;
    missionTitle: string;
    workerId?: number;
    workerName?: number;
    note?: string;
    estimatedTime: number;
    isDone: boolean;
    status: TaskStatus;
}