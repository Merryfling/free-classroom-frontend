export interface CourseSchedule {
  xqj: string;
  ksjc: string;
  jsjc: string;
  kksd?: string;
  xkkh?: string;
  kssj?: string;
  jssj?: string;
  people?: string;
  teacher?: string;
  course?: string;
  c_name?: string;
}

export interface ClassroomSchedule {
  room: string;
  freeSlots: number[][];
  hasLongFreeSlot: boolean;
}

export const CLASSROOMS = [
  "二教101", "二教102", "二教103", "二教104", "二教105", "二教106", "二教107", "二教108", "二教110",
  "二教201", "二教203", "二教204", "二教205", "二教206", "二教207", "二教208", "二教210", "二教212", "二教214", "二教215",
  "二教301", "二教303", "二教304", "二教305", "二教306", "二教307", "二教308", "二教310", "二教312", "二教314", "二教315",
  "二教401", "二教403", "二教404", "二教406", "二教408"
];

export const TIME_SLOTS = [
  { period: "1-2", time: "8:30-9:55" },
  { period: "3-4", time: "10:30-11:55" },
  { period: "5-6", time: "14:30-15:55" },
  { period: "7-8", time: "16:30-17:55" },
  { period: "9-10", time: "19:30-20:55" },
  { period: "11-12", time: "21:00-21:55" }
];