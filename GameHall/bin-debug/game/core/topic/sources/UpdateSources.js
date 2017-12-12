var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var topic;
(function (topic) {
    var UpdateSources = (function () {
        function UpdateSources() {
            this.action = "create";
            this.create = new UpdateSourcesCreate();
        }
        return UpdateSources;
    }());
    topic.UpdateSources = UpdateSources;
    __reflect(UpdateSources.prototype, "topic.UpdateSources");
    var UpdateSourcesCreate = (function () {
        function UpdateSourcesCreate() {
        }
        return UpdateSourcesCreate;
    }());
    topic.UpdateSourcesCreate = UpdateSourcesCreate;
    __reflect(UpdateSourcesCreate.prototype, "topic.UpdateSourcesCreate");
    var SourcePreference = (function () {
        function SourcePreference() {
        }
        return SourcePreference;
    }());
    topic.SourcePreference = SourcePreference;
    __reflect(SourcePreference.prototype, "topic.SourcePreference");
    var StatusTime = (function () {
        function StatusTime() {
        }
        return StatusTime;
    }());
    topic.StatusTime = StatusTime;
    __reflect(StatusTime.prototype, "topic.StatusTime");
})(topic || (topic = {}));
//# sourceMappingURL=UpdateSources.js.map