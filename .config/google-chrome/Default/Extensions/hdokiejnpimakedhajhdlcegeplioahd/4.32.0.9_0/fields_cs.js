function LP_field_set_backgroundPosition(e,i){if(!(e=e||LP_derive_doc())||!i)return!1;var t=!1,n=!0,o=!1;if(LP_get_text_dir(i)===n){var r="98% 50%";if(-1<document.location.href.indexOf("https://mint.intuit.com/login.event?task=S")&&0<document.getElementById(i.id).nextElementSibling.offsetWidth&&(r="92% 50%"),null!=typeof i.style.backgroundPosition)i.style.backgroundPosition!=r&&(t=!0);else if(g_isie&&null!=typeof i.currentStyle&&null!=typeof i.currentStyle.backgroundPositionX&&null!=typeof i.currentStyle.backgroundPositionY){var l=i.currentStyle.backgroundPositionX,a=i.currentStyle.backgroundPositionY;"98%"==l&&lp_in_array(a,["center","50%"])||(t=!0)}}else{var r="center left";if(null!=typeof i.style.backgroundPosition)lp_in_array(i.style.backgroundPosition,["center left","left center","0% 50%","left"])||(t=!0);else if(g_isie&&null!=typeof i.currentStyle&&null!=typeof i.currentStyle.backgroundPositionX&&null!=typeof i.currentStyle.backgroundPositionY){var l=i.currentStyle.backgroundPositionX,a=i.currentStyle.backgroundPositionY;lp_in_array(l,["left","0%"])&&lp_in_array(a,["center","50%"])||(t=!0)}}return t&&(i.style.backgroundPosition=r),!0}function LP_get_text_dir(e){var i,t=!1,n=!0;if(e){var o=LP_get_live_style(e);o&&"rtl"==o.direction?n=t:"rtl"==e.getAttribute("dir")&&(n=t)}return n}function LP_input_has_bg_style_override(e){if(!e)return!1;if(!g_stylesheet_grubbing)return!1;var i=!1;try{var t=formcacheget(e,"fakedoc","input-bg-style");if(null!=t)return t;var n=32,o=0,r=0,l=new RegExp("(background|background-color):[^:].*!important"),a=e.styleSheets;if(a&&l)for(o=0;o<a.length&&o<n;o++){var _=null;if(void 0!==a[o].rules?_=a[o].rules:void 0!==a[o].cssRules&&(_=a[o].cssRules),_){for(r=0;r<_.length;r++)if(_[r]&&_[r].selectorText&&_[r].cssText&&-1!=_[r].selectorText.indexOf("input:focus")){var c=_[r].cssText;if(c&&l.exec(c)){verbose_log("focus hack:"+c),i=!0;break}}if(i)break}}}catch(e){}return formcacheset(e,"fakedoc","input-bg-style",i),i}function ForceFillOrphanFieldClicked(e,i,t){if(!e&&!(e=elt.ownerDocument))return!1;var n=!0,o=!1;if(n=ForceFillFieldClicked(e,i,o,t)){var r=e.getElementsByTagName("INPUT"),l=0;for(l=0;l<r.length&&l<MAX_INPUTS_HARD;l++)if(r[l]==i&&r[l+1]&&l+1<r.length&&l+1<MAX_INPUTS_HARD){isInputFieldPassword(e,r[l+1])&&!lpIsFieldCurrentPWField(r[l+1])&&(n=ForceFillFieldClicked(e,r[l+1],o,t));break}}return n}function revert_clickable_icon(e,i){if(verbose_log("entered revert_clickable_icon"),null!=e){var t=i,n=LP_getElementByIdOrName(e,t),o=getIconState(e,t),r=!1,l=!1,a="sites";o&&void 0!==o.dofloater&&(r=o.dofloater),o&&void 0!==o.inframe&&(l=o.inframe),o&&void 0!==o.fillhint&&(a=o.fillhint),verbose_log("entered BG image revert"),n?r?reset_floating_icon(e,n,a):set_input_icon_image(e,n,a):verbose_log("could not find field named "+field_id)}}function conditional_create_popup(e,i,t){return null!=e&&null!=i&&g_clickable_input,!1}function closeclickableicons(e){if(do_experimental_popupfill&&null!=(e=e||document)){verbose_log("closeclickableicons called on "+e.location.href);var i=getAllIconStates(),t,n;for(t=0;t<i.length;t++){var o=i[t],n;if(n=(n=o.IHTMLElement)||LP_getElementByIdOrName(e,o.idorname),o.dofloat||!o.inframe||n)!o.dofloater&&n&&inputHasLPBackground(n)?removeLPBackground(n):pass;else if(g_isfirefox)try{var r,l,a=e.getElementsByTagName("IFRAME");for(r=0;r<a.length;r++)l=a[r].contentDocument,(n=LP_getElementByIdOrName(l,o.idorname))&&"INPUT"==n.tagName&&removeLPBackground(n)}catch(e){verbose_log("Error frame traverse "+e.message),l=null}else!g_isie&&g_create_iframe_in_top&&pass;resetAllIconStates()}var _=LP_get_icon_divs(e),r;for(r in _){var c;if(_.hasOwnProperty(r))null!=e.getElementById(_[r])&&(g_do_icon_number_hint&&LP_delete_floating_icon_hint(e,_[r]),LP_delete_floating_icon(e,_[r]))}LP_reset_icon_divs(e)}}function setup_input_icon(i,t,n,e,o){if("undefined"!=typeof g_isie&&g_isie&&"undefined"!=typeof LPfn&&null!=typeof LPfn.isInfieldIconDisabledForFormfills&&LPfn.isInfieldIconDisabledForFormfills&&"formfills"==n)return!0;var r=!1;if(null==t)return verbose_log("setup_input_icon: ERROR passed null field"),r;if(t.form&&"sites"==n&&is_shopping_form(i,t.form)&&g_aspx_hack&&(isASPpage()&&2<i.getElementsByTagName("form").length||!isASPpage()))return r;g_isfirefox&&LP&&"undefined"!=typeof g_icon_number_in_toolbar&&g_icon_number_in_toolbar&&LP.lp_handle_buttons_all("refresh");var l=null;if(l="undefined"!=typeof LP&&"function"==typeof LP.lpGetCurrentWindow?void 0!==LP.lpGetCurrentWindow().getBrowser?LP.lpGetCurrentWindow().getBrowser().contentDocument:LP.getBrowser().contentDocument:g_isfirefox?top.document:document,!do_experimental_popupfill)return r;i=i||l;var a=LP_pickFieldName(i,t);if(null==t||!l||!i)return r;if(LP_explicit_ignored(i,t))return r;var _=getIconState(i,a),c;if(_&&_.IHTMLElement==t&&(inputHasLPBackground(t)&&removeLPBackground(t),LP_floating_icon_exists(i,a)))return!1;_=null,("generate"==n||!o&&shouldOfferGenerate(i,t))&&(n="generate");var f=gettldcached(i.location.href),s=shouldCreateFloatingIcon(i,t,f),g=!0,d=!1,u=LP_get_text_dir(t);if(!1===u&&pass,LP_fieldIsReadOnly(t)||LP_fieldIsDisabled(t))return!1;var p=!1,m=i!=l;g_create_iframe_in_top&&!g_isie&&!g_isfirefox&&LP_inIframe(window)&&(m=!0);var h={fillhint:n,fillhintnumber:e[n],inframe:m,idorname:a,doctld:f,dofloater:s?1:0,no_check_generate:o?1:0,IHTMLElement:t,text_direction:u};if("function"==typeof is_edge&&is_edge()){if("undefined"==typeof g_created_edge_stylesheet){g_created_edge_stylesheet=!0;var v=i.createElement("style");v.type="text/css",v.appendChild(i.createTextNode(".lastpassClearHidden::-ms-clear { display:none; }")),document.head?document.head.appendChild(v):document.body&&document.body.appendChild(v)}-1==t.className.indexOf("lastpassClearHidden")&&(t.className+=" lastpassClearHidden")}if(s){if(g_isfirefox&&verbose_log("setup_input_icon step3b"),!lpIsVisible(t)||!(null==t.form||t.form&&lpIsVisible(t.form)))return!1;saveIconState(a,h,t),r=LP_create_floating_icon(i,t,n,e)}else{saveIconState(a,h,t);var b=!1;r=set_input_icon_image(i,t,n,!1)}return set_bg_highlight_effect_handlers(i,t,n),LP_didDocumentEscapeEvent(i)||(LP_setDocumentEscapeEvent(i),LP_addEventHandler(i,"keydown",function(e){LP_keypress_handler(e)},!1)),LP_didFieldKeyEvent(i,t)?verbose_log("skip KEYDOWN HANDLER ON "+LP_pickFieldName(i,t)):(verbose_log("SETTING KEYDOWN HANDLER ON "+LP_pickFieldName(i,t)),LP_setFieldKeyEvent(i,t),LP_addEventHandler(t,"keydown",function(e){LP_field_keypress_handler(e,t,n,i)},!1),g_isfirefox&&LP_addEventHandler(t,"keyup",function(e){handle_form_text_change(i,t,t.form,e)},!1)),r}function refresh_input_icon_bg(e,i,t){if(!e&&!(e=LP_derive_doc()))return null;if(i){var n=!1,o=!1;set_input_icon_image(e,i,t,!1)}}function refresh_input_all_icon_bg(e){if(null==e&&(e=document),null!=e){try{if(0<e.location.href.indexOf(".xul"))return;verbose_log("refreshing input icons on "+e.location.href)}catch(e){return}var i=getAllIconStates(),t;for(t=0;t<i.length;t++){var n=i[t].idorname,o=i[t].fillhint,r=i[t].dofloater,l=i[t].IHTMLElement;element_is_detached(e,l,0)&&(l=null),(l=l||LP_getElementByIdOrName(e,n))&&(r||refresh_input_icon_bg(e,l,o))}}}function set_input_icon_image(e,i,t,n){if(!(e=e||LP_derive_doc()))return!1;var o,r=e.defaultView,l;r=r||window;var a=0,_=1,c=2,f=3,s=16,g=17,d=18,u=19,p=-1,m=-17,h=0,v=[];if(v[0]=g_sites_light_ico,v[1]=g_pw_light_ico,v[3]=g_close_light_ico,v[-1]="",v[2]=g_ff_light_ico,v[16]=g_sites_ico,v[17]=g_pw_ico,v[19]=g_close_ico,v[m]="",v[18]=g_ff_ico,LP_has_highdef_display(r)&&(v[0]=g_40_icons["16x16_lite@2x"],v[16]=g_40_icons["16x16_dark@2x"],v[3]=g_40_icons["IF_Close@2x"],v[19]=g_40_icons["IF_Close@2x"],v[2]=g_40_icons["FormFill@2x"],v[18]=g_40_icons["FormFill_dark@2x"],v[1]=g_40_icons["Generate@2x"],v[17]=g_40_icons["Generate_dark@2x"]),null==i)return!1;if(i.tagName&&void 0!==i.tagName.toUpperCase&&"INPUT"!=i.tagName.toUpperCase())return!1;void 0===t||null==t?l=0:"formfills"==t?l=2:"sites"==t?l=0:"generate"==t?l=1:"cancel"==t&&(l=3),n&&(l|=16);var b=LP_fieldGetWidth(i),y=!1;if("sites"!=t&&!g_is_specialsite||(y=!0),!LP_iconFieldWidthOK(i,b,y))return!0;var P=i.style.border,k=i.style.backgroundImage,L,x;if(""==k){var I=LP_getComputedStyle(r,i);I&&(k=I.backgroundImage,P=I.border)}if("none"==k&&(k=""),0<=l&&(void 0===v[l]&&verbose_log("no icon defined for iconval="+l),k!="url("+(L=LP_getloggedin()&&(0==l||16==l)?getnumbericon(e,i,n):v[l])+")")){if(i.style.backgroundImage="url("+L+")",g_issafari&&""!==P&&0<P.indexOf("inset"))var w=P.replace("inset","");"no-repeat"!=i.style.backgroundRepeat&&(i.style.backgroundRepeat="no-repeat"),"scroll"!=i.style.backgroundAttachment&&(i.style.backgroundAttachment="scroll");var O=LP_getAbsolutePos(e,i);O&&O.height<18&&0<O.height?"contain"!=i.style.backgroundSize&&(i.style.backgroundSize="contain"):"16px 18px"!=i.style.backgroundSize&&(i.style.backgroundSize="16px 18px"),LP_field_set_backgroundPosition(e,i)}return!0}function set_bg_highlight_effect_handlers(i,t,n){var e;t&&(LP_didFieldMouseEvent(i,t)||(LP_setFieldMouseEvent(i,t),LP_addEventHandler(t,"mouseover",function(e){bg_highlight_effect_mouseover(e,i,t,n)}),LP_addEventHandler(t,"focus",function(e){bg_highlight_effect_mouseover(e,i,t,n)}),LP_addEventHandler(t,"mouseout",function(e){bg_highlight_effect_mouseout(e,i,t,n)}),LP_addEventHandler(t,"blur",function(e){bg_highlight_effect_mouseout(e,i,t,n)}),LP_addEventHandler(t,"mousemove",function(e){bg_highlight_effect_mousemove(e,i,t,n)})),"sites"==n&&(!LP_getloggedin()||g_isfirefox||g_isie||t.setAttribute("autocomplete","off")))}function bg_highlight_effect_mousemove(e,i,t,n){null==e&&(e=window.event);var o=LP_getMousePos(e);if(!(o.x<=0&&o.y<=0)){var r=LP_getAbsolutePos(i,t);if(!(r.width<=0&&r.height<=0)){var l=r.left+r.width-20;l<r.left&&(l=r.left),l<o.x&&r.left+r.width>o.x&&r.top<o.y&&r.top+r.height>o.y?t.style.cursor="pointer":t.style.cursor="auto"}}}function bg_highlight_effect_mouseover(e,i,t,n){var o=!0;if(null==e&&(e=window.event),(!is_your_popup_showing(i)||i.g_popupfill_parent!=t)&&LP_getEventTarget(e)==t){var r=n,l=!1,a=getIconState(i,LP_pickFieldName(i,t));r||a&&a.hint&&(r=a.hint),a&&a.dofloater&&(l=a.dofloater),r&&(l||set_input_icon_image(i,t,r,!0))}}function bg_highlight_effect_mouseout(e,i,t,n){var o=!0;if(null==e&&(e=window.event),!is_your_popup_showing(i)||i.g_popupfill_parent!=t){var r=n,l=!1,a=getIconState(i,LP_pickFieldName(i,t));r||a&&a.hint&&(r=a.hint),a&&a.dofloater&&(l=a.dofloater),r&&(l||set_input_icon_image(i,t,r,!1))}}function popuptoggle(e,i,t,n,o,r,l,a,_,c){var f,s;if(c)f=c;else if(i){if(0<i.location.href.indexOf(".xul"))return!0;f=LP_getElementByIdOrName(i,t)}else{if(0<e.location.href.indexOf(".xul"))return!0;f=LP_getElementByIdOrName(e,t)}"undefined"!=typeof reset_forcefill_without_fillbest&&reset_forcefill_without_fillbest();var g="sites";if(n?g="generate":r?g="save":l&&(g="formfills"),is_your_popup_showing(e))closepopupfills(e,"away"),g_isfirefox?i?(i.g_popupfill_parent_last=i.g_popupfill_parent,i.g_popupfill_parent=null):(e.g_popupfill_parent_last=e.g_popupfill_parent,e.g_popupfill_parent=null):(g_popupfill_parent_last=g_popupfill_parent,g_popupfill_parent=null);else{var d;if(!(d=LP_getloggedin())){if("undefined"!=typeof LP&&void 0!==LP.lpOpenLogin)return void LP.lpOpenLogin();if(!g_isie)return void sendBG({cmd:"dologinaction"})}g_isfirefox?i?i.g_popupfill_parent=f:e.g_popupfill_parent=f:g_popupfill_parent=f;var u=!!r;if(g_isie)"undefined"!=typeof init_LPfn&&init_LPfn()&&LPfn.ie_set_lpifmsg(e,f,n,u,g,a);else{var p=LP_pickFormName(f.ownerDocument,f.form);n=n?1:0,bg.get("LPContentScriptFeatures").is_infield_enabled?bg.InfieldCommands.setActiveFormData({active:p,activefieldid:LP_pickFieldName(document,f),ask_generate:n,opentosave:u,activefieldtype:f.type,start_type:g}):sendBG({cmd:"setpopupfilllastactive",active:p,activefieldid:LP_pickFieldName(document,f),ask_generate:n,opentosave:u,activefieldtype:f.type,start_type:g})}if(!g_isfirefox&&!g_isie){var m=document.location.href;"undefined"!=typeof punycode&&(m=punycode.URLToASCII(document.location.href)),sendBG({cmd:"popupregister",docnum:g_docnum,url:m})}var h="300px",v,b=("function"==typeof ff_calculate_iframe_pos?ff_calculate_iframe_pos:calculate_iframe_pos)(e,f,h,should_ignore_body_relative(e)),y=0,P=0;b&&(y=b.posx,P=b.posy);var k=t;if(g_isfirefox)ff_popupfill_create_iframe(e,y,P,k,null,null,f,g);else{var L=chk_form_is_nonlogin_form(document,f.form),x=checkDocumentForLoginOrphans(document)||checkDocumentForLoginOrphansFirstStage(document),I=checkDocumentForLoginFirstStageForm(document),w=x||I||chk_form_has_password(document,f.form),O=10,F=g_popupfill_rows;L&&!w&&(F=g_popupfill_rows_FF);var S=g_popupfill_widest+40,E=120;if(S<E&&(S=E),S<g_popupfill_parent.offsetWidth&&(S=g_popupfill_parent.offsetWidth,S+=2*Math.abs(POPUP_FIELD_OFFSET)),S=Math.min(S,MAX_DIALOG_WIDTH),1==F&&!create_onerow_iframe){var N=null;if(g_fillaid&&(N=g_fillaid),isEmptyObject(g_autofillsites)||(N=g_autofillsites[0].aid),null!=N)return sendBG({cmd:"autofillaid",aid:N}),void verbose_log("filling only, not creating 1 row iframe");verbose_log("tried to fill form with invalid acct")}if(0==F&&o==NO_FORCE_NOHITS)verbose_log("not creating empty iframe");else{var d=LP_getloggedin();if(g_dologin_clickable&&!d&&(!g_isie||g_isie&&o==FORCE_SHOW_NOHITS_NOLOGIN)){if(verbose_log("login state: checking whether to issue Chrome login prompt"),o==FORCE_SHOW_NOHITS_NOLOGIN)return;if(!g_isie)return void sendBG({cmd:"dologinaction"})}}if(g_create_iframe_in_top&&!g_isie&&!g_isfirefox&&LP_inIframe(window)&&LP_do_toplevel_iframe_hack(window)){var C=!0;P=(b=calculate_iframe_pos(e,f,h,!0))?(y=parseInt(b.posx),parseInt(b.posy)):y=0;var B="",D="";try{B=window.name,D=document.location.href}catch(e){}var m=e.location.href;"undefined"!=typeof punycode&&(m=punycode.URLToASCII(e.location.href));var H=null;f&&f.getBoundingClientRect&&(H=f.getBoundingClientRect()),sendBG({cmd:"createpopuptoplevelfromframe",posx:y,posy:P,id:k,rows:F,width:S,minheight:g_minheight_override,framename:B,framesrc:D,url:m,fillhint:a,fieldBox:{top:H.top,right:H.right,bottom:H.bottom,left:H.left,width:H.width}})}else popupfill_create_iframe(e,y,P,k,F,S,g_minheight_override,null,null,{posx:y,posy:P,id:k,width:S,fieldEl:f,fillhint:a});g_popupfill_iframe_width_save=S}if(g_isfirefox?i?relocate_popupfill_iframes(i):relocate_popupfill_iframes(e):g_create_iframe_in_top&&LP_inIframe(window)&&!g_isie&&!g_isfirefox||relocate_popupfill_iframes(e),!bg.get("LPContentScriptFeatures").is_infield_enabled){var T=i||e,A=!1,G=getIconState(T,t);if(G&&(A=G.dofloater),A){var R=LPMAGIC+t;change_clickable_icon_to_cancel(T,R,t)}else{var M,W=!0;set_input_icon_image(T,f,"cancel",!0)}}}}function inputHasLPBackground(i){if(null==i)return!1;var t=null;if(g_isie&&void 0!==i.currentStyle)void 0!==i.currentStyle&&(t=i.currentStyle);else try{t=i.ownerDocument.defaultView.getComputedStyle(i,"")}catch(e){void 0!==i.currentStyle&&(t=i.currentStyle)}if(t&&("INPUT"==i.tagName||"input"==i.tagName)&&""!=t.backgroundImage){if(-1!=t.backgroundImage.indexOf(g_sites_light_ico)||-1!=t.backgroundImage.indexOf(g_40_icons["16x16_lite@2x"])||-1!=t.backgroundImage.indexOf(g_pw_light_ico)||-1!=t.backgroundImage.indexOf(g_close_light_ico)||-1!=t.backgroundImage.indexOf(g_ff_light_ico)||-1!=t.backgroundImage.indexOf(g_sites_ico)||-1!=t.backgroundImage.indexOf(g_pw_ico)||-1!=t.backgroundImage.indexOf(g_close_ico)||-1!=t.backgroundImage.indexOf(g_ff_ico)||-1!=t.backgroundImage.indexOf(g_40_icons.IF_Close)||-1!=t.backgroundImage.indexOf(g_40_icons["IF_Close@2x"])||-1!=t.backgroundImage.indexOf(g_40_icons.FormFill)||-1!=t.backgroundImage.indexOf(g_40_icons["FormFill@2x"])||-1!=t.backgroundImage.indexOf(g_40_icons.FormFill_dark)||-1!=t.backgroundImage.indexOf(g_40_icons["FormFill_dark@2x"])||-1!=t.backgroundImage.indexOf(g_40_icons.Generate)||-1!=t.backgroundImage.indexOf(g_40_icons["Generate@2x"])||-1!=t.backgroundImage.indexOf(g_40_icons.Generate_dark)||-1!=t.backgroundImage.indexOf(g_40_icons["Generate_dark@2x"]))return verbose_log("icon "+LP_getname(i)+" has icon w/o number"),!0;if(-1!=t.backgroundImage.indexOf(getnumbericon(i.ownerDocument,i,!0))||-1!=t.backgroundImage.indexOf(getnumbericon(i.ownerDocument,i,!1)))return!0;var e;for(e=0;e<=9;e++)if(-1!=t.backgroundImage.indexOf(getnumbericon(i.ownerDocument,i,!0,e))||-1!=t.backgroundImage.indexOf(getnumbericon(i.ownerDocument,i,!1,e)))return verbose_log("icon "+LP_getname(i)+" has icon with number "+e),!0}return!1}function removeLPBackground(e){if(!e)return!1;try{e.style.backgroundImage="none",e.style.backgroundRepeat="initial",e.style.backgroundAttachment="initial",e.style.backgroundPosition="initial",e.style.backgroundSize="initial"}catch(e){return verbose_log("removeLPBackground error: "+e.message),!1}return!0}
//# sourceMappingURL=sourcemaps/fields_cs.js.map
