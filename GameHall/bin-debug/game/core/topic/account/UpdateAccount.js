var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var topic;
(function (topic) {
    var UpdateAccount = (function () {
        function UpdateAccount() {
            this.transfer = new AccountTransfer();
        }
        return UpdateAccount;
    }());
    topic.UpdateAccount = UpdateAccount;
    __reflect(UpdateAccount.prototype, "topic.UpdateAccount");
    var AccountTransfer = (function () {
        function AccountTransfer() {
        }
        return AccountTransfer;
    }());
    topic.AccountTransfer = AccountTransfer;
    __reflect(AccountTransfer.prototype, "topic.AccountTransfer");
    var TransferAttachment = (function () {
        function TransferAttachment() {
        }
        return TransferAttachment;
    }());
    topic.TransferAttachment = TransferAttachment;
    __reflect(TransferAttachment.prototype, "topic.TransferAttachment");
})(topic || (topic = {}));
//# sourceMappingURL=UpdateAccount.js.map