"use strict";(self.webpackChunkchatBox=self.webpackChunkchatBox||[]).push([[94],{5094:(J,f,n)=>{n.r(f),n.d(f,{AuthSignUpModule:()=>B});var d=n(4366),c=n(8834),p=n(2765),l=n(2102),u=n(9213),h=n(9631),v=n(9183),y=n(69),x=n(4299),j=n(599),o=n(9417),k=n(7122),e=n(4438),w=n(5524),U=n(3738),b=n(177);const C=["signUpNgForm"],S=()=>["/pages/authentication/sign-in"],F=()=>["./"];function E(t,m){if(1&t&&(e.j41(0,"fuse-alert",42),e.EFF(1),e.k0s()),2&t){const s=e.XpG();e.Y8G("appearance","outline")("showIcon",!1)("type",s.alert.type)("@shake","error"===s.alert.type),e.R7$(),e.SpI(" ",s.alert.message," ")}}function G(t,m){1&t&&(e.j41(0,"mat-error"),e.EFF(1," Full name is required "),e.k0s())}function I(t,m){1&t&&(e.j41(0,"mat-error"),e.EFF(1," Email address is required "),e.k0s())}function Y(t,m){1&t&&(e.j41(0,"mat-error"),e.EFF(1," Please enter a valid email address "),e.k0s())}function A(t,m){1&t&&e.nrm(0,"mat-icon",43),2&t&&e.Y8G("svgIcon","heroicons_solid:eye")}function R(t,m){1&t&&e.nrm(0,"mat-icon",43),2&t&&e.Y8G("svgIcon","heroicons_solid:eye-off")}function $(t,m){1&t&&(e.j41(0,"span"),e.EFF(1," Create your free account "),e.k0s())}function N(t,m){1&t&&e.nrm(0,"mat-progress-spinner",44),2&t&&e.Y8G("diameter",24)("mode","indeterminate")}const T=[{path:"",component:(()=>{class t{constructor(s,i,r){this._authService=s,this._formBuilder=i,this._router=r,this.alert={type:"success",message:""},this.showAlert=!1}ngOnInit(){this.signUpForm=this._formBuilder.group({name:["",o.k0.required],email:["",[o.k0.required,o.k0.email]],password:["",o.k0.required],company:[""],agreements:["",o.k0.requiredTrue]})}signUp(){this.signUpForm.invalid||(this.signUpForm.disable(),this.showAlert=!1,this._authService.signUp(this.signUpForm.value).subscribe(s=>{this._router.navigateByUrl("/confirmation-required")},s=>{this.signUpForm.enable(),this.signUpNgForm.resetForm(),this.alert={type:"error",message:"Something went wrong, please try again."},this.showAlert=!0}))}static#e=this.\u0275fac=function(i){return new(i||t)(e.rXU(w.u),e.rXU(o.ok),e.rXU(d.Ix))};static#t=this.\u0275cmp=e.VBU({type:t,selectors:[["auth-sign-up"]],viewQuery:function(i,r){if(1&i&&e.GBs(C,5),2&i){let a;e.mGM(a=e.lsd())&&(r.signUpNgForm=a.first)}},decls:78,vars:23,consts:[["passwordField",""],[1,"flex","flex-col","sm:flex-row","items-center","md:items-start","sm:justify-center","md:justify-start","flex-auto","min-w-0"],[1,"md:flex","md:items-center","md:justify-end","w-full","sm:w-auto","md:h-full","md:w-1/2","py-8","px-4","sm:p-12","md:p-16","sm:rounded-2xl","md:rounded-none","sm:shadow","md:shadow-none","sm:bg-card"],[1,"w-full","max-w-80","sm:w-80","mx-auto","sm:mx-0"],[1,"w-12"],["src","assets/images/logo/logo.svg"],[1,"mt-8","text-4xl","font-extrabold","tracking-tight","leading-tight"],[1,"flex","items-baseline","mt-0.5","font-medium"],[1,"ml-1","text-primary-500","hover:underline",3,"routerLink"],["class","mt-8 -mb-4",3,"appearance","showIcon","type",4,"ngIf"],[1,"mt-8",3,"formGroup"],[1,"w-full"],["id","name","matInput","",3,"formControlName"],[4,"ngIf"],["id","email","matInput","",3,"formControlName"],["id","password","matInput","","type","password",3,"formControlName"],["mat-icon-button","","type","button","matSuffix","",3,"click"],["class","icon-size-5",3,"svgIcon",4,"ngIf"],["id","company-confirm","matInput","",3,"formControlName"],[1,"inline-flex","items-end","w-full","mt-1.5"],[3,"color","formControlName"],["mat-flat-button","",1,"fuse-mat-button-large","w-full","mt-6",3,"click","color","disabled"],[3,"diameter","mode",4,"ngIf"],[1,"relative","hidden","md:flex","flex-auto","items-center","justify-center","w-1/2","h-full","p-16","lg:px-28","overflow-hidden","bg-gray-800","dark:border-l"],["viewBox","0 0 960 540","width","100%","height","100%","preserveAspectRatio","xMidYMax slice","xmlns","http://www.w3.org/2000/svg",1,"absolute","inset-0","pointer-events-none"],["fill","none","stroke","currentColor","stroke-width","100",1,"text-gray-700","opacity-25"],["r","234","cx","196","cy","23"],["r","234","cx","790","cy","491"],["viewBox","0 0 220 192","width","220","height","192","fill","none",1,"absolute","-top-16","-right-16","text-gray-700"],["id","837c3e70-6c3a-44e6-8854-cc48c737b659","x","0","y","0","width","20","height","20","patternUnits","userSpaceOnUse"],["x","0","y","0","width","4","height","4","fill","currentColor"],["width","220","height","192","fill","url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"],[1,"z-10","relative","w-full","max-w-2xl"],[1,"text-7xl","font-bold","leading-none","text-gray-100"],[1,"mt-6","text-lg","tracking-tight","leading-6","text-gray-400"],[1,"flex","items-center","mt-8"],[1,"flex","flex-0","items-center","-space-x-1.5"],["src","assets/images/avatars/female-18.jpg",1,"flex-0","w-10","h-10","rounded-full","ring-4","ring-offset-1","ring-gray-800","ring-offset-gray-800","object-cover"],["src","assets/images/avatars/female-11.jpg",1,"flex-0","w-10","h-10","rounded-full","ring-4","ring-offset-1","ring-gray-800","ring-offset-gray-800","object-cover"],["src","assets/images/avatars/male-09.jpg",1,"flex-0","w-10","h-10","rounded-full","ring-4","ring-offset-1","ring-gray-800","ring-offset-gray-800","object-cover"],["src","assets/images/avatars/male-16.jpg",1,"flex-0","w-10","h-10","rounded-full","ring-4","ring-offset-1","ring-gray-800","ring-offset-gray-800","object-cover"],[1,"ml-4","font-medium","tracking-tight","text-gray-400"],[1,"mt-8","-mb-4",3,"appearance","showIcon","type"],[1,"icon-size-5",3,"svgIcon"],[3,"diameter","mode"]],template:function(i,r){if(1&i){const a=e.RV6();e.j41(0,"div",1)(1,"div",2)(2,"div",3)(3,"div",4),e.nrm(4,"img",5),e.k0s(),e.j41(5,"div",6),e.EFF(6,"Sign up"),e.k0s(),e.j41(7,"div",7)(8,"div"),e.EFF(9,"Already have an account?"),e.k0s(),e.j41(10,"a",8),e.EFF(11,"Sign in "),e.k0s()(),e.DNE(12,E,2,5,"fuse-alert",9),e.j41(13,"form",10)(14,"mat-form-field",11)(15,"mat-label"),e.EFF(16,"Full name"),e.k0s(),e.nrm(17,"input",12),e.DNE(18,G,2,0,"mat-error",13),e.k0s(),e.j41(19,"mat-form-field",11)(20,"mat-label"),e.EFF(21,"Email address"),e.k0s(),e.nrm(22,"input",14),e.DNE(23,I,2,0,"mat-error",13)(24,Y,2,0,"mat-error",13),e.k0s(),e.j41(25,"mat-form-field",11)(26,"mat-label"),e.EFF(27,"Password"),e.k0s(),e.nrm(28,"input",15,0),e.j41(30,"button",16),e.bIt("click",function(){e.eBV(a);const g=e.sdS(29);return e.Njj(g.type="password"===g.type?"text":"password")}),e.DNE(31,A,1,1,"mat-icon",17)(32,R,1,1,"mat-icon",17),e.k0s(),e.j41(33,"mat-error"),e.EFF(34," Password is required "),e.k0s()(),e.j41(35,"mat-form-field",11)(36,"mat-label"),e.EFF(37,"Company"),e.k0s(),e.nrm(38,"input",18),e.k0s(),e.j41(39,"div",19)(40,"mat-checkbox",20)(41,"span"),e.EFF(42,"I agree to the"),e.k0s(),e.j41(43,"a",8),e.EFF(44,"Terms of Service "),e.k0s(),e.j41(45,"span"),e.EFF(46,"and"),e.k0s(),e.j41(47,"a",8),e.EFF(48,"Privacy Policy "),e.k0s()()(),e.j41(49,"button",21),e.bIt("click",function(){return e.eBV(a),e.Njj(r.signUp())}),e.DNE(50,$,2,0,"span",13)(51,N,1,2,"mat-progress-spinner",22),e.k0s()()()(),e.j41(52,"div",23),e.qSk(),e.j41(53,"svg",24)(54,"g",25),e.nrm(55,"circle",26)(56,"circle",27),e.k0s()(),e.j41(57,"svg",28)(58,"defs")(59,"pattern",29),e.nrm(60,"rect",30),e.k0s()(),e.nrm(61,"rect",31),e.k0s(),e.joV(),e.j41(62,"div",32)(63,"div",33)(64,"div"),e.EFF(65,"Welcome to"),e.k0s(),e.j41(66,"div"),e.EFF(67,"our community"),e.k0s()(),e.j41(68,"div",34),e.EFF(69," Fuse helps developers to build organized and well coded dashboards full of beautiful and rich modules. Join us and start building your application today. "),e.k0s(),e.j41(70,"div",35)(71,"div",36),e.nrm(72,"img",37)(73,"img",38)(74,"img",39)(75,"img",40),e.k0s(),e.j41(76,"div",41),e.EFF(77,"More than 17k people joined us, it's your turn"),e.k0s()()()()()}if(2&i){const a=e.sdS(29);e.R7$(10),e.Y8G("routerLink",e.lJ4(20,S)),e.R7$(2),e.Y8G("ngIf",r.showAlert),e.R7$(),e.Y8G("formGroup",r.signUpForm),e.R7$(4),e.Y8G("formControlName","name"),e.R7$(),e.Y8G("ngIf",r.signUpForm.get("name").hasError("required")),e.R7$(4),e.Y8G("formControlName","email"),e.R7$(),e.Y8G("ngIf",r.signUpForm.get("email").hasError("required")),e.R7$(),e.Y8G("ngIf",r.signUpForm.get("email").hasError("email")),e.R7$(4),e.Y8G("formControlName","password"),e.R7$(3),e.Y8G("ngIf","password"===a.type),e.R7$(),e.Y8G("ngIf","text"===a.type),e.R7$(6),e.Y8G("formControlName","company"),e.R7$(2),e.Y8G("color","primary")("formControlName","agreements"),e.R7$(3),e.Y8G("routerLink",e.lJ4(21,F)),e.R7$(4),e.Y8G("routerLink",e.lJ4(22,F)),e.R7$(2),e.Y8G("color","primary")("disabled",r.signUpForm.disabled),e.R7$(),e.Y8G("ngIf",!r.signUpForm.disabled),e.R7$(),e.Y8G("ngIf",r.signUpForm.disabled)}},dependencies:[d.Wk,c.$z,c.iY,p.So,l.rl,l.nJ,l.TL,l.yw,u.An,h.fg,v.LG,U.F,b.bT,o.qT,o.me,o.BC,o.cb,o.j4,o.JD],encapsulation:2,data:{animation:k.X}})}return t})()}];let B=(()=>{class t{static#e=this.\u0275fac=function(i){return new(i||t)};static#t=this.\u0275mod=e.$C({type:t});static#n=this.\u0275inj=e.G2t({imports:[d.iI.forChild(T),c.Hl,p.g7,l.RG,u.m_,h.fS,v.D6,y.S,x.Uq,j.G]})}return t})()}}]);