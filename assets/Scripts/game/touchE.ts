import GameData from "../Manager/GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class touchE extends cc.Component {

    onLoad () {
        // 开启碰撞检测系统，未开启时无法检测
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;

        this.node.width = 1;
        this.node.height = 1;
        this.node.getComponent(cc.BoxCollider).size.width = this.node.width;
        this.node.getComponent(cc.BoxCollider).size.height = this.node.height;
        this.node.setPosition(GameData.ut_lead_fish.node.getPosition());
        this.node.color = cc.Color.RED;


    }

    start () {

    }

    update (dt) {

    }

    onCollisionEnter(other,self){ // 碰撞开始
        let that;
        if(GameData.upgrade_type.now_round <=2 ){ //如果是第一关第二关
            that = GameData.monsterFish_Component;
            that.touchEnter(other.node);
        }else{
            that = GameData.mapComponent;
            that.touchEnter(other.node);
        }
    }

    onCollisionExit(other,self){  // 碰撞结束
        let that;
        if(GameData.upgrade_type.now_round <=2 ){ //如果是第一关第二关
            that = GameData.monsterFish_Component;
            that.isTouchEnter = false;
        }else{
            that = GameData.mapComponent;
            that.touchLeave(other.node);
        }
    }
    onCollisionStay(other,self){
        let that = GameData.mapComponent;
        that.touchEnter(other.node);
    }
}
