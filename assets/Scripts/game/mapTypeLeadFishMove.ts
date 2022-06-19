import GameData from "../Manager/GameData";
import ut_lead_fish from "./ut_lead_fish";

const {ccclass, property} = cc._decorator;

@ccclass
export default class mapTypeLeadFishMove extends cc.Component {
    nowPos = cc.v2(0,0);
    isClick_leadfish:boolean = false;  // 有没有点击主角
    isTouch:boolean = false;           // 主角是否被选中了
    speed:number = 400;                // 主角移动速度
    angle:number = null;               // 主角移动角度
    lastPos:cc.Vec2;                   // 主角移动前的坐标
    
    protected onLoad () {
        GameData.mapTypeLeadFishMove = this;
        this.node.on(cc.Node.EventType.TOUCH_START,this.touch_Start.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touch_Move.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END,this.touch_End.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touch_Cancel.bind(this));
    }

    protected onEnable(): void {
    }

    start () {
    }

    update (dt) {

    }
    // 触摸开始
    touch_Start(event:cc.Event.EventTouch){
        this.isTouch = true;
        this.lastPos = this.node.getPosition();
    }
    // 触摸移动
    touch_Move(event:cc.Event.EventTouch){
        if(this.isTouch){
            this.node.setPosition(this.node.parent.convertToNodeSpaceAR(event.getLocation()).x + GameData.upgrade_type.cameraX,this.node.parent.convertToNodeSpaceAR(event.getLocation()).y + GameData.upgrade_type.cameraY);
        }
    }
    // 触摸结束
    touch_End(event:cc.Event.EventTouch){
        this.isTouch = false;
        if(GameData.mapComponent.isTouchEnter){ // 如果进入目标范围
            GameData.mapComponent.isTouchEnter = false; // 关闭进入目标范围

            if(GameData.upgrade_type.now_round == 4){
                if(GameData.mapComponent.frameNum == 4) this.node.getComponent(ut_lead_fish).frameParent = null;
                GameData.mapComponent.addFrame(this.node.getComponent(ut_lead_fish).frameParent); // 添加盒子
                GameData.mapComponent.frameNum += 1; // 增加盒子数量
            }

            if(GameData.mapComponent.isHasMonster){ // 如果有怪物
                this.node.setPosition(GameData.mapComponent.targetPointPos.x - this.node.width / 2,GameData.mapComponent.targetPointPos.y); // 移动到目标点
                this.node.getComponent(ut_lead_fish).fightAnimation(GameData.mapComponent.targetPointPos); // 打斗动画
            }else{ // 如果没有怪物
                if(GameData.mapComponent.isProp){ // 如果有道具
                    this.node.setPosition(GameData.mapComponent.targetPointPos.x,GameData.mapComponent.targetPointPos.y); // 移动到目标点
                    this.node.getComponent(ut_lead_fish).propAnimation(GameData.mapComponent.targetFish); // 取得道具
                    GameData.mapComponent.isProp = false; // 关闭道具
                }else{ // 如果没有道具
                    this.node.setPosition(GameData.mapComponent.targetPointPos.x ,GameData.mapComponent.targetPointPos.y); // 移动到目标点
                    if(GameData.upgrade_type.now_round == 4) return; // 如果是第四关 不用动摄像机
                    cc.tween(cc.find('Canvas/Main Camera')) //移动相机对准主角
                    .call(()=>{
                        let posX = this.node.x - cc.find('Canvas/Main Camera').x;
                        GameData.upgrade_type.cameraX += posX;
                        GameData.upgrade_type.background_move(); // 背景移动
                    })
                    .to(0.5,{x:this.node.x})
                    .start();
                }
            }
        }else{
            this.node.setPosition(this.lastPos); // 返回到上一个位置
        }
    }
    // 触摸取消
    touch_Cancel(event:cc.Event.EventTouch){
        this.isTouch = false;
        this.node.setPosition(this.lastPos); // 返回到上一个位置
    }
}