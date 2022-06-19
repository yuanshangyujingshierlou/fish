import GameData from "../Manager/GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    pos:cc.Vec2 = cc.v2(0,0);
    onLoad () {
    }
    // 加分的时候自动激活
    protected onEnable(): void {
        this.pos = this.node.getPosition();
        let tatol_score = GameData.ut_lead_fish.node.getChildByName("tatol_score");
        cc.tween(this.node)
        .to(0.1,{scale:1.2})
        .to(0.4,{x:-50,scale:0.8,opacity:87})
        .call(()=>{
            cc.tween(tatol_score).to(0.1,{scale:1.2}).to(0.2,{scale:1}).call(()=>{
                tatol_score.getComponent(cc.Label).string = `${GameData.ut_lead_fish.score}`;// 更新总分数
            }).start();
            this.node.active = false;
            this.node.setPosition(this.pos);
        })
        .start();
    }
    start () {

    }
    protected onDisable(): void {
        if(GameData.upgrade_type.now_round<= 2){ //如果是第一关或者第二关
            this.node.scale = 1;
            if(GameData.monsterFish_Component.targetFish.name.indexOf('boss') === -1){ //如果不是boss
                cc.tween(cc.find('Canvas/Main Camera')) //摄像机
                .call(()=>{ 
                    let posX = this.node.parent.x - cc.find('Canvas/Main Camera').x; //计算出偏移量
                    GameData.upgrade_type.cameraX += posX; //更新摄像机偏移量
                    GameData.upgrade_type.background_move(); // 背景移动 
                    GameData.monsterFish_Component.targetFish = null; //清空目标鱼
                    GameData.monsterFish_Component.removeFish(); // 移除鱼
                })
                .to(0.5,{x:this.node.parent.x}) //移动到目标位置
                .call(()=>{
                    if(GameData.monsterFish_Component.target_index == 8 && GameData.upgrade_type.now_round == 2){ // 关卡模式第二关 最后boss太大了 需要调整位置
                        if(GameData.monsterFish_Component.node.getChildByName("boss_9")){ // 如果有boss9
                            let boss = GameData.monsterFish_Component.node.getChildByName("boss_9"); // 获取boss
                            let posX = boss.x + boss.width/2 - cc.find('Canvas/Main Camera').width/2; // 计算出偏移量
                            GameData.upgrade_type.cameraX += posX - GameData.upgrade_type.cameraX; //更新摄像机偏移量
                            GameData.upgrade_type.background_move(); // 背景移动 
                            cc.tween(cc.find('Canvas/Main Camera')).to(0.5,{x:posX}).start(); //移动到目标位置
                        }
                    }
                })
                .start();
            }else{
                // 如果是boss鱼 结束游戏
                GameData.monsterFish_Component.targetFish = null;
                GameData.monsterFish_Component.removeFish();
            }
        }else{ 
            this.node.scale = 1;
            if(GameData.upgrade_type.now_round == 3){ // 如果是第三关
                if(GameData.mapComponent.targetFish.name.indexOf('boss') === -1){ // 如果不是boss
                    cc.tween(cc.find('Canvas/Main Camera'))
                    .call(()=>{
                        let posX = this.node.parent.x - cc.find('Canvas/Main Camera').x; //计算出偏移量
                        GameData.upgrade_type.cameraX += posX; //更新摄像机偏移量
                        GameData.upgrade_type.background_move(); // 背景移动
                        GameData.mapComponent.targetFish = null; //清空目标鱼
                    })
                    .to(0.5,{x:this.node.parent.x})
                    .call(()=>{
                        if(GameData.mapComponent.target_index == 11 && GameData.upgrade_type.now_round == 3){ // 关卡模式第三关 最后boss太大了 需要调整位置
                            if(GameData.mapComponent.node.getChildByName("block12")&&GameData.mapComponent.node.getChildByName("block12").getChildByName("boss")){ // 如果有boss
                                let boss = GameData.mapComponent.node.getChildByName("block12"); // 获取boss
                                let posX = boss.x + boss.width/2 - cc.find('Canvas/Main Camera').width/2; // 计算出偏移量
                                GameData.upgrade_type.cameraX += posX - GameData.upgrade_type.cameraX; //更新摄像机偏移量
                                GameData.upgrade_type.background_move(); // 背景移动
                                cc.tween(cc.find('Canvas/Main Camera')).to(0.5,{x:posX}).start(); //移动到目标位置
                            }
                        }
                    })
                    .start();
                }else{ // 如果是boss鱼 结束游戏
    
                }
            }else{ // 如果是第四关
                if(GameData.ut_lead_fish.frameParent){
                    let boo = false;
                    GameData.ut_lead_fish.frameParent.children.forEach((child)=>{
                        if(child.name.indexOf('monster') !== -1){
                            boo = true;
                            GameData.mapComponent.targetFish = child;
                            GameData.mapComponent.target_score = parseInt(child.getChildByName("label").getComponent(cc.Label).string);           // 记录目标鱼的分数
                            GameData.mapComponent.targetPointPos = cc.v2(child.getPosition().x + child.parent.x + child.parent.parent.x, child.getPosition().y + child.parent.y + child.parent.parent.y); // 获取目标点的坐标
                        }
                    })
                    boo ? GameData.ut_lead_fish.fightAnimation(GameData.mapComponent.targetPointPos) : 0;
                }
            }
        }
    }

    update (dt) {

    }
}