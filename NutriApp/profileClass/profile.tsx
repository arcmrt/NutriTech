import axios from "axios";

interface BodyVitals {
    bmi: number | string;
    height: number | string;
    weight: number | string;
}
  
export interface UserInfo {
    bodyVitals: BodyVitals[];
    chronicDiseases: string[][];
    diet: (string | string[])[];
    email: string;
    intolerances: string[][];
    userName: string;
}

export class UserProfile {
    private profileData: UserInfo | null = null;

    async fetchProfile(userName: string): Promise<void> {
        const API_URL = 'https://uvz80evw9b.execute-api.eu-west-1.amazonaws.com/prod/getVitals';
        try {
            const response = await axios.post(API_URL, { userName });
            this.profileData = response.data;
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }

    async getProfile(): Promise<UserInfo | null> {
        return this.profileData;
    }
}
