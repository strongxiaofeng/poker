module game//以免污染全局命名空间
{
	export enum NotifyCommands
	{
		/** 初始化事件监听器 */
		initListener,
		/**参数：true显示消息，false显示联系人 */
		changeState,
		/**更新列表 */
		updateChatList,
		updateChipList,
		updateSysList,
		updateAnnounceList,
		/**公告的最后一条 */
		updateAnnounceLast,
		updataChipAskLast,
		/**更新系统消息的最后一条内容 */
		updateSysLast,
		/**添加俱乐部成员到联系人 */
		addClubMembers,
		/**添加我加入的俱乐部房主为联系人 */
		addClubOwner,
		/**添加俱乐部信息作为一个联系人 */
		addClubInfo,
		/**我创建的俱乐部些 一共有哪些玩家 PC联系人列表用的*/
		setClubPlayers,
		/**更新俱乐部名字 */
		updateClubName,
		/**更新玩家名字 */
		updatePlayerName,
		/**是否可以聊天 */
		canChat,
		/**新增聊天信息 */
		addChatInfo,
		
		chatRecord,
		/**显示系统消息和公告的具体内容 */
		showContent,
		showHead,

		/**PC 打开房主联系人列表 */
		openOwnersPerson,
		/**PC 打开我的club 玩家联系人列表 */
		openPlayersPerson,
		/**修改top的名字 */
		changeTopName,
		/**显示tip */
		showTip,
		updateChatName,
		selectNotifyItem,
		selectSysMsg,
		selectClubAnnounce,
		initData
	}
}