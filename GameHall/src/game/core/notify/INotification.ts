module game
{
	/**
	 * 消息机制基础结构
	 * @author beiyuan
	 *
	 */
        export interface INotification 
        {
                /**
                 * 添加需要监听的消息名----唯一的一个字符串
                 * */
                listNotification(): Array<string>;
                /**
                 * 处理收到消息体
                 * */
                handleNotification(type: string, body: any): void;
                /**
                 * 发送到
                 * */
                sendNotification(type: string, body: any): void;
                addRegister(name: string, obj: any): void;
                removeRegister(name: string): void;
        }
}
