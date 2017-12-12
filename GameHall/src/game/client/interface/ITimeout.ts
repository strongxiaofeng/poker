module game {

    /** 统一的timeout与interval管理接口 */
    export interface ITimeout {

        /** 统一的timeout管理 */
        timeoutObj?: Object;

        /** 统一的interval管理 */
        intervalObj?: Object;

        /** 清除所有timeout */
        removeTimeout?: () => void;

        /** 清除所有interval */
        removeInterval?: () => void;

    }

}