import AudioManager from "../Manager/AudioManager";
import baseManager from "../Manager/baseManager";
import GameData from "../Manager/GameData";

const {ccclass, property} = cc._decorator;
@ccclass
export default class sign_in extends baseManager {
    @property(cc.Node)
    mask:cc.Node = null;
    @property(cc.Node)
    content:cc.Node = null;
    onLoad () {
        this.init_ui();
    }

    start () {

    }

    update (dt) {
        
    }
    // 单倍领取
    click_single_reward(){
        AudioManager.getInstance().playSound("点击按钮音");
        // 没领过才能领取
        if(!GameData.getInstance().local_data.reward_status){
            GameData.getInstance().local_data.jinbi += GameData.getInstance().sign_in_reward[GameData.getInstance().local_data.login_day % 7];
            GameData.getInstance().local_data_set("jinbi",GameData.getInstance().local_data.jinbi);

        }
        GameData.getInstance().local_data_set("reward_status",true);
        this.node.emit("remove");
    }
    // 双倍领取
    click_double_reward(){
        AudioManager.getInstance().playSound("点击按钮音");
        // 播放广告双倍领取
        if(!GameData.getInstance().local_data.reward_status){
            GameData.getInstance().local_data.jinbi += GameData.getInstance().sign_in_reward[GameData.getInstance().local_data.login_day % 7] * 2;
            GameData.getInstance().local_data_set("jinbi",GameData.getInstance().local_data.jinbi);
        }
        GameData.getInstance().local_data_set("reward_status",true);
        this.node.emit("remove");
    }
    init_ui(){
        for(let i = GameData.getInstance().local_data.login_day % 7;i <= this.content.children.length;i++){
            if(i === GameData.getInstance().local_data.login_day % 7) {
                cc.find("yilingqu", this.content.children[i-1]).active = GameData.getInstance().local_data.reward_status;
            }else{
                cc.find("yilingqu", this.content.children[i-1]).active = false;
            }
        }
    }
}
