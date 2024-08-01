import {GenericObject} from "../../../../../types.ts";

export interface BannerPhrase extends GenericObject {
    id: string;
    phrase: string;
}

export interface BannerPhrasesData {
    bannerPhrases: BannerPhrase[];
}
