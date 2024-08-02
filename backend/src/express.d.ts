import {User} from './model'


declare module 'express' {
    export interface Request {
        User?: User
    }
}