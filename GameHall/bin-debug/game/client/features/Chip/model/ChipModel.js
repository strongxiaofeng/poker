// module game
// {
//     /**
//      *
//      * @desc 当前筹码的模型数据
//      *
//      */
//     export class ChipModel
//     {
//         private static instance: ChipModel;
//         /** 当前选中的筹码数据*/
//         public currentSelectChipData: any;
//         /**当前选中的是否是自定义筹码 */
//         public isCurrentModify: boolean = false;
//         public constructor()
//         {
//         }
//         /**
//          * 获取当前选中筹码的点数
//          */
//         public get point(): number
//         {
//             if(this.currentSelectChipData){
//                 let num = +this.currentSelectChipData.count;
//                 // if (this.currentSelectChipData.source.indexOf("edit") != -1)
//                 // {
//                 //     return num;
//                 // }
//                 // num = Math.ceil(num);
//                 return num;
//             }
//             return 0;
//         }
//         /**
//          * 获取当前资源
//          */
//         public get source(): string
//         {
//             return this.currentSelectChipData.source;
//         }
//         /** 获取当前source 对应的 小筹码资源 */
//         public getChipSource(): string
//         {
//             var source = "";
//             if (this.currentSelectChipData.source.indexOf("edit") != -1)
//             {
//                 source = "chips_pic_custom_png";
//             } 
//             else
//             {
//                 source = ChipConstType.getChipSource(this.point,1);
//             }
//             return source;
//         }
//         public static getInstance(): ChipModel
//         {
//             if (this.instance == null)
//             {
//                 this.instance = new ChipModel();
//             }
//             return this.instance;
//         }
//         /**获取资源数组，主要视频回放用 */
//         public getSourceArr(money:number):Array<string>
//         {
//             let arr = new Array<string>();
//             //最多5个，从最大的找起
//             let chip = this.findRound(money*100);
//             while(chip > 0)
//             {
//                 if(arr.length >= 5)
//                 {
//                     break;
//                 }
//                 arr.push("pchip" + chip + "_png");
//                 chip = this.findRound((money - chip)*100);
//             }
//             if(arr.length < 5)
//             {
//                 arr.push("chips_pic_custom_png");
//             }
//             return arr;
//         }
//         /**查找最近的 */
//         private findRound(money:number):number
//         {
//             let chip = 0;
//             let chips = GlobalVariable.availbleChips;
//             let len = chips.length;
//             for(let i = 0;i < len;i++)
//             {
//                 if(i == 0)
//                 {
//                     if(money < chips[i])
//                     {
//                         chip = 0;
//                         break;
//                     }
//                 }
//                 else
//                 {
//                     if(money < chips[i] && money >= chips[i - 1])
//                     {
//                         chip = chips[i - 1];
//                         break;
//                     }
//                 }
//             }
//             return chip;
//         }
//     }
// }
//# sourceMappingURL=ChipModel.js.map