export interface IMission {
    id: number;
    title: string;
    description: string;
    rate: number;
}

export interface MissionResponse extends IMission { }

export interface CreateMissionRequest extends Omit<IMission, 'id'> { }

export interface UpdateMissionRequest { }