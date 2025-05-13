type Reminder = {
  who: string;
  what: string;
  when: Date;
};
declare module 'parse-reminder' {
  function parseReminder(text: string, referenceDate?: Date): Reminder | null;

  export default parseReminder;
}
