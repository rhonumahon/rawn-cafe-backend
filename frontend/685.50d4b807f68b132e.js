"use strict";(self.webpackChunkrawncafe_web=self.webpackChunkrawncafe_web||[]).push([[685],{9685:(L,g,l)=>{l.r(g),l.d(g,{LoyaltyCardModule:()=>R});var d=l(9808),e=l(4893),h=l(520),m=l(3116),f=l(373),c=l(5697);function x(i,s){if(1&i&&(e.TgZ(0,"div",26),e._UZ(1,"img",27),e.qZA()),2&i){const t=e.oxw();e.MGl("ngClass","overlay ",t.isLoading?"active":"","")}}function _(i,s){if(1&i&&(e.TgZ(0,"span"),e._uU(1),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Oqu(t.rewardMessage)}}function y(i,s){if(1&i){const t=e.EpF();e.TgZ(0,"button",28),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return o.redeemReward(o.selectedReward.id)}),e._uU(1),e.qZA()}if(2&i){const t=e.oxw();e.xp6(1),e.Oqu(t.redeemButton)}}const p=function(i){return{show:i}};function w(i,s){if(1&i){const t=e.EpF();e.TgZ(0,"div",1)(1,"div",2)(2,"span",3),e.NdJ("click",function(){return e.CHM(t),e.oxw().closeGrantPointsModal()}),e._uU(3,"\xd7"),e.qZA(),e.TgZ(4,"div")(5,"h2"),e._uU(6,"Confirm Grant Points"),e.qZA(),e.TgZ(7,"p"),e._uU(8),e.ALo(9,"titlecase"),e.qZA()(),e.TgZ(10,"div",29)(11,"button",30),e.NdJ("click",function(){return e.CHM(t),e.oxw().confirmGrantPoints()}),e._uU(12,"Yes, Grant Points"),e.qZA(),e.TgZ(13,"button",31),e.NdJ("click",function(){return e.CHM(t),e.oxw().closeGrantPointsModal()}),e._uU(14,"Cancel"),e.qZA()()()()}if(2&i){const t=e.oxw();e.Q6J("ngClass",e.VKq(4,p,t.isGrantPointsModalVisible)),e.xp6(8),e.hij("Are you sure you want to grant points to ",e.lcZ(9,2,(null==t.user?null:t.user.name)||"this user"),"?")}}function C(i,s){if(1&i){const t=e.EpF();e.TgZ(0,"div",35),e.NdJ("click",function(){e.CHM(t);const o=e.oxw(),r=o.$implicit,a=o.index;return e.oxw().showRewardDetails(r,a)}),e._UZ(1,"img",36),e.TgZ(2,"span",37),e._uU(3),e.qZA()()}if(2&i){const t=e.oxw().$implicit;e.xp6(3),e.Oqu(t.title)}}function b(i,s){if(1&i&&e._UZ(0,"img",38),2&i){const t=e.oxw().$implicit;e.Q6J("src","credit-logo"===t.title?"assets/images/stampedcup.png":"assets/images/whitecup.png",e.LSH)}}function v(i,s){if(1&i&&(e.TgZ(0,"div",32),e.YNc(1,C,4,1,"div",33),e.YNc(2,b,1,1,"img",34),e.qZA()),2&i){const t=s.$implicit;e.xp6(1),e.Q6J("ngIf","credit-logo"!==t.title&&"default-logo"!==t.title),e.xp6(1),e.Q6J("ngIf","credit-logo"===t.title||"default-logo"===t.title)}}function M(i,s){if(1&i){const t=e.EpF();e.TgZ(0,"button",28),e.NdJ("click",function(){return e.CHM(t),e.oxw().openGrantPointsModal()}),e._uU(1," Grant Points "),e.qZA()}}let P=(()=>{class i{constructor(t,n,o,r,a){this.http=t,this.authService=n,this.loyaltyCardService=o,this.route=r,this.router=a,this.isLoading=!1,this.adminButtonRole=["admin","super-admin"],this.userRole="user",this.userId="",this.rewards=[],this.isRedeeming=!1,this.isGrantingPoints=!1,this.rewardTitle="",this.logos=[],this.canRedeem=!1,this.redeemableRewards=[],this.rewardMessage="",this.isModalVisible=!1,this.redeemButton="Redeem Now",this.isGrantPointsModalVisible=!1,this.selectedReward={id:"",description:"",title:""},this.routeSub=null}ngOnInit(){this.userRole=this.authService.getUserRole();const t=this.authService.getUserId();this.routeSub=this.route.paramMap.subscribe(n=>{this.userId=n.get("user_id")||t,"user"===this.userRole&&this.userId!==t&&this.router.navigate(["/loyalty-card",t]),this.userId||this.router.navigate(["/loyalty-card",t]),this.getUserData(this.userId)})}getUserData(t){!t||(this.isLoading=!0,setTimeout(()=>{this.loyaltyCardService.getUserDetails(t).subscribe(n=>{this.user=n,this.getRewards(n),this.isLoading=!1},n=>{console.error("Error fetching user data:",n),this.isLoading=!1})},2e3))}generateLogos(t,n){let o=[];for(let r=1;r<=10;r++){const a=n.find(u=>u.required_points===r);o.push(r<=t?a?{id:a._id,points:t,description:a.reward_description,title:`${a.reward_name}`}:{id:"",points:t,description:"",title:"credit-logo"}:a?{id:a._id,points:t,description:a.reward_description,title:`${a.reward_name}`}:{id:"",points:t,description:"",title:"default-logo"})}return o}redeemReward(t){!t||this.isRedeeming||(this.isRedeeming=!0,this.isLoading=!0,console.log("reward_id :",t),this.loyaltyCardService.addRewardToUser(this.userId,t).subscribe({next:n=>{console.log("Reward redeemed successfully:",n),alert("Reward redeemed successfully!")},error:n=>{console.error("Error redeeming reward:",n),alert("There was an error redeeming the reward. Please try again.")},complete:()=>{this.isRedeeming=!1,this.isLoading=!1,window.location.reload()}}))}getRewards(t){const n=this.user.points;this.loyaltyCardService.getAllRewards().subscribe(o=>{this.rewards=o,this.logos=this.generateLogos(n,this.rewards)},o=>{console.error("Error fetching rewards:",o)})}showRewardDetails(t,n){const o=n+1;this.selectedReward=t,this.isModalVisible=!0;const r=this.user,a=this.authService.getUserRole();t&&o<=r.points&&!r.redeem_requests.includes(t.id)&&!r.rewards.includes(t.id)?"user"===a&&(this.canRedeem=!0,this.redeemButton="Redeem Reward",this.rewardTitle="Congratulations!",this.rewardMessage="You may now redeem your reward."):t&&r.redeem_requests.includes(t.id)&&!r.rewards.includes(t.id)?"admin"===a||"super-admin"===a?(this.canRedeem=!0,this.redeemButton="Grant Reward",this.rewardTitle="Claim Request!",this.rewardMessage=""):(this.canRedeem=!1,this.rewardTitle="Request Sent!",this.rewardMessage="Your reward is now available for redemption at our physical store."):t&&!r.redeem_requests.includes(t.id)&&r.rewards.includes(t.id)&&(this.canRedeem=!1,this.rewardTitle="Reward Claimed!",this.rewardMessage="Your reward has already been claimed!")}closeModal(){this.clearProperties()}clearProperties(){this.isModalVisible=!1,this.selectedReward={id:"",description:"",title:""},this.redeemButton="",this.rewardTitle="",this.rewardMessage="",this.canRedeem=!1}openGrantPointsModal(){this.isGrantPointsModalVisible=!0}closeGrantPointsModal(){this.isGrantPointsModalVisible=!1}confirmGrantPoints(){this.closeGrantPointsModal(),this.grantPoints()}grantPoints(){"user"===this.userRole||!this.userId||this.isGrantingPoints||(this.isGrantingPoints=!0,this.isLoading=!0,this.loyaltyCardService.addPoints(this.userId).subscribe({next:t=>{console.log("Points granted successfully:",t),alert("Points granted successfully!")},error:t=>{console.error("Error granting points:",t),alert("There was an error granting points. Please try again.")},complete:()=>{this.isGrantingPoints=!1,this.isLoading=!1,window.location.reload()}}))}ngOnDestroy(){this.routeSub&&this.routeSub.unsubscribe()}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(h.eN),e.Y36(m.e),e.Y36(f.y),e.Y36(c.gz),e.Y36(c.F0))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-loyalty-card"]],decls:45,vars:24,consts:[[3,"ngClass",4,"ngIf"],[1,"modal",3,"ngClass"],[1,"modal-content"],[1,"close-btn",3,"click"],[4,"ngIf"],[1,"reward-description"],["class","loyalty-btn",3,"click",4,"ngIf"],["class","modal",3,"ngClass",4,"ngIf"],[1,"card-container"],[1,"loyalty-card"],[1,"card-header"],[1,"header-top-row"],[1,"logo-container"],["src","assets/images/rawncafelogo.png","alt","RawnCafe Logo",1,"logo"],["src","assets/images/Text.png","alt","RawnCafe",1,"logo-text"],[1,"header-title"],[1,"card-info"],[1,"name"],[1,"card-number"],[1,"card-info-2"],[1,"expiration"],[1,"points"],[1,"card-type"],[1,"item-collection"],["class","item",4,"ngFor","ngForOf"],[1,"loyalty-btn-container"],[3,"ngClass"],["src","assets/images/ezgif.com-speed.gif","alt","Loading...",1,"loader-img"],[1,"loyalty-btn",3,"click"],[1,"modal-actions","align-items-center"],[1,"btn","btn-danger","mx-3",3,"click"],[1,"btn","btn-secondary","mx-3",3,"click"],[1,"item"],[3,"click",4,"ngIf"],["alt","Logo",3,"src",4,"ngIf"],[3,"click"],["src","assets/images/whitecup.png","alt","Reward Image"],[1,"reward-logo"],["alt","Logo",3,"src"]],template:function(t,n){if(1&t&&(e.YNc(0,x,2,1,"div",0),e.TgZ(1,"div",1)(2,"div",2)(3,"span",3),e.NdJ("click",function(){return n.closeModal()}),e._uU(4,"\xd7"),e.qZA(),e.TgZ(5,"div")(6,"h2"),e._uU(7),e.qZA(),e.YNc(8,_,2,1,"span",4),e.qZA(),e.TgZ(9,"div",5)(10,"p")(11,"b"),e._uU(12),e.ALo(13,"uppercase"),e.qZA()(),e.TgZ(14,"p"),e._uU(15),e.qZA()(),e.YNc(16,y,2,1,"button",6),e.qZA()(),e.YNc(17,w,15,6,"div",7),e.TgZ(18,"div",8)(19,"div",9)(20,"div",10)(21,"div",11)(22,"div",12),e._UZ(23,"img",13)(24,"img",14),e.TgZ(25,"div",15),e._uU(26,"Loyalty Card"),e.qZA()()(),e.TgZ(27,"div",16)(28,"p",17),e._uU(29),e.ALo(30,"titlecase"),e.qZA(),e.TgZ(31,"p",18),e._uU(32),e.qZA(),e.TgZ(33,"div",19)(34,"p",20),e._uU(35),e.ALo(36,"date"),e.qZA(),e.TgZ(37,"p",21),e._uU(38),e.qZA()()()(),e.TgZ(39,"div",22),e._uU(40),e.qZA(),e.TgZ(41,"div",23),e.YNc(42,v,3,2,"div",24),e.qZA()(),e.TgZ(43,"div",25),e.YNc(44,M,2,0,"button",6),e.qZA()()),2&t){let o,r,a;e.Q6J("ngIf",n.isLoading),e.xp6(1),e.Q6J("ngClass",e.VKq(22,p,n.isModalVisible)),e.xp6(6),e.Oqu(n.rewardTitle&&""!==n.rewardTitle?n.rewardTitle:"Redeem Reward"),e.xp6(1),e.Q6J("ngIf",n.rewardMessage&&""!==n.rewardMessage),e.xp6(4),e.Oqu(e.lcZ(13,15,n.selectedReward.title)),e.xp6(3),e.Oqu(n.selectedReward.description),e.xp6(1),e.Q6J("ngIf",n.canRedeem),e.xp6(1),e.Q6J("ngIf",n.isGrantPointsModalVisible),e.xp6(12),e.hij("Name: ",e.lcZ(30,17,null!==(o=null==n.user?null:n.user.name)&&void 0!==o?o:""),""),e.xp6(3),e.hij("Card Number: ",null!==(r=null==n.user?null:n.user.card_number)&&void 0!==r?r:"",""),e.xp6(3),e.hij("Expiration: ",e.xi3(36,19,null==n.user?null:n.user.card_expiration_date,"MM/dd/yyyy"),""),e.xp6(3),e.hij("Points: ",null==n.user?null:n.user.points,""),e.xp6(2),e.Oqu(null!==(a=null==n.user?null:n.user.card_type)&&void 0!==a?a:"silver"),e.xp6(2),e.Q6J("ngForOf",n.logos),e.xp6(2),e.Q6J("ngIf",n.adminButtonRole.includes(n.userRole))}},directives:[d.O5,d.mk,d.sg],pipes:[d.gd,d.rS,d.uU],styles:[".card-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;margin:0;padding:0;position:relative}.loyalty-card[_ngcontent-%COMP%]{background-image:url(/assets/images/cardbackground.jpg);background-size:cover;background-position:center;border-radius:20px;width:600px;height:400px;box-shadow:0 6px 30px #0003;outline:2px solid white;overflow:hidden;transition:transform .3s ease,box-shadow .3s ease;transform:translateY(60px)}.card-header[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;width:100%;background-color:#0a2a3d;padding:20px;height:30%;margin:0;color:#fff;position:relative}.header-top-row[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:0;padding-top:5px;padding-bottom:0}.logo-container[_ngcontent-%COMP%]{display:flex;align-items:center;margin-top:-10px}.logo[_ngcontent-%COMP%]{position:relative;transform:translate(-25px,-25px);height:50px;width:auto}.logo-text[_ngcontent-%COMP%]{position:relative;transform:translate(-50px,-28px);height:80px;width:auto}.header-title[_ngcontent-%COMP%]{transform:translate(-50px,-23px);font-size:18px;font-weight:700;color:#fff;text-align:center;flex-grow:1;margin-top:-5px}.card-info[_ngcontent-%COMP%]{transform:translateY(-45px);text-align:left;font-size:14px;color:#fff;margin-top:10px}.card-info-2[_ngcontent-%COMP%]{transform:translate(200px,-64px)}.card-info[_ngcontent-%COMP%]   .card-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;padding:2px 0}.card-type[_ngcontent-%COMP%]{position:absolute;top:20px;right:20px;background-color:#d8d8d8;color:#333;font-weight:700;padding:8px 15px;font-size:14px;box-shadow:0 2px 10px #0000001a;transform:translate(20px,-20px)}.item-collection[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(5,1fr);grid-gap:12px;gap:12px;margin-top:25px}.item[_ngcontent-%COMP%]{position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center}.item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover;border-radius:8px;transition:opacity .3s ease,transform .3s ease-in-out;z-index:1}.item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:hover{transform:scale(1.1);opacity:.8}.reward-logo[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:16px;font-weight:700;text-align:center;color:#0a2a3d;z-index:2;text-shadow:0px 2px 10px rgba(0,0,0,.6);pointer-events:none}.reward-description[_ngcontent-%COMP%]{text-align:left;padding:15px;background-color:#e0f7fa;box-shadow:0 4px 20px #0000001a;border-radius:20px;width:100%;margin:20px auto}.loyalty-btn-container[_ngcontent-%COMP%]{display:flex;justify-content:center;width:100%;transform:translateY(75px)}.loyalty-btn[_ngcontent-%COMP%]{width:150px;font-size:16px;background-color:#1c841c;color:#fff;padding:12px 0;border:none;border-radius:10px;cursor:pointer;font-weight:700;box-shadow:0 4px 15px #0000001a;display:inline-block}.redeem-btn[_ngcontent-%COMP%]:hover{background-color:#7d9eb1}.modal[_ngcontent-%COMP%]{display:none;position:fixed;z-index:999;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#00000080;justify-content:center;align-items:center}.modal.show[_ngcontent-%COMP%]{display:flex}.modal-content[_ngcontent-%COMP%]{background-color:#fff;border-radius:10px;padding:20px;width:80%;max-width:400px;text-align:center;box-shadow:0 6px 15px #0000004d}.close-btn[_ngcontent-%COMP%]{color:#aaa;float:right;font-size:28px;font-weight:700;cursor:pointer;position:absolute;top:10px;right:20px;transition:color .3s ease}.close-btn[_ngcontent-%COMP%]:hover{color:#000}@media screen and (max-width: 600px){.card-container[_ngcontent-%COMP%]{justify-content:center;align-items:flex-start}.card-header[_ngcontent-%COMP%]{height:200px}.loyalty-card[_ngcontent-%COMP%]{width:95%;height:auto;transform:translateY(30px)}.item-collection[_ngcontent-%COMP%]{margin-bottom:50px}.loyalty-btn-container[_ngcontent-%COMP%]{display:flex;justify-content:center;width:100%;transform:translateY(30px);padding-top:10%}.loyalty-btn[_ngcontent-%COMP%]{width:150px;font-size:16px;background-color:#1c841c;color:#fff;padding:12px 0;border:none;border-radius:10px;cursor:pointer;font-weight:700;box-shadow:0 4px 15px #0000001a;display:inline-block}.card-info-2[_ngcontent-%COMP%]{transform:translate(0)}.item-collection[_ngcontent-%COMP%]{grid-template-columns:repeat(3,1fr)}}.overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:flex;justify-content:center;align-items:center;z-index:1100;visibility:hidden}.loader-img[_ngcontent-%COMP%]{width:60px;height:60px;border-radius:50%;object-fit:cover;box-shadow:0 0 20px #0003,0 0 40px #0000001a;mask-image:radial-gradient(circle,rgba(0,0,0,1) 50%,rgba(0,0,0,0) 100%);-webkit-mask-image:radial-gradient(circle,rgba(0,0,0,1) 50%,rgba(0,0,0,0) 100%)}.overlay.active[_ngcontent-%COMP%]{visibility:visible}"]}),i})();var Z=l(1735),T=l(5107);const O=[{path:"",component:P,canActivate:[Z.p,T.a],data:{role:["user","admin","super-admin"]}}];let R=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[d.ez,c.Bz.forChild(O)]]}),i})()}}]);