import AudioManager from "../Manager/AudioManager";
import GameData from "../Manager/GameData";
import ViewMain from "../ViewMain";
import leadFish from "./leadFish";

// const {ccclass, property} = cc._decorator;

// @ccclass
export default class gameStart{
    isInit:boolean = false;

    // 加载主角
    initLeadFish(name:string ,pos:cc.Vec2):void{
        // this.isInit = true;
        let pfb = cc.find("Canvas").getComponent(ViewMain).fish_list;
        let fishNode = cc.instantiate(pfb.data.getChildByName(name));
        fishNode.name = "leadfish";
        fishNode.addComponent(leadFish);
        fishNode.group = "lead";
        fishNode.scale = 1;
        fishNode.getChildByName("label").getComponent(cc.Label).string = `LV.${GameData.getInstance().local_data.free_round}` // 初始化等级
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
        // 主角鱼的字体
        cc.resources.load(`Texture/fnt/putong-wangjiadengji`,cc.BitmapFont,(err:Error,font:cc.BitmapFont)=>{
            if(err){
                console.log(err);
            }else{
                fishNode.getChildByName("label").getComponent(cc.Label).font = font;
            }
        })

        fishNode.setParent(cc.find("Canvas/ziyoumoshi/fish_touch_content"));
        GameData.lead_fish.ani_name = name;
        GameData.lead_fish.isActivation = true;
        fishNode.setPosition(pos);
        GameData.leadFishMove.bindingFish();
        GameData.lead_fish_setAnimation(fishNode,"qianyi-1",0);
        //--------------------------test----------------------------------------------------------
    }
    // 加载怪物鱼
    initMonsterFish(name:string, num:number,level:number):void{
        // 把鱼的状态传进去 
        let obj = {
            name:"",
            direction:"",    //鱼头方向
            level:level,
        }
        let pfb = cc.find("Canvas").getComponent(ViewMain).fish_list;
        let fishNode = cc.instantiate(pfb.data.getChildByName(name));
        // 创造怪物鱼的独一名称 用来控制
        fishNode.name = `monster${new Date().getTime() + Math.random()}`;
        obj.name = fishNode.name;
        // 默认动画daiji中
        // fishNode.getComponent(dragonBones.ArmatureDisplay).playAnimation("qianyi-1",0);
        GameData.monsterFish.__set__(obj.name,obj);
        fishNode.scale = 1;
        fishNode.getChildByName("label").getComponent(cc.Label).string = `LV.${level}`;
        fishNode.setParent(cc.find("Canvas/ziyoumoshi/monster"));

        //设置位置 随机
        let boo:boolean = Math.random() - 0.5 >= 0;
        let posY = GameData.screenSize.height / 2 * Math.random();
        //设置界限 不能越界
        posY = posY + GameData.screenSize.height / 2 + fishNode.height / 2 >= GameData.screenSize.height ? GameData.screenSize.height / 2 - fishNode.height : posY;
        fishNode.setPosition((boo ? -(GameData.screenSize.width / 2) * 3: GameData.screenSize.width / 2 * 3) + (boo ? -fishNode.width : fishNode.width) / 2,boo ? posY : -posY);

        // 设置怪物鱼来回游动 
        let tw
        if(fishNode.x > 0){
            tw = cc.tween(fishNode)
            //设置方向
            .call((()=>{
                fishNode.scaleX = -1;
                fishNode.children.forEach(child => {
                    child.scaleX = -1;
                });
                obj.direction = "left";
                GameData.monsterFish.__set__(obj.name,obj);
                GameData.monster_fish_setAnimation(fishNode,"qianyi-1",0);
            }))
            .to(15,{x:-(GameData.screenSize.width / 2) * 3 - fishNode.width/2})
            .delay(0.2)
            //设置方向
            .call((()=>{
                fishNode.scaleX = 1;
                fishNode.children.forEach(child => {
                    child.scaleX = 1;
                });
                obj.direction = "right";
                GameData.monsterFish.__set__(obj.name,obj);
                GameData.monster_fish_setAnimation(fishNode,"qianyi-1",0);
            }))
            .to(15,{x:GameData.screenSize.width / 2 * 3 + fishNode.width/2})
            .union()
            .repeatForever();
            fishNode.on("pause",()=>{if(GameData.isPause) fishNode.pauseAllActions()},this);
            fishNode.on("resume",()=>{
                if(!GameData.isPause) fishNode.resumeAllActions();
                for(let i = 0;i < GameData.pauseFishMove_action_name.length;i++){
                    if(GameData.pauseFishMove_action_name[i] == fishNode.name){
                        GameData.free_type.node.getChildByName('monster').getChildByName(GameData.pauseFishMove_action_name[i]).stopAllActions();
                        tw.start();
                    }
                }
            });
        }else{
            tw = cc.tween(fishNode)
            .call((()=>{
                fishNode.scaleX = 1;
                fishNode.children.forEach(child => {
                    child.scaleX = 1;
                });
                obj.direction = "right";
                GameData.monsterFish.__set__(obj.name,obj);
                GameData.monster_fish_setAnimation(fishNode,"qianyi-1",0);
            }))
            .to(15,{x:GameData.screenSize.width / 2 * 3 + fishNode.width/2})
            .delay(0.2)
            .call((()=>{
                fishNode.scaleX = -1;
                fishNode.children.forEach(child => {
                    child.scaleX = -1;
                });
                obj.direction = "left";
                GameData.monsterFish.__set__(obj.name,obj);
                GameData.monster_fish_setAnimation(fishNode,"qianyi-1",0);
            }))
            .to(15,{x:-(GameData.screenSize.width / 2) * 3 - fishNode.width/2})
            .union()
            .repeatForever()
            fishNode.on("pause",()=>{if(GameData.isPause) fishNode.pauseAllActions()});
            fishNode.on("resume",()=>{
                if(!GameData.isPause) fishNode.resumeAllActions();
                for(let i = 0;i < GameData.pauseFishMove_action_name.length;i++){
                    if(GameData.pauseFishMove_action_name[i] == fishNode.name){
                        GameData.free_type.node.getChildByName('monster').getChildByName(GameData.pauseFishMove_action_name[i]).stopAllActions();
                        tw.start();
                        GameData.pauseFishMove_action_name = [];
                    }
                }
            });
        }

        // 延时出来 
        setTimeout(()=>{
            // 已经被暂停拦截住的
            if(!GameData.isPause){
                // 启动被暂停拦截住的
                 tw.start();
            }else{
                // 在暂停之后的tween额外处理
                GameData.pauseFishMove_action_name.push(fishNode.name);
            }
        },500 * num)
    }

    // 游戏暂停
    gamePause():void{
        cc.director.pause();
    }
    // 游戏继续
    gameContinue():void{
        cc.director.resume();
    }
}


