export enum ContactSubject {
    PROBLEM_WITH_WOKER,
    PROBLEM_WITH_OWNER,
    TECHNICAL_PROBLEM,
    OTHER,
}
export const mapOptionsToContactSubject = (option): ContactSubject => {
    if (option === 'Problem with Walker') {
        return ContactSubject.PROBLEM_WITH_WOKER;
    }
    if (option === 'Problem with Owner') {
        return ContactSubject.PROBLEM_WITH_OWNER;
    }
    if (option === 'Technical Problem') {
        return ContactSubject.TECHNICAL_PROBLEM;
    }

    return ContactSubject.OTHER;
};

