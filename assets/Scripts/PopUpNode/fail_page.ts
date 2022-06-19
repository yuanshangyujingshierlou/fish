import free_type from "../game/free_type";
import upgrade_type from "../game/upgrade_type";
import baseManager from "../Manager/baseManager";
import GameData from "../Manager/GameData";
import ViewMain from "../ViewMain";
import {round} from "../game/upgrade_type";
import AudioManager from "../Manager/AudioManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class fail_page extends baseManager {

    onLoad () {
        if(!GameData.ViewMain.gameType) return;
        // 播放失败音效
        AudioManager.getInstance().playSound("失败");
        let boo = GameData.ViewMain.gameType === "ziyou" ? true : false;
        cc.find("bottom",this.node).children.forEach((child)=>{
            cc.find("ziyoumoshi",child).active = boo;
            cc.find("guanqiamoshi",child).active = !boo;
        })
    }

    start () {

    }

    update (dt) {

    }
    // 失败页面第一个按钮
    click_restart(){
        AudioManager.getInstance().playSound("点击按钮音");
        if(GameData.ViewMain.gameType == "ziyou"){ // 自由模式 继续游戏 看广告
            console.log("看了广告");
            this.node.removeFromParent();
        }else if(GameData.ViewMain.gameType == "guanqia"){ // 关卡模式 重新开始 回到第一关
            this.node.removeFromParent();
            GameData.upgrade_type.removeRound(round.first_round);
        }
    }    

    // 失败页面第二个按钮
    click_back(){
        AudioManager.getInstance().playSound("点击按钮音");
        if(GameData.ViewMain.gameType == "ziyou"){  // 自由模式 返回大厅
            this.node.removeFromParent();
            GameData.free_type.gameOver();  // 游戏结束
            cc.director.loadScene("main");  // 重置场景
        }else if(GameData.ViewMain.gameType == "guanqia"){ // 关卡模式 继续游戏 本关重来 需要看广告
            console.log("广告播放成功");
            this.node.removeFromParent();
            GameData.upgrade_type.removeRound(GameData.upgrade_type.now_round);
        }
    }
}
