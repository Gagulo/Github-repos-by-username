export interface Repository {
  id: number;
  name: string;
  owner: Owner;
  fork: boolean;
  branches?: Array<Branch>;
}

interface Owner {
  login: string;
}

export interface Branch {
  name: string;
  commit: Commit;
}
interface Commit {
  sha: string;
}

export interface Problems {
  variant: number;
  quote: string;
  problem: string;
}
