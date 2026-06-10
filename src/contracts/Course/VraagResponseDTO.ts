import type { ctgData } from "../ctgData";

export type VraagReponseDTO = {
    courseID : number;
    tekst : string;
    id : number;
    ctgData: ctgData;
}