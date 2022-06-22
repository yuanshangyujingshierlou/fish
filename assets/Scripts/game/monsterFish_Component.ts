import GameData from "../Manager/GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class monsterFish_Component extends cc.Component {
    targetFish:cc.Node = null;   // 全局绑定目前目标鱼
    isTouchEnter:boolean = false;// 是否进入目标范围
    target_pos:cc.Vec2 = null;   // 目标的坐标
    target_name:string = "";     // 目标的名字
    target_index:number;         // 目标层级
    target_score:number;         // 目标分数
    onLoad () {
        GameData.monsterFish_Component = this;
        this.node.children.forEach(child => {
            // child.on(cc.Node.EventType.MOUSE_ENTER, this.touchEnter, this);
            // child.on(cc.Node.EventType.MOUSE_LEAVE, this.touchLeave, this);
            // child.on(cc.Node.EventType.MOUSE_UP, this.touchUp, this);
            child.group = "monster"; // 更改碰撞节点为monster
        });
    }

    start () {
    }

    update (dt) {

    }

    // 触摸移入
    // touchEnter(event:cc.Event.EventTouch){
    touchEnter(node:cc.Node){
        if(GameData.upgrade_tpye_move.isClick_leadfish){
            this.isTouchEnter = true;   //鼠标在点击主角的情况下 移入了目标内
            this.target_name = node.name;   //目标鱼的名称
            let lead = GameData.upgrade_tpye_move.node; //拿到主角鱼的节点
            this.targetFish = node; //拿到目标的节点
            this.target_index = parseInt(this.target_name.slice(this.target_name.indexOf('_')+1,this.target_name.length)); // 记录鱼的层级 不能回头
            if(this.target_name.indexOf("x") == -1){
                this.target_score = parseInt(node.getChildByName("label").getComponent(cc.Label).string);           // 记录目标鱼的分数
            }
        }
    }
    // 触摸移除
    touchLeave(event:cc.Event.EventTouch){
    }
    // 触摸抬起
    // touchUp(event:cc.Event.EventTouch){
    touchUp(node:cc.Node){
        console.log(this.isTouchEnter)
        if(this.isTouchEnter && this.target_index >= GameData.ut_lead_fish.fishIndex){ // 如果进入目标范围并且目标层级大于等于鱼的层级
            this.isTouchEnter = false; // 移动中无法再次移动
            GameData.upgrade_tpye_move.isMove = true; //打开移动锁 限制再次点击
            GameData.ut_lead_fish.fishIndex = this.target_index; // 更改鱼的层级
            let lead = GameData.upgrade_tpye_move.node; //拿到主角鱼的节点
            let nodePos:cc.Vec2 = node.getPosition(); //获取当前点击相对自身为原点的坐标
            let length = nodePos.sub(lead.getPosition()).mag();  //算出主角鱼和目标的距离
            let time = length / GameData.upgrade_tpye_move.speed;// 算出所需时间
            lead.angle = GameData.upgrade_tpye_move.angle; //设置主角鱼的角度
            GameData.upgrade_tpye_move.angle = null; //清空角度
            cc.tween(lead)
            .call(()=>{
                if(this.target_name.indexOf("x") != -1){
                    let name = this.target_name.slice(0,this.target_name.indexOf('_'));
                    if(!(this.targetFish && this.targetFish.getChildByName(name).getComponent(dragonBones.ArmatureDisplay))) return
                    this.targetFish.getChildByName(name).getComponent(dragonBones.ArmatureDisplay).once(dragonBones.EventObject.COMPLETE,()=>{
                        this.targetFish.getChildByName(name).getComponent(dragonBones.ArmatureDisplay).enabled = false;
                    },this)
                    this.targetFish.getChildByName(name).getComponent(dragonBones.ArmatureDisplay).timeScale = 2;
                    this.targetFish.getChildByName(name).getComponent(dragonBones.ArmatureDisplay).playAnimation("xiaoshi",1)
                }else if(this.target_name.indexOf("boss") != -1){
                }
            })
            .to(time,{x:nodePos.x,y:nodePos.y})
            .call(function(){
                if(this.target_name.indexOf("monster") != -1){
                    GameData.ut_lead_fish.fightAnimation(nodePos);
                }else if(this.target_name.indexOf("x") != -1){
                    GameData.ut_lead_fish.propAnimation(this.targetFish);  // 吃泡泡动画
                }else if(this.target_name.indexOf("boss") != -1){
                    GameData.ut_lead_fish.fightAnimation(nodePos);  // 打boss动画
                }
                lead.angle = 0;
            }.bind(this))
            .start();
        }
    }

    // 移除层级小于主角鱼的鱼
    removeFish(){
        this.node.children.forEach(child => {
            let index = parseInt(child.name.slice(child.name.indexOf('_')+1,child.name.length)); //记录鱼的层级 不能回头
            if(index <= GameData.ut_lead_fish.fishIndex){
                cc.tween(child).by(0.5,{opacity:0,x:-300}).call(()=>{child.destroy();}).start();
            }
        })
    }

}
