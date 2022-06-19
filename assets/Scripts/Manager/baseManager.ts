import GameData from "./GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class baseManager extends cc.Component {

    protected onLoad () {
        
    }

    // 弹窗打开事件
    protected onEnable(): void {
        // 注册移除弹窗的事件
        this.node.once("remove",()=>{
            GameData.gameStart.gameContinue();
            cc.tween(this.node)
            .call(()=>{
                if(cc.find('mask',this.node)){
                    cc.find('mask',this.node).active = false;
                }
            })
            .to(0.15,{scale:0})
            .call(function(){
                this.node.removeFromParent();
            }.bind(this))
            .start();
        })
        // 将弹窗位置和摄像机对齐
        this.node.setPosition(cc.find('Canvas/Main Camera').getPosition());
        
        if(GameData.ViewMain.gameType == "ziyou"){
            GameData.leadFishMove.touch_End();
            Object.keys(GameData.monsterFish).forEach(function(key){
                if(GameData.monsterFish[key].name && GameData.monsterFish[key].name.indexOf("monster") != -1){
                    let name = GameData.monsterFish[key].name;
                    let fish = GameData.free_type.node.getChildByName("monster");
                    if(fish.getChildByName(name)){
                        fish.getChildByName(name).pauseAllActions();
                        fish.getChildByName(name).getComponent(dragonBones.ArmatureDisplay).timeScale = 0;
                        GameData.isPause = true;
                        fish.getChildByName(name).emit("pause");
                    }
                }
            }.bind(this));
        }else if(GameData.ViewMain.gameType == "guanqia"){

        }
        // 弹窗出现后将npc暂停

    }

    protected onDestroy(): void {

    }
    protected onDisable(): void {
    }

    start () {

    }

    update (dt) {}
}
