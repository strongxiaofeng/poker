module game {

	export class StringUtil {

		/**账号格式 */
		public static nameArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
		public static numArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

		public constructor() {
		}

		/**校验 账号是否包含除小写字母和数字之外的字符 false不合法 true合法*/
		public static checkNameIllegal(name: string): boolean {
			if (!name) return false;
			for (let i = 0; i < name.length; i++) {
				if (this.nameArr.indexOf(name.charAt(i)) < 0) {
					//包含除数字和小写字母之外的字符
					return false;
				}
			}
			return true;
		}

		/** 获取字符串实际长度，中文字符长度为2，英文字符长度为1 */
		public static getStrLen(str: string): number {
			var len = 0;
			for (var i = 0; i < str.length; i++) {
				var c = str.charCodeAt(i);
				if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
					len++;
				} else {
					len += 2;
				}
			}
			return len;
		}

		/** 按照字符串实际长度对字符串进行截取，中文字符长度为2，英文字符长度为1
		 * @param str {string} 需要截取的字符串
		 * @param length {number} 截取的长度
		 * @param startIndex {number} 开始截取的位置，默认为0
		 */
		public static sliceByLen(str: string, length: number, startIndex: number = 0): string {
			let newStr = "";
			let len = 0;
			for (var i = startIndex; i < str.length; i++) {
				var c = str.charCodeAt(i);
				if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
					len++;
				} else {
					len += 2;
				}
				if (len <= length) {
					newStr += str[i];
				}
			}
			return newStr;
		}

		/** 按照字符串实际长度对字符串进行截取，中文字符长度为2，英文字符长度为1, 截取之后显示...结尾
		 * @param str {string} 需要截取的字符串
		 * @param length {number} 截取的长度
		 * @param startIndex {number} 开始截取的位置，默认为0
		 */
		public static sliceByLen2(str: string, length: number, startIndex: number = 0): string {
			let newStr = this.sliceByLen(str, length, startIndex);
			if (newStr != str) newStr = newStr + "...";
			return newStr;
		}

		/**校验 数字之外的字符 小数点只有一个，且后面只能有俩位，前面至少一个*/
		public static checkNumIllegal(num: string): boolean {
			if (!num) return false;
			if (num == "") return false;
			num = num + "";
			for (let i = 0; i < num.length; i++) {
				if (this.numArr.indexOf(num.charAt(i)) < 0) {
					//包含除数字之外的字符
					return false;
				}
			}
			if (num.indexOf('.') != -1) {
				let n = 0;
				if (Number(num.length) - Number(num.indexOf('.')) > 2)//小数点后只有俩位
				{
					return false;
				}
				for (let i = 0; i < num.length; i++) {
					if (num[i] == ".") {
						n++;
					}
				}
				if (n > 1)//只包含一个小数点
				{
					return false;
				}
			}
			if (num[0] == "0" && num.length >= 2)//如果第一位是0判断第二位数字只能为小数点
			{
				if (num[1] != ".") {
					return false
				}
			}
			if (num[0] == ".") return false;
			return true;
		}

		/**校验邮箱格式 */
		public static checkMail(mail: string): boolean {
			let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if (!myreg.test(mail)) {
				return false;
			}
			return true;
		}

	}
}