module com {

    /**解析类的基类 */
    export class AnalyzerBase {

        public constructor() { }

        public analyzerFile(resItem: ResourceItem, compFunc: Function, thisObject: any): void {
        }

		/** 读取一个字符串里最后一个点之前的内容。
         * @param name {string} 要读取的字符串
         */
        public static getStringPrefix(name: string): string {
            if (!name) {
                return "";
            }
            let index: number = name.indexOf(".");
            if (index != -1) {
                return name.substring(0, index);
            }
            return "";
        }

        /** 读取一个字符串里最后一个点之后的内容。
         * @param name {string} 要读取的字符串
         */
        public static getStringTail(name: string, flag = false): string {
            if (!name) {
                return "";
            }
            let index: number = name.lastIndexOf(".");
            if (flag) {
                index = name.indexOf(".");
            }
            if (index != -1) {
                return name.substring(index + 1);
            }
            return "";
        }

        /** 读取一个字符串里最后一个斜杠之前的内容，包含斜杠。
         * @param name {string} 要读取的字符串
         */
        public static getStringSprit(url: string): string {
            if (!url) {
                return "";
            }
            let index: number = url.lastIndexOf("/");
            if (index != -1) {
                return url.substring(0, index + 1);
            }
            return "";
        }

    }
}