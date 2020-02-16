export type Subject = {
  resisted: boolean;
  withstandRating?: number;
  numberOfWithstandRatings?: number;
};

export function makeDefaultSubject(subject?: Partial<Subject>): Subject {
  return {
    resisted: false,
    numberOfWithstandRatings: 1,
    withstandRating: 1,
    ...subject,
  };
}
