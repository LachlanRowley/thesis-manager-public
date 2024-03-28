import {getRandomInt, Student, Academic} from '../datagen/fakedatagen'

class PresAca {
    academic: Academic;
    orderedByPickyStudents: Student[];
    numPickyStudents: number;
    allocatedStudents: number;
    constructor(aca: Academic, stu: Student[], numStu: number) {
        this.academic = aca;
        this.orderedByPickyStudents = stu;
        this.numPickyStudents = numStu;
        this.allocatedStudents = 0;
    }
}

export class PresentationSession {
    capacity: number;
    currentStudents: Student[];
    currentAcademics: Academic[];
    presentationSession: number[];
    lockedInSession: number;

    constructor(students: Student[], presentationSessions: number[]) {
        this.capacity = 12;
        this.currentStudents = students;
        this.currentAcademics = new Array<Academic>;
        this.presentationSession = new Array<number>(presentationSessions.length).fill(0);
        for (let i = 0; i < presentationSessions.length; i++) {
            this.presentationSession[i] = presentationSessions[i];
        }
        this.lockedInSession = -1;
    }
}

export class PresentationGroup {
    currentStudents: Student[];
    supervisor: Academic;
    department: number[];
    assigned: boolean;
    presentationSession: number[];

    constructor(students: Student[], supervisor: Academic) {
        this.currentStudents = students;
        this.supervisor = supervisor;
        this.department = supervisor.department;
        this.assigned = false;
        this.presentationSession = new Array(6).fill(0);
    }
}

function oneSessionExists(group: PresentationGroup, presPrefStudent: number[]) {
    for (let i = 0; i < group.presentationSession.length; i++) {
        if (group.presentationSession[i] == 0 && presPrefStudent[i] == 0) {
            return true;
        }
    }

    return false;
}

function oneSessionExistsGroup(group1: PresentationGroup, group2: PresentationGroup) {
    for (let i = 0; i < group1.presentationSession.length; i++) {
        if (group1.presentationSession[i] == 0 && group2.presentationSession[i] == 0) {
            return true;
        }
    }
    
    return false;
}

function joinSessions(group1: PresentationGroup, group2: PresentationGroup) {
    let joinedSession = new Array<number>(group1.presentationSession.length).fill(0);
    for (let i = 0; i < group1.presentationSession.length; i++) {
        if (group1.presentationSession[i] == 1 || group2.presentationSession[i] == 1) {
            joinedSession[i] = 1;
        }
    }

    return joinedSession;
}

// assumes academics is sorted by pickystudents
export function schedulePresentation(unsortedAca: Academic[], days: number, sessionsPerDay: number) {
    let presentationSessions: PresentationSession[] = new Array<PresentationSession>;
    let groups = new Array<PresentationGroup>;
    let academics = sortAcaByPickyStudents(unsortedAca);
    let chairs = new Array<number>;
    let secondMarkers = new Array<Number>;
    let chair = 0;
    let secondMarker = 0;
    let totalSessions: number = days * sessionsPerDay;

    academics.forEach((academic) => {
        let groupsToAdd = fixGroup(new PresentationGroup(academic.orderedByPickyStudents, academic.academic));
        for (let i = 0; i < groupsToAdd.length; i++) {
            groups.push(groupsToAdd[i]);
        }
    });

    console.log(groups.length);

    for (let i = 0; i < groups.length; i++) {
        for (let j = groups.length - 1; j >= 0; j--) {
            if (i != j && !groups[i].assigned && !groups[j].assigned) {
                if (oneSessionExistsGroup(groups[i], groups[j]) && departmentSimilar(groups[i].department, groups[j].department) && (groups[i].currentStudents.length + groups[j].currentStudents.length) <= 12) {
                    presentationSessions.push(new PresentationSession(groups[i].currentStudents.concat(groups[j].currentStudents), joinSessions(groups[i], groups[j])));
                    groups[i].assigned = true;
                    groups[j].assigned = true;
                    
                    if (groups[i].supervisor.supervisingStudents.length > groups[j].supervisor.supervisingStudents.length) {
                        chair = groups[i].supervisor.aID;
                        secondMarker = groups[j].supervisor.aID;
                    } else {
                        secondMarker = groups[i].supervisor.aID;
                        chair = groups[j].supervisor.aID;
                    }
                    break;
                }
            }
        }
        if (!groups[i].assigned) {
            presentationSessions.push(new PresentationSession(groups[i].currentStudents, groups[i].presentationSession));
            chair = groups[i].supervisor.aID;
            // need to assign maybe
            secondMarker = -1;
        }
        chairs.push(chair);
        secondMarkers.push(secondMarker);
    }
    console.log(presentationSessions.length);

    presentationSessions = sortSessionByPicky(presentationSessions);
    presentationSessions = assignSessions(presentationSessions, totalSessions);

    return presentationSessions;
}

function assignSessions(sessionsToBeAssigned: PresentationSession[], totalSessions: number) {
    let sessions = sessionsToBeAssigned;
    let sessionsLength: number[] = new Array<number>(totalSessions).fill(0);

    // assigns session to smallest bucket of sessions that is compatible
    for (let i = 0; i < sessions.length; i++) {
        let smallestCompatibleBucket = 100000;
        let smallestCompatibleBucketIndex = -1;
        for (let j = 0; j < sessions[i].presentationSession.length; j++) {
            if (sessions[i].presentationSession[j] == 0 && (smallestCompatibleBucket > sessionsLength[j])) {
                smallestCompatibleBucket = sessionsLength[j];
                smallestCompatibleBucketIndex = j;
            }
        }
        sessions[i].lockedInSession = smallestCompatibleBucketIndex;
        sessionsLength[smallestCompatibleBucketIndex]++;
    }

    return sessions;
}

export function fixGroup(group: PresentationGroup) {
    let groups = new Array<PresentationGroup>;
    let studentAssignedGroup: Boolean;

    // for each student, make sure they are in a group of students that all have at least one compatible presentation session
    for (let i = 0; i < group.currentStudents.length; i++) {
        studentAssignedGroup = false;
        for (let j = 0; j < groups.length; j++) {
            if (oneSessionExists(groups[j], group.currentStudents[i].preferencesSchedule)) {
                groups[j].currentStudents.push(group.currentStudents[i]);
                for (let k = 0; k < groups[j].presentationSession.length; k++) {
                    if (group.currentStudents[i].preferencesSchedule[k] == 1) {
                        groups[j].presentationSession[k] = 1;
                    }
                }
                studentAssignedGroup = true;
                break;
            }
        }

        // if student unassigned create new group and add them to it
        if (!studentAssignedGroup) {
            groups.push(new PresentationGroup([group.currentStudents[i]], group.supervisor));
            groups[groups.length-1].currentStudents.push(group.currentStudents[i]);
            for (let j = 0; j < groups[groups.length-1].presentationSession.length; j++) {
                if (group.currentStudents[i].preferencesSchedule[j] == 1) {
                    groups[groups.length-1].presentationSession[j] = 1;
                }
            }
        }
    }

    return groups;
}

export function createData(academics: Academic[]) {
    let presAcas = new Array<PresAca>;
    for (let i = 0; i < academics.length; i++) {
        let sortedStudents: Student[] = sortStudentsByPicky(academics[i].supervisingStudents);
        let n = 0;
        sortedStudents.forEach((student) => {
            if (student.presPref > 0) {
                n += student.presPref;
            }
        });

        presAcas.push(new PresAca(academics[i], sortStudentsByPicky(academics[i].supervisingStudents), n));
    }

    return presAcas;
}

function sortStudentsByPicky(students: Student[]) {
    let data: Student[] = students;
    for (let i = 0; i < data.length; i++) {
        let biggestIndex = i;
        let biggestLength = 0;
        for (let j = i; j < data.length; j++) {
            if (data[j].presPref > biggestLength) {
                biggestLength = data[j].presPref;
                biggestIndex = j;
            }
        }
        let swap = data[i];
        data[i] = data[biggestIndex];
        data[biggestIndex] = swap;
    }

    return data;
}

export function sortAcaByPickyStudents(academics: Academic[]) {
    let data = createData(academics);
    for (let i = 0; i < data.length; i++) {
        let biggestIndex = i;
        let biggestLength = 0;
        for (let j = i; j < data.length; j++) {
            if (data[j].numPickyStudents > biggestLength) {
                biggestLength = data[j].numPickyStudents;
                biggestIndex = j;
            }
        }
        let swap = data[i];
        data[i] = data[biggestIndex];
        data[biggestIndex] = swap;
    }

    return data;
}

function sortSessionByPicky(sessions: PresentationSession[]) {
    let data: PresentationSession[] = sessions;
    for (let i = 0; i < data.length; i++) {
        let biggestIndex = i;
        let biggestLength = 0;
        for (let j = i; j < data.length; j++) {
            if (groupPickiness(data[j]) > biggestLength) {
                biggestLength = groupPickiness(data[j]);
                biggestIndex = j;
            }
        }
        let swap = data[i];
        data[i] = data[biggestIndex];
        data[biggestIndex] = swap;
    }

    return data;
}

function groupPickiness(session: PresentationSession) {
    let pickiness = 0;
    for (let i = 0; i < session.presentationSession.length; i++) {
        if (session.presentationSession[i]) {
            pickiness++;
        }
    }

    return pickiness;
}

export function departmentSimilar(d1: number[], d2: number[]) {
    for (let i = 0; i < d1.length; i++) {
        for (let j = 0; j < d2.length; j++) {
            if (compareDepartment(d1[i], d2[j])) {
                return true;
            }
        }
    }

    return false;
}

export function compareDepartment(d1: number, d2: number) {
    if (d1 == d2) {
        return true;
    }
    return false;
}




