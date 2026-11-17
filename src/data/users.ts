
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
    profilePicture: 'data:image/jpeg;base64,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',
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
    profilePicture: 'https://miro.medium.com/v2/resize:fit:640/format:webp/1*6w60m-CYw1E5oK73mbA-Sw.jpeg',
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

export function addExperienceToUser(userId: string, amount: number) {
  const user = users.find((u) => u.userId === userId);

  if (!user || amount <= 0) {
    return null;
  }

  // Update total experience
  user.experience += Math.floor(amount);

  return user;
}
