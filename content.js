/* Public Safety Resources — content transcribed from posted reference materials */
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
    ['Aided', 'At T/P/O the (male/female/undisclosed) (This campus/Other CUNY) (Student/Faculty/Staff/Visitor) reported that (injured body part/illness). Aided was injured or became ill when they (circumstance). EMS responded and provided first aid to the Aided. Aided was transported to (hospital name) by EMS.\nOr: EMS responded and provided first aid and Aided refused any further medical treatment. RMA form signed.'],
    ['Alarm', 'At T/P/O a (intrusion/smoke alarm/pull box) was activated in (location). (Engineer name/FDNY Co/Fire Safety Director) (responded or notified). Source of alarm turned out to be (circumstances). The building (was/was not) evacuated. The all clear was given by (person name). FDNY was off-site at (time).'],
    ['Burglary', 'Item taken from a locked office or room.\nAt T/P/O the (male/female/undisclosed) (This campus/Other CUNY) (Student/Faculty/Staff/Visitor) reported that their (item) was taken by some unknown person from (location). The room was locked on (date and time). The (item) was discovered missing from (room #) at (date and time). Entry was (forced/unforced).'],
    ['Larcenies', 'Items taken from areas or rooms open to the public.\nAt T/P/O the (male/female/undisclosed) (This campus/Other CUNY) (Student/Faculty/Staff/Visitor) reported that some unknown person took their (item(s)) which was left (circumstances). Item was last seen at (time). Item was discovered missing at (time).'],
    ['Lost Property', 'Whenever someone has an item missing and is not sure when or where it occurred. Ex: item left in an open classroom or large open or outdoor area for an extended period of time.\nAt T/P/O the (male/female/undisclosed) (This campus/Other CUNY) (Student/Faculty/Staff/Visitor) reported that they last saw their (item) when they were at (time and place). They discovered it missing when they were (time and place).'],
    ['Robbery', 'Property forcibly taken.\nAt T/P/O the (male/female/undisclosed) (This campus/Other CUNY) (Student/Faculty/Staff/Visitor) reported that they were approached by the suspect who (produced/simulated) (type of weapon) or were threatened with physical force. The suspect stated "Quote." The suspect fled (direction of flight).'],
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
  window.CONTENT.buildings = [
    // [building, sector, street, city, extension(s)]
    ['A Building', 'Adam', '475 Grand Concourse', 'Bronx, NY 10451', ['3901']],
    ['B Building', 'Boy', '500 Grand Concourse', 'Bronx, NY 10451', ['7034']],
    ['C Building', 'Charlie', '450 Grand Concourse', 'Bronx, NY 10451', ['7033']],
    ['D Building', 'Savoy / David', '120 E. 149th Street', 'Bronx, NY 10451', ['3902']],
    ['T-5 Trailer', 'Henry', '427 Walton Avenue', 'Bronx, NY 10451', ['3903']],
    ['G Building', 'T-6 / Oscar', '135 East 146th Street', 'Bronx, NY 10451', ['7523']],
    ['CUNY in the Heights', 'Queen', '5030 Broadway', 'New York, NY 10034', ['212-567-5930']],
    ['Prow', 'Peter', '560 Exterior Street', 'Bronx, NY 10451', ['7017', '7018']],
    ['C.L.I.P', 'Eddie', '590 Exterior Street', 'Bronx, NY 10451', ['7215']],
    ['F Bldg / Incubator', 'Nora', '610 Exterior Street', 'Bronx, NY 10451', ['3904']],
    ['M Building', 'Mary', '429 Grand Concourse', 'Bronx, NY 10451', ['3905']]
  ];
  window.CONTENT.outsideContacts = [
    ['MTA Metro North Police', 'Non-emergency', '914-668-3000'],
    ['NYPD 40th Pct Desk', 'Precinct desk', '718-402-2279']
  ];

  // NYS Unified Court System holidays (Tue–Fri ones affect return/trial dates)
  window.CONTENT.courtHolidays = ['2026-11-03','2026-11-11','2026-11-26','2026-12-25','2027-01-01','2027-01-18','2027-02-12','2027-02-15','2027-05-31','2027-06-18','2027-07-05','2027-09-06','2027-10-11','2027-11-02','2027-11-11','2027-11-25','2027-12-24','2027-12-31','2028-02-11'];
})();

/* ---------- Field notes (built from the narrative templates) ---------- */
(function () {
  const C = window.CONTENT;
  const who = [
    { k: 'gender', l: 'Complainant', t: 'seg', o: ['male', 'female', 'undisclosed'] },
    { k: 'aff', l: 'Affiliation', t: 'seg', o: ['this campus', 'other CUNY'] },
    { k: 'role', l: 'Status', t: 'seg', o: ['Student', 'Faculty', 'Staff', 'Visitor'] }
  ];
  const suspect = [
    { k: 'sDesc', l: 'Suspect description', t: 'area', ph: 'Sex, race, age range, build, height, clothing — e.g. Male Black or Hispanic; 18 to 22 yrs old; slim build; 5\'11" to 6\'1"; Blk hat, Blk hooded jacket, blue jeans, Bwn boots' }
  ];
  const property = [
    { k: 'pDesc', l: 'Property description', t: 'area', ph: 'Item, color, brand, case, serial # — e.g. Grey Apple MacBook Pro laptop, Blk carrying case' },
    { k: 'value', l: 'Approx. value ($)', t: 'num', ph: '900' }
  ];
  C.fieldNotes = [
    { id: 'aided', name: 'Aided', fields: [...who,
        { k: 'injury', l: 'Injured body part / illness', ph: 'injured their left ankle' },
        { k: 'circ', l: 'How it happened', ph: 'slipped on the stairs between the 2nd and 3rd floor' },
        { k: 'ems', l: 'EMS outcome', t: 'seg', o: ['Transported', 'Refused (RMA signed)'] },
        { k: 'hosp', l: 'Hospital', ph: 'Lincoln Hospital', show: v => v.ems !== 'Refused (RMA signed)' }],
      text: (v, p, o) => `${o} the ${p('gender')} ${p('role')} ${p('aff')} reported that they ${p('injury')}. Aided was injured or became ill when they ${p('circ')}. ` +
        (v.ems === 'Refused (RMA signed)' ? 'EMS responded and provided first aid and Aided refused any further medical treatment. RMA form signed.' : `EMS responded and provided first aid to the Aided. Aided was transported to ${p('hosp')} by EMS.`) },
    { id: 'alarm', name: 'Alarm', fields: [
        { k: 'atype', l: 'Alarm type', t: 'seg', o: ['intrusion alarm', 'smoke alarm', 'pull box'] },
        { k: 'resp', l: 'Engineer / FDNY Co. / Fire Safety Director', ph: 'FDNY Engine 50' },
        { k: 'rn', l: 'Responded or notified', t: 'seg', o: ['responded', 'was notified'] },
        { k: 'source', l: 'Source of alarm', ph: 'burnt food in the 4th floor pantry' },
        { k: 'evac', l: 'Building evacuated', t: 'seg', o: ['was', 'was not'] },
        { k: 'clear', l: 'All clear given by', ph: 'name' },
        { k: 'fdny', l: 'FDNY off-site at', t: 'time' }],
      text: (v, p, o) => `${o} a ${p('atype')} was activated. ${p('resp')} ${p('rn')}. Source of alarm turned out to be ${p('source')}. The building ${p('evac')} evacuated. The all clear was given by ${p('clear')}. FDNY was off-site at ${p('fdny')}.` },
    { id: 'burglary', perp: true, name: 'Burglary', note: 'Item taken from a locked office or room.', fields: [...who,
        { k: 'item', l: 'Item(s) taken', ph: 'laptop' },
        { k: 'locked', l: 'Room locked on (date & time)', ph: '11/13 at 1700 hrs' },
        { k: 'found', l: 'Discovered missing (date & time)', ph: '11/14 at 0815 hrs' },
        { k: 'entry', l: 'Entry', t: 'seg', o: ['forced', 'unforced'] }, ...property],
      text: (v, p, o) => `${o} the ${p('gender')} ${p('role')} ${p('aff')} reported that their ${p('item')} was taken by some unknown person from ${p('loc')}. The room was locked on ${p('locked')}. The ${p('item')} was discovered missing from ${p('loc')} at ${p('found')}. Entry was ${p('entry')}.` },
    { id: 'larceny', perp: true, name: 'Larceny', sub: 'Petit / Grand 4th', note: 'Items taken from areas or rooms open to the public.', larceny: true, fields: [...who,
        { k: 'item', l: 'Item(s) taken', ph: 'cell phone' },
        { k: 'circ', l: 'Where / how it was left', ph: 'unattended on a table in the 2nd floor library' },
        { k: 'seen', l: 'Last seen at', ph: '1300 hrs' },
        { k: 'missing', l: 'Discovered missing at', ph: '1330 hrs' }, ...property,
        { k: 'gl', l: 'Grand larceny factors (any one makes it GL 4th)', t: 'checks', o: ['Credit or debit card', 'Taken from the person', 'Firearm / rifle / shotgun', 'Public record or document', 'Motor vehicle over $100'] }],
      text: (v, p, o) => `${o} the ${p('gender')} ${p('role')} ${p('aff')} reported that some unknown person took their ${p('item')} which was left ${p('circ')}. Item was last seen at ${p('seen')}. Item was discovered missing at ${p('missing')}.` },
    { id: 'lost', name: 'Lost Property', note: 'Item missing and the owner is not sure when or where it happened.', fields: [...who,
        { k: 'item', l: 'Item', ph: 'wallet' },
        { k: 'last', l: 'Last saw it (time & place)', ph: 'at 1100 hrs in room B-501' },
        { k: 'disc', l: 'Discovered missing (time & place)', ph: 'at 1230 hrs in the cafeteria' }, ...property],
      text: (v, p, o) => `${o} the ${p('gender')} ${p('role')} ${p('aff')} reported that they last saw their ${p('item')} when they were ${p('last')}. They discovered it missing when they were ${p('disc')}.` },
    { id: 'robbery', perp: true, name: 'Robbery', note: 'Property forcibly taken.', fields: [...who,
        { k: 'force', l: 'Force used', t: 'seg', o: ['Weapon produced', 'Weapon simulated', 'Threat of physical force'] },
        { k: 'weapon', l: 'Type of weapon', ph: 'knife', show: v => v.force !== 'Threat of physical force' },
        { k: 'quote', l: 'Suspect stated (quote)', ph: 'Give me your phone' },
        { k: 'item', l: 'Item(s) taken', ph: 'cell phone' },
        { k: 'flight', l: 'Direction of flight', ph: 'southbound on Grand Concourse' }, ...property],
      text: (v, p, o) => `${o} the ${p('gender')} ${p('role')} ${p('aff')} reported that they were approached by the suspect who ` +
        (v.force === 'Threat of physical force' ? 'threatened them with physical force' : `${v.force === 'Weapon simulated' ? 'simulated' : v.force === 'Weapon produced' ? 'produced' : '(produced/simulated)'} a ${p('weapon')}`) +
        ` and took their ${p('item')}. The suspect stated "${p('quote')}." The suspect fled ${p('flight')}.` },
    { id: 'mischief', perp: true, name: 'Criminal Mischief', sub: 'PL 145.00 – 145.10', kw: 'damage vandalism graffiti broken 145', note: 'Property damaged without permission. The charge level follows the cost of the damage.',
      classify: v => {
        const val = parseFloat(String(v.value || '').replace(/[^\d.]/g, ''));
        const g = (v.dtype || '') === 'graffiti' ? '; graffiti may also be charged as Making Graffiti, PL 145.60 (A Misd.)' : '';
        if (v.intent === 'recklessly') return val > 250 ? { c: ['145.00', 'Criminal Mischief 4th', 'A Misdemeanor'], why: 'reckless damage over $250' + g } : { c: null, why: (isNaN(val) ? 'enter the damage cost; ' : '') + 'reckless damage of $250 or less is not a Penal Law offense — document as an incident' + g };
        const pre = v.intent ? '' : 'intent assumed; ';
        if (val > 1500) return { c: ['145.10', 'Criminal Mischief 2nd', 'D Felony'], why: pre + 'damage over $1,500' + g };
        if (val > 250) return { c: ['145.05', 'Criminal Mischief 3rd', 'E Felony'], why: pre + 'damage over $250' + g };
        return { c: ['145.00', 'Criminal Mischief 4th', 'A Misdemeanor'], why: pre + (isNaN(val) ? 'no damage cost entered yet; $250 or less is 4th degree' : 'intentional damage of $250 or less') + g };
      },
      fields: [...who,
        { k: 'item', l: 'Property damaged', ph: 'the glass panel of the 1st floor entrance door' },
        { k: 'owner', l: 'Property belongs to', t: 'seg', o: ['the college', 'the complainant', 'another person'] },
        { k: 'dtype', l: 'Type of damage', t: 'seg', o: ['broken', 'cracked', 'scratched', 'graffiti', 'other'] },
        { k: 'how', l: 'How it was damaged', ph: 'struck with a closed fist' },
        { k: 'intent', l: 'Damage was done', t: 'seg', o: ['intentionally', 'recklessly'] },
        { k: 'seen', l: 'Damage seen or discovered at', ph: '1415 hrs' },
        { k: 'value', l: 'Est. cost of damage ($)', t: 'num', ph: '400' },
        { k: 'by', l: 'Done by', t: 'seg', o: ['some unknown person', 'the suspect'] }],
      text: (v, p, o) => `${o} the ${p('gender')} ${p('role')} ${p('aff')} reported that ${p('item')}, property of ${p('owner')}, was ${v.dtype === 'graffiti' ? 'marked with graffiti' : v.dtype && v.dtype !== 'other' ? v.dtype : p('dtype')} by ${p('by')} who ${p('how')}. The damage was ${v.by === 'some unknown person' ? 'discovered' : 'observed'} at ${p('seen')}. ${v.intent ? `The damage appears to have been done ${v.intent}. ` : ''}Estimated cost of damage is $${v.value ? String(v.value).replace(/^\$/, '') : '(est. cost of damage)'}.`.replace('$(est. cost of damage)', '\u0001est. cost of damage\u0002') },
    { id: 'harassment', perp: true, name: 'Harassment', sub: 'PL 240.25 / .26 / .30', kw: 'harass threat followed shoved stalking aggravated 240', note: 'Contact, following, or repeated alarming acts with intent to harass, annoy or alarm.',
      classify: v => {
        const a = v.acts || [];
        if (a.includes('Threat by phone, text, email or social media')) return { c: ['240.30', 'Aggravated Harassment 2nd', 'A Misdemeanor'], why: 'threat of physical or property harm sent by phone, computer or other electronic means' };
        if (a.includes('Repeated acts placing them in fear of physical injury')) return { c: ['240.25', 'Harassment 1st', 'B Misdemeanor'], why: 'repeatedly harassed and placed in reasonable fear of physical injury' };
        return { c: ['240.26', 'Harassment 2nd', 'Violation'], why: a.length ? a.map(x => x.toLowerCase()).join(', ') : 'physical contact, following, or repeated alarming acts' };
      },
      fields: [...who,
        { k: 'known', l: 'Suspect is', t: 'seg', o: ['known to the complainant', 'unknown to the complainant'] },
        { k: 'rel', l: 'Relationship', ph: 'former classmate', show: v => v.known === 'known to the complainant' },
        { k: 'acts', l: 'What happened (check all that apply)', t: 'checks', o: ['Struck, shoved or kicked', 'Threatened physical contact', 'Followed in or about a public place', 'Repeated acts that alarm or seriously annoy', 'Repeated acts placing them in fear of physical injury', 'Threat by phone, text, email or social media'] },
        { k: 'act', l: 'Describe what the suspect did', ph: 'shoved them against the wall in the 2nd floor hallway' },
        { k: 'quote', l: 'Suspect stated (quote)', ph: 'optional' },
        { k: 'method', l: 'Sent by (number, app, account)', ph: 'text messages from 347-555-0199', show: v => (v.acts || []).includes('Threat by phone, text, email or social media') },
        { k: 'inj', l: 'Injury', t: 'seg', o: ['No injury', 'Minor injury', 'Refused medical attention'] },
        { k: 'wit', l: 'Witnesses', ph: 'names or none' }],
      text: (v, p, o) => `${o} the ${p('gender')} ${p('role')} ${p('aff')} reported that the suspect, ${v.known === 'known to the complainant' && v.rel ? `known to the complainant as a ${v.rel}` : p('known')}, ${p('act')}.` +
        (v.quote ? ` The suspect stated "${v.quote.trim()}."` : '') +
        ((v.acts || []).includes('Threat by phone, text, email or social media') ? ` The threat was communicated by ${p('method')}.` : '') +
        ` Complainant ${v.inj === 'Minor injury' ? 'sustained a minor injury' : v.inj === 'Refused medical attention' ? 'refused medical attention' : v.inj === 'No injury' ? 'was not injured' : '(injury)'}. Witnesses: ${p('wit')}.`.replace('(injury)', '\u0001injury\u0002') },
    { id: 'assault', perp: true, name: 'Assault', sub: 'PL 120.00 – 120.10', kw: 'assault punched struck fight injury 120', draft: true, note: 'Physical injury caused to another person. The charge level follows the injury, intent and any weapon used.',
      classify: v => {
        const ser = v.inj === 'serious physical injury', wpn = v.wpn === 'deadly weapon / dangerous instrument', rec = v.intent === 'recklessly', none = v.inj === 'no visible injury / pain only';
        const duty = (v.flags || []).includes('Victim was a peace/police officer, EMS, firefighter or nurse on duty');
        if (none) return { c: null, why: 'no physical injury (impairment of physical condition or substantial pain) — consider Harassment 2nd (PL 240.26) or attempted assault' };
        if (ser && wpn && !rec) return { c: ['120.10', 'Assault 1st', 'B Felony'], why: 'intent to cause serious physical injury, caused it with a deadly weapon or dangerous instrument' };
        if (ser && !rec) return { c: ['120.05', 'Assault 2nd', 'D Felony'], why: 'intent to cause serious physical injury and caused it' };
        if (ser && wpn && rec) return { c: ['120.05', 'Assault 2nd', 'D Felony'], why: 'recklessly caused serious physical injury with a deadly weapon or dangerous instrument' };
        if (wpn && !rec) return { c: ['120.05', 'Assault 2nd', 'D Felony'], why: 'intent to cause physical injury, caused it with a deadly weapon or dangerous instrument' };
        if (duty && !rec) return { c: ['120.05', 'Assault 2nd', 'D Felony'], why: 'physical injury caused to prevent an officer, EMS, firefighter or nurse from performing a lawful duty' };
        return { c: ['120.00', 'Assault 3rd', 'A Misdemeanor'], why: (v.intent ? '' : 'intent assumed; ') + (rec ? 'recklessly caused physical injury' : 'intent to cause physical injury and caused it') + (v.inj ? '' : ' — select the injury level') };
      },
      fields: [...who,
        { k: 'known', l: 'Suspect is', t: 'seg', o: ['known to the complainant', 'unknown to the complainant'] },
        { k: 'act', l: 'What the suspect did', ph: 'punched them in the face with a closed fist' },
        { k: 'inj', l: 'Injury level', t: 'seg', o: ['physical injury', 'serious physical injury', 'no visible injury / pain only'] },
        { k: 'injdesc', l: 'Injury description', ph: 'a laceration above the left eye and swelling' },
        { k: 'intent', l: 'Injury was caused', t: 'seg', o: ['intentionally', 'recklessly'] },
        { k: 'wpn', l: 'Weapon', t: 'seg', o: ['none', 'deadly weapon / dangerous instrument'] },
        { k: 'weapon', l: 'Type of weapon or instrument', ph: 'a glass bottle', show: v => v.wpn === 'deadly weapon / dangerous instrument' },
        { k: 'flags', l: 'Special circumstances', t: 'checks', o: ['Victim was a peace/police officer, EMS, firefighter or nurse on duty'] },
        { k: 'ems', l: 'EMS', t: 'seg', o: ['Transported', 'Refused (RMA signed)', 'Not requested'] },
        { k: 'hosp', l: 'Hospital', ph: 'Lincoln Hospital', show: v => v.ems === 'Transported' },
        { k: 'sdisp', l: 'Suspect', t: 'seg', o: ['fled', 'was detained', 'remained on scene'] },
        { k: 'flight', l: 'Direction of flight', ph: 'northbound on Walton Ave', show: v => v.sdisp === 'fled' },
        { k: 'wit', l: 'Witnesses', ph: 'names or none' }],
      text: (v, p, o) => `${o} the ${p('gender')} ${p('role')} ${p('aff')} reported that they were assaulted by a suspect ${p('known')}. The suspect ${p('act')}` +
        (v.wpn === 'deadly weapon / dangerous instrument' ? ` using ${p('weapon')}` : '') + `. ` +
        (v.inj === 'no visible injury / pain only' ? 'Complainant had no visible injury. ' : `Complainant sustained ${p('injdesc')}. `) +
        (v.ems === 'Transported' ? `EMS responded and Complainant was transported to ${p('hosp')}. ` : v.ems === 'Refused (RMA signed)' ? 'EMS responded and Complainant refused any further medical treatment. RMA form signed. ' : v.ems === 'Not requested' ? 'Complainant declined EMS. ' : '\u0001EMS\u0002. ') +
        (v.sdisp === 'fled' ? `The suspect fled ${p('flight')}.` : v.sdisp ? `The suspect ${v.sdisp}.` : 'The suspect \u0001fled/was detained\u0002.') + ` Witnesses: ${p('wit')}.` },
    { id: 'weapon', perp: true, name: 'Criminal Possession of a Weapon', sub: 'PL 265.01 – 265.03', kw: 'criminal possession of a weapon cpw gun firearm knife stun gun knuckles 265 henderson rule 8', draft: true, note: 'Weapon or dangerous instrument found on a person or on college grounds. Also a Henderson Rule 8 violation.',
      classify: v => {
        const t = v.wtype || '', loaded = v.loaded === 'loaded', intent = (v.flags || []).includes('Displayed, threatened or intended to use it against another');
        const r8 = ' Also Henderson Rule 8.';
        if (t === 'firearm / rifle / shotgun') return loaded ? { c: ['265.03', 'CPW 2nd', 'C Felony'], why: 'loaded firearm possessed outside the home or place of business; CPW on school grounds (PL 265.01-a) also applies.' + r8 } : { c: ['265.01-a', 'CPW on School Grounds', 'E Felony'], why: 'firearm on college grounds without written authorization' + (v.loaded ? '' : ' — mark loaded or unloaded') + '.' + r8 };
        if (t === 'stun gun / taser' || t === 'metal or plastic knuckles' || t === 'switchblade / billy / blackjack / other per se weapon') return { c: ['265.01', 'CPW 4th', 'A Misdemeanor'], why: 'weapon listed in PL 265.01(1) — possession alone is the offense.' + r8 };
        if (t === 'imitation pistol' || t === 'knife / dagger / razor' || t === 'other dangerous instrument') return intent ? { c: ['265.01', 'CPW 4th', 'A Misdemeanor'], why: 'dangerous weapon or instrument possessed with intent to use it unlawfully against another (PL 265.01(2)).' + r8 } : { c: null, why: 'no Penal Law charge without intent to use it unlawfully against another — document as a Henderson Rule 8 violation.' };
        return { c: null, why: 'select the weapon type to see the charge.' };
      },
      fields: [
        { k: 'srole', l: 'Subject is a', t: 'seg', o: ['Student', 'Faculty', 'Staff', 'Visitor', 'unknown person'] },
        { k: 'how', l: 'Discovered', t: 'seg', o: ['observed by MOS', 'reported by a complainant', 'found during a bag check', 'found unattended'] },
        { k: 'mos', l: 'MOS / reporting person', ph: 'Officer name' },
        { k: 'wtype', l: 'Weapon type', t: 'seg', o: ['firearm / rifle / shotgun', 'knife / dagger / razor', 'stun gun / taser', 'metal or plastic knuckles', 'switchblade / billy / blackjack / other per se weapon', 'imitation pistol', 'other dangerous instrument'] },
        { k: 'wdesc', l: 'Weapon description', ph: 'Blk folding knife with a 4" blade' },
        { k: 'loaded', l: 'Firearm was', t: 'seg', o: ['loaded', 'unloaded'], show: v => v.wtype === 'firearm / rifle / shotgun' },
        { k: 'where', l: 'Where it was found', ph: 'in the front pocket of their backpack' },
        { k: 'flags', l: 'Circumstances', t: 'checks', o: ['Displayed, threatened or intended to use it against another'] },
        { k: 'disp', l: 'Disposition (check all that apply)', t: 'checks', o: ['Weapon secured by MOS', 'NYPD notified', 'NYPD responded and took custody of the weapon', 'Subject removed from campus', 'Referred to Student Conduct'] }],
      text: (v, p, o) => {
        const hw = { 'observed by MOS': `${p('mos')} observed`, 'reported by a complainant': `${p('mos')} reported`, 'found during a bag check': `during a bag check ${p('mos')} discovered`, 'found unattended': `${p('mos')} found` };
        const sub = v.how === 'found unattended' ? `a ${p('wdesc')} unattended ${p('where')}.` : `that the subject ${!v.kUnk && v.kName ? '(' + v.kName.trim() + '), ' : ''}a ${v.srole ? v.srole : '\u0001subject is a\u0002'}${!v.kUnk && (v.kAff === 'this campus' || v.kAff === 'other CUNY') && v.srole !== 'Visitor' && v.srole !== 'unknown person' ? ' (' + v.kAff + ')' : ''}, was in possession of a ${p('wdesc')} ${p('where')}.`;
        const d = v.disp || [];
        return `${o} ${v.how ? hw[v.how] : '\u0001MOS observed/reported\u0002'} ${sub}` + (v.wtype === 'firearm / rifle / shotgun' && v.loaded ? ` The firearm was ${v.loaded}.` : '') +
          ((v.flags || []).length ? ' The subject displayed, threatened or intended to use the weapon against another.' : '') +
          (d.length ? ' ' + d.map(x => x.replace(/^Weapon secured by MOS$/, 'The weapon was secured by MOS').replace(/^NYPD notified$/, 'NYPD was notified').replace(/^NYPD responded and took custody of the weapon$/, 'NYPD responded and took custody of the weapon').replace(/^Subject removed from campus$/, 'The subject was removed from campus').replace(/^Referred to Student Conduct$/, 'The matter was referred to Student Conduct')).join('. ') + '.' : ' \u0001disposition\u0002.');
      } },
    { id: 'trespass', perp: true, name: 'Trespass', code: ['140.05', 'Trespass', 'Violation'], fields: [
        { k: 'saff', l: 'Subject affiliation', t: 'seg', o: ['this campus', 'other CUNY', 'not affiliated'] },
        { k: 'srole', l: 'Subject status', t: 'seg', o: ['Student', 'Faculty', 'Staff', 'Visitor', 'Former student'] },
        { k: 'where', l: 'Found in (location)', ph: 'the 3rd floor of B-Building' },
        { k: 'why', l: 'Reason', t: 'seg', o: ['after hours', 'without permission to be therein'] },
        { k: 'mos', l: 'Found by (MOS)', ph: 'Officer name' }],
      text: (v, p, o) => `${o} the subject${!v.kUnk && v.kName ? ' (' + v.kName.trim() + ')' : ''}, ${v.srole ? 'a ' + (v.srole === 'Former student' ? 'former student' : v.srole) : '\u0001subject status\u0002'} ${v.saff === 'not affiliated' ? 'with no college affiliation' : v.saff ? '(' + v.saff + ')' : '\u0001subject affiliation\u0002'}, was found in ${p('where')} ${p('why')} by ${p('mos')}.` }
  ];
  C.larcenyCodes = { petit: ['155.25', 'Petit Larceny', 'A Misdemeanor'], grand: ['155.30', 'Grand Larceny 4th', 'E Felony'] };

  /* ---------- CUNY Henderson Rules (Rules for Maintenance of Public Order, Education Law Art. 129-A) ---------- */
  C.henderson = {
    source: 'https://www.hostos.cuny.edu/Administrative-Offices/Public-Safety-Department/Policies-and-Procedures/CUNY-Henderson-Rules',
    adopted: 'Adopted by the CUNY Board of Trustees on June 23, 1969, as amended October 27, 1980, May 22, 1989 and June 25, 1990.',
    rules: [
      ['Obstruction of rights and educational processes', 'A member of the academic community shall not intentionally obstruct and/or forcibly prevent others from the exercise of their rights. Nor shall he interfere with the institution’s educational processes or facilities, or the rights of those who wish to avail themselves of any of the institution’s instructional, personal, administrative, recreational, and community services.'],
      ['Failure to comply with lawful directions', 'Individuals are liable for failure to comply with lawful directions issued by representatives of the University/college when they are acting in their official capacities. Members of the academic community are required to show their identification cards when requested to do so by an official of the college.'],
      ['Unauthorized occupancy and equipment use', 'Unauthorized occupancy of university/college facilities or blocking access to or from such areas is prohibited. Permission from appropriate college authorities must be obtained for removal, relocation, and use of university/college equipment and/or supplies.'],
      ['Theft or damage to property', 'Theft from, or damage to university/college premises or property, or theft of or damage to property of any person on university/college premises is prohibited.'],
      ['Violence and abuse against others', 'Each member of the academic community or an invited guest has the right to advocate his position without having to fear abuse, physical, verbal, or otherwise, from others supporting conflicting points of view. Members of the academic community and other persons on the college grounds shall not use language or take actions reasonably likely to provoke or encourage physical violence by demonstrators, those demonstrated against, or spectators.'],
      ['Unauthorized presence', 'Action may be taken against any and all persons who have no legitimate reason for their presence on any campus within the University/college, or whose presence on any such campus obstructs and/or forcibly prevents others from the exercise of the rights or interferes with the institution’s educational processes or facilities, or the rights of those who wish to avail themselves of any of the institution’s instructional, personal, administrative, recreational, and community services.'],
      ['Disorderly or indecent conduct', 'Disorderly or indecent conduct on university/college-owned or controlled property is prohibited.'],
      ['Weapons and dangerous instruments', 'No individual shall have in his possession a rifle, shotgun, or firearm or knowingly have in his possession any other dangerous instruments or material that can be used to inflict bodily harm on an individual or damage upon a building or the grounds of the University/college without the written authorization of such educational institution. Nor shall any individual have in his possession any other instrument or material which can be used and is intended to inflict bodily harm on any individual or damage upon a building or the grounds of the University/college.'],
      ['Hazing and endangerment', 'Any action or situation which recklessly or intentionally endangers mental or physical health or involves the forced consumption of liquor or drugs for the purpose of initiation into or affiliation with any organization is prohibited.'],
      ['Illegal drugs', 'The unlawful manufacture, distribution, dispensation, possession, or use of illegal drugs or other controlled substances by university students or employees on University/college premises, or as part of any University/college activities is prohibited. Employees of the University must also notify the College Personnel Director of any criminal drug statute conviction for a violation occurring in the workplace not later than five (5) days after such conviction.'],
      ['Alcohol', 'The unlawful possession, use, or distribution of alcohol by students or employees on university/college premises or as part of any University/college activities is prohibited.']
    ],
    penalties: [
      ['Students', 'Admonition, warning, censure, disciplinary probation, restitution, suspension, expulsion, ejection, and/or arrest by the civil authorities.'],
      ['Faculty, instructional and classified staff', 'Warning, censure, restitution, fine not exceeding those permitted by law or by the CUNY Bylaws, or suspension with/without pay pending a hearing before an appropriate college authority, dismissal after a hearing, ejection, and/or arrest by the civil authorities. For Rule 10 (drugs), may alternatively be required to participate satisfactorily in a licensed drug treatment or rehabilitation program.'],
      ['Faculty and staff — due process', 'Entitled to be treated in accordance with the Education Law, the Civil Service Law, the applicable collective bargaining agreement, or the Bylaws or written policies of CUNY.'],
      ['Visitors, licensees and invitees', 'Ejection and/or arrest by the civil authorities.'],
      ['Organizations', 'An organization that authorized the prohibited conduct shall have its permission to operate on campus rescinded.']
    ],
    sanctions: [
      ['A', 'Admonition', 'An oral statement to the offender that he has violated university rules.'],
      ['B', 'Warning', 'Notice to the offender, orally or in writing, that continuation or repetition of the wrongful conduct, within a period of time stated in the warning, may cause far more severe disciplinary action.'],
      ['C', 'Censure', 'Written reprimand for violation of specified regulation, including the possibility of more severe disciplinary sanction in the event of conviction for the violation of any University regulation within a period stated in the letter of reprimand.'],
      ['D', 'Disciplinary Probation', 'Exclusion from participation in privileges or extracurricular University activities as set forth in the notice of disciplinary probation for a specified period of time.'],
      ['E', 'Restitution', 'Reimbursement for damage to or misappropriation of property. Reimbursement may take the form of appropriate service to repair or otherwise compensate for damages.'],
      ['F', 'Suspension', 'Exclusion from classes and other privileges or activities as set forth in the notice of suspension for a definite period of time.'],
      ['G', 'Expulsion', 'Termination of student status for an indefinite period. The conditions of readmission, if any is permitted, shall be stated in the order of expulsion.'],
      ['H', 'Complaint to Civil Authorities', ''],
      ['I', 'Ejection', '']
    ]
  };
  C.opsToc = [[1, "Rules of Conduct - Uniformed Personnel", "Administration", "12-01-92", "06 (06-20-13)", 6, ["INTRODUCTION", "UNIVERSITY POLICIES FOR CONDUCT OF PUBLIC SAFETY PERSONNEL"]], [2, "Use of Code Signals – Public Address Systems", "Patrol Procedures", "12-01-92", "04 (12-01-92)", 5, ["INTRODUCTION", "POLICY", "STANDARD OPERATING PROCEDURE", "PAGING AT CAMPUS FACILITIES WITH PUBLIC ADDRESS SYSTEMS"]], [3, "Use of Firearms and Deadly Physical Force", "Use of Force", "07-01-92", "07 (09-08-16)", 11, ["INTRODUCTION", "DEFINITIONS", "USE OF FIREARM OR OTHER DEADLY PHYSICAL FORCE", "AUTHORIZATION TO CARRY FIREARMS", "SPECIFIC RESTRICTIONS ON THE USE OF FIREARMS", "CARRYING AND SAFEGUARDING FIREARMS", "LOSS OR THEFT OF FIREARM", "SUSPENSION AND REVOCATION OF FIREARMS PRIVILEGES", "COMMUNICATION WITH THE NEW YORK CITY POLICE DEPARTMENT", "REPORTING THE USE OF FIREARMS", "CRIMINAL AND CIVIL LIABILITY FOR VIOLATION OF RULES", "DISCIPLINARY ACTION FOR VIOLATION OF RULES"]], [4, "Inspection and Defective Firearm Procedures", "Patrol Procedures", "06-01-92", "03 (12-12-12)", 2, ["INTRODUCTION", "INSPECTION OF SERVICE FIREARM", "DEFECTIVE SERVICE FIREARM"]], [5, "Personal Appearance - Uniformed Campus Public Safety Personnel", "Administration", "06-01-92", "03 (06-05-17)", 2, ["PERSONAL APPEARANCE", "EXEMPTIONS"]], [6, "Regulation Uniform Specifications", "Administration", "08-01-96", "04 (02-24-14)", 18, ["PURPOSE", "UNIFORM CHANGEOVER DATES", "UNIFORM"]], [7, "Search of Arrested Persons", "Patrol Procedures", "12-01-92", "03 (10-29-15)", 4, ["INTRODUCTION", "SEARCH OF ARRESTED PERSONS"]], [8, "Reasonable Suspicion Drug Testing Policy for CUNY Public Safety Personnel", "Administration", "03-01-94", "04 (06-06-19)", 14, ["INTRODUCTION", "POLICY", "SUPERVISOR GUIDELINES", "DEFINITIONS", "OTHER DRUG TESTING"]], [9, "Medal Awards and Recognition & Wearing of Medals, and Mourning Bands", "Administration", "04-01-93", "03 (03-23-12)", 9, ["INTRODUCTION", "PROCEDURE", "GUIDELINES FOR AWARDS/CATEGORIES OF RECOGNITION", "MEDALS AND BREAST BARS AUTHORIZED TO BE WORN BY PUBLIC SAFETY OFFICERS", "BREAST BAR DESCRIPTION", "DISPLAY OF MEDALS", "MOURNING BANDS"]], [10, "Use of Oleoresin Capsicum Aerosol [O.C.] Spray", "Use of Force", "12-01-93", "04 (07-21-16)", 7, ["INTRODUCTION", "POLICY", "DEFINITION OF OLEORESIN CAPSICUM", "TRAINING", "DISTRIBUTION AND CUSTODY OF EQUIPMENT", "OPERATING PROCEDURE", "USE WITH VIOLENT EMOTIONALLY DISTURBED PERSON (E.D.P.'S)", "DOCUMENTATION OF THE USE OF O.C."]], [11, "Summary Penalties for Violations of Rules of Conduct", "Administration", "05-01-95", "03 (04-30-13)", 20, ["INTRODUCTION"]], [12, "University Memorandum Book", "Administration", "01-01-94", "01 (11-01-97)", 7, ["INTRODUCTION", "DISTRIBUTION AND CUSTODY OF EQUIPMENT", "RESPONSIBILITY OF DESK SERGEANT/ PATROL SERGEANTS", "CAMPUS PUBLIC SAFETY POLICY ADDENDUM"]], [13, "Public Safety Notifications", "Administration", "05-01-94", "02 (12-01-97)", 2, ["INTRODUCTION", "POLICY"]], [14, "Private Security Policy", "Administration", "05-01-94", "02 (07-06-15)", 2, ["INTRODUCTION", "POLICY", "SCOPE OF RESPONSIBILITY", "SECURITY & SAFETY GUIDLINES", "EXCEPTIONS"]], [15, "Off-Duty Arrest Guidelines for University Peace Officers", "Administration", "01-01-95", "02 (03-21-12)", 4, ["INTRODUCTION", "POLICY"]], [16, "Inspections Policy & Procedure [Uniforms/Field]", "Administration", "012-01-95", "02 (03-21-12)", 5, ["INTRODUCTION", "PURPOSE", "TYPES OF INSPECTIONS", "INSPECTION CRITERIA", "INSPECTION OF UNIFORMS AND EQUIPMENT", "INSPECTION EVALUATION"]], [17, "Overtime Reporting Policy & Procedure", "Administration", "02-01-95", "02 (03-01-99)", 4, ["INTRODUCTION", "PROCEDURE"]], [18, "Use of ASP [Collapsible] Baton", "Use of Force", "07-01-95", "04 (09-08-16)", 5, ["INTRODUCTION", "POLICY", "WHAT IS THE ASP BATON", "TRAINING", "PROCEDURES", "ASP TARGETS", "USE WITH VIOLENT EMOTIONALLY DISTURBED PERSON (E.D.P.'S)", "DISTRIBUTION AND CUSTODY OF EQUIPMENT", "DOCUMENTATION OF THE USE OF THE ASP BATON", "MAINTENANCE"]], [19, "Rules and Regulations Regarding Firearms on Campus", "Administration", "09-01-95", "03 (11-13-09)", 14, ["INTRODUCTION", "POLICY", "FIREARMS TRAINING", "ACQUISITION OF FIREARM", "CUSTODY OF FIREARM", "TRAINING COST AND REMUNERATIONS", "POSSESSION OF FIREARMS WHILE OFF DUTY", "CARRYING AND SAFEGUARDING FIREARMS", "OFF DUTY EMPLOYMENT", "LOSS OR THEFT OF FIREARM", "USE OF FIREARM", "SUSPENSION AND REVOCATION OF FIREARM PRIVILEGES", "VOLUNTARY SURRENDER OF SERVICE FIREARM", "RESTORATION OF FIREARM PRIVILEGES", "QUALIFICATION", "PERMITTED FIREARMS AND MAINTENANCE OF FIREARMS", "FIREARM INSPECTION AND DEFECTIVE FIREARMS", "COMMUNICATION WITH NEW YORK CITY POLICE DEPARTMENT"]], [20, "Magnetometer [Metal Detector] Policy", "Patrol Procedures", "09-25-96", "04 (03-21-12)", 7, ["INTRODUCTION", "POLICY", "PURPOSE", "PROCEDURES", "DISCOVERY OF CONTRABAND", "RETURN OF PROPERTY"]], [21, "Use of Police Trained Law Enforcement Canine Patrol", "Patrol Procedures", "08-01-96", "02 (1-01-97)", 20, ["PURPOSE", "GENERAL RESPONSIBILITIES", "REQUESTS FOR USE OF CANINE SERVICE", "GUIDELINES ON THE USE OF FORCE IN CANINE DEPLOYMENT", "AUTHORIZED DEPLOYMENT AND USE SITUATIONS FOR POLICE CANINES", "PROCESSING OF ARRESTEE(S)", "DUTIES AND RESPONSIBILITIES OF INITIAL RESPONDING OFFICERS", "LIMITATIONS OF CANINES ABILITIES & SPECIAL CONSIDERATIONS", "CANINE UNIT QUALIFICATIONS AND TRAINING", "SUPERVISION OF THE K-9 UNIT", "GENERAL OPERATIONAL ORDERS FOR CANINE PERSONNEL", "AREAS OF ASSIGNMENT AND PROCEDURES FOR REPORTING ON/OFF- DUTY", "“OFFICER DOWN” ASSISTANCE FOR HANDLER AND/OR CANINE"]], [22, "Bomb Threats Response Procedure", "Patrol Procedures", "08-01-96", "01 (11-01-97)", 6, ["INTRODUCTION", "BOMB THREATS", "SEARCHING FOR A BOMB", "ACTIONS TO BE TAKEN IF A SUSPECTED OBJECT IS FOUND", "ACTIONS TO BE TAKEN IF NO SUSPECTED OBJECT IS FOUND", "SOME TYPICAL LETTER AND PACKAGE BOMB INDICATORS (COPY OF A CUNY \"BOMB THREAT CHECK LIST\" ATTACHED)"]], [23, "Body Armor", "Patrol Procedures", "02-01-96", "02 (10-29-15)", 4, ["INTRODUCTION", "PURPOSE", "POLICY", "PROCEDURES"]], [24, "Use of Handcuffs and Safeguarding of Prisoners", "Patrol Procedures", "09-01-97", "03 (02-24-15)", 10, ["INTRODUCTION", "POLICY", "PROCEDURES", "TECHNIQUES", "EQUIPMENT SPECIFICATION AND SUPPLY", "METHODS OF TRANSPORTING PRISONERS", "INJURED PRISONER IN CUSTODY", "HOSPITALIZATION OF PRISONER", "GUARDING OF HOSPITALIZED PRISONERS", "COURT APPEARANCE OF PRISONER"]], [25, "Guidelines for Responding to Demonstrations", "Patrol Procedures", "05-01-96", "01 (11-01-97)", 2, ["INTRODUCTION", "PROCEDURES"]], [26, "General Policy – Use of Force", "Use of Force", "11-01-97", "01 (09-18-20)", 2, ["INTRODUCTION", "POLICY"]], [27, "Random Drug Testing", "Administration", "09-01-98", "05 (10-22-15)", 6, ["INTRODUCTION", "PURPOSE", "PROCEDURE", "DEFENSIBLE ABSENCES", "REFUSAL TO COOPERATE", "OVERTIME", "CONFIDENTIALITY", "VOLUNTARY DISCLOSURE"]], [28, "Arrests – General", "Patrol Procedures", "03-03-05", "03 (03-11-15)", 5, ["PURPOSE", "POLICY", "PROCEDURE", "REFERENCE"]], [29, "Criminal Court Summons Processing", "Administration", "03-03-05", "03 (02-22-17)", 5, ["PURPOSE", "POLICY", "PROCEDURE", "REFERENCE"]], [30, "CUNY Peace Officer Designation Procedure", "Administration", "03-03-05", "", 5, ["INTRODUCTION", "APPOINTMENT"]], [31, "Active Shooter Incident Response Protocol", "Patrol Procedures", "10-30-07", "02 (10-20-15)", 2, ["INTRODUCTION", "POLICY"]], [32, "Use of Department Vehicles", "Patrol Procedures", "10-23-08", "", 4, ["PURPOSE", "POLICY"]], [33, "Special Assistance for Events [SAFE] Team", "Patrol Procedures", "08-14-13", "02 (07-06-15)", 4, ["INTRODUCTION", "PURPOSE", "PROCEDURES"]], [34, "Bicycle Patrol Unit", "Patrol Procedures", "02-28-14", "01 (06-03-14)", 3, ["PURPOSE", "POLICY", "PROCEDURES", "UNIFORMS", "REPAIR/MAINTENANCE", "EQUIPMENT", "REFERENCE"]], [35, "eJusticeNY Integrated Justice Portal", "Administration", "02-28-14", "01 (06-03-14)", 4, ["INTRODUCTION", "PURPOSE", "DEFINITIONS:", "USER CERTIFICATION", "TERMINAL AGENCY COORDINATOR:", "OPERATORS", "HIT CONFIRMATION POLICY", "REFERENCES:"]], [36, "Naloxone Hydrochloride Deployment", "Patrol Procedures", "06-05-15", "01 (06-12-17)", 5, ["PURPOSE", "POLICY", "DEFINITIONS", "PROCEDURE"]], [37, "Violent Felony and Sexual Assault Investigations", "Patrol Procedures", "08-27-15", "00", 5, ["PURPOSE", "PROCEDURE", "REFERENCE"]], [38, "Missing Person Investigations", "Patrol Procedures", "08-27-15", "00", 3, ["PURPOSE", "DEFINITIONS", "PROCEDURE", "REFERENCE"]], [39, "Locker Use By CUNY Employees", "Administration", "01-07-16", "00", 1, ["PURPOSE", "PROCEDURES"]], [40, "Post-Use of An Automatic External Defibrillator", "Administration", "05-23-16", "00", 3, ["PURPOSE", "POLICY", "DEFINITIONS", "PROCEDURES", "REFERENCE"]], [41, "Procedures for Title IX Related Incidents", "Patrol Procedures", "05-19-17", "01 (06-12-17)", 6, ["POLICY", "PURPOSE", "DEFINITIONS", "PROCEDURE", "REFERENCES"]], [42, "Omniform System Access/Usage Policy", "Administration", "04-12-19", "00", 2, ["INTRODUCTION", "PURPOSE", "DEFINITIONS", "PROCEDURE"]], [43, "Tourniquet", "Patrol Procedures", "04-12-19", "00", 3, ["PURPOSE", "POLICY", "DEFINITIONS", "PROCEDURE", "REFERENCES"]], [44, "Found Property Procedure", "Patrol Procedures", "04-12-19", "00", 6, ["PURPOSE", "PROCEDURES", "NOTIFICATIONS / DOCUMENTATION", "VOUCHERING PROPERTY", "RETURNING PROPERTY", "ITEMS NOT TO BE VOUCHERED", "RETENTION / DISPOSITION", "REFERENCES"]]];
})();
