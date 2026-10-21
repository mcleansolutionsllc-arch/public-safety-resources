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
