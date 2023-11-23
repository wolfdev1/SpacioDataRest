export interface Credentials {
    username: string;
    password: string;
    perms: {
        user: boolean;
        rank: boolean;
        roles: boolean;
        mod: boolean;
        channels: boolean;
    }
  }
  