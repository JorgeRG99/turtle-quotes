import { BehaviorSubject } from "rxjs";

export class SubjectManager {
    private $subject:BehaviorSubject<boolean>;

    constructor(initialValue: boolean) {
        this.$subject = new BehaviorSubject<boolean>(initialValue);
    }

    getSubject() {
        return this.$subject.asObservable();
    }

    getSubjectValue() {
        return this.$subject.value;
    }

    setSubject(value: boolean) {
        this.$subject.next(value)
    }
}