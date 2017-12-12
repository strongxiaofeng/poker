var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var topic;
(function (topic) {
    var ChatList = (function (_super) {
        __extends(ChatList, _super);
        function ChatList() {
            return _super.call(this) || this;
        }
        return ChatList;
    }(topic.BaseResponse));
    topic.ChatList = ChatList;
    __reflect(ChatList.prototype, "topic.ChatList");
    var ChatListSnapshot = (function () {
        function ChatListSnapshot() {
        }
        return ChatListSnapshot;
    }());
    topic.ChatListSnapshot = ChatListSnapshot;
    __reflect(ChatListSnapshot.prototype, "topic.ChatListSnapshot");
    var ChatList_Record = (function () {
        function ChatList_Record() {
        }
        return ChatList_Record;
    }());
    topic.ChatList_Record = ChatList_Record;
    __reflect(ChatList_Record.prototype, "topic.ChatList_Record");
    var ChatList_LastMsg = (function () {
        function ChatList_LastMsg() {
        }
        return ChatList_LastMsg;
    }());
    topic.ChatList_LastMsg = ChatList_LastMsg;
    __reflect(ChatList_LastMsg.prototype, "topic.ChatList_LastMsg");
})(topic || (topic = {}));
//# sourceMappingURL=ChatList.js.map