/**
 * Dashboard content.
 *
 * Figures, labels and copy come from the Figma frame 648:7862 ("Home").
 * Where the frame repeats one placeholder card six/eight times, the extra
 * entries were written in the same voice and domain so the desktop grid shows
 * real variety instead of the same sentence eight times.
 */

export type Tone = "warning" | "danger" | "success";

/** Direction of a comparison, independent of the metric's own accent. */
export type Direction = "positive" | "negative" | "neutral";

/**
 * One financial category. Everything belonging to a metric lives here, so the
 * selector and the detail panel can never drift apart — both read the same
 * object.
 */
export interface Metric {
  id: string;
  /** Bold label, e.g. "מכירות מצטברות". */
  label: string;
  /** Headline figure, already formatted. */
  value: string;
  /** Secondary comparison shown beside it, e.g. "יעד: 32%". */
  secondaryValue: string;
  /**
   * The metric's accent. `warning` is orange, `danger` red, `success` green —
   * the same tone tokens the goals and tasks use, so a metric never invents a
   * colour of its own.
   */
  tone: Tone;
  /** 0–100, drives the progress bar. */
  progress: number;
  /** Period the figures cover, e.g. "השבוע". */
  period: string;
  comparison: {
    value: string;
    label: string;
    direction: Direction;
  };
  chart: {
    type: "bar";
    /** Listed in RTL reading order — א first, on the right. */
    data: { day: string; value: number }[];
  };
  recommendations: {
    title: string;
    headline: string;
    description: string;
  };
  task: {
    title: string;
    description: string;
    actionLabel: string;
  };
}

export interface Insight {
  id: string;
  priority: { label: string; tone: Tone };
  category: string;
  title: string;
  /** "מה זיהינו" */
  observation: string;
  /** "למה זה קרה" */
  cause: string;
  /** "הפעולה המומלצת" */
  action: string;
}

export interface Task {
  id: string;
  status: string;
  tone: Tone;
  title: string;
  description: string;
}

export interface Goal {
  id: string;
  label: string;
  value: string;
  /** e.g. "מתוך ₪500,000" */
  baseline: string;
  /** e.g. "21 יום ליעד" — rendered in the goal's tone colour. */
  deadline: string;
  tone: Tone;
  /** 0–100. */
  progress: number;
}

export const venue = "ג׳פניקה סניף אריאל";

export const periods = [
  { id: "today", label: "היום" },
  { id: "week", label: "השבוע" },
  { id: "month", label: "החודש" },
  { id: "trailing12", label: "12 חודשים אחרונים" },
  { id: "year", label: "השנה" },
] as const;

export type PeriodId = (typeof periods)[number]["id"];

/**
 * The five categories. `progress` mirrors the 75% fill drawn in Figma for
 * every metric card — the design does not encode a per-metric value.
 */
export const metrics: Metric[] = [
  {
    id: "sales",
    label: "מכירות מצטברות",
    value: "₪30,887",
    secondaryValue: "₪1,329",
    tone: "warning",
    progress: 75,
    period: "השבוע",
    comparison: {
      value: "+3%",
      label: "לעומת השבוע שעבר",
      direction: "positive",
    },
    chart: {
      type: "bar",
      data: [
        { day: "א", value: 47 },
        { day: "ב", value: 34 },
        { day: "ג", value: 58 },
        { day: "ד", value: 43 },
        { day: "ה", value: 76 },
        { day: "ו", value: 34 },
      ],
    },
    recommendations: {
      title: "המלצות (AI)",
      headline: "המכירות מקדימות את היעד ב־4.2%.",
      description: "עיקר הגידול מגיע ממשמרות חמישי בין 19:00 ל־22:00.",
    },
    task: {
      title: "משימות",
      description: "הוסף שתי עמדות מלצרות למשמרת חמישי בערב.",
      actionLabel: "צור משימה",
    },
  },
  {
    id: "food-cost",
    label: "פוד קוסט",
    value: "0.9%",
    secondaryValue: "יעד: 32%",
    tone: "danger",
    progress: 75,
    period: "השבוע",
    comparison: {
      value: "+7.1%",
      label: "לעומת השבוע שעבר",
      direction: "negative",
    },
    chart: {
      type: "bar",
      data: [
        { day: "א", value: 38 },
        { day: "ב", value: 44 },
        { day: "ג", value: 52 },
        { day: "ד", value: 61 },
        { day: "ה", value: 78 },
        { day: "ו", value: 66 },
      ],
    },
    recommendations: {
      title: "המלצות (AI)",
      headline: "הפוד קוסט חורג מהיעד ב־7.1%.",
      description: "נראה שהעלייה קשורה לרכישות מספק הדגים.",
    },
    task: {
      title: "משימות",
      description: "בדוק את רכישות הדגים של 7 הימים האחרונים.",
      actionLabel: "צור משימה",
    },
  },
  {
    id: "labour-cost",
    label: "ליבור קוסט",
    value: "39.1%",
    secondaryValue: "יעד — 32%",
    tone: "success",
    progress: 75,
    period: "השבוע",
    comparison: {
      value: "−1.6%",
      label: "לעומת השבוע שעבר",
      direction: "positive",
    },
    chart: {
      type: "bar",
      data: [
        { day: "א", value: 55 },
        { day: "ב", value: 49 },
        { day: "ג", value: 46 },
        { day: "ד", value: 44 },
        { day: "ה", value: 62 },
        { day: "ו", value: 71 },
      ],
    },
    recommendations: {
      title: "המלצות (AI)",
      headline: "עלות העובדים נמוכה ב־1.6% מהיעד.",
      description: "סידור המשמרות החדש צמצם שעות עודפות בין 15:00 ל־17:00.",
    },
    task: {
      title: "משימות",
      description: "החל את סידור המשמרות החדש גם בסניף השני.",
      actionLabel: "צור משימה",
    },
  },
  {
    id: "fixed-costs",
    label: "הוצאות קבועות",
    value: "₪17,029",
    secondaryValue: "2% יותר",
    tone: "warning",
    progress: 75,
    period: "החודש",
    comparison: {
      value: "+2%",
      label: "לעומת החודש שעבר",
      direction: "negative",
    },
    chart: {
      type: "bar",
      data: [
        { day: "א", value: 40 },
        { day: "ב", value: 41 },
        { day: "ג", value: 40 },
        { day: "ד", value: 42 },
        { day: "ה", value: 48 },
        { day: "ו", value: 45 },
      ],
    },
    recommendations: {
      title: "המלצות (AI)",
      headline: "ההוצאות הקבועות עלו ב־2% החודש.",
      description: "חוזה חברת הניקיון התייקר ב־₪1,100 לחודש בחידוש האחרון.",
    },
    task: {
      title: "משימות",
      description: "השווה שתי הצעות מחיר לפני חידוש החוזה ב־31 ביולי.",
      actionLabel: "צור משימה",
    },
  },
  {
    id: "variable-costs",
    label: "הוצאות משתנות",
    value: "₪134,522",
    secondaryValue: "3 הוצאות",
    tone: "warning",
    progress: 75,
    period: "השבוע",
    comparison: {
      value: "+5.4%",
      label: "לעומת השבוע שעבר",
      direction: "negative",
    },
    chart: {
      type: "bar",
      data: [
        { day: "א", value: 33 },
        { day: "ב", value: 51 },
        { day: "ג", value: 39 },
        { day: "ד", value: 47 },
        { day: "ה", value: 82 },
        { day: "ו", value: 58 },
      ],
    },
    recommendations: {
      title: "המלצות (AI)",
      headline: "שלוש הוצאות חורגות מהממוצע הרבעוני.",
      description: "משלוחי הירקות והדגים אחראים ל־68% מהחריגה.",
    },
    task: {
      title: "משימות",
      description: "בדוק את שלוש ההוצאות המשתנות הגבוהות ביותר.",
      actionLabel: "בדוק הוצאות",
    },
  },
];

export const insights: Insight[] = [
  {
    id: "staffing",
    priority: { label: "עדיפות בינונית", tone: "warning" },
    category: "תובנות",
    title: "ניהול העובדים השתפר!",
    observation:
      "עלות העובדים נמוכה ב־1.6% מהיעד – זו התוצאה הטובה ביותר שלך ברבעון האחרון.",
    cause: "סידור המשמרות החדש צמצם שעות עודפות בין השעות 15:00–17:00.",
    action: "החל את סידור המשמרות החדש גם בסניף השני.",
  },
  {
    id: "fish-supplier",
    priority: { label: "עדיפות גבוהה", tone: "danger" },
    category: "תובנות",
    title: "ספק הדגים מייקר בשקט",
    observation: "מחיר הקילו של הסלמון עלה ב־18% בשלושת המשלוחים האחרונים.",
    cause: "המחירון החדש נכנס לתוקף ב־1 ביולי ולא עודכן בהזמנות הקבועות.",
    action: "בקש מחירון מעודכן משני ספקים חלופיים לפני ההזמנה הבאה.",
  },
  {
    id: "lunch-traffic",
    priority: { label: "עדיפות בינונית", tone: "warning" },
    category: "תובנות",
    title: "הצהריים חלשים מהרגיל",
    observation: "מספר הסועדים בין 12:00–15:00 ירד ב־11% לעומת החודש שעבר.",
    cause: "העסקית הוסרה מהתפריט הדיגיטלי בתחילת החודש.",
    action: "החזר את העסקית לתפריט ובדוק את ההשפעה בתוך שבועיים.",
  },
  {
    id: "waste",
    priority: { label: "עדיפות נמוכה", tone: "success" },
    category: "תובנות",
    title: "הפחת במטבח ירד",
    observation: "הפחת ירד ל־2.4% מהמלאי – מתחת ליעד של 3% בפעם הראשונה.",
    cause: "ספירת המלאי עברה לסוף כל משמרת במקום פעם בשבוע.",
    action: "שמר את נוהל הספירה היומי גם לאחר עונת השיא.",
  },
  {
    id: "weekend-covers",
    priority: { label: "עדיפות בינונית", tone: "warning" },
    category: "תובנות",
    title: "סוף השבוע נשען על שולחן אחד",
    observation: "38% מהמחזור בשישי־שבת מגיע משמונה שולחנות בלבד באזור הבר.",
    cause: "ההזמנות מראש נסגרות על אותם מקומות עוד לפני יום חמישי.",
    action: "פתח שכבת הזמנות שנייה ל־21:30 והרחב את אזור הבר בארבעה מושבים.",
  },
];

export const tasks: Task[] = [
  {
    id: "fish-invoices",
    status: "לביצוע",
    tone: "danger",
    title: "בדוק את רכישות הדגים של 7 הימים האחרונים",
    description:
      "בעקבות עלייה של 18% בהוצאות על ספק הדגים השבוע, בדוק את החשבוניות האחרונות וודא שכמויות ההזמנה תואמות את צריכת המסעדה.",
  },
  {
    id: "shift-plan",
    status: "לביצוע",
    tone: "warning",
    title: "אשר את סידור המשמרות לשבוע הבא",
    description:
      "שלוש משמרות ערב עדיין ללא אחראי משמרת. אשר את הסידור עד יום חמישי כדי להימנע משעות נוספות בסוף השבוע.",
  },
  {
    id: "menu-price",
    status: "לביצוע",
    tone: "warning",
    title: "עדכן את מחירי מנות הדגים בתפריט",
    description:
      "הפוד קוסט של שלוש מנות עבר את 38%. עדכון של ₪4 למנה יחזיר אותן ליעד מבלי לפגוע במכירות.",
  },
  {
    id: "inventory",
    status: "בתהליך",
    tone: "success",
    title: "סגור את ספירת המלאי של סוף החודש",
    description:
      "נותרו שתי קטגוריות לספירה: משקאות חריפים וחומרי ניקיון. סגירה מוקדמת תשפר את דיוק דוח הרווח.",
  },
  {
    id: "supplier-call",
    status: "לביצוע",
    tone: "danger",
    title: "תאם שיחה עם ספק הירקות",
    description:
      "שני משלוחים הגיעו באיחור של יותר משעתיים החודש. סכם מחדש את חלון האספקה לפני תחילת אוגוסט.",
  },
  {
    id: "staff-review",
    status: "לביצוע",
    tone: "warning",
    title: "העבר משוב רבעוני לצוות המטבח",
    description:
      "שישה עובדים סיימו רבעון מלא ללא שיחת משוב. קבע שלוש שיחות לשבוע הבא כדי לסגור את המחזור בזמן.",
  },
  {
    id: "bar-seating",
    status: "לביצוע",
    tone: "warning",
    title: "פתח שכבת הזמנות שנייה לסוף השבוע",
    description:
      "שישי ושבת נסגרים על אותם שמונה שולחנות. פתיחת שכבה ל־21:30 תוסיף כ־30 סועדים מבלי להגדיל את הצוות.",
  },
  {
    id: "cleaning-contract",
    status: "בתהליך",
    tone: "success",
    title: "חדש את חוזה חברת הניקיון",
    description:
      "החוזה מסתיים ב־31 ביולי. שתי הצעות כבר התקבלו וההפרש ביניהן ₪1,100 לחודש – סגור עד סוף השבוע.",
  },
  {
    id: "pos-reconcile",
    status: "לביצוע",
    tone: "danger",
    title: "התאם את דוח הקופה לחשבון הבנק",
    description:
      "פער של ₪2,340 בין סיכום הקופה להפקדות של השבוע שעבר. בדוק את משמרות הערב של שלישי ורביעי.",
  },
];

export const goals: Goal[] = [
  {
    id: "revenue",
    label: "יעד הכנסות חודשי",
    value: "₪420,000",
    baseline: "מתוך ₪500,000",
    deadline: "21 יום ליעד",
    tone: "warning",
    progress: 84,
  },
  {
    id: "food-cost",
    label: "יעד פוד קוסט",
    value: "34.0%",
    baseline: "מתוך יעד של 32.0%",
    deadline: "עד סוף החודש",
    tone: "success",
    progress: 94,
  },
  {
    id: "profit",
    label: "יעד רווח חודשי",
    value: "₪82,000",
    baseline: "מתוך ₪100,000",
    deadline: "איחור של 2 ימים",
    tone: "danger",
    progress: 22,
  },
];
