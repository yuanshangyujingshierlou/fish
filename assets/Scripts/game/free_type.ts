import AudioManager from "../Manager/AudioManager";
import GameData from "../Manager/GameData";
import { ViewManager } from "../Manager/ViewManager";
import treasure_chest from "../PopUpNode/treasure_chest";
import ViewMain from "../ViewMain";
import leadFish from "./leadFish";

const {ccclass, property} = cc._decorator;

@ccclass
export default class free_type extends cc.Component {

    upgrade_experience:number;

    @property(cc.Node)
    now_icon:cc.Node = null;

    @property(cc.Node)
    next_icon:cc.Node = null;

    @property(cc.Label)
    mubiao_label:cc.Label = null;

    @property(cc.ProgressBar)
    progressbar:cc.ProgressBar = null;

    now_exp:number = 0; //当前经验 每次进入自由模式都重新初始化

    next_node:cc.Node = null;
    @property(cc.Label)
    jinbi_label:cc.Label = null;
    onLoad () {
        GameData.free_type = this;
    }

    onEnable(){
        // 每次进来重新刷一下经验值
        this.upgrade_experience = 100 + Math.pow(GameData.getInstance().local_data.free_round,2) * 10;
        this.now_exp = 100;
        this.random_bg();
        this.init();
        this.init_progressBar(GameData.leadFish.node.getComponent(dragonBones.ArmatureDisplay).dragonAsset.name);
        this.load_npc_fish();
        this.update_jinbi();
    }

    protected onDisable(): void {
    }

    start () {
    }

    update (dt) {
    }

    // 游戏金币数量同步
    update_jinbi(){
        this.jinbi_label.string = `${GameData.getInstance().local_data.jinbi}`;
    }

    // 游戏初始化
    init():void{
        AudioManager.getInstance().playMusic("自由模式背景音");
        // 加载主角鱼
        if(!GameData.gameStart.isInit) {
            GameData.gameStart.initLeadFish("yu1_ske",cc.v2(0,0));
        }
    }
    
    // 自由模式背景随机
    random_bg(){
        let randomnum = new treasure_chest().random_two(1,2);
        for(let i = 0;i < GameData.ViewMain.bg.children.length;i++){
            cc.resources.load(`images/bj/round${randomnum}/round${randomnum}-${i+1}`,cc.SpriteFrame,(err, spriteFrame:cc.SpriteFrame) => {
                if(err){
                    cc.error(err);
                }else if(spriteFrame){
                    GameData.ViewMain.bg.children[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    GameData.ViewMain.bg.children[i].width = GameData.screenSize.width;
                }
            })
        }
    }

    // 初始化自由模式等级进度条
    init_progressBar(name:string){
        let qname = name.match(/\w/g).join("");
        // 取出预制件
        let pfb = cc.find("Canvas").getComponent(ViewMain).fish_list;
        // 从当前的主角的鱼的名字中取出当前所用动画
        let num = qname.match(/[1-9]/)
        // 如果当前鱼的等级小于最大动画数，则正常执行
        if(parseInt(num[0]) < pfb.data.children.length){
            // 取出当前所用的动画用于展示
            let nowicon = cc.instantiate(pfb.data.getChildByName(qname));
            // 操作字符串 拼接出下一等级的鱼的动画
            let str1 = qname.slice(0,num.index)
            let str2 = qname.slice(num.index+1)
            let next_icon_name = str1 + (parseInt(num[0]) + 1) + str2;
            // 取出下一等级的节点
            let nexticon = cc.instantiate(pfb.data.getChildByName(next_icon_name));
            this.next_node = nexticon;
            // 替换
            this.now_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).dragonAsset = nowicon.getComponent(dragonBones.ArmatureDisplay).dragonAsset;
            this.now_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).dragonAtlasAsset = nowicon.getComponent(dragonBones.ArmatureDisplay).dragonAtlasAsset;
            this.next_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).dragonAsset = nexticon.getComponent(dragonBones.ArmatureDisplay).dragonAsset;
            this.next_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).dragonAtlasAsset = nexticon.getComponent(dragonBones.ArmatureDisplay).dragonAtlasAsset;
            // 展示为待机
            this.next_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).playAnimation("daiji-1",0);
            this.now_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).playAnimation("daiji-1",0);
        }else{
            this.now_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).dragonAsset = this.next_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).dragonAsset;
            this.now_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).dragonAtlasAsset = this.next_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).dragonAtlasAsset;
            this.now_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).playAnimation("daiji-1",0);
        }

        // 缩放icon
        let now_scale_x = 58.4 / this.now_icon.getChildByName("ani").width;
        let now_scale_y = 51.2 / this.now_icon.getChildByName("ani").height;
        let next_scale_x = 58.4 / this.next_icon.getChildByName("ani").width;
        let next_scale_y = 51.2 / this.next_icon.getChildByName("ani").height;
        this.now_icon.getChildByName("ani").scaleX = now_scale_x;
        this.now_icon.getChildByName("ani").scaleY = now_scale_y;
        this.next_icon.getChildByName("ani").scaleX = next_scale_x;
        this.next_icon.getChildByName("ani").scaleY = next_scale_y;

        cc.find("dengji/label",this.now_icon).getComponent(cc.Label).string = `LV.${GameData.getInstance().local_data.free_round}`;
        cc.find("dengji/label",this.next_icon).getComponent(cc.Label).string = `LV.${GameData.getInstance().local_data.free_round+1}`;
        this.mubiao_label.string = `LV.${GameData.getInstance().local_data.free_round+1}`;
        this.progressbar.progress = 0;
    }
    // 更新进度条进度
    update_progressBar(exp:number){
        this.now_exp += exp;
        let num = this.now_exp / this.upgrade_experience;
        // 说明已经完成当前升级进度
        if(num >= 1){
            // 等级加一
            GameData.getInstance().local_data_set("free_round",GameData.getInstance().local_data.free_round + 1);
            // 当前经验值清空重新计算
            this.now_exp = 0;
            // 弹出升级宝箱
            ViewManager.showView("treasure_chest");
        }else{
            this.progressbar.progress = num; //更新进度条进度
        }
    }
    // 主角升级
    upgrade_lead_fish(){
            // 播放升级音效
            AudioManager.getInstance().playSound("吃鱼升级");
            // 移除鱼 换成下一级别的鱼
            let qname = GameData.leadFish.node.getComponent(dragonBones.ArmatureDisplay).dragonAsset.name.match(/\w/g).join("");
            let num = qname.match(/[1-9]/)
            if(parseInt(num[0]) < 8){
                let str1 = qname.slice(0,num.index)
                let str2 = qname.slice(num.index+1)
                let next_icon_name = str1 + (parseInt(num[0]) + 1) + str2;
    
                let pfb = cc.find("Canvas").getComponent(ViewMain).fish_list;
                let fishNode = cc.instantiate(pfb.data.getChildByName(next_icon_name));
                fishNode.name = "leadfish";
                fishNode.addComponent(leadFish);
                fishNode.group = "lead";
                fishNode.scale = 1;
                fishNode.getChildByName("label").getComponent(cc.Label).string = `LV.${GameData.getInstance().local_data.free_round}`
                // 初始化光环
                for(let i = 0; i < GameData.getInstance().local_data.guanghuan.length; i++){
                    if(GameData.getInstance().local_data.guanghuan[i] === 2){
                        console.log("光环",i);
                        let guanghuan = cc.instantiate(cc.find("Canvas").getComponent(ViewMain).guanghuan_list.data.getChildByName(`guanghuan-${i+1}_ske`));
                        // 带上光环
                        guanghuan.name = 'guanghuan';
                        guanghuan.setParent(fishNode);
                        // 设置光环坐标 不挡住鱼
                        guanghuan.setPosition(cc.v2(fishNode.getChildByName("label").x,fishNode.getChildByName("label").y - 10));
                        fishNode.getChildByName("label").setPosition(cc.v2(fishNode.getChildByName("label").x,i > 2 ? fishNode.getChildByName("label").y + 50 : fishNode.getChildByName("label").y + 30));
                        break;
                    }
                }
                fishNode.active = false;
                cc.resources.load(`Texture/fnt/putong-wangjiadengji`,cc.BitmapFont,(err:Error,font:cc.BitmapFont)=>{
                    if(err){
                        console.log(err);
                    }else{
                        fishNode.getChildByName("label").getComponent(cc.Label).font = font;
                    }
                })
                fishNode.setParent(cc.find("Canvas/ziyoumoshi/fish_touch_content"));
                GameData.lead_fish.ani_name = next_icon_name;
                GameData.lead_fish.isActivation = true;
                fishNode.setPosition(GameData.leadFish.node.getPosition());
                GameData.leadFish.node.removeFromParent();
                GameData.leadFishMove.bindingFish();
                fishNode.active = true;
                GameData.lead_fish_setAnimation(GameData.leadFish.node,"qianyi-1",0);
            }else{
                GameData.leadFish.node.getChildByName("label").getComponent(cc.Label).string = `LV.${GameData.getInstance().local_data.free_round}`
            }
            // 重新初始化进度条
            this.init_progressBar(GameData.leadFish.node.getComponent(dragonBones.ArmatureDisplay).dragonAsset.name);
    }
    // 加载npc鱼
    load_npc_fish(){
        if(cc.find("monster",this.node).children.length < GameData.monsterFishNumber){
            let child_num = cc.find("Canvas/ziyoumoshi/monster").children.length;
            for(let i = 0;i < (GameData.monsterFishNumber - child_num);i++){
                // 随机数
                let random_num = Math.random();
                let level,num;
                // 判断随机数 根据概率生成npc鱼的等级
                switch(true){
                    case(random_num < 0.6):
                        level = GameData.getInstance().local_data.free_round;
                        break;
                    case(random_num < 0.9):
                        level = GameData.getInstance().local_data.free_round + 1;
                        break;
                    case(random_num < 0.98):
                        level = GameData.getInstance().local_data.free_round + 2;
                        break;
                    default:                            
                        level = GameData.getInstance().local_data.free_round + 3;
                }
                // 根据等级生成鱼的ani
                num = level;
                if(level > 8) num =  level % 8 + 1;
                // num = level % GameData.getInstance().local_data.free_round + 1;
                GameData.gameStart.initMonsterFish("yu" + num + "_ske",i, level); 
            }
        }
    }
    // 游戏结束
    gameOver(){
        // 移除主角鱼节点
        GameData.leadFishMove.lead_fish.removeFromParent();
        // 触摸移动解绑
        GameData.leadFishMove.lead_fish = null;
        // 游戏结束
        GameData.isPlay = false;
        // 主角鱼的动画重置
        GameData.lead_fish.ani_name = "";
        // 主角鱼的激活取消
        GameData.lead_fish.isActivation = false;

        // 怪物鱼的数据置空
        Object.keys(GameData.monsterFish).forEach(function(key){
            if(GameData.monsterFish[key].name && GameData.monsterFish[key].name.indexOf("monster") != -1){
                delete GameData.monsterFish[key];
            }
        })
        // 移除怪物鱼
        cc.find("monster",this.node).children.forEach((child)=>{
            child.removeFromParent();
            child.destroy();
        })

        // 触摸移动的数据置空
        GameData.leadFishMove.touch_End();
        this.node.active = false;
    }

    // 返回大厅
    back_hall(){
        AudioManager.getInstance().playSound("点击按钮音");
        this.node.removeFromParent();
        GameData.free_type.gameOver();  // 游戏结束
        cc.director.loadScene("main");  // 重置场景
    }
} 