import type { ctgData } from "../ctgData";

export type VraagReponseDTO = {
    courseID : number;
    tekst : string;
    vraagID : number;
    ctgData: ctgData;
}