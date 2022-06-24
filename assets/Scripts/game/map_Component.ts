import GameData from "../Manager/GameData";
import gameStart from "./gameStart";
import leadFish from "./leadFish";

const {ccclass, property} = cc._decorator;

@ccclass
export default class mapComponent extends cc.Component {
    isTouchEnter:boolean = false;// 是否进入目标范围
    targetPointPos:cc.Vec2;  // 目标点的坐标
    isHasMonster:boolean; //目标方块内是否有怪物
    targetFish:cc.Node = null; //目标怪物
    target_score:number;         // 目标分数
    target_index:number;        //层级
    isProp:boolean;  // 目标内是否有道具
    frameNum:number = 1; // 盒子数量
    mubiaohezi:cc.Node = null; // 目标盒子
    // targetFramePos:{leftTop:cc.Vec2,rightBottom:cc.Vec2}={
    //     leftTop:null,
    //     rightBottom:null
    // };
    onLoad () {
        GameData.mapComponent = this;
        this.node.children.forEach(child => {
            // child.on(cc.Node.EventType.MOUSE_ENTER, this.touchEnter, this);
            // child.on(cc.Node.EventType.MOUSE_LEAVE, this.touchLeave, this);
            // child.on(cc.Node.EventType.MOUSE_UP, this.touchUp, this);
        });
    }

    start () {

    }

    update (dt) {

    }

    // 触摸进入
    touchEnter(node:cc.Node) {
        if(GameData.mapTypeLeadFishMove.isTouch){
            this.isTouchEnter = true; // 进入目标范围
            this.targetPointPos = cc.v2(node.getPosition().x + node.parent.x, node.getPosition().y + node.parent.y); // 获取目标点的坐标
            node.children.forEach(child => { // 获取目标点的坐标
                if(child.name.indexOf("monster") != -1 || child.name.indexOf("boss") != -1){
                    this.isHasMonster = true; // 目标方块内有怪物
                    this.targetFish = child; // 获取目标怪物
                    this.target_score = parseInt(child.getChildByName("label").getComponent(cc.Label).string);           // 记录目标鱼的分数
                    this.target_index = parseInt(child.parent.name.slice(child.parent.name.indexOf('k')+1,child.name.length)); // 记录鱼的层级 不能回头
                }else{
                    this.isHasMonster = false; // 目标方块内没有怪物
                    if(child.name.indexOf("x") != -1){
                        this.isProp = true; // 目标方块内有道具
                        this.targetFish = child; // 获取目标怪物
                    }
                } 
            });
        }
    }

    // 触摸离开
    touchLeave(node:cc.Node) {
        this.isTouchEnter = false; // 进入目标范围
        this.targetPointPos = null; // 清空坐标
    }

    // 触摸抬起
    touchUp(event: cc.Event.EventTouch) {

    }

    removeFish(){ // 移除鱼
    }

    // 叠方块
    addFrame(node:cc.Node){
        if(!node) return;
        if(GameData.mapComponent.targetPointPos){ // 如果目标点存在
            if(this.frameNum <= 4){ // 如果目标方块数量小于4
                GameData.mapComponent.targetPointPos = node.getPosition().y < GameData.mapComponent.targetPointPos.y ?cc.v2(node.getPosition()): GameData.mapComponent.targetPointPos; // 获取目标点的坐标
            }else{
                if(this.targetFish.name.indexOf("x") != -1){
                    GameData.mapComponent.targetPointPos = node.getPosition().y + node.parent.getPosition().y < GameData.mapComponent.targetPointPos.y ?
                    cc.v2(node.getPosition().x + node.parent.getPosition().x,node.getPosition().y + node.parent.getPosition().y)
                    : GameData.mapComponent.targetPointPos; // 获取目标点的坐标
                }else{
                    GameData.mapComponent.targetPointPos = node.getPosition().y + node.parent.getPosition().y < GameData.mapComponent.targetPointPos.y ?
                    cc.v2(node.getPosition().x + node.parent.getPosition().x,node.getPosition().y + node.parent.getPosition().y + node.height)
                    : GameData.mapComponent.targetPointPos; // 获取目标点的坐标
                }
            }
        }
        let frame = cc.instantiate(node); // 实例化方块
        frame.setPosition(0,0); // 设置方块的位置
        frame.width = this.node.parent.getChildByName("mapList").width; // 设置方块的宽度
        GameData.ut_lead_fish.frameParent = null; // 清空父节点
        node.destroy(); // 销毁方块
        this.node.parent.getChildByName("mapList").addChild(frame); // 添加方块
        frame.setSiblingIndex(0); // 设置方块的层级
        if(this.frameNum == 4){ //当等于四层的时候 拉起第二列
            let list = this.node.parent.getChildByName("mapList"); // 获取地图列表
            GameData.ut_lead_fish.node.setPosition(list.children[this.frameNum-1].x - list.children[this.frameNum-1].parent.x + list.children[this.frameNum-1].width - GameData.ut_lead_fish.node.width/2
            ,list.children[this.frameNum-1].y - list.children[this.frameNum-1].parent.y - list.children[this.frameNum-1].height); //把鱼坐标调正
            this.node.width = 500;
            this.node.height = 450+368;
            this.node.getComponent(cc.Layout).paddingBottom = 0;
            this.node.children.forEach(child => {
                child.setPosition(0,0);
            })
            this.node.getComponent(cc.Layout).updateLayout();
            this.node.setPosition(2000,GameData.ut_lead_fish.node.y + 450+368 - 75);
            cc.tween(this.node).to(1,{x:GameData.ut_lead_fish.node.x + 120 + 50 + 250,y:this.node.y - 150 - 40 - 120 - 75 - 20}).start(); //鱼宽度一半 +第一列宽度一半+第二列宽度一半  写死了

            let lastCameraPos = cc.find("Canvas/Main Camera").getPosition();
            cc.tween(cc.find("Canvas/Main Camera"))
            .to(1,{x:GameData.ut_lead_fish.node.x - (GameData.screenSize.width - 740) / 2 + GameData.screenSize.width / 2, y:GameData.ut_lead_fish.node.y - 150 + GameData.screenSize.height / 2})
            .call(()=>{
                let posY = cc.find("Canvas/Main Camera").y - lastCameraPos.y;
                GameData.upgrade_type.cameraY += posY;

                let posX = cc.find('Canvas/Main Camera').x - lastCameraPos.x; //计算出偏移量
                GameData.upgrade_type.cameraX += posX; //更新摄像机偏移量
                GameData.ut_lead_fish.node.getChildByName("animation").scaleX = 0.65;
            })
            .start(); // 摄像机位置
        }
    }
}
