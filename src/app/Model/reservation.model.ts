import {Serializable} from '../places/Service/Serializable';

export class Reservation extends Serializable {
    public id?: string;
    public nomPlace?: string;
    public price?: number;
    public idPlace?: string;
    public dateResa?: string;
    public dateDebut?: string;
    public dateFin?: string;
    public nbJours?: string;
    public idUser?: string;
}
