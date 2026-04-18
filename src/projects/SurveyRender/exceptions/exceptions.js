class GetIdError extends Error {
    constructor(message, type) {
        super(message);
        this.name = "GetIdError";
        this.type = type;
    }
}

class CheckAccessError extends Error {
    constructor(message, type) {
        super(message);
        this.name = "CheckAccessError";
        this.type = type;
    }
}

class GetSurveyInfoError extends Error {
    constructor(message, type) {
        super(message);
        this.name = "GetSurveyInfoError";
        this.type = type;
    }
}

class CheckUserAccesError extends Error {
    constructor(message, type) {
        super(message);
        this.name = "CheckUserAccesError";
        this.type = type;
    }
}

class SetParamsError extends Error {
    constructor(message, type) {
        super(message);
        this.name = "SetParamsError";
        this.type = type;
    }
}

class PrepareItemsError extends Error {
    constructor(message, type) {
        super(message);
        this.name = "PrepareItemsError";
        this.type = type;
    }
}

class FormSurveyError extends Error {
    constructor(message, type) {
        super(message);
        this.name = "FormSurveyError";
        this.type = type;
    }
}

class CheckDataError extends Error {
    constructor(message, type) {
        super(message);
        this.name = "CheckDataError";
        this.type = type;
    }
}

class ProcessLogicError extends Error {
    constructor(message, type) {
        super(message);
        this.name = "ProcessLogicError";
        this.type = type;
    }
}

export {GetIdError, CheckAccessError, GetSurveyInfoError, CheckUserAccesError,
    SetParamsError, PrepareItemsError, FormSurveyError, CheckDataError, ProcessLogicError
}