import { round } from "../game/upgrade_type";
import AudioManager from "../Manager/AudioManager";
import baseManager from "../Manager/baseManager";
import GameData from "../Manager/GameData";

const {ccclass, property} = cc._decorator;
@ccclass
export default class win_page extends baseManager {
    @property(dragonBones.ArmatureDisplay)
    animation:dragonBones.ArmatureDisplay = null; // 胜利弹窗动画

    @property(cc.Label)
    jinbi:cc.Label = null; // 金币

    now_round_reward:number = 0; // 当前关卡奖励
    onLoad () {
        AudioManager.getInstance().playSound("胜利弹窗");
        GameData.upgrade_type.round_label += 1;
        this.animation.once(dragonBones.EventObject.COMPLETE,()=>{
            this.animation.playAnimation("daiji",0);
        },this);
    }

    start () {
        this.animation.playAnimation("jinru",1);
        this.now_round_reward = parseInt(this.jinbi.string); //获取label里的分数
    }

    update (dt) {

    }
    // 点击放弃播放广告单倍领取按钮
    click_giveup(){
        AudioManager.getInstance().playSound("点击按钮音");
        GameData.getInstance().local_data.jinbi += this.now_round_reward;
        GameData.getInstance().local_data_set("jinbi",GameData.getInstance().local_data.jinbi); // 存储金币
        this.node.removeFromParent(); // 移除弹窗
        GameData.upgrade_type.removeRound(GameData.upgrade_type.now_round + 1); //进入下一关
    }
    // 播放广告双倍领取
     click_ad_double(){
        AudioManager.getInstance().playSound("点击按钮音");
        console.log("播放广告，双倍领取");
        GameData.getInstance().local_data.jinbi += this.now_round_reward * 2;
        GameData.getInstance().local_data_set("jinbi",GameData.getInstance().local_data.jinbi); // 存储金币
        this.node.removeFromParent(); // 移除弹窗
        GameData.upgrade_type.removeRound(GameData.upgrade_type.now_round + 1); //进入下一关
     }
}
