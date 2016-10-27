function NetworkStatusBroadcast(isConnected) {
    this.IsConnected = isConnected;
    this.Reason = "";
    this.RetryCount = 0;
}
function CompressedMessage() {
    this.$type = "QuantEdge.Message.Common.CompressedMessage, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.MainMsgType = "";
    this.MainRequestKey = "";
    this.RawMessage = "";
}
function PartialMessage() {
    this.$type = "QuantEdge.Message.Common.PartialMessage, Message, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";
    this.Count = 0;
    this.Index = 0;
    this.MainMsgType = "";
    this.MainRequestKey = "";
    this.RawMessage = "";
}