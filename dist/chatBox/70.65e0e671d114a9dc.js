"use strict";(self.webpackChunkchatBox=self.webpackChunkchatBox||[]).push([[70],{70:(N,g,s)=>{s.r(g),s.d(g,{AuthUnlockSessionModule:()=>$});var m=s(4366),d=s(8834),l=s(2102),h=s(9213),p=s(9631),v=s(9183),k=s(69),y=s(4299),x=s(599),a=s(9417),F=s(7122),e=s(4438),w=s(5524),j=s(6246),S=s(3738),b=s(177);const U=["unlockSessionNgForm"],I=()=>["/sign-out"];function G(t,c){if(1&t&&(e.j41(0,"fuse-alert",40),e.EFF(1),e.k0s()),2&t){const o=e.XpG();e.Y8G("appearance","outline")("showIcon",!1)("type",o.alert.type)("@shake","error"===o.alert.type),e.R7$(),e.SpI(" ",o.alert.message," ")}}function C(t,c){1&t&&e.nrm(0,"mat-icon",41),2&t&&e.Y8G("svgIcon","heroicons_solid:eye")}function R(t,c){1&t&&e.nrm(0,"mat-icon",41),2&t&&e.Y8G("svgIcon","heroicons_solid:eye-off")}function A(t,c){1&t&&(e.j41(0,"span"),e.EFF(1," Unlock your session "),e.k0s())}function Y(t,c){1&t&&e.nrm(0,"mat-progress-spinner",42),2&t&&e.Y8G("diameter",24)("mode","indeterminate")}const E=[{path:"",component:(()=>{class t{constructor(o,n,i,r,u){this._activatedRoute=o,this._authService=n,this._formBuilder=i,this._router=r,this._userService=u,this.alert={type:"success",message:""},this.showAlert=!1}ngOnInit(){this._userService.user$.subscribe(o=>{this.name=o.name,this._email=o.email}),this.unlockSessionForm=this._formBuilder.group({name:[{value:this.name,disabled:!0}],password:["",a.k0.required]})}unlock(){this.unlockSessionForm.invalid||(this.unlockSessionForm.disable(),this.showAlert=!1,this._authService.unlockSession({email:this._email??"",password:this.unlockSessionForm.get("password").value}).subscribe(()=>{const o=this._activatedRoute.snapshot.queryParamMap.get("redirectURL")||"/signed-in-redirect";this._router.navigateByUrl(o)},o=>{this.unlockSessionForm.enable(),this.unlockSessionNgForm.resetForm({name:{value:this.name,disabled:!0}}),this.alert={type:"error",message:"Invalid password"},this.showAlert=!0}))}static#e=this.\u0275fac=function(n){return new(n||t)(e.rXU(m.nX),e.rXU(w.u),e.rXU(a.ok),e.rXU(m.Ix),e.rXU(j.D))};static#t=this.\u0275cmp=e.VBU({type:t,selectors:[["auth-unlock-session"]],viewQuery:function(n,i){if(1&n&&e.GBs(U,5),2&n){let r;e.mGM(r=e.lsd())&&(i.unlockSessionNgForm=r.first)}},decls:60,vars:13,consts:[["unlockSessionNgForm","ngForm"],["passwordField",""],[1,"flex","flex-col","sm:flex-row","items-center","md:items-start","sm:justify-center","md:justify-start","flex-auto","min-w-0"],[1,"md:flex","md:items-center","md:justify-end","w-full","sm:w-auto","md:h-full","md:w-1/2","py-8","px-4","sm:p-12","md:p-16","sm:rounded-2xl","md:rounded-none","sm:shadow","md:shadow-none","sm:bg-card"],[1,"w-full","max-w-80","sm:w-80","mx-auto","sm:mx-0"],[1,"w-12"],["src","assets/images/logo/logo.svg"],[1,"mt-8","text-4xl","font-extrabold","tracking-tight","leading-tight"],[1,"mt-0.5","font-medium"],["class","mt-8 -mb-4",3,"appearance","showIcon","type",4,"ngIf"],[1,"mt-8",3,"formGroup"],[1,"w-full"],["id","name","matInput","",3,"formControlName"],["id","password","matInput","","type","password",3,"formControlName"],["mat-icon-button","","type","button","matSuffix","",3,"click"],["class","icon-size-5",3,"svgIcon",4,"ngIf"],["mat-flat-button","",1,"fuse-mat-button-large","w-full","mt-3",3,"click","color","disabled"],[4,"ngIf"],[3,"diameter","mode",4,"ngIf"],[1,"mt-8","text-md","font-medium","text-secondary"],[1,"ml-1","text-primary-500","hover:underline",3,"routerLink"],[1,"relative","hidden","md:flex","flex-auto","items-center","justify-center","w-1/2","h-full","p-16","lg:px-28","overflow-hidden","bg-gray-800","dark:border-l"],["viewBox","0 0 960 540","width","100%","height","100%","preserveAspectRatio","xMidYMax slice","xmlns","http://www.w3.org/2000/svg",1,"absolute","inset-0","pointer-events-none"],["fill","none","stroke","currentColor","stroke-width","100",1,"text-gray-700","opacity-25"],["r","234","cx","196","cy","23"],["r","234","cx","790","cy","491"],["viewBox","0 0 220 192","width","220","height","192","fill","none",1,"absolute","-top-16","-right-16","text-gray-700"],["id","837c3e70-6c3a-44e6-8854-cc48c737b659","x","0","y","0","width","20","height","20","patternUnits","userSpaceOnUse"],["x","0","y","0","width","4","height","4","fill","currentColor"],["width","220","height","192","fill","url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"],[1,"z-10","relative","w-full","max-w-2xl"],[1,"text-7xl","font-bold","leading-none","text-gray-100"],[1,"mt-6","text-lg","tracking-tight","leading-6","text-gray-400"],[1,"flex","items-center","mt-8"],[1,"flex","flex-0","items-center","-space-x-1.5"],["src","assets/images/avatars/female-18.jpg",1,"flex-0","w-10","h-10","rounded-full","ring-4","ring-offset-1","ring-gray-800","ring-offset-gray-800","object-cover"],["src","assets/images/avatars/female-11.jpg",1,"flex-0","w-10","h-10","rounded-full","ring-4","ring-offset-1","ring-gray-800","ring-offset-gray-800","object-cover"],["src","assets/images/avatars/male-09.jpg",1,"flex-0","w-10","h-10","rounded-full","ring-4","ring-offset-1","ring-gray-800","ring-offset-gray-800","object-cover"],["src","assets/images/avatars/male-16.jpg",1,"flex-0","w-10","h-10","rounded-full","ring-4","ring-offset-1","ring-gray-800","ring-offset-gray-800","object-cover"],[1,"ml-4","font-medium","tracking-tight","text-gray-400"],[1,"mt-8","-mb-4",3,"appearance","showIcon","type"],[1,"icon-size-5",3,"svgIcon"],[3,"diameter","mode"]],template:function(n,i){if(1&n){const r=e.RV6();e.j41(0,"div",2)(1,"div",3)(2,"div",4)(3,"div",5),e.nrm(4,"img",6),e.k0s(),e.j41(5,"div",7),e.EFF(6,"Unlock your session"),e.k0s(),e.j41(7,"div",8),e.EFF(8,"Your session is locked due to inactivity"),e.k0s(),e.DNE(9,G,2,5,"fuse-alert",9),e.j41(10,"form",10,0)(12,"mat-form-field",11)(13,"mat-label"),e.EFF(14,"Full name"),e.k0s(),e.nrm(15,"input",12),e.k0s(),e.j41(16,"mat-form-field",11)(17,"mat-label"),e.EFF(18,"Password"),e.k0s(),e.nrm(19,"input",13,1),e.j41(21,"button",14),e.bIt("click",function(){e.eBV(r);const f=e.sdS(20);return e.Njj(f.type="password"===f.type?"text":"password")}),e.DNE(22,C,1,1,"mat-icon",15)(23,R,1,1,"mat-icon",15),e.k0s(),e.j41(24,"mat-error"),e.EFF(25," Password is required "),e.k0s()(),e.j41(26,"button",16),e.bIt("click",function(){return e.eBV(r),e.Njj(i.unlock())}),e.DNE(27,A,2,0,"span",17)(28,Y,1,2,"mat-progress-spinner",18),e.k0s(),e.j41(29,"div",19)(30,"span"),e.EFF(31,"I'm not"),e.k0s(),e.j41(32,"a",20),e.EFF(33),e.k0s()()()()(),e.j41(34,"div",21),e.qSk(),e.j41(35,"svg",22)(36,"g",23),e.nrm(37,"circle",24)(38,"circle",25),e.k0s()(),e.j41(39,"svg",26)(40,"defs")(41,"pattern",27),e.nrm(42,"rect",28),e.k0s()(),e.nrm(43,"rect",29),e.k0s(),e.joV(),e.j41(44,"div",30)(45,"div",31)(46,"div"),e.EFF(47,"Welcome to"),e.k0s(),e.j41(48,"div"),e.EFF(49,"our community"),e.k0s()(),e.j41(50,"div",32),e.EFF(51," Fuse helps developers to build organized and well coded dashboards full of beautiful and rich modules. Join us and start building your application today. "),e.k0s(),e.j41(52,"div",33)(53,"div",34),e.nrm(54,"img",35)(55,"img",36)(56,"img",37)(57,"img",38),e.k0s(),e.j41(58,"div",39),e.EFF(59,"More than 17k people joined us, it's your turn"),e.k0s()()()()()}if(2&n){const r=e.sdS(20);e.R7$(9),e.Y8G("ngIf",i.showAlert),e.R7$(),e.Y8G("formGroup",i.unlockSessionForm),e.R7$(5),e.Y8G("formControlName","name"),e.R7$(4),e.Y8G("formControlName","password"),e.R7$(3),e.Y8G("ngIf","password"===r.type),e.R7$(),e.Y8G("ngIf","text"===r.type),e.R7$(3),e.Y8G("color","primary")("disabled",i.unlockSessionForm.disabled),e.R7$(),e.Y8G("ngIf",!i.unlockSessionForm.disabled),e.R7$(),e.Y8G("ngIf",i.unlockSessionForm.disabled),e.R7$(4),e.Y8G("routerLink",e.lJ4(12,I)),e.R7$(),e.JRh(i.name)}},dependencies:[m.Wk,d.$z,d.iY,l.rl,l.nJ,l.TL,l.yw,h.An,p.fg,v.LG,S.F,b.bT,a.qT,a.me,a.BC,a.cb,a.j4,a.JD],encapsulation:2,data:{animation:F.X}})}return t})()}];let $=(()=>{class t{static#e=this.\u0275fac=function(n){return new(n||t)};static#t=this.\u0275mod=e.$C({type:t});static#s=this.\u0275inj=e.G2t({imports:[m.iI.forChild(E),d.Hl,l.RG,h.m_,p.fS,v.D6,k.S,y.Uq,x.G]})}return t})()}}]);