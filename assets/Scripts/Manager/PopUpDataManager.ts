import GameData from "./GameData";
import { ViewManager } from "./ViewManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PopUpDataManager extends cc.Component {



    onLoad () {
        this.node.zIndex = 99;
        ViewManager.PopUpComponent = this;
    }

    start () {
        this.node.on("child-removed", this.onChildRemoved, this);
    }

    // 关闭弹窗时候继续游戏
    onChildRemoved(event) {
        if(!GameData.isPlay) return;
        this.resumeGame();
        if(event.name == "treasure_chest"){
            // 播放升级动画
            GameData.lead_fish_setAnimation(GameData.leadFish.node,"shengli-1",0);
        }
    }

    // 弹窗关闭 游戏继续
    resumeGame(){
        Object.keys(GameData.monsterFish).forEach(function(key){
            if(GameData.monsterFish[key].name && GameData.monsterFish[key].name.indexOf("monster") != -1){
                let name = GameData.monsterFish[key].name;
                let fish = GameData.free_type.node.getChildByName("monster");
                if(fish.getChildByName(name)){
                    fish.getChildByName(name).resumeAllActions();
                    fish.getChildByName(name).getComponent(dragonBones.ArmatureDisplay).timeScale = 1;
                    GameData.isPause = false;
                    fish.getChildByName(name).emit("resume");
                }
            }
        }.bind(this));
    }

    update (dt) {

    }
}

