export class NotificationPayloadData {
    action?: string;
    image?: string;
    constructor(action?: string, image?: string) {
        this.action = action;
        this.image = image;
    }
}
