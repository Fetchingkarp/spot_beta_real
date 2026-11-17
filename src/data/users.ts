
/* =========================================
   USER DATA STRUCTURES
========================================= */

export type Friend = {
  userId: string;
  since: string;
};

export type Notification = {
  id: string;
  type: 'exercise' | 'friendRequest' | 'groupRequest';

  senderName: string;
  description: string;
  timestamp: string;

  actionLabel?: string;
};

export type Group = {
  groupId: string;
  name: string;
  description: string;
  memberIds: string[];
};

export type ExerciseLog = {
  logId: string;
  activity: string;
  date: string;
  durationMinutes: number;
  experienceEarned: number;
};

export type User = {
  userId: string;
  name: string;
  profilePicture: string;
  status: 'online' | 'offline' | 'busy' | 'exercising';

  experience: number;

  friends: Friend[];
  friendRequests: string[];
  notifications: Notification[];
  groups: Group[];
  logs: ExerciseLog[];
};


/* =========================================
   LEVEL CALCULATION
========================================= */

// Every 100 XP = 1 level
export function calculateLevel(experience: number): number {
  return Math.floor(experience / 100) + 1;
}

// Calculate XP needed for the next level
export function experienceToNextLevel(experience: number): number {
  return 100 - (experience % 100);
}


/* =========================================
   USER DATABASE
========================================= */

export const users: User[] = [

  {
    userId: 'user001',
    name: 'Alex',
    profilePicture: 'https://i.pravatar.cc/150?img=12',
    status: 'online',
    experience: 520,

    friends: [
      { userId: 'user002', since: '2026-01-10' },
      { userId: 'user003', since: '2026-02-15' },
    ],

    friendRequests: [
      'user004',
      'user005',
    ],

    notifications: [
      {
        id: 'notif001',
        type: 'friendRequest',
        senderName: 'Jordan',
        description: 'Jordan has sent you a friend request',
        timestamp: '2 minutes ago',
        actionLabel: 'Accept / Decline',
      },
      {
        id: 'notif002',
        type: 'exercise',
        senderName: 'Taylor',
        description: 'Taylor has invited you to an exercise session',
        timestamp: '15 minutes ago',
        actionLabel: 'Join Session',
      },
      {
        id: 'notif003',
        type: 'groupRequest',
        senderName: 'Morgan',
        description: 'Morgan has invited you to join a group',
        timestamp: '1 hour ago',
        actionLabel: 'View Invite',
      },
    ],

    groups: [
      {
        groupId: 'group001',
        name: 'Morning Runners',
        description: 'A group for morning exercise enthusiasts.',
        memberIds: ['user001', 'user002', 'user004'],
      },
    ],

    logs: [
      {
        logId: 'log001',
        activity: 'Running',
        date: '2026-11-15',
        durationMinutes: 30,
        experienceEarned: 30,
      },
      {
        logId: 'log002',
        activity: 'Walking',
        date: '2026-11-14',
        durationMinutes: 20,
        experienceEarned: 15,
      },
    ],
  },

  {
    userId: 'user002',
    name: 'Jordan',
    profilePicture: 'https://i.pravatar.cc/150?img=11',
    status: 'exercising',
    experience: 820,

    friends: [
      { userId: 'user001', since: '2026-01-10' },
      { userId: 'user003', since: '2026-03-01' },
    ],
    friendRequests: [],

    notifications: [],

    groups: [
      {
        groupId: 'group001',
        name: 'Morning Runners',
        description: 'A group for morning exercise enthusiasts.',
        memberIds: ['user001', 'user002', 'user004'],
      },
      {
        groupId: 'group002',
        name: 'Weekend Walkers',
        description: 'Casual weekend walking group.',
        memberIds: ['user002', 'user003'],
      },
    ],

    logs: [
      {
        logId: 'log003',
        activity: 'Cycling',
        date: '2026-11-16',
        durationMinutes: 45,
        experienceEarned: 50,
      },
    ],
  },

  {
    userId: 'user003',
    name: 'Taylor',
    profilePicture: 'https://i.pravatar.cc/150?img=47',
    status: 'offline',
    experience: 120,

    friends: [
      { userId: 'user001', since: '2026-02-15' },
      { userId: 'user002', since: '2026-03-01' },
    ],
    friendRequests: [],

    notifications: [],

    groups: [
      {
        groupId: 'group002',
        name: 'Weekend Walkers',
        description: 'Casual weekend walking group.',
        memberIds: ['user002', 'user003'],
      },
    ],

    logs: [
      {
        logId: 'log004',
        activity: 'Walking',
        date: '2026-11-12',
        durationMinutes: 25,
        experienceEarned: 20,
      },
    ],
  },

  {
    userId: 'user004',
    name: 'Morgan',
    profilePicture: 'https://i.pravatar.cc/150?img=32',
    status: 'busy',
    experience: 1560,

    friends: [
      { userId: 'user001', since: '2026-04-01' },
    ],
    friendRequests: [],

    notifications: [],

    groups: [
      {
        groupId: 'group001',
        name: 'Morning Runners',
        description: 'A group for morning exercise enthusiasts.',
        memberIds: ['user001', 'user002', 'user004'],
      },
    ],

    logs: [
      {
        logId: 'log005',
        activity: 'Running',
        date: '2026-11-16',
        durationMinutes: 60,
        experienceEarned: 70,
      },
    ],
  },

];


/* =========================================
   HELPER FUNCTIONS
========================================= */

// Find a user by ID
export function getUserById(userId: string): User | undefined {
  return users.find(user => user.userId === userId);
}

// Get a user's level
export function getUserLevel(userId: string): number | undefined {
  const user = getUserById(userId);

  if (!user) return undefined;

  return calculateLevel(user.experience);
}

// Get a user's friends
export function getUserFriends(userId: string): User[] {
  const user = getUserById(userId);

  if (!user) return [];

  return user.friends
    .map(friend => getUserById(friend.userId))
    .filter((friend): friend is User => friend !== undefined);
}
