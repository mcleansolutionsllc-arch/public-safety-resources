/* Hostos Public Safety Resources — content transcribed from posted reference materials */
const YPD = 'https://ypdcrime.com/penal.law/';

window.CONTENT = {
  shields: [
    { parts: [['Petit Larceny', '155.25'], ['Grand Larceny 4th', '155.30']], title: 'Petit Larceny / Grand Larceny 4th', codes: [['155.25', '155', '155.25'], ['155.30', '155', '155.30']], href: YPD + 'article155.php#p155.25', cls: 'A Misd. / E Felony' },
    { parts: [['Criminal Mischief 4th Degree', '145.00']], title: 'Criminal Mischief 4th Degree', codes: [['145.00', '145', '145.00']], href: YPD + 'article145.php#p145.00', cls: 'A Misdemeanor' },
    { parts: [['Trespass', '140.05']], title: 'Trespass', codes: [['140.05', '140', '140.05']], href: YPD + 'article140.php#p140.05', cls: 'Violation' },
    { parts: [['Criminal Trespass 2nd Degree', '140.15']], title: 'Criminal Trespass 2nd Degree', codes: [['140.15', '140', '140.15']], href: YPD + 'article140.php#p140.15', cls: 'A Misdemeanor' },
    { parts: [['Harassment 1st Degree', '240.25']], title: 'Harassment 1st Degree', codes: [['240.25', '240', '240.25']], href: YPD + 'article240.php#p240.25', cls: 'B Misdemeanor' },
    { parts: [['Assault 3rd Degree', '120.00']], title: 'Assault 3rd Degree', codes: [['120.00', '120', '120.00']], href: YPD + 'article120.php#p120.00', cls: 'A Misdemeanor' },
    { parts: [['Sexual Misconduct', '130.20']], title: 'Sexual Misconduct', codes: [['130.20', '130', '130.20']], href: YPD + 'article130.php#p130.20', cls: 'A Misdemeanor' },
    { parts: [['Resisting Arrest', '205.30']], title: 'Resisting Arrest', codes: [['205.30', '205', '205.30']], href: YPD + 'article205.php#p205.30', cls: 'A Misdemeanor' },
    { parts: [['Disorderly Conduct', '240.20']], title: 'Disorderly Conduct', codes: [['240.20', '240', '240.20']], href: YPD + 'article240.php#p240.20', cls: 'Violation' },
    { parts: [['Criminal Possession of Marihuana 5th', '221.10']], title: 'Criminal Possession of Marihuana 5th', codes: [['221.10', '221', '221.10']], href: YPD + 'article221.php#p221.10', cls: 'B Misdemeanor' },
    { parts: [['Marihuana Offenses Guide', 'Art. 221 / 222']], title: 'Marihuana Offenses Guide', codes: [], href: YPD + 'marijuana-offenses.php', cls: 'Guide' }
  ],

  vip: [
    ['01', 'Dr. Daisy Cocco De Filippis', 'College President', 1],
    ['02', 'Ms. Andrea Fabrizio', 'Provost of Academic Affairs and Interim Vice President', 2],
    ['03', 'Mrs. Esther Rodriguez-Chardavoyne', 'Senior Vice President of Administration and Finance', 3],
    ['04', 'Dr. Althea J. Sterling', 'VP for Student Development & Enrollment Management', 4],
    ['05', 'Ms. Colette Atkins', 'VP for Institutional Advancement', 5],
    ['06', 'Dr. Evelyn Fernandez-Ketcham', 'VP of Continuing Education and Workforce Development', 6],
    ['07', 'Mrs. Diana Kreymer', 'Executive Chief of Staff and Deputy to the President', 7],
    ['08', 'Mr. Eugene Sohn, Esq.', 'Executive Counsel to the President and Labor Designee', 8],
    ['09', 'Dr. Dilawar Grewal', 'Asst. VP of Information Technology', 9],
    ['10', 'Philip Oliveri, Esq.', 'Chief Diversity Officer, Title IX Coordinator', 10],
    ['11', 'Ms. Anna Garcia-Reyes', 'Dean of Community Relations', 11],
    ['12', 'Eric Radezky', 'Director of Governmental and External Affairs', 12]
  ],
  keyStaff: [
    ['13', 'Mrs. Christine Dias-Singh', 'Executive Director of Human Resources'],
    ['14', 'Mr. Arnaldo Bernabe', 'Chief / Director of Public Safety'],
    ['15', 'Vacant', 'Dean of Continuing Education'],
    ['16', 'Dean Johanna Gomez', 'Associate Dean of Students'],
    ['17', 'Mr. Carlos Rivera', 'Interim Associate Dean of Enrollment Management'],
    ['18', 'Mr. Frank Virone', 'Chief Administrative Superintendent of Buildings and Grounds'],
    ['19', 'Mario Rosario', 'Administrative Superintendent for Buildings and Grounds']
  ],

  codeUpdates: [
    ['10-07 Frank', 'Someone with a frozen ID'],
    ['10-07 George', 'Someone with a gate alert'],
    ['10-07 Oscar', 'Someone with an order of protection'],
    ['10-99 NYPD', 'Outside agency using the restroom (NYPD)'],
    ['10-99 MTA', 'Outside agency using the restroom (MTA)'],
    ['10-99 Traffic', 'Outside agency using the restroom (Traffic)'],
    ['Code Blue', 'Someone with a knife'],
    ['Code Red', 'Someone with a gun']
  ],
  nonCrime: [
    ['10-50', 'Disorderly person/group or noise'], ['10-51', 'Roving band (specify number)'], ['10-52', 'Dispute (specify)'],
    ['10-53', 'Vehicle accident (specify if any injuries are involved)'], ['10-54', 'Ambulance requested (specify)'],
    ['10-55', 'Contact another agency (specify: police/fire/EMS, etc.)'], ['10-58', 'Escort/transport (student/faculty/staff or prisoner)'],
    ['10-59', 'Alarm of fire (specify type)'], ['10-60', 'Demonstration/protestors (specify number)'],
    ['10-61', 'College assignment – not available (give location, e.g., on/off campus)'],
    ['10-62', 'Out of service – mechanical (give condition and location, e.g., flat tire or at motor pool)'],
    ['10-63', 'Out of service – meal/personal'], ['10-65', 'Utility trouble (specify nature and if B & G is required)'],
    ['10-66', 'Unusual incident (e.g., plane crash/building collapse)'], ['10-67', 'Traffic/parking condition (specify)'],
    ['10-68', 'See complainant re: (specify)'], ['10-69', 'Other non-crime incident (specify)'],
    ['10-75V', 'Conducting vertical patrol (specify location)'], ['10-75E', 'Conducted exterior check of building (specify building)'],
    ['10-75P', 'Conducting campus perimeter (specify foot/bike/motor patrol)'], ['10-80', 'Cancel (disregard last assignment)'],
    ['10-82O', 'Building open'], ['10-82C', 'Building closed'], ['10-83', 'Off-campus to precinct/court, other'],
    ['10-84', 'Arrived at scene'], ['10-85', 'Need additional unit (forthwith or non-emergency)'],
    ['10-86', 'Female in/female out of vehicle (indicate time)'], ['10-87', 'Unit to hospital (specify hospital)'],
    ['10-89', 'Other interim status (specify)']
  ],
  finals: [
    ['10-90N', 'Unfounded or unnecessary alarm'], ['10-90U', 'Unable to gain entrance'], ['10-90X', 'Unfounded'],
    ['10-90Y', 'Unnecessary'], ['10-90Z', 'Gone on arrival'], ['10-91', 'Non-crime corrected'],
    ['10-92', 'Arrest made (include number arrested)'], ['10-93', 'Report to follow (specify)'], ['10-94', 'Handled by previous tour'],
    ['10-95', 'Non-crime referred to another agency'], ['10-96', 'Summons (disciplinary letter) served'],
    ['10-97H', 'Aided removed to hospital'], ['10-97R', 'Aided refused medical attention'], ['10-98', 'Resuming patrol from last assignment']
  ],
  phonetic: ['Adam', 'Boy', 'Charlie', 'David', 'Eddie', 'Frank', 'George', 'Henry', 'Ida', 'John', 'King', 'Larry', 'Mary', 'Nancy', 'Oscar', 'Peter', 'Queen', 'Robert', 'Sam', 'Thomas', 'Union', 'Victor', 'William', 'X-Ray', 'Yankee', 'Zebra'],

  narratives: [
    ['Aided', 'At T/P/O the (male/female/undisclosed) (Hostos/Other CUNY) (Student/Faculty/Staff/Visitor) reported that (injured body part/illness). Aided was injured or became ill when they (circumstance). EMS responded and provided first aid to the Aided. Aided was transported to (hospital name) by EMS.\nOr: EMS responded and provided first aid and Aided refused any further medical treatment. RMA form signed.'],
    ['Alarm', 'At T/P/O a (intrusion/smoke alarm/pull box) was activated in (location). (Engineer name/FDNY Co/Fire Safety Director) (responded or notified). Source of alarm turned out to be (circumstances). The building (was/was not) evacuated. The all clear was given by (person name). FDNY was off-site at (time).'],
    ['Burglary', 'Item taken from a locked office or room.\nAt T/P/O the (male/female/undisclosed) (Hostos/Other CUNY) (Student/Faculty/Staff/Visitor) reported that their (item) was taken by some unknown person from (location). The room was locked on (date and time). The (item) was discovered missing from (room #) at (date and time). Entry was (forced/unforced).'],
    ['Larcenies', 'Items taken from areas or rooms open to the public.\nAt T/P/O the (male/female/undisclosed) (Hostos/Other CUNY) (Student/Faculty/Staff/Visitor) reported that some unknown person took their (item(s)) which was left (circumstances). Item was last seen at (time). Item was discovered missing at (time).'],
    ['Lost Property', 'Whenever someone has an item missing and is not sure when or where it occurred. Ex: item left in an open classroom or large open or outdoor area for an extended period of time.\nAt T/P/O the (male/female/undisclosed) (Hostos/Other CUNY) (Student/Faculty/Staff/Visitor) reported that they last saw their (item) when they were at (time and place). They discovered it missing when they were (time and place).'],
    ['Robbery', 'Property forcibly taken.\nAt T/P/O the (male/female/undisclosed) (Hostos/Other CUNY) (Student/Faculty/Staff/Visitor) reported that they were approached by the suspect who (produced/simulated) (type of weapon) or were threatened with physical force. The suspect stated "Quote." The suspect fled (direction of flight).'],
    ['Trespass', 'At T/P/O the subject was found in the (location) after hours or without permission to be therein by (MOS).'],
    ['Persons and Items', 'Include physical descriptions of all suspects and all items taken in reports.\nEx: Male Black or Hispanic; 18 to 22 yrs old; slim build; 5\'11" to 6\'1"; wearing Blk hat, Blk hooded jacket, blue jeans, Bwn boots.\nEx: Grey Apple MacBook Pro laptop, Blk carrying case. Value approx: $900.']
  ],

  uniform: [
    ['Winter', 'Dec 1 – Mar 30', 'Long sleeve shirt and turtleneck', [12, 1], [3, 31]],
    ['Spring', 'Apr 1 – Jun 14', 'Long sleeve shirt', [4, 1], [6, 14]],
    ['Summer', 'Jun 15 – Sep 30', 'Short sleeve shirt', [6, 15], [9, 30]],
    ['Fall', 'Oct 1 – Nov 30', 'Long sleeve shirt', [10, 1], [11, 30]]
  ],

  peel: [
    'The basic mission for which the police exist is to prevent crime and disorder.',
    'The ability of the police to perform their duties is dependent upon public approval of police actions.',
    'Police must secure the willing cooperation of the public in voluntary observance of the law to be able to secure and maintain the respect of the public.',
    'The degree of cooperation of the public that can be secured diminishes proportionately to the necessity of the use of physical force.',
    'Police seek and preserve public favor not by catering to the public opinion but by constantly demonstrating absolute impartial service to the law.',
    'Police use physical force to the extent necessary to secure observance of the law or to restore order only when the exercise of persuasion, advice and warning is found to be insufficient.',
    'Police, at all times, should maintain a relationship with the public that gives reality to the historic tradition that the police are the public and the public are the police; the police being only members of the public who are paid to give full-time attention to duties which are incumbent on every citizen in the interests of community welfare and existence.',
    'Police should always direct their action strictly towards their functions and never appear to usurp the powers of the judiciary.',
    'The test of police efficiency is the absence of crime and disorder, not the visible evidence of police action in dealing with it.'
  ],

  tours: [
    ['tour1', 'Tour 1 · Midnight', '2300 × 0730', 'As of 9/6/2026'],
    ['tour2', 'Tour 2 · Day', '0700 × 1530', 'As of 9/28/2026'],
    ['tour3', 'Tour 3 · Evening', '1500 × 2330', 'As of 9/30/2026']
  ]
};

/* ---------- Tour master schedules (transcribed from posted sheets; "OT:" = overtime, "X" = blocked) ---------- */
(() => {
  const r = (v, n = 1) => Array(n).fill(v);
  const A = '2300-0730', D = '0700-1530', E = '1500-2330';
  window.CONTENT.tourMaster = [
    {
      id: 'tour1', name: 'Tour 1', label: 'Midnight', time: '2300 × 0730', asof: 'As of 9/6/2026', startHour: 23,
      cols: ['SUN/MON', 'MON/TUE', 'TUE/WED', 'WED/THUR', 'THUR/FRI', 'FRI/SAT', 'SAT/SUN'],
      groups: [
        { title: 'Peace Officers', rows: [
          ['PO Jackson', [A, A, 'RDO', 'RDO', A, A, A], 40],
          ['Peace Officer Overtime', ['NONE', 'NONE', 'OT:' + A, 'OT:' + A, 'NONE', 'NONE', 'NONE'], 16]
        ], total: ['Total Peace Officers', [1, 1, 1, 1, 1, 1, 1], 56] },
        { title: 'Security Assistants', rows: [
          ['CSA Turay', ['RDO', 'RDO', A, A, A, A, A], 40],
          ['CSA N. Igwe', [A, A, A, A, A, 'RDO', 'RDO'], 40],
          ['CSA MD Ullah', [A, A, A, 'RDO', 'RDO', A, A], 40],
          ['CSA MD Shahidullha', ['RDO', 'RDO', A, A, A, A, A], 40]
        ], total: ['Total CSAs', [2, 2, 4, 3, 3, 3, 3], 160] },
        { title: 'Dreamland Officers', rows: [
          ['Dreamland Officer', [A, A, 'NONE', A, A, A, A], 56],
          ['Dreamland Officer', r(A, 7), 56],
          ['Dreamland Officer', [A, A, 'NONE', 'NONE', 'NONE', 'NONE', 'NONE'], 16],
          ['Firewatch Savoy Dreamland', r('FW:' + A, 7), 56]
        ], total: ['Total Dreamland Officers', [4, 4, 2, 3, 3, 3, 3], 128] },
        { title: 'Shift Total', rows: [], total: ['Total Officers on Shift', [7, 7, 7, 7, 7, 7, 7], ''] },
        { title: 'Sergeants', rows: [
          ['Sgt. Gomez – 01/1994', [A, A, A, A, 'RDO', 'RDO', A], 40],
          ['Sergeant Overtime', ['', '', '', '', 'OT:' + A, 'OT:' + A, ''], 16]
        ], total: ['Total Sergeants', [1, 1, 1, 1, 1, 1, 1], 56] }
      ],
      footer: 'Operations Lieutenant – Lt. Koutsidis · Director of Public Safety – Chief Bernabe'
    },
    {
      id: 'tour2', name: 'Tour 2', label: 'Day', time: '0700 × 1530', asof: 'As of 9/28/2026', startHour: 7,
      cols: ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'],
      groups: [
        { title: 'Peace Officers', rows: [
          ['PO Ortiz – 3/10/2007 – Armed Floater', ['RDO', D, D, D, D, D, 'RDO'], 40],
          ['PO DeJesus – 3/6/2009 – Armed Floater', ['RDO', D, D, D, D, D, 'RDO'], 40],
          ['PO Perez – 5/13/2022', ['RDO', D, D, D, D, D, 'RDO'], 40],
          ['PO McLean – 11/13/2023', ['0700-1900', D, D, D, D, 'RDO', 'RDO'], 40],
          ['Overtime Peace Officers', [...r('NONE', 6), 'OT:' + D], 8],
          ['Overtime Peace Officers', [...r('NONE', 6), 'OT:' + D], 8]
        ], total: ['Total Peace Officers', [1, 4, 4, 4, 4, 3, 2], 176] },
        { title: 'Security Assistants', rows: [
          ['CSA F. Rodriguez – 10/18/2021', ['RDO', D, D, D, D, D, 'RDO'], 40],
          ['CSA D. Villa – 01/06/26', [D, D, D, D, D, 'RDO', 'RDO'], 40],
          ['CSA L. Serrano – 11/24/25', ['RDO', 'RDO', D, D, D, D, D], 40],
          ['CSA Overtime', ['OT:' + D, ...r('NONE', 6)], 8]
        ], total: ['Total CSAs', [2, 2, 3, 3, 3, 2, 1], 128] },
        { title: 'Dreamland Posts', rows: [
          ['Sector Adam', ['NONE', D, 'X', 'X', 'X', D, 'NONE'], 16],
          ['Sector Boy', ['NONE', D, 'X', 'X', 'X', D, 'NONE'], 16],
          ['Sector Charlie', ['NONE', D, D, D, D, D, 'NONE'], 40],
          ['Sector David', ['NONE', D, D, D, D, D, 'NONE'], 40],
          ['Sector Lincoln', ['NONE', D, D, D, D, D, D], 48],
          ['Sector George', ['NONE', ...r('0830-1530', 5), 'NONE'], 26],
          ['Sector Mary', ['NONE', D, D, D, D, D, 'NONE'], 40],
          ['Sector Adam (weekend)', [D, ...r('NONE', 5), D], 16],
          ['Sector Boy (weekend)', [D, ...r('NONE', 5), D], 16],
          ['Sector Charlie (weekend)', [D, ...r('NONE', 5), D], 16],
          ['Meal Relief Post', [D, ...r('NONE', 5), D], 16],
          ['Firewatch Dreamland', ['FW:' + D, ...r('NONE', 5), 'FW:' + D], 16],
          ['Sector Peter – Prow FD', ['NONE', ...r('0900-1530', 5), 'NONE'], 24],
          ['Sector Peter – Prow RD', ['NONE', '0830-1530', '0800-1530', '0800-1530', '0800-1530', '0830-1530', 'NONE'], 28],
          ['Sector Eddie – CLIP – Lobby', ['NONE', ...r('0800-1530', 4), 'NONE', 'NONE'], 28],
          ['Sector Eddie – CLIP – Floater', ['NONE', ...r('1300-1530', 4), 'NONE', 'NONE'], 10],
          ['Sector Nora – Lobby', r('NONE', 7), 0]
        ], total: ['Total Dreamland S/Os', [5, 11, 9, 9, 9, 9, 6], 396] },
        { title: 'Shift Total', rows: [], total: ['Officers per Shift', [8, 16, 16, 16, 16, 15, 9], ''] },
        { title: 'Sergeants', rows: [
          ['Sgt. Wyatt LeCadre – 2/21/2016', [D, D, D, D, D, 'RDO', 'RDO'], ''],
          ['Sgt. Myra Pinzon – 11/27/2023', ['RDO', 'RDO', D, D, D, D, D], '']
        ] }
      ]
    },
    {
      id: 'tour3', name: 'Tour 3', label: 'Evening', time: '1500 × 2330', asof: 'As of 9/30/2026', startHour: 15,
      cols: ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'],
      groups: [
        { title: 'Peace Officers', rows: [
          ['PO Rivera – 10/6/97', ['RDO', E, E, E, E, E, 'RDO'], 40],
          ['PO McPhersen', [E, E, E, E, E, 'RDO', 'RDO'], 40],
          ['PO Figueroa', ['RDO', 'RDO', E, E, E, E, E], 40],
          ['Overtime Peace Officers', ['NONE', 'OT:' + E, 'NONE', 'NONE', 'NONE', 'OT:' + E, 'NONE'], 16]
        ], total: ['Total Peace Officers', [1, 3, 3, 3, 3, 3, 1], ''] },
        { title: 'Security Assistants', rows: [
          ['CSA A. Johnson', ['RDO', 'RDO', E, E, E, E, E], 40],
          ['CSA Y. Ruvel', ['RDO', 'RDO', E, E, E, E, E], 40],
          ['CSA Pierre-Louis – 7/11/16', [E, E, 'RDO', 'RDO', E, E, E], 40],
          ['CSA P. Hernandez – Part-Timer', ['RDO', E, E, E, E, 'RDO', 'RDO'], 32],
          ['CSA J. Al-Mamud', [E, E, E, E, E, 'RDO', 'RDO'], 40]
        ], total: ['Total CSAs', [2, 3, 4, 4, 5, 3, 3], 192] },
        { title: 'Dreamland Posts', rows: [
          ['Sector Adam', ['NONE', E, E, E, 'X', E, 'NONE'], 40],
          ['Sector Boy', ['NONE', E, E, E, E, E, 'NONE'], 40],
          ['Sector Charlie', ['NONE', E, E, E, E, E, 'NONE'], 40],
          ['Sector George', ['NONE', ...r('1530-1730', 5), 'NONE'], 10],
          ['Sector David', ['NONE', E, E, E, E, E, 'NONE'], 40],
          ['Sector Mary', ['NONE', E, E, E, E, E, 'NONE'], 32.5],
          ['Sector Lincoln', ['NONE', E, E, E, E, E, 'NONE'], 40],
          ['Sector Adam (weekend)', [E, ...r('NONE', 5), E], 16],
          ['Sector Boy (weekend)', [E, ...r('NONE', 5), E], 16],
          ['Sector Charlie (weekend)', [E, ...r('NONE', 5), E], 16],
          ['Firewatch – Savoy', ['FW:' + E, ...r('NONE', 5), 'FW:' + E], 16],
          ['Sector Peter – Prow – Front Door', ['NONE', ...r('1530-1700', 5), 'NONE'], 7.5],
          ['Sector Peter – Prow Rear Door', ['NONE', ...r('1530-1730', 5), 'NONE'], 10],
          ['Sector Eddie – CLIP – Lobby', ['NONE', ...r('1530-1700', 4), 'NONE', 'NONE'], 6],
          ['Sector Eddie – Floater', ['NONE', ...r('1530-1700', 4), 'NONE', 'NONE'], 6],
          ['Sector Nora – Lobby', r('NONE', 7), 0]
        ], total: ['Total Dreamland S/Os', [4, 11, 11, 11, 10, 9, 4], ''] },
        { title: 'Shift Total', rows: [], total: ['Officers per Shift', [7, 17, 18, 18, 18, 15, 8], ''] },
        { title: 'Sergeants', rows: [
          ['Sgt. Curt Caesar – 3/19/2017', ['OT:' + E, 'OT:' + E, E, E, E, E, E], 56]
        ] }
      ]
    }
  ];

  window.CONTENT.clubRooms = {
    building: 'C-Building', address: '450 Grand Concourse',
    floors: [
      ['3rd Floor', [
        ['C-370–372', 'Student Activities Office'],
        ['C-373', 'Black Student Union'],
        ['C-377', 'College Discovery Club Room']
      ]],
      ['4th Floor', [
        ['C-470', 'Animation Club'],
        ['C-471', 'Math, Reimagine Justice, Craft for Community Club'],
        ['C-472', 'Early Childhood Education Club'],
        ['C-473', 'Black Student Union / Ecuadorian Association'],
        ['C-474', 'Environmental Club'],
        ['C-475', 'Puerto Rican Student Org.'],
        ['C-476', 'Secretarial Science Club / The Hip Hop Club & Black Student Union'],
        ['C-477', 'Physics Club'],
        ['C-478', 'Engineering MACSS / STEM Club'],
        ['C-479', 'Campus Ministry']
      ]]
    ]
  };
})();
