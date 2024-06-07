import {Photo, Profile} from "../models/profile";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {toast} from "react-toastify";

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            })
        } catch (error) {
            toast.error('Problem loading profile');
            runInAction(() => {
                this.loadingProfile = false;
            })
        }
    }

}