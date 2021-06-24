import {Serializable} from './Service/Serializable';

export class Place extends Serializable {
    public id?: string;
    public title?: string;
    public description?: string;
    public imageUrl?: string;
    public price?: number;
    public personal?: boolean;
    public userId?: string;
    public dateDebtDispo?: string;
    public dateFinDispo?: string;
}
