interface IWorker {
    id: number
    firstName: string;
    lastName: string;
    joinDate: string;
    dailyRate: number;
    userId: number;
}

export interface WorkerCreateRequest extends Omit<IWorker, "id"> {
}

export interface WorkerUpdateRequest extends IWorker {}

export interface WorkerResponseDto extends IWorker {}