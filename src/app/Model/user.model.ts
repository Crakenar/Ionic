import {Serializable} from '../places/Service/Serializable';
import {Reservation} from './reservation.model';

export class User extends Serializable {
    public id?: string;
    public email?: string;
    public password?: string;
    public reservations?: string[];
}
