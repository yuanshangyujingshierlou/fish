package org.cocos2dx.javascript.service;

import android.content.Context;
import com.cocos.analytics.CAAgent;
import org.cocos2dx.lib.Cocos2dxActivity;

public class ServiceAnalytics extends SDKClass {
    public static void initAnalytics(String appID, String storeID, String engine, String callNumber) {
        CAAgent.init(Cocos2dxActivity.getContext(), appID, storeID, engine, callNumber);
    }
    @Override
    public void init(Context context) {
        super.init(context);
        CAAgent.enableDebug(false);
    }
    @Override
    public void onResume(){
        CAAgent.onResume(this.getContext());
    }
    @Override
    public void onPause(){
        CAAgent.onPause(this.getContext());
    }
    @Override
    public void onDestroy(){
        CAAgent.onDestroy();
    }
}
