import user from "../Account/User";
import channel from "../Channel/channel";
import message from "../Messages/Message";

class author{
    private User: string;
    private WrittenMessages: message[] = [];
    private CurrentChannel: channel;
    constructor (user: string, currentChannel: channel)
    {
        this.User =user;
        this.CurrentChannel = currentChannel;
    }
}
export = author;