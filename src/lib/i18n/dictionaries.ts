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
  jobsSearchPlaceholder: string;
  jobsSource: string;
  jobsScope: string;
  jobsFilter: string;
  jobsAll: string;
  jobsWorldwide: string;
  jobsEmpty: string;
  jobsError: string;
  jobsWorldwideBadge: string;
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
  easyCopyOpen: string;
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
  fieldRole: string;
  fieldRolePh: string;
  fieldSkills: string;
  fieldSkillsPh: string;
  fieldLinkedin: string;
  fieldPortfolio: string;
  fieldResume: string;
  fieldResumePh: string;
  fieldCover: string;
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
    "One profile. One letter. Hundreds of aggregated listings. Applying should be the easy step.",
  heroSearchPlaceholder: "React, design, product manager…",
  heroSearchButton: "Search",
  heroSearchLabel: "Search remote jobs",
  howTitle: "How it works",
  howSub: "Three steps. No required accounts. Everything stays on your device.",
  how1Title: "Set up your profile",
  how1Body: "Name, resume, and a cover letter template with automatic variables.",
  how2Title: "Find the role",
  how2Body:
    "We search Remotive, Jobicy, Himalayas, RemoteOK, and Arbeitnow and unify the results.",
  how3Title: "Apply in one move",
  how3Body: "We copy the letter, open the official posting, and save your tracking.",
  howCta: "Start with your profile",
  footer:
    "Data from Remotive, Jobicy, Himalayas, RemoteOK, and Arbeitnow. Listo does not publish its own listings: it takes you to apply on the original source.",
  jobsTitle: "Remote jobs",
  jobsSub: (total, q, worldwide) =>
    `${total} listings${q ? ` for “${q}”` : ""}${
      worldwide ? " open worldwide" : ""
    } aggregated from public APIs.`,
  jobsSearch: "Search",
  jobsSearchPlaceholder: "Keyword, stack, role…",
  jobsSource: "Source",
  jobsScope: "Location",
  jobsFilter: "Filter",
  jobsAll: "All",
  jobsWorldwide: "Worldwide only",
  jobsEmpty: "No results. Try another search.",
  jobsError: "error",
  jobsWorldwideBadge: "Worldwide",
  timeToday: "Today",
  timeYesterday: "Yesterday",
  timeDays: (n) => `${n}d ago`,
  timeWeeks: (n) => `${n}w ago`,
  timeMonths: (n) => `${n}mo ago`,
  timeRecent: "Recent",
  back: "← Back",
  easyTitle: "Easy apply",
  easyBody:
    "Save your profile once. Here we copy the letter, open the official link, and log the application.",
  easyWarn: "Add your name, email, and resume to unlock the quick flow.",
  easyCompleteProfile: "Complete profile",
  easyLetterLabel: "Letter ready to paste",
  easyCopyOpen: "Copy and open application",
  easyCopyOnly: "Copy letter only",
  easyCopied: "Copied",
  easySaveLater: "Save for later",
  easyDone: "Logged. Track it under",
  easyOriginal: "Go to original posting →",
  easyLoading: "Loading profile…",
  profileTitle: "My profile",
  profileSub:
    "Saved only in this browser. Use it to fill letters and apply faster on every listing.",
  profileReady: "Profile ready for one-click apply",
  profileMissing: "Name, email, or resume link still missing",
  profileLoading: "Loading profile…",
  fieldFullName: "Full name",
  fieldEmail: "Email",
  fieldPhone: "Phone",
  fieldLocation: "Location / timezone",
  fieldLocationPh: "GMT+4, Tbilisi, Europe…",
  fieldRole: "Role you’re looking for",
  fieldRolePh: "Frontend engineer, Product designer…",
  fieldSkills: "Key skills",
  fieldSkillsPh: "React, TypeScript, Figma…",
  fieldLinkedin: "LinkedIn",
  fieldPortfolio: "Portfolio",
  fieldResume: "Resume (public URL)",
  fieldResumePh: "Google Drive, Dropbox, Notion…",
  fieldCover: "Cover letter template",
  fieldVariables:
    "Variables: {{title}}, {{company}}, {{skills}}, {{linkedin}}, {{resume}}, {{name}}, {{email}}, {{role}}",
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
    "ერთი პროფილი. ერთი წერილი. ასობით გაერთიანებული ვაკანსია. განაცხადი უნდა იყოს მარტივი ნაბიჯი.",
  heroSearchPlaceholder: "React, დიზაინი, product manager…",
  heroSearchButton: "ძიება",
  heroSearchLabel: "დისტანციური ვაკანსიების ძიება",
  howTitle: "როგორ მუშაობს",
  howSub: "სამი ნაბიჯი. ანგარიში არ არის სავალდებულო. ყველაფერი რჩება თქვენს მოწყობილობაზე.",
  how1Title: "შეავსეთ პროფილი",
  how1Body: "სახელი, რეზიუმე და სამოტივაციო წერილის შაბლონი ავტომატური ცვლადებით.",
  how2Title: "იპოვეთ როლი",
  how2Body:
    "ვეძებთ Remotive, Jobicy, Himalayas, RemoteOK და Arbeitnow-ზე და ვაერთიანებთ შედეგებს.",
  how3Title: "განაცხადი ერთ მოქმედებაში",
  how3Body: "ვაკოპირებთ წერილს, ვხსნით ოფიციალურ განცხადებას და ვინახავთ თვალყურს.",
  howCta: "დაიწყეთ პროფილით",
  footer:
    "მონაცემები: Remotive, Jobicy, Himalayas, RemoteOK და Arbeitnow. Listo საკუთარ ვაკანსიებს არ აქვეყნებს — გადაგიყვანთ ორიგინალ წყაროზე.",
  jobsTitle: "დისტანციური ვაკანსიები",
  jobsSub: (total, q, worldwide) =>
    `${total} განცხადება${q ? ` „${q}“-ზე` : ""}${worldwide ? " მთელ მსოფლიოში" : ""} საჯარო API-ებიდან.`,
  jobsSearch: "ძიება",
  jobsSearchPlaceholder: "საკვანძო სიტყვა, სტეკი, როლი…",
  jobsSource: "წყარო",
  jobsScope: "მდებარეობა",
  jobsFilter: "ფილტრი",
  jobsAll: "ყველა",
  jobsWorldwide: "მხოლოდ worldwide",
  jobsWorldwideBadge: "Worldwide",
  jobsEmpty: "შედეგები არ არის. სცადეთ სხვა ძიება.",
  jobsError: "შეცდომა",
  timeToday: "დღეს",
  timeYesterday: "გუშინ",
  timeDays: (n) => `${n} დღის წინ`,
  timeWeeks: (n) => `${n} კვ. წინ`,
  timeMonths: (n) => `${n} თვის წინ`,
  timeRecent: "ბოლო",
  back: "← უკან",
  easyTitle: "მარტივი განაცხადი",
  easyBody:
    "შეინახეთ პროფილი ერთხელ. აქ ვაკოპირებთ წერილს, ვხსნით ოფიციალურ ბმულს და ვაფიქსირებთ განაცხადს.",
  easyWarn: "სწრაფი ნაკადისთვის დაამატეთ სახელი, ელფოსტა და რეზიუმე.",
  easyCompleteProfile: "პროფილის შევსება",
  easyLetterLabel: "წერილი ჩასასმელად",
  easyCopyOpen: "კოპირება და განაცხადის გახსნა",
  easyCopyOnly: "მხოლოდ წერილის კოპირება",
  easyCopied: "დაკოპირდა",
  easySaveLater: "შენახვა მოგვიანებით",
  easyDone: "დაფიქსირდა. თვალყური ადევნეთ",
  easyOriginal: "ორიგინალ განცხადებაზე →",
  easyLoading: "პროფილი იტვირთება…",
  profileTitle: "ჩემი პროფილი",
  profileSub:
    "ინახება მხოლოდ ამ ბრაუზერში. გამოიყენეთ წერილების შესავსებად და სწრაფი განაცხადისთვის.",
  profileReady: "პროფილი მზადაა ერთჯერადი განაცხადისთვის",
  profileMissing: "აკლია სახელი, ელფოსტა ან რეზიუმეს ბმული",
  profileLoading: "პროფილი იტვირთება…",
  fieldFullName: "სრული სახელი",
  fieldEmail: "ელფოსტა",
  fieldPhone: "ტელეფონი",
  fieldLocation: "მდებარეობა / დროის სარტყელი",
  fieldLocationPh: "GMT+4, თბილისი, ევროპა…",
  fieldRole: "როლს რომელსაც ეძებთ",
  fieldRolePh: "Frontend engineer, Product designer…",
  fieldSkills: "ძირითადი უნარები",
  fieldSkillsPh: "React, TypeScript, Figma…",
  fieldLinkedin: "LinkedIn",
  fieldPortfolio: "პორტფოლიო",
  fieldResume: "რეზიუმე (საჯარო URL)",
  fieldResumePh: "Google Drive, Dropbox, Notion…",
  fieldCover: "სამოტივაციო წერილის შაბლონი",
  fieldVariables:
    "ცვლადები: {{title}}, {{company}}, {{skills}}, {{linkedin}}, {{resume}}, {{name}}, {{email}}, {{role}}",
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
