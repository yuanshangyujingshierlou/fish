import AudioManager from "../Manager/AudioManager";
import GameData from "../Manager/GameData";
import { ViewManager } from "../Manager/ViewManager";
import free_type from "./free_type";

const {ccclass, property} = cc._decorator;

@ccclass
export default class leadFish extends cc.Component {
    public static instance:leadFish;
    static getInstance():leadFish{
        if(this.instance == null){
            this.instance = new leadFish();
        }
        return this.instance
    }
    onLoad () {
        GameData.leadFish = this;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    }

    start () {
    }

    update (dt) {}

    onCollisionEnter(other, self){
        let otherfishdata = GameData.monsterFish.__get__(other.node.name)
        if(GameData.getInstance().local_data.free_round >= otherfishdata.level){
            GameData.lead_fish_setAnimation(self.node,"chi-1",1);
            AudioManager.getInstance().playSound("吃鱼音效");
            GameData.free_type.update_progressBar(10 * otherfishdata.level);
            other.node.removeFromParent();
            Reflect.deleteProperty(GameData.monsterFish,other.node.name);
            GameData.free_type.load_npc_fish();
        }else{
            // 展示失败弹窗
            ViewManager.showView("fail_page");
        }
    }

    onCollisionExit(other, self){
    }
}
