export type Locale = "en" | "ka";

export const LOCALES: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ka", label: "ქართული" },
];

export type Dictionary = {
  navJobs: string;
  navProfile: string;
  navApplications: string;
  navCta: string;
  navAria: string;
  brandHome: string;
  heroHeadline: string;
  heroSub: string;
  heroSearchPlaceholder: string;
  heroSearchButton: string;
  heroSearchLabel: string;
  howTitle: string;
  howSub: string;
  how1Title: string;
  how1Body: string;
  how2Title: string;
  how2Body: string;
  how3Title: string;
  how3Body: string;
  howCta: string;
  footer: string;
  jobsTitle: string;
  jobsSub: (total: number, q?: string, worldwide?: boolean) => string;
  jobsSearch: string;
  jobsSearching: string;
  jobsSearchPlaceholder: string;
  jobsScope: string;
  jobsAll: string;
  jobsWorldwide: string;
  jobsEmpty: string;
  jobsWorldwideBadge: string;
  jobsApply: string;
  jobsApplied: string;
  timeToday: string;
  timeYesterday: string;
  timeDays: (n: number) => string;
  timeWeeks: (n: number) => string;
  timeMonths: (n: number) => string;
  timeRecent: string;
  back: string;
  easyTitle: string;
  easyBody: string;
  easyWarn: string;
  easyCompleteProfile: string;
  easyLetterLabel: string;
  easyLetterHint: string;
  easyApplyNow: string;
  easyCopyOnly: string;
  easyCopied: string;
  easySaveLater: string;
  easyDone: string;
  easyOriginal: string;
  easyLoading: string;
  profileTitle: string;
  profileSub: string;
  profileReady: string;
  profileMissing: string;
  profileLoading: string;
  fieldFullName: string;
  fieldEmail: string;
  fieldPhone: string;
  fieldLocation: string;
  fieldLocationPh: string;
  fieldLocationSuggested: string;
  fieldLocationAll: string;
  fieldLocationDetect: string;
  fieldSkills: string;
  fieldSkillsPh: string;
  fieldLinkedin: string;
  fieldCover: string;
  fieldCoverHint: string;
  fieldVariables: string;
  profileSave: string;
  profileSaved: string;
  appsTitle: string;
  appsSub: string;
  appsLoading: string;
  appsEmpty: string;
  appsBrowse: string;
  appsApplied: string;
  appsSaved: string;
  appsOpen: string;
  appsRemove: string;
  notFoundTitle: string;
  notFoundBody: string;
  notFoundCta: string;
  langLabel: string;
};

const en: Dictionary = {
  navJobs: "Jobs",
  navProfile: "My profile",
  navApplications: "Applications",
  navCta: "Set up profile",
  navAria: "Main",
  brandHome: "Listo home",
  heroHeadline: "Remote jobs without the apply chaos.",
  heroSub:
    "One profile. Tailor your CV to each offer. Apply without the chaos.",
  heroSearchPlaceholder: "React, design, product manager…",
  heroSearchButton: "Search",
  heroSearchLabel: "Search remote jobs",
  howTitle: "How it works",
  howSub: "Three steps. No required accounts. Everything stays on your device.",
  how1Title: "Set up your profile",
  how1Body: "Name, skills, and contact details so you can adapt your CV to each offer.",
  how2Title: "Find the role",
  how2Body: "Browse remote openings and open the one that fits.",
  how3Title: "Apply in one move",
  how3Body: "Open the posting, track it here, and use a cover letter only if asked.",
  howCta: "Start with your profile",
  footer:
    "Listo helps you apply to remote jobs faster. Your profile stays on this device.",
  jobsTitle: "Remote jobs",
  jobsSub: (total, q, worldwide) =>
    `${total} remote roles${q ? ` for “${q}”` : ""}${
      worldwide ? " open worldwide" : ""
    }. Pick one and apply.`,
  jobsSearch: "Search",
  jobsSearching: "Searching…",
  jobsSearchPlaceholder: "Keyword, stack, role…",
  jobsScope: "Location",
  jobsAll: "All",
  jobsWorldwide: "Worldwide only",
  jobsEmpty: "No results. Try another search.",
  jobsWorldwideBadge: "Worldwide",
  jobsApply: "Apply",
  jobsApplied: "Opened",
  timeToday: "Today",
  timeYesterday: "Yesterday",
  timeDays: (n) => `${n}d ago`,
  timeWeeks: (n) => `${n}w ago`,
  timeMonths: (n) => `${n}mo ago`,
  timeRecent: "Recent",
  back: "← Back",
  easyTitle: "Easy apply",
  easyBody:
    "Open the posting and track it here. Adapt your CV to the offer; add a cover letter only if they ask.",
  easyWarn: "Add your name and email to finish setting up your profile.",
  easyCompleteProfile: "Complete profile",
  easyLetterLabel: "Cover letter (optional)",
  easyLetterHint: "Use only if the posting asks for a cover letter.",
  easyApplyNow: "Apply on official site",
  easyCopyOnly: "Copy letter",
  easyCopied: "Copied",
  easySaveLater: "Save for later",
  easyDone: "Logged. Track it under",
  easyOriginal: "Go to original posting →",
  easyLoading: "Loading profile…",
  profileTitle: "My profile",
  profileSub:
    "Saved only in this browser. Use it as the base to tailor a CV for each offer.",
  profileReady: "Profile ready to apply",
  profileMissing: "Name or email still missing",
  profileLoading: "Loading profile…",
  fieldFullName: "Full name",
  fieldEmail: "Email",
  fieldPhone: "Phone",
  fieldLocation: "Timezone",
  fieldLocationPh: "Select your timezone",
  fieldLocationSuggested: "Suggested",
  fieldLocationAll: "All timezones",
  fieldLocationDetect: "Use my timezone",
  fieldSkills: "Key skills",
  fieldSkillsPh: "React, TypeScript, Figma…",
  fieldLinkedin: "LinkedIn",
  fieldCover: "Cover letter template (optional)",
  fieldCoverHint: "Only needed when an offer asks for a cover letter.",
  fieldVariables:
    "Variables: {{title}}, {{company}}, {{skills}}, {{linkedin}}, {{name}}, {{email}}",
  profileSave: "Save profile",
  profileSaved: "Saved on this device",
  appsTitle: "Applications",
  appsSub: "Local tracking of what you saved or applied to with Listo.",
  appsLoading: "Loading…",
  appsEmpty: "No applications yet.",
  appsBrowse: "Browse jobs",
  appsApplied: "Applied",
  appsSaved: "Saved",
  appsOpen: "Open",
  appsRemove: "Remove",
  notFoundTitle: "Not found",
  notFoundBody: "That job is no longer in the cached list, or the link is invalid.",
  notFoundCta: "Browse jobs",
  langLabel: "Language",
};

const ka: Dictionary = {
  navJobs: "ვაკანსიები",
  navProfile: "ჩემი პროფილი",
  navApplications: "განაცხადები",
  navCta: "პროფილის შევსება",
  navAria: "მთავარი",
  brandHome: "Listo მთავარი",
  heroHeadline: "დისტანციური სამუშაოები — განაცხადი უფრო მარტივად.",
  heroSub:
    "ერთი პროფილი. მოარგეთ CV თითოეულ შეთავაზებას. განაცხადი უკეთესად.",
  heroSearchPlaceholder: "React, დიზაინი, product manager…",
  heroSearchButton: "ძიება",
  heroSearchLabel: "დისტანციური ვაკანსიების ძიება",
  howTitle: "როგორ მუშაობს",
  howSub: "სამი ნაბიჯი. ანგარიში არ არის სავალდებულო. ყველაფერი რჩება თქვენს მოწყობილობაზე.",
  how1Title: "შეავსეთ პროფილი",
  how1Body: "სახელი, უნარები და კონტაქტი — რომ CV თითოეულ შეთავაზებაზე მოარგოთ.",
  how2Title: "იპოვეთ როლი",
  how2Body: "ნახეთ დისტანციური ვაკანსიები და გახსენით ის, რაც გიხდებათ.",
  how3Title: "განაცხადი ერთ მოქმედებაში",
  how3Body: "გახსენით განცხადება, დააფიქსირეთ აქ და წერილი მხოლოდ თუ ითხოვენ.",
  howCta: "დაიწყეთ პროფილით",
  footer:
    "Listo გეხმარებათ დისტანციურ ვაკანსიებზე უფრო სწრაფად განაცხადოთ. პროფილი რჩება ამ მოწყობილობაზე.",
  jobsTitle: "დისტანციური ვაკანსიები",
  jobsSub: (total, q, worldwide) =>
    `${total} დისტანციური როლი${q ? ` „${q}“-ზე` : ""}${
      worldwide ? " მთელ მსოფლიოში" : ""
    }. აირჩიეთ და განაცხადეთ.`,
  jobsSearch: "ძიება",
  jobsSearching: "იძებნება…",
  jobsSearchPlaceholder: "საკვანძო სიტყვა, სტეკი, როლი…",
  jobsScope: "მდებარეობა",
  jobsAll: "ყველა",
  jobsWorldwide: "მხოლოდ worldwide",
  jobsWorldwideBadge: "Worldwide",
  jobsEmpty: "შედეგები არ არის. სცადეთ სხვა ძიება.",
  jobsApply: "განაცხადი",
  jobsApplied: "გაიხსნა",
  timeToday: "დღეს",
  timeYesterday: "გუშინ",
  timeDays: (n) => `${n} დღის წინ`,
  timeWeeks: (n) => `${n} კვ. წინ`,
  timeMonths: (n) => `${n} თვის წინ`,
  timeRecent: "ბოლო",
  back: "← უკან",
  easyTitle: "მარტივი განაცხადი",
  easyBody:
    "გახსენით განცხადება და დააფიქსირეთ აქ. მოარგეთ CV შეთავაზებას; წერილი მხოლოდ თუ ითხოვენ.",
  easyWarn: "პროფილის დასასრულებლად დაამატეთ სახელი და ელფოსტა.",
  easyCompleteProfile: "პროფილის შევსება",
  easyLetterLabel: "სამოტივაციო წერილი (არასავალდებულო)",
  easyLetterHint: "გამოიყენეთ მხოლოდ თუ განცხადება ითხოვს სამოტივაციო წერილს.",
  easyApplyNow: "განაცხადი ოფიციალურ საიტზე",
  easyCopyOnly: "წერილის კოპირება",
  easyCopied: "დაკოპირდა",
  easySaveLater: "შენახვა მოგვიანებით",
  easyDone: "დაფიქსირდა. თვალყური ადევნეთ",
  easyOriginal: "ორიგინალ განცხადებაზე →",
  easyLoading: "პროფილი იტვირთება…",
  profileTitle: "ჩემი პროფილი",
  profileSub:
    "ინახება მხოლოდ ამ ბრაუზერში. გამოიყენეთ საფუძვლად CV-ის მორგებისთვის თითოეულ შეთავაზებაზე.",
  profileReady: "პროფილი მზადაა განაცხადისთვის",
  profileMissing: "აკლია სახელი ან ელფოსტა",
  profileLoading: "პროფილი იტვირთება…",
  fieldFullName: "სრული სახელი",
  fieldEmail: "ელფოსტა",
  fieldPhone: "ტელეფონი",
  fieldLocation: "დროის სარტყელი",
  fieldLocationPh: "აირჩიეთ დროის სარტყელი",
  fieldLocationSuggested: "შემოთავაზებული",
  fieldLocationAll: "ყველა სარტყელი",
  fieldLocationDetect: "ჩემი სარტყელის გამოყენება",
  fieldSkills: "ძირითადი უნარები",
  fieldSkillsPh: "React, TypeScript, Figma…",
  fieldLinkedin: "LinkedIn",
  fieldCover: "სამოტივაციო წერილის შაბლონი (არასავალდებულო)",
  fieldCoverHint: "საჭიროა მხოლოდ მაშინ, როცა შეთავაზება ითხოვს სამოტივაციო წერილს.",
  fieldVariables:
    "ცვლადები: {{title}}, {{company}}, {{skills}}, {{linkedin}}, {{name}}, {{email}}",
  profileSave: "პროფილის შენახვა",
  profileSaved: "შენახულია ამ მოწყობილობაზე",
  appsTitle: "განაცხადები",
  appsSub: "ადგილობრივი თვალყური იმისა, რაც Listo-ით შეინახეთ ან განაცხადეთ.",
  appsLoading: "იტვირთება…",
  appsEmpty: "განაცხადები ჯერ არ არის.",
  appsBrowse: "ვაკანსიების ნახვა",
  appsApplied: "განაცხადებული",
  appsSaved: "შენახული",
  appsOpen: "გახსნა",
  appsRemove: "წაშლა",
  notFoundTitle: "ვერ მოიძებნა",
  notFoundBody: "ეს ვაკანსია აღარ არის ქეშირებულ სიაში, ან ბმული არასწორია.",
  notFoundCta: "ვაკანსიების ნახვა",
  langLabel: "ენა",
};

export const dictionaries: Record<Locale, Dictionary> = { en, ka };

export const LOCALE_KEY = "listo-locale";
