module game
{
	/**
	 *
	 * @author 帅波
	 * @date 2016.05.20
	 * @desc 字典
	 *
	 */
	export class Dictionary
	{
		private dict: Object;
		public constructor()
		{
			this.dict = {};
		}
		/**
		 * 根据key来设置value
		 */
		public setValue(key: any, value: any): void
		{
			this.dict[key] = value;
		}
		/**
		 * 根据key获得value
		 */
		public getValue(key: any): any
		{
			return this.dict[key];
		}
		/**
		 * 获取所有key
		 */
		public getAllKey(): Array<any>
		{
			var keys: Array<any> = [];
			for (var key in this.dict)
			{
				keys.push(key);
			}
			return keys;
		}
		/**
		 * 获取所有value
		 */
		public getAllValue(): Array<any>
		{
			var values: Array<any> = [];
			for (var key in this.dict)
			{
				values.push(this.dict[key]);
			}
			return values;
		}
		/**
		 * 检测是否包含某个key
		 */
		public containsKey(key: any): boolean
		{
			return this.dict[key] == null ? false : true;
		}
		/**
		 * 移除某个key
		 */
		public removeKey(key: any): void
		{
			this.dict[key] = null;
			delete this.dict[key];
		}
		/**
		 * 移除某个value
		 * temp:只能移除第一个value
		 */
		public removeValue(value: any): void
		{
			for (var key in this.dict)
			{
				if (this.dict[key] == value)
				{
					this.removeKey(key);
					break;
				}
			}
		}
		/**
		 * 根据Value获得Key
		 */
		public getKeyByValue(value: any): any
		{
			for (var key in this.dict)
			{
				if (this.dict[key] == value)
				{
					return key;
				}
			}
			return null;
		}
		/**
		 * 获取key的个数
		 */
		public getKeyLength(): number
		{
			let count: number = 0;
			for (var key in this.dict)
			{
				count++;
			}
			return count;
		}
		/**
		 * 清除所有数据
		 */
		public clear(): void
		{
			this.dict = null;
			this.dict = {};
		}

		public toString(): string
		{
			return this.dict.toString();
		}
	}
}
