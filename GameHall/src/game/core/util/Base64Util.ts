module game
{
	/**base64相关 */
	export class Base64Util
	{
		public constructor()
		{
		}

		public static StringToBase64(str:string):string
		{
			let base64:string;
			base64 = window.btoa(str);
			return base64;
		}

		public static ArrayBufferToBase64(buffer: ArrayBuffer):string
		{
			var binary = '';
            var bytes = new Uint8Array(buffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++)
			{
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
		}

		public static Base64ToArrayBuffer(base64: string): ArrayBuffer {
			var binary_string = window.atob(base64);
			var len = binary_string.length;
			var bytes = new Uint8Array(len);
			for (var i = 0; i < len; i++) {
				bytes[i] = binary_string.charCodeAt(i);
			}
			return bytes.buffer;
		}

	}
}