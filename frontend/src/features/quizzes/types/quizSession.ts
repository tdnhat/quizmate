/**
 * Represents the possible states of a quiz session
 */
export enum QuizSessionState {
    WaitingToStart = "WaitingToStart",
    Active = "Active",
    BetweenQuestions = "BetweenQuestions",
    ShowingResults = "ShowingResults",
    Ended = "Ended",
    Paused = "Paused",
}
