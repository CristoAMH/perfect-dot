var PreferencesDialog=function(e){Dialog.call(this,e,{additionalHeaderClasses:"icon",title:Strings.translateString("Preferences"),closeButtonEnabled:!0,maximizeButtonEnabled:!0,buttonAlign:this.RIGHT_ALIGN}),this.hotkeyFields={}};PreferencesDialog.prototype=Object.create(Dialog.prototype),PreferencesDialog.prototype.constructor=PreferencesDialog,function(){var g="hotkeyField",p="checkboxField",a={usepopupfill:!0,enablenamedpipes:!0,language:!0},o=function(e){var t=[];if(e.ctrlKey&&t.push("control"),e.metaKey&&t.push("meta"),e.altKey&&t.push("alt"),e.shiftKey&&t.push("shift"),t.length>e.shiftKey)switch(e.which){case 16:case 17:case 18:case 91:case 92:break;default:this.setValue(e.which,t.join(" "))}switch(e.which){case 8:case 46:this.clear();break;case 9:break;default:e.preventDefault(),e.stopPropagation()}},c=function(e,t){var r;DialogInput.Input.apply(this,arguments),this.keyCode=0,this.mods="",(r=this).input.bind("keydown",function(e){o.call(r,e)})},e,t,s,u;((c.prototype=Object.create(DialogInput.Input.prototype)).constructor=c).prototype.setValue=(t=e=null,s=function(){return null===t&&(t={control:Strings.translateString("Ctrl"),meta:Strings.translateString("Meta"),alt:Strings.translateString("Alt"),shift:Strings.translateString("Shift")}),t},u=function(){return null===e&&(e={33:Strings.translateString("Page Up"),34:Strings.translateString("Page Down"),35:Strings.translateString("End"),36:Strings.translateString("Home"),37:Strings.translateString("Left"),38:Strings.translateString("Up"),39:Strings.translateString("Right"),40:Strings.translateString("Down"),189:"-",219:"[",220:"\\",221:"]",186:";",222:"'",188:",",187:"+",190:".",191:"/",106:"*",192:"~",124:Strings.translateString("Print Screen")}),e},function(e,t){var r="";if(t&&e){for(var a=t.split(" "),o=s(),i=0,n=a.length;i<n;++i)a[i]=o[a[i]];var l=u();void 0!==l[e]?a.push(l[e]):a.push(String.fromCharCode(e).toUpperCase()),r=a.join("+"),this.keyCode=e,this.mods=t}else this.keyCode=0,this.mods="";DialogInput.Input.prototype.setValue.call(this,r)});var d=function(e,t){var r,a;DialogInput.Input.apply(this,arguments),this.checkboxField=$("#"+this.input.attr(p)),a=null,void 0===(r=this).checkboxField.attr(Dialog.prototype.DIALOG_FIELD)&&(r.checkboxField.bind("change",function(){if(r.checkboxField.prop("checked"))if(null!==a)r.setValue(a),a=null;else switch(r.checkboxField.selector){case"#autoautoEnabled":r.setValue(25);break;case"#pollServerEnabled":r.setValue(15);break;case"#recentUsed":r.setValue(10)}else a=r.getValue(),r.setValue("")}),r.onChange(function(e){r.checkboxField.prop("checked",0<e)}))};((d.prototype=Object.create(DialogInput.Input.prototype)).constructor=d).prototype.enable=function(){DialogInput.Input.prototype.enable.apply(this,arguments),this.checkboxField.prop("disabled",!1)},d.prototype.disable=function(){DialogInput.Input.prototype.disable.apply(this,arguments),this.checkboxField.prop("disabled",!0)},d.prototype.buildError=function(){return this.buildErrorElement({element:this.input.parent().children()})},d.prototype.setValue=function(e){("number"!=typeof e||0<e)&&DialogInput.Input.prototype.setValue.apply(this,arguments)},d.prototype.validate=function(e,t,r){if(r){var a=parseInt(r);if(isNaN(a)||a<0)return e.addError(t,Strings.translateString("Value must be greater than or equal to %1.",0)),!1}return!0};var n=function(){for(var e=LPProxy.getFormFillModels(),t=[{value:0,label:""}],r=0,a=e.length;r<a;++r){var o=e[r];t.push({value:o.getID(),label:o.getName()})}return t},l=function(){var e=[],t=bg.get("g_langs");for(var r in t)e.push({value:r,label:t[r]});return e};PreferencesDialog.prototype.setupButtons=function(e){Dialog.prototype.setupButtons.apply(this,arguments),this.resetDefaultsButton=$(LPTools.createElement("button","nbtn btn_midi wbtn dynamicWidth leftButton")),this.resetDefaultsButton.bind("click",this.createHandler(this.resetDefaults)),this.buttonContainer.prepend(this.resetDefaultsButton)},PreferencesDialog.prototype.resetDefaults=function(){for(var e=this.currentViewElement.find("["+this.DIALOG_FIELD+"]"),t={},r=0,a=e.length;r<a;++r)t[e[r].getAttribute(this.DIALOG_FIELD)]=!0;this.populateFields(bg.Preferences.getDefault(t))},PreferencesDialog.prototype.leftMenuChange=function(e){this.resetDefaultsButton.text(Strings.translateString("Restore '%1' Defaults",e.text()))},PreferencesDialog.prototype.getHotKeyPreferenceNames=function(){var e={};for(var t in this.hotkeyFields)e[t+"KeyCode"]=!0,e[t+"Mods"]=!0;return e},PreferencesDialog.prototype.getData=function(){var e=Dialog.prototype.getData.apply(this,arguments);for(var t in this.hotkeyFields){var r=this.hotkeyFields[t];e[t+"KeyCode"]=r.keyCode,e[t+"Mods"]=r.mods}return e},PreferencesDialog.prototype.defaultFields=function(e){e.defaultData=$.extend(e.defaultData,bg.Preferences.get(DialogInput.getProperties(this.inputFields))),LPTools.setSelectOptions(this.inputFields.defaultffid.getNativeElement(),n()),LPTools.setSelectOptions(this.inputFields.language.getNativeElement(),l()),Dialog.prototype.defaultFields.apply(this,arguments);var t=bg.Preferences.get(this.getHotKeyPreferenceNames());for(var r in this.hotkeyFields){var a;this.hotkeyFields[r].setValue(t[r+"KeyCode"],t[r+"Mods"])}var o=bg.get("g_prefoverrides"),i=this;bg.getLogoffWhenCloseBrowser(function(e){if(e){var t=document.getElementById("logoffWhenCloseBrowserLabel"),r=document.getElementById("logoffWhenCloseBrowserVal");t&&(t.innerText=Strings.translateString("Automatically Log out when all browsers are closed.")),r&&(r.style.display="none")}-1<o.logoffclosebrowser&&0<o.logoffclosebrowser&&(i.inputFields.logoffWhenCloseBrowser.setValue(o.logoffclosebrowser),i.inputFields.logoffWhenCloseBrowserVal.setValue(o.logoffclosebrowser),i.inputFields.logoffWhenCloseBrowser.disable())}),-1<o.logoffidle?(this.inputFields.idleLogoffVal.setValue(o.logoffidle),this.inputFields.idleLogoffVal.disable()):this.inputFields.idleLogoffVal.enable(),bg.get("g_flags").pollIntervalSetByPolicy?this.inputFields.pollServerVal.disable():this.inputFields.pollServerVal.enable()},PreferencesDialog.prototype.clearFields=function(){for(var e in Dialog.prototype.clearFields.apply(this,arguments),this.hotkeyFields)this.hotkeyFields[e].clear()};var f=function(r){return function(e){var t=r.getValue();t&&(r.clear(),LPTools.requireBinary(function(){r.setValue(t)}))}},r;PreferencesDialog.prototype.initialize=function(e){this.initializeInputFields(e.find("input["+p+"]"),function(e){return new d(e,this)}),Dialog.prototype.initialize.apply(this,arguments);for(var t=e.find("input["+g+"]"),r=0,a=t.length;r<a;++r){var o=t[r],i=o.getAttribute(g);this.hotkeyFields[i]=new c(o,this)}var n=LPPlatform.getUnavailablePreferences();for(var l in n)n[l]&&(e.find("input["+this.DIALOG_FIELD+"="+l+"]").closest("tr").detach(),e.find("select["+this.DIALOG_FIELD+"="+l+"]").closest("tr").detach(),e.find("input["+g+"="+l+"]").closest("tr").detach());var s=LPPlatform.getPreferencesRequiringBinary();for(var l in s)if(s[l]){var u=this.inputFields[l];u&&u.input.bind("change",f(u))}bg.get("LPContentScriptFeatures").is_infield_enabled||document.getElementById("infieldPopupEnabled").parentElement.parentElement.remove(),bg.get("g_hidelogoffprefs")&&$("#securityPrefs").remove(),bg.get("g_hideappearancebox")&&$("#appearancePrefs").remove(),(bg.get("g_issafari")||bg.get("g_issafari_appext"))&&$("#iconMenuItem").LP_hide(),bg.get("g_disableautofill")&&(document.getElementById("automaticallyFill").parentElement.appendChild(document.createTextNode("-- This feature has been disabled by an Enterprise Policy.")),document.getElementById("automaticallyFill").remove()),bg.get("LPContentScriptFeatures").ziggy&&(document.getElementById("toplevelmatchingsites").parentNode.parentNode.style.display="none"),bg.get("g_loggedinonline")||bg.get("g_loggedinoffline")?$("#language").removeAttr("disabled","disabled"):$("#language").attr("disabled","disabled"),$("#automaticallyFill").bind("click",function(){$("#automaticallyFill")[0].checked&&dialogs.alert.open({title:Strings.translateString("Are you sure?"),text:Strings.translateString("Are you sure you want to enable autofill? Enabling autofill increases the risk of exposing a site's password if that site is compromised.")})})},PreferencesDialog.prototype.validate=function(e){var t=Dialog.prototype.validate.apply(this,arguments);return e.autoautoVal&&""!=e.autoautoVal?e.autoautoVal&&e.autoautoVal<10&&(this.addError("autoautoVal",Strings.translateString("Value must be greater than or equal to %1.",10)),t=!1):e.autoautoVal=-1,e.pollServerVal&&""!=e.pollServerVal?e.pollServerVal&&e.pollServerVal<5&&(this.addError("pollServerVal",Strings.translateString("Value must be greater than or equal to %1.",5)),t=!1):e.pollServerVal=-1,e.recentUsedCount&&""!=e.recentUsedCount||(e.recentUsedCount=-1),t},PreferencesDialog.prototype.checkForRestartOrLogoff=function(e,t){for(var r in a)if(e[r]!==this.originalData[r])return void dialogs.alert.open({title:Strings.translateString("Restart Required"),text:Strings.translateString("You must restart your browser before all of the changes will take effect."),handler:t,closeHandler:t});t()},PreferencesDialog.prototype.handleSubmit=(r=function(e){var t=this.getChanges(e);this.checkForRestartOrLogoff(e,this.createHandler(function(){bg.Preferences.set(t),LPPlatform.handlePreferenceChanges(t),this.close(!0)}))},function(e){(e.logoffWhenCloseBrowser||e.idleLogoffEnabled)&&(bg.Preferences.get("rememberpassword")||bg.get("g_master_password_saved"))?dialogs.confirmation.open({title:Strings.translateString("Remember Password"),text:Strings.translateString("You currently have LastPass set to remember your password.  Doing so essentially makes the automatically log out options you've chosen useless.  Would you like LastPass to stop remembering your password?"),handler:this.createHandler(function(){bg.Preferences.set("rememberpassword",!1),bg.deletesavedpw(bg.get("g_username")),r.call(this,e)}),closeHandler:this.createHandler(r,e)}):r.call(this,e)})}();
//# sourceMappingURL=sourcemaps/preferencesDialog.js.map