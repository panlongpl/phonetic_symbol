export type LearningRecord = {
  symbolId: string;
  practiced: number;
  correct: number;
  lastPracticed: number;
  masteryLevel: 'beginner' | 'intermediate' | 'advanced' | 'mastered';
};

export type RuleLearningRecord = {
  ruleId: string;
  practiced: number;
  lastPracticed: number;
  masteryLevel: 'beginner' | 'intermediate' | 'advanced' | 'mastered';
};

export type LearningProgress = {
  phoneticRecords: Record<string, LearningRecord>;
  ruleRecords: Record<string, RuleLearningRecord>;
  totalPracticeTime: number;
  streak: number;
  lastActiveDate: string;
  weakPoints: string[];
};

export const STORAGE_KEY = 'phonetic-learning-progress';

function getDefaultProgress(): LearningProgress {
  return {
    phoneticRecords: {},
    ruleRecords: {},
    totalPracticeTime: 0,
    streak: 0,
    lastActiveDate: '',
    weakPoints: [],
  };
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function calcMasteryLevel(correct: number): LearningRecord['masteryLevel'] {
  if (correct >= 30) return 'mastered';
  if (correct >= 15) return 'advanced';
  if (correct >= 5) return 'intermediate';
  return 'beginner';
}

function calcRuleMasteryLevel(practiced: number): RuleLearningRecord['masteryLevel'] {
  if (practiced >= 30) return 'mastered';
  if (practiced >= 15) return 'advanced';
  if (practiced >= 5) return 'intermediate';
  return 'beginner';
}

function calcWeakPoints(records: Record<string, LearningRecord>): string[] {
  return Object.values(records)
    .filter((r) => r.practiced > 0 && r.correct / r.practiced < 0.5)
    .map((r) => r.symbolId);
}

function updateStreak(progress: LearningProgress): void {
  const today = getToday();
  if (progress.lastActiveDate === today) return;

  const lastDate = progress.lastActiveDate ? new Date(progress.lastActiveDate) : null;
  const todayDate = new Date(today);

  if (lastDate) {
    const diffMs = todayDate.getTime() - lastDate.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    if (diffDays === 1) {
      progress.streak += 1;
    } else if (diffDays > 1) {
      progress.streak = 1;
    }
  } else {
    progress.streak = 1;
  }

  progress.lastActiveDate = today;
}

export function getProgress(): LearningProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as LearningProgress;
    }
  } catch {
    /* empty */
  }
  return getDefaultProgress();
}

export function saveProgress(progress: LearningProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function updatePhoneticRecord(symbolId: string, correct: boolean): void {
  const progress = getProgress();
  const existing = progress.phoneticRecords[symbolId];

  if (existing) {
    existing.practiced += 1;
    if (correct) existing.correct += 1;
    existing.lastPracticed = Date.now();
    existing.masteryLevel = calcMasteryLevel(existing.correct);
  } else {
    progress.phoneticRecords[symbolId] = {
      symbolId,
      practiced: 1,
      correct: correct ? 1 : 0,
      lastPracticed: Date.now(),
      masteryLevel: correct ? calcMasteryLevel(1) : 'beginner',
    };
  }

  progress.weakPoints = calcWeakPoints(progress.phoneticRecords);
  updateStreak(progress);
  saveProgress(progress);
}

export function updateRuleRecord(ruleId: string): void {
  const progress = getProgress();
  const existing = progress.ruleRecords[ruleId];

  if (existing) {
    existing.practiced += 1;
    existing.lastPracticed = Date.now();
    existing.masteryLevel = calcRuleMasteryLevel(existing.practiced);
  } else {
    progress.ruleRecords[ruleId] = {
      ruleId,
      practiced: 1,
      lastPracticed: Date.now(),
      masteryLevel: calcRuleMasteryLevel(1),
    };
  }

  updateStreak(progress);
  saveProgress(progress);
}

export function getWeakPoints(): string[] {
  const progress = getProgress();
  return calcWeakPoints(progress.phoneticRecords);
}

export function getStreak(): number {
  const progress = getProgress();
  return progress.streak;
}

export function getMasteryStats(): { total: number; mastered: number; intermediate: number; beginner: number } {
  const progress = getProgress();
  const records = Object.values(progress.phoneticRecords);
  return {
    total: records.length,
    mastered: records.filter((r) => r.masteryLevel === 'mastered' || r.masteryLevel === 'advanced').length,
    intermediate: records.filter((r) => r.masteryLevel === 'intermediate').length,
    beginner: records.filter((r) => r.masteryLevel === 'beginner').length,
  };
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}
