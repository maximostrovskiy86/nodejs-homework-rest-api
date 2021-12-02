class GoIt10NodeError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

class ValidationError extends GoIt10NodeError {
    constructor(message) {
        super(message);
        this.status(400);
    }
}

class WrongParametersError extends GoIt10NodeError {
    constructor(message) {
        super(message);
        this.status(400);
    }
}

class NotAuthorizedError extends GoIt10NodeError {
    constructor(message) {
        super(message);
        this.status(401);
    }
}

export default {
    NotAuthorizedError,
    GoIt10NodeError,
    WrongParametersError,
    ValidationError
}