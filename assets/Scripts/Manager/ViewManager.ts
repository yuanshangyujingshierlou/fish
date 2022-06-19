import PopUpDataManager from "./PopUpDataManager";
import GmaeData from "./GameData";

export class ViewManager{
    static PopUpComponent:PopUpDataManager;


    //记录弹窗名字
    public static PopupPageData = [
        "mall",
        "sign_in",
        "fail_page",
        "treasure_chest",
        "win_page",
    ]
    
    
    public static showView(name:string){
        let popParent = cc.find(name,ViewManager.PopUpComponent.node)
        if(!popParent){
            cc.resources.load(`prefab/${name}`,(err:Error,Prefab:cc.Prefab)=>{
                if(err) console.log(err);
                else if (Prefab)
                {
                    let node = cc.instantiate(Prefab);
                    node.setParent(ViewManager.PopUpComponent.node);
                    //判断是否是展示弹窗
                    this.PopupPageData.forEach((str)=>{
                        if(name == str){
                            console.log("打开了弹窗:",name)
                        }
                    })
                }
            })
        }else{
            console.log(`${name}窗体已经展示`);
        }
    }

    static closeView(name:string){
        let popParent = cc.find(name,ViewManager.PopUpComponent.node);
        if(popParent){
            popParent.removeFromParent();
        }else{
            console.log(`${name}窗体已经被移除`);
        }
    }

    static flToast(text:string){    //加载toast提示
        GmaeData.toastText = text;
        ViewManager.showView("dialog");
    }
}